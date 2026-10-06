// =====================================================================
// The campus. Folders are districts, notes are buildings, links are cables.
// One InstancedMesh with a facade shader (windows, floors, lobby band) so ~2,400 volumes cost a few draw calls.
// =====================================================================
const Campus=(()=>{
const C={ok:false};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const hash01=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return((h>>>0)%100000)/100000};
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
const cv=$("#gl"),stage=$("#stage");
let renderer,scene,camera,sun,hemi,skyMat,skyMesh,ground,groundMat,iMesh,mat,uni={},ringMesh,bridgeGroup,markerGroup,rc;
let W=1,H=1,paused=false,dirty=true,last=0,time=0,lastLbl=0,lastMini=0,firstFrame=false,introStart=-1;
let B=[],DIST=[],BLOCKS=[],WORLD={W:1,H:1},GSIDE=1,inst=[],boxes=null,boxB=null,growth=null,delay=null,LAND=[];
let sel=-1,hov=-1,nbr=new Map(),mode=store.get("vault.time","auto"),walk=false,auto=!reduced,tasksMarks=[];
if(!["auto","dusk","night","day"].includes(mode))mode="auto";
// atmosphere and post state
let stars=null,groundUni=null,composer=null,bloomPass=null,gradePass=null,postState="off",bloomNow=0,skyTimer=0;
const TEX={},shadowDir=new THREE.Vector3(0,-1,0);
// Quality tiers. HI: desktop on "high". Everything ambient (drifting clouds, motes, drones) also needs motion allowed.
// Low or a phone keeps the city, trees and lamps but drops the moving extras, the post chain and half the shadow map.
const QUALITY=store.get("vault.quality","high"),HI=QUALITY!=="low"&&innerWidth>760,AMB=HI&&!reduced;
// World uniforms shared by every patched material: one object per uniform, so a single write reaches all shaders.
const SH={uTime:{value:0},uSunDir:{value:new THREE.Vector3(0,1,0)},uSunFog:{value:new THREE.Color()},uFogH:{value:34},uCloudSh:{value:0},uSkyRef:{value:new THREE.Color()},uLamp:{value:0},uNight:{value:0}};
const SH_DECL="uniform float uTime;uniform vec3 uSunDir;uniform vec3 uSunFog;uniform float uFogH;uniform float uCloudSh;uniform vec3 uSkyRef;uniform float uLamp;uniform float uNight;\n";
const NOISE_GLSL=`float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(h21(i),h21(i+vec2(1.0,0.0)),f.x),mix(h21(i+vec2(0.0,1.0)),h21(i+vec2(1.0,1.0)),f.x),f.y);}
float cloudSh(vec2 p){p=p*0.0032+uTime*vec2(0.0055,0.0027);float n=vn(p)*0.62+vn(p*2.31+7.0)*0.38;return 1.0-uCloudSh*smoothstep(0.5,0.74,n);}
`;
// Height fog with warm in-scatter toward the light: thick along the streets, thin over the roofs.
const FOG_GLSL=p=>`#ifdef USE_FOG
{vec3 fp=${p}-cameraPosition;float fd=max(length(fp),0.001);
 float hf=exp(-max(${p}.y,0.0)/uFogH);float dens=fogDensity*(0.55+0.95*hf);
 float ff=1.0-exp(-dens*dens*fd*fd);float sa=pow(max(dot(fp/fd,uSunDir),0.0),5.0);
 gl_FragColor.rgb=mix(gl_FragColor.rgb,mix(fogColor,uSunFog,sa*0.8),ff);}
#endif`;
let decor=null,roofProps=null,drones=null,motes=null,lampHalo=null,water=null,lastAmb=0;
const _c1=new THREE.Color(),_c2=new THREE.Color();
const cam={tx:0,ty:0,tz:0,yaw:.5,pitch:.62,dist:700},goal=Object.assign({},cam);
const shiftNow={x:0,y:0},shiftGoal={x:0,y:0};
const keys=new Set();
const lin=h=>new THREE.Color(h).convertSRGBToLinear();

// Key states. "auto" blends between them from the real sun elevation (see SOL below); the three named ones are the manual presets.
// haze: horizon band colour. moon: moonlight colour used as the "sun" light when the sun is down.
const MODES={
  dusk:{top:"#0f1733",mid:"#3a4577",bot:"#8a6a86",haze:"#c98a6e",sun:"#ff9a4d",sunI:3.6,dir:[.74,.3,.46],hSky:"#6f7fba",hGnd:"#3a2d3c",hI:.95,fog:"#6c5b7c",fogD:.00062,exp:1.1,win:1.5,ui:"dark",stars:.25,bloom:.55,cloud:.62,csh:.12},
  night:{top:"#03050d",mid:"#0b1230",bot:"#1b2650",haze:"#243052",sun:"#8fa8ff",sunI:.35,dir:[.5,.36,.5],hSky:"#283252",hGnd:"#0a0c16",hI:.7,fog:"#0a1024",fogD:.00105,exp:1.2,win:2.1,ui:"dark",stars:1,bloom:1,cloud:.4,csh:0},
  day:{top:"#4f84cc",mid:"#9fbddc",bot:"#e6dcc8",haze:"#e6e1d6",sun:"#fff0d4",sunI:2.5,dir:[.46,.62,.42],hSky:"#b9cfe9",hGnd:"#8c8273",hI:.55,fog:"#cbd4dc",fogD:.00062,exp:.9,win:.35,ui:"light",stars:0,bloom:.18,cloud:.42,csh:.28},
  dawn:{top:"#2a3a6e",mid:"#7a86b4",bot:"#e2a98c",haze:"#f0b08a",sun:"#ffc08a",sunI:2.6,dir:[.74,.3,.46],hSky:"#8c9ccc",hGnd:"#4a3d3c",hI:.9,fog:"#9a8a98",fogD:.0007,exp:1.05,win:1.0,ui:"dark",stars:.1,bloom:.4,cloud:.58,csh:.15}
};
const MODE_ORDER=["auto","dusk","night","day"];
const NUM_KEYS=["sunI","hI","fogD","exp","win","stars","bloom","cloud","csh"],COL_KEYS=["top","mid","bot","haze","sun","hSky","hGnd","fog"];
const CUR={};NUM_KEYS.forEach(k=>CUR[k]=0);COL_KEYS.forEach(k=>CUR[k]=new THREE.Color());CUR.ui="dark";

// ---------- SOL: the real sun from the viewer's clock and time zone.
// Latitude comes from a small table of time zone names (no geolocation prompt); longitude from the UTC offset.
// Solar position is the NOAA low-precision approximation (declination from day of year, equation of time, hour angle):
// good to about a degree, which is all the light needs. DST shifts the longitude estimate by 15 degrees; accepted.
const TZ_LAT={"America/New_York":40.7,"America/Detroit":42.3,"America/Chicago":41.9,"America/Denver":39.7,"America/Phoenix":33.4,"America/Los_Angeles":34.1,"America/Anchorage":61.2,"Pacific/Honolulu":21.3,"America/Toronto":43.7,"America/Vancouver":49.3,"America/Mexico_City":19.4,"America/Bogota":4.7,"America/Lima":-12,"America/Sao_Paulo":-23.5,"America/Argentina/Buenos_Aires":-34.6,"America/Santiago":-33.4,
  "Europe/London":51.5,"Europe/Dublin":53.3,"Europe/Lisbon":38.7,"Europe/Madrid":40.4,"Europe/Paris":48.9,"Europe/Berlin":52.5,"Europe/Amsterdam":52.4,"Europe/Rome":41.9,"Europe/Zurich":47.4,"Europe/Stockholm":59.3,"Europe/Warsaw":52.2,"Europe/Athens":38,"Europe/Istanbul":41,"Europe/Moscow":55.8,
  "Africa/Cairo":30,"Africa/Lagos":6.5,"Africa/Nairobi":-1.3,"Africa/Johannesburg":-26.2,"Asia/Dubai":25.2,"Asia/Karachi":24.9,"Asia/Kolkata":22.5,"Asia/Dhaka":23.8,"Asia/Bangkok":13.8,"Asia/Jakarta":-6.2,"Asia/Singapore":1.3,"Asia/Hong_Kong":22.3,"Asia/Shanghai":31.2,"Asia/Seoul":37.6,"Asia/Tokyo":35.7,"Asia/Manila":14.6,
  "Australia/Perth":-31.9,"Australia/Sydney":-33.9,"Australia/Melbourne":-37.8,"Australia/Brisbane":-27.5,"Pacific/Auckland":-36.9,"UTC":35};
const SOL={zone:"UTC",lat:35,lon:0,elev:0,az:180,hours:0,clockOverride:null,dir:new THREE.Vector3(0,1,0),moon:new THREE.Vector3(0,1,0)};
function solInit(){
  try{SOL.zone=Intl.DateTimeFormat().resolvedOptions().timeZone||"UTC"}catch(e){SOL.zone="UTC"}
  const z=SOL.zone;SOL.lat=TZ_LAT[z]??(z.startsWith("Europe/")?50:z.startsWith("Africa/")?5:z.startsWith("Australia/")?-30:z.startsWith("Asia/")?30:z.startsWith("America/")?35:35);
}
function solUpdate(){
  const now=new Date();const off=-now.getTimezoneOffset()/60;SOL.lon=off*15;
  let hLocal=now.getHours()+now.getMinutes()/60+now.getSeconds()/3600;
  if(SOL.clockOverride!=null)hLocal=SOL.clockOverride;
  SOL.hours=hLocal;
  const start=new Date(now.getFullYear(),0,0);const n=Math.floor((now-start)/864e5);
  const rad=Math.PI/180,dec=23.44*Math.sin(2*Math.PI*(284+n)/365)*rad;
  const Bq=2*Math.PI*(n-81)/364,eot=9.87*Math.sin(2*Bq)-7.53*Math.cos(Bq)-1.5*Math.sin(Bq);
  const utc=hLocal-off,solar=utc+SOL.lon/15+eot/60,H=(solar-12)*15*rad,phi=SOL.lat*rad;
  const sinE=Math.sin(phi)*Math.sin(dec)+Math.cos(phi)*Math.cos(dec)*Math.cos(H);const e=Math.asin(clamp(sinE,-1,1));
  let az=Math.atan2(Math.sin(H),Math.cos(H)*Math.sin(phi)-Math.tan(dec)*Math.cos(phi))+Math.PI; // from north, clockwise
  SOL.elev=e/rad;SOL.az=az/rad;
  // scene frame: north is -z, east is +x
  SOL.dir.set(Math.cos(e)*Math.sin(az),Math.sin(e),-Math.cos(e)*Math.cos(az));
  SOL.moon.set(-SOL.dir.x,Math.max(.28,-SOL.dir.y),-SOL.dir.z).normalize();
}

// ---------- layout: squarified treemap of districts, then blocks, then a grid of buildings
function squarify(items,x,y,w,h){
  const out=[];let rest=items.slice();const total=rest.reduce((a,b)=>a+b.v,0);const sc=w*h/total;rest.forEach(i=>i.a=i.v*sc);
  const worst=(row,side)=>{const s=row.reduce((a,b)=>a+b.a,0);const mx=Math.max(...row.map(r=>r.a)),mn=Math.min(...row.map(r=>r.a));return Math.max(side*side*mx/(s*s),s*s/(side*side*mn))};
  while(rest.length){
    const side=Math.min(w,h);let row=[rest[0]],i=1;
    while(i<rest.length){const nr=row.concat(rest[i]);if(worst(nr,side)<=worst(row,side)){row=nr;i++}else break}
    rest=rest.slice(row.length);const s=row.reduce((a,b)=>a+b.a,0);
    if(w>=h){const cw=s/h;let yy=y;row.forEach(r=>{const rh=r.a/cw;out.push({it:r,x,y:yy,w:cw,h:rh});yy+=rh});x+=cw;w-=cw}
    else{const rh=s/w;let xx=x;row.forEach(r=>{const rw=r.a/rh;out.push({it:r,x:xx,y,w:rw,h:rh});xx+=rw});y+=rh;h-=rh}
  }
  return out;
}
function tiersFor(cx,cz,fw,fd,h,rnd){
  const j=(rnd-.5);
  if(h<15)return[{x:cx,z:cz,w:fw,d:fd,y0:0,y1:h}];
  if(h<32){const h1=h*(.38+.1*rnd);return[{x:cx,z:cz,w:fw,d:fd,y0:0,y1:h1},{x:cx+j*fw*.14,z:cz-j*fd*.12,w:fw*.68,d:fd*.7,y0:h1,y1:h}]}
  const h1=h*.28,h2=h*.64;
  return[{x:cx,z:cz,w:fw,d:fd,y0:0,y1:h1},{x:cx+j*fw*.12,z:cz+j*fd*.1,w:fw*.76,d:fd*.74,y0:h1,y1:h2},{x:cx+j*fw*.18,z:cz-j*fd*.14,w:fw*.5,d:fd*.52,y0:h2,y1:h}];
}
function layout(){
  const CELL=15,PAD=1.9;
  const groups=new Map();
  NOTES.forEach(n=>{const parts=(n.folder||"").split("/");const top=parts[0]||"Root";const sub=parts.length>1?parts[1]:"·";if(!groups.has(top))groups.set(top,new Map());const g=groups.get(top);if(!g.has(sub))g.set(sub,[]);g.get(sub).push(n)});
  const ds=[...groups].map(([top,subs])=>({top,subs,count:[...subs.values()].reduce((a,s)=>a+s.length,0)})).sort((a,b)=>b.count-a.count);
  const total=ds.reduce((a,d)=>a+(d.count+4)*CELL*CELL*PAD,0);
  const Wd=Math.sqrt(total*1.3),Hd=total/Wd;
  B=new Array(NOTES.length);DIST=[];BLOCKS=[];
  const rects=squarify(ds.map(d=>({d,v:d.count+4})),-Wd/2,-Hd/2,Wd,Hd);
  rects.forEach(r=>{
    const d=r.it.d,ROAD=9,px=r.x+ROAD/2,pz=r.y+ROAD/2,pw=r.w-ROAD,pd=r.h-ROAD;
    DIST.push({top:d.top,name:d.top.replace(/^\d+ - /,""),x:px,z:pz,w:pw,d:pd,count:d.count,color:FOLDER_COLORS[d.top]||"#8A93AD"});
    const subs=[...d.subs].map(([name,list])=>({name,list,v:list.length+1})).sort((a,b)=>b.v-a.v);
    const inner=4;
    squarify(subs.map(s=>({s,v:s.v})),px+inner,pz+inner,pw-2*inner,pd-2*inner).forEach(q=>{
      const s=q.it.s,bx=q.x+1.8,bz=q.y+1.8,bw=Math.max(6,q.w-3.6),bd=Math.max(6,q.h-3.6);
      BLOCKS.push({x:q.x+.6,z:q.y+.6,w:q.w-1.2,d:q.h-1.2,name:s.name,top:d.top});
      const list=s.list.slice().sort((a,b)=>String(a.fm.type||"").localeCompare(String(b.fm.type||""))||a.name.localeCompare(b.name,undefined,{numeric:true}));
      const n=list.length;let cols=Math.min(n,Math.max(1,Math.round(Math.sqrt(n*bw/bd))));const rows=Math.ceil(n/cols);
      const cw=bw/cols,cd=bd/rows;
      list.forEach((note,i)=>{
        const c=i%cols,rr=Math.floor(i/cols),cx=bx+cw*(c+.5),cz=bz+cd*(rr+.5),rnd=hash01(note.name);
        const len=note.body.length,deg=note.out.size+note.back.size,ty=note.fm.type;
        let h=5+4.2*Math.log2(1+len/260)+1.9*Math.sqrt(deg);
        if(ty==="division")h+=14;else if(ty==="moc")h+=10;else if(ty==="home")h+=30;else if(ty==="agent-blueprint")h-=1.5;
        if(note.top==="10 - Archive")h*=.7;
        h=clamp(h*.86,4,56);
        const mf=Math.min(cw,cd)*(.7+.16*rnd);
        const fw=clamp(Math.min(cw*.84,mf*(.9+.2*hash01(note.name+"w"))),3.5,16),fd=clamp(Math.min(cd*.84,mf*(.9+.2*hash01(note.name+"d"))),3.5,16);
        B[note.id]={id:note.id,cx,cz,fw,fd,h,rnd,tiers:tiersFor(cx,cz,fw,fd,h,rnd)};
      });
    });
  });
  WORLD={W:Wd,H:Hd};GSIDE=Math.max(Wd,Hd)+160;
  LAND=NOTES.filter(n=>["division","moc","home"].includes(n.fm.type)||n.out.size+n.back.size>=34).map(n=>n.id);
}

// ---------- ground plan painted to one texture
function paintGround(){
  const S=4096,cvs=document.createElement("canvas");cvs.width=cvs.height=S;const g=cvs.getContext("2d"),sc=S/GSIDE;
  const X=x=>(x+GSIDE/2)*sc,Z=z=>(z+GSIDE/2)*sc;
  g.fillStyle="#0b1019";g.fillRect(0,0,S,S);
  for(let i=0;i<26000;i++){g.fillStyle=`rgba(255,255,255,${Math.random()*.018})`;g.fillRect(Math.random()*S,Math.random()*S,1+Math.random()*2.5,1+Math.random()*2.5)}
  const rgb=h=>{const c=new THREE.Color(h);return [c.r*255|0,c.g*255|0,c.b*255|0]};
  DIST.forEach(d=>{
    const [r,gg,b]=rgb(d.color);
    g.setLineDash([]);g.fillStyle="#141b2c";g.fillRect(X(d.x),Z(d.z),d.w*sc,d.d*sc);
    g.fillStyle=`rgba(${r},${gg},${b},.09)`;g.fillRect(X(d.x),Z(d.z),d.w*sc,d.d*sc);
    g.strokeStyle=`rgba(${r},${gg},${b},.55)`;g.lineWidth=.55*sc;g.strokeRect(X(d.x),Z(d.z),d.w*sc,d.d*sc);
    g.setLineDash([11*sc,9*sc]);g.strokeStyle="rgba(255,236,200,.13)";g.lineWidth=.4*sc;g.strokeRect(X(d.x-4.5),Z(d.z-4.5),(d.w+9)*sc,(d.d+9)*sc);
  });
  g.setLineDash([]);
  BLOCKS.forEach(b=>{g.fillStyle="rgba(255,255,255,.028)";g.fillRect(X(b.x),Z(b.z),b.w*sc,b.d*sc);g.strokeStyle="rgba(255,255,255,.07)";g.lineWidth=.22*sc;g.strokeRect(X(b.x),Z(b.z),b.w*sc,b.d*sc)});
  B.forEach(b=>{if(!b)return;const t=b.tiers[0];g.fillStyle="rgba(255,255,255,.05)";g.fillRect(X(t.x-t.w/2-.9),Z(t.z-t.d/2-.9),(t.w+1.8)*sc,(t.d+1.8)*sc)});
  const tex=new THREE.CanvasTexture(cvs);tex.encoding=THREE.sRGBEncoding;tex.anisotropy=renderer.capabilities.getMaxAnisotropy();tex.generateMipmaps=true;tex.minFilter=THREE.LinearMipmapLinearFilter;
  // plaza mask: white inside district plots (pavers), black on the streets between them (asphalt). Same frame as the plan.
  const MS=1024,mc=document.createElement("canvas");mc.width=mc.height=MS;const mg=mc.getContext("2d"),ms=MS/GSIDE;
  mg.fillStyle="#000";mg.fillRect(0,0,MS,MS);mg.fillStyle="#fff";
  DIST.forEach(d=>mg.fillRect((d.x+GSIDE/2)*ms,(d.z+GSIDE/2)*ms,d.w*ms,d.d*ms));
  const mask=new THREE.CanvasTexture(mc);mask.generateMipmaps=false;mask.minFilter=mask.magFilter=THREE.LinearFilter;
  // contact shade: ambient occlusion around every footprint, built from stacked soft rings (no canvas filter needed)
  const AS=HI?2048:1024,ac=document.createElement("canvas");ac.width=ac.height=AS;const ag=ac.getContext("2d"),as=AS/GSIDE;
  ag.fillStyle="#fff";ag.fillRect(0,0,AS,AS);
  const AX=x=>(x+GSIDE/2)*as;
  B.forEach(b=>{if(!b)return;const t=b.tiers[0],k=Math.min(1,.45+b.h/40);
    for(let i=4;i>=0;i--){const e=.35+i*.75;ag.fillStyle=`rgba(0,0,0,${(.13*k).toFixed(3)})`;ag.fillRect(AX(t.x-t.w/2-e),AX(t.z-t.d/2-e),(t.w+2*e)*as,(t.d+2*e)*as)}});
  const ao=new THREE.CanvasTexture(ac);ao.generateMipmaps=false;ao.minFilter=ao.magFilter=THREE.LinearFilter;
  tex.userData={mask,ao};
  return tex;
}
// albedo tiles from web/assets. Each sampler starts as a 1x1 neutral texel so the shaders compile before the files arrive.
function tile(name,url,r,g,b){
  if(TEX[name])return TEX[name];
  const t=new THREE.DataTexture(new Uint8Array([r,g,b,255]),1,1,THREE.RGBAFormat);t.needsUpdate=true;TEX[name]=t;
  const img=new Image();img.onload=()=>{
    const tt=new THREE.Texture(img);tt.wrapS=tt.wrapT=THREE.MirroredRepeatWrapping;tt.anisotropy=renderer.capabilities.getMaxAnisotropy();tt.minFilter=THREE.LinearMipmapLinearFilter;tt.needsUpdate=true;
    TEX[name]=tt;[uni,groundUni].forEach(u=>{if(u&&u["t_"+name])u["t_"+name].value=tt});dirty=true};
  img.onerror=()=>console.warn("texture missing:",url);img.src=url;
  return t;
}
function loadTiles(){
  proceduralTiles();
  tile("asphalt","assets/ground-asphalt.jpg",46,47,49);tile("pavers","assets/ground-pavers.jpg",150,146,138);
  tile("glass","assets/facade-glass.jpg",70,82,100);tile("stone","assets/facade-stone.jpg",190,172,140);tile("steel","assets/facade-steel.jpg",140,146,156);tile("roof","assets/roof-gravel.jpg",120,120,118);
}
// ground: plan colour as an overlay on asphalt and pavers, picked by the mask, in world space so the tiles never stretch
function groundMaterial(tex){
  const m=new THREE.MeshStandardMaterial({map:tex,roughness:.9,metalness:0});
  m.onBeforeCompile=sh=>{
    sh.uniforms.t_asphalt={value:TEX.asphalt};sh.uniforms.t_pavers={value:TEX.pavers};sh.uniforms.t_mask={value:tex.userData.mask};sh.uniforms.t_ao={value:tex.userData.ao};sh.uniforms.t_light={value:tex.userData.light||tex.userData.ao};sh.uniforms.uSide={value:GSIDE};Object.assign(sh.uniforms,SH);groundUni=sh.uniforms;
    sh.vertexShader=sh.vertexShader.replace("#include <common>","#include <common>\nvarying vec3 vGPos;").replace("#include <begin_vertex>","#include <begin_vertex>\nvGPos=(modelMatrix*vec4(transformed,1.0)).xyz;");
    sh.fragmentShader=sh.fragmentShader.replace("#include <common>","#include <common>\nuniform sampler2D t_asphalt;uniform sampler2D t_pavers;uniform sampler2D t_mask;uniform sampler2D t_ao;uniform sampler2D t_light;uniform float uSide;varying vec3 vGPos;\n"+SH_DECL+NOISE_GLSL+"vec3 srgb(vec3 c){return pow(c,vec3(2.2));}")
      .replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
{
  vec2 wp=vGPos.xz;
  vec3 asp=srgb(texture2D(t_asphalt,wp/18.0).rgb);
  vec3 pav=srgb(texture2D(t_pavers,wp/9.0).rgb);
  vec2 puv=vec2(wp.x/uSide+0.5,0.5-wp.y/uSide);
  float m=texture2D(t_mask,puv).r;
  float ao=texture2D(t_ao,puv).r;
  // large-scale tonal drift so the paving never reads as one repeated tile
  float drift=0.86+0.28*vn(wp*0.021);
  vec3 tl=mix(asp*1.3,pav*0.55,m)*drift;
  // the painted plan (district tints, outlines, lot pads) sits on the tiles as an overlay
  vec3 plan=diffuseColor.rgb;
  diffuseColor.rgb=(tl*(0.75+plan*4.0)+plan*0.9)*mix(0.3,1.0,ao)*cloudSh(wp);
  // after dark the plazas read slightly damp: lower roughness catches the lamp pools and window glow
  roughnessFactor=mix(0.92,0.78,m)-uNight*0.22*m;
}`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
{ vec3 lm=texture2D(t_light,vec2(vGPos.x/uSide+0.5,0.5-vGPos.z/uSide)).rgb;totalEmissiveRadiance+=lm*lm*uLamp*1.3; }`).replace("#include <fog_fragment>",FOG_GLSL("vGPos"));
  };
  return m;
}

// ---------- scene
function makeMaterial(){
  const m=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.72,metalness:.1});
  m.onBeforeCompile=sh=>{
    sh.uniforms.uWin={value:CUR.win||MODES.dusk.win};sh.uniforms.t_glass={value:TEX.glass};sh.uniforms.t_stone={value:TEX.stone};sh.uniforms.t_steel={value:TEX.steel};sh.uniforms.t_roof={value:TEX.roof};sh.uniforms.t_leaf={value:TEX.leaf};Object.assign(sh.uniforms,SH);uni=sh.uniforms;
    sh.vertexShader=sh.vertexShader
      .replace("#include <common>","#include <common>\nattribute vec3 aCol;attribute vec4 aTint;attribute vec4 aState;attribute vec4 aExt;varying vec3 vBCol;varying vec4 vBTint;varying vec4 vBSt;varying vec4 vBExt;varying vec3 vWPos;varying vec3 vBN;varying vec3 vLoc;varying vec3 vScl;")
      .replace("#include <begin_vertex>","#include <begin_vertex>\nvWPos=(modelMatrix*instanceMatrix*vec4(transformed,1.0)).xyz;vBN=normal;vBCol=aCol;vBTint=aTint;vBSt=aState;vBExt=aExt;vLoc=position;vScl=vec3(instanceMatrix[0][0],instanceMatrix[1][1],instanceMatrix[2][2]);");
    sh.fragmentShader=sh.fragmentShader
      .replace("#include <common>","#include <common>\nuniform float uWin;uniform sampler2D t_glass;uniform sampler2D t_stone;uniform sampler2D t_steel;uniform sampler2D t_roof;uniform sampler2D t_leaf;varying vec3 vBCol;varying vec4 vBTint;varying vec4 vBSt;varying vec4 vBExt;varying vec3 vWPos;varying vec3 vBN;varying vec3 vLoc;varying vec3 vScl;\n"+SH_DECL+NOISE_GLSL+"vec3 srgb(vec3 c){return pow(c,vec3(2.2));}")
      .replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
{
  vec3 N=normalize(vBN);
  float wall=step(abs(N.y),0.5);
  float top=step(0.5,N.y);
  float useZ=step(0.5,abs(N.x));
  float u=mix(vWPos.x,vWPos.z,useZ);
  // metric coordinates inside this tier: across the face, up from the tier base, down from its top
  vec3 L=vLoc*vScl;
  float edgeD=mix(vScl.x,vScl.z,useZ)*0.5-abs(mix(L.x,L.z,useZ));
  float topD=vScl.y-L.y,botD=L.y;
  float tier0=step(vBExt.z,0.5);
  vec2 g=vec2(u,vWPos.y)/vec2(2.5,3.3);
  vec2 id=floor(g);vec2 f=fract(g);
  // distance-based level of detail: windows fade to an average glow far away (fwidth stippled on some GPUs)
  float far=smoothstep(240.0,620.0,length(cameraPosition-vWPos));
  float mull=step(0.04,abs(f.x-0.5));
  float pane=step(0.14,f.x)*step(f.x,0.86)*step(0.24,f.y)*step(f.y,0.78)*mull;
  // solid corner piers, a coping band at the top of each tier, a spandrel above each setback
  float solid=smoothstep(0.55,0.95,edgeD)*step(0.95,topD)*step(0.7,botD+tier0);
  float inW=mix(pane,0.42,far)*solid;
  // quantize the per-building seed: interpolated attributes drift by an ulp and the hash would stipple
  float bs=floor(vBSt.z*997.0+0.5);
  float r=h21(id+bs*0.0917+useZ*17.0);
  // whole floors share a mood: some fully staffed, a few dark, the rest scattered
  float fl=h21(vec2(id.y*7.13+useZ,bs*0.0531));
  float pLit=clamp(vBSt.x*(0.2+1.05*fl)+step(0.9,fl)*0.55-step(fl,0.16)*0.6,0.0,1.0);
  float lit=mix(step(1.0-pLit,r),pLit,far);
  // ground-floor lobby: a full-height glass storefront on the base tier
  float lobbyZ=wall*(1.0-step(3.1,vWPos.y))*tier0*smoothstep(0.3,0.7,edgeD);
  float lw=lobbyZ*step(0.1,fract(u/1.6))*step(0.3,vWPos.y)*step(vWPos.y,2.85);
  vec3 warm=mix(vec3(1.0,0.68,0.32),vec3(0.62,0.78,1.0),step(0.9,h21(id.yx+bs*0.013)));
  warm=mix(warm,vec3(1.0,0.86,0.66),step(0.62,fl)*0.55);
  warm=mix(warm,vBTint.rgb*1.6,0.3*step(0.55,h21(id*1.7+3.0)));
  float flick=0.7+0.3*h21(id+7.0);
  float ceilL=mix(0.6,1.2,smoothstep(0.24,0.78,f.y));
  float wk=smoothstep(0.3,1.2,uWin);
  float w=wall*inW*(1.0-lobbyZ);
  float hi=vBSt.y;
  // facade albedo: one of three tiles per building (hash), sampled triplanar-style on the wall axis
  vec2 fuv=vec2(u,vWPos.y)/vec2(10.0,13.2);
  float variant=floor(vBSt.z*2.999);
  float glassV=1.0-step(0.5,variant);
  vec3 ft=srgb(texture2D(t_glass,fuv).rgb)*3.2;
  ft=mix(ft,srgb(texture2D(t_stone,fuv*1.4).rgb)*1.25,step(0.5,variant));
  ft=mix(ft,srgb(texture2D(t_steel,fuv*1.2).rgb)*1.9,step(1.5,variant));
  // roof: coping ring, ballast that darkens toward the parapet, green terraces on setbacks and some crowns
  float rEdge=min(vScl.x*0.5-abs(L.x),vScl.z*0.5-abs(L.z));
  float parapet=top*(1.0-step(0.42,rEdge));
  float green=top*(1.0-parapet)*max((1.0-vBExt.x)*step(0.45,fract(vBSt.z*7.31)),step(0.74,vBSt.z))*step(0.9,rEdge);
  vec3 rt=srgb(texture2D(t_roof,vWPos.xz/14.0).rgb)*mix(0.62,1.0,smoothstep(0.42,1.5,rEdge));
  vec3 lf=srgb(texture2D(t_leaf,vWPos.xz/5.0).rgb);rt=mix(rt,mix(lf,vec3(dot(lf,vec3(0.33))),0.3)*1.05,green);
  rt=mix(rt,vec3(0.30,0.29,0.28),parapet);
  // mortar and floor seams: darken thin lines at every floor and every bay
  float sy=abs(fract(vWPos.y/3.3)-0.5),sx=abs(fract(u/2.5)-0.5);
  float seam=1.0-0.42*(1.0-far)*(1.0-smoothstep(0.44,0.48,max(sy,sx)))*wall;
  seam=mix(seam,1.0,step(0.5,variant)*0.5);
  vec3 tex=mix(ft,rt*1.1,top);
  float coping=wall*(1.0-step(0.45,topD));
  float bev=wall*(1.0-smoothstep(0.0,0.28,edgeD));
  float ao=mix(1.0,mix(0.4,1.0,smoothstep(0.0,2.6,botD)),wall);
  vec3 base=tex*(0.42+vBCol*3.4)*mix(1.0,0.9,top)*seam;
  base*=mix(1.0,1.6,coping)*(1.0+0.4*bev)*ao*cloudSh(vWPos.xz)*mix(1.0,0.72,uNight);
  // glass: punched windows, the lobby, and on curtain-wall towers most of the face
  float glassM=max(w,lw);
  float reflM=wall*max(glassM,glassV*0.55*solid*(1.0-lobbyZ));
  diffuseColor.rgb=mix(base,vec3(0.010,0.013,0.024),glassM*mix(0.7,1.0,wk));
  roughnessFactor=mix(roughnessFactor,mix(0.42,0.6,step(0.5,variant)),wall);
  metalnessFactor=mix(metalnessFactor,0.35*step(1.5,variant)+0.12*glassV,wall);
  roughnessFactor=mix(roughnessFactor,0.14,reflM);
  metalnessFactor=mix(metalnessFactor,0.05,glassM);
  // sky in the glass: Fresnel-weighted, each pane a touch different so the grid reads
  vec3 V=normalize(cameraPosition-vWPos);
  float fres=pow(1.0-clamp(dot(N,V),0.0,1.0),4.0);
  vec3 em=uSkyRef*(0.16+0.9*fres)*(0.72+0.56*h21(id*3.1+1.0))*reflM;
  em+=warm*flick*ceilL*w*wk*lit*uWin*0.42*(1.0+hi*2.2);
  em+=vec3(1.0,0.62,0.3)*lw*wk*uWin*0.3;
  em+=top*(1.0-green)*(vBTint.rgb*vBTint.a*1.1+vec3(1.0,0.62,0.2)*hi*0.9);
  em+=wall*(1.0-w)*vec3(1.0,0.6,0.2)*hi*0.10;
  // crown: a thin amber line under the coping of tall towers after dusk
  float crown=wall*vBExt.x*step(28.0,vBExt.y)*step(0.5,topD)*(1.0-step(0.78,topD));
  em+=vec3(1.0,0.64,0.24)*crown*wk*2.4;
  totalEmissiveRadiance+=em*vBSt.w;
  diffuseColor.rgb*=vBSt.w;
}`).replace("#include <fog_fragment>",FOG_GLSL("vWPos"));
  };
  return m;
}
function buildInstances(prev){
  if(iMesh){scene.remove(iMesh);iMesh.geometry.dispose()}
  inst=[];B.forEach(b=>{if(b)b.tiers.forEach((t,k)=>inst.push({b,t,k}))});
  const N=inst.length;
  const geo=new THREE.BoxGeometry(1,1,1);geo.translate(0,.5,0);
  const aCol=new Float32Array(N*3),aTint=new Float32Array(N*4),aSt=new Float32Array(N*4),aExt=new Float32Array(N*4);
  const wall=new THREE.Color(),c2=new THREE.Color(),tmp=new THREE.Color();
  inst.forEach((it,i)=>{
    const n=NOTES[it.b.id],rnd=it.b.rnd,deg=n.out.size+n.back.size,ty=n.fm.type,col=colorOf(n);
    wall.set(0x232a3d).lerp(c2.set(col),.11+.06*rnd).multiplyScalar(.82+.36*hash01(n.name+it.k));wall.convertSRGBToLinear();
    aCol.set([wall.r,wall.g,wall.b],i*3);
    tmp.set(col).convertSRGBToLinear();
    const lm=(["division","moc","home"].includes(ty)&&it.k===it.b.tiers.length-1)?1:0;
    aTint.set([tmp.r,tmp.g,tmp.b,lm],i*4);
    let lit=.2+.5*Math.min(1,deg/14);
    if(n.fm.status==="operating")lit+=.2;else if(n.fm.status==="pending")lit-=.1;
    if(n.agentTouched)lit+=.3;
    aSt.set([clamp(lit,.08,.95),0,rnd,1],i*4);
    aExt.set([it.k===it.b.tiers.length-1?1:0,it.b.h,it.k,0],i*4);
  });
  geo.setAttribute("aCol",new THREE.InstancedBufferAttribute(aCol,3));
  geo.setAttribute("aTint",new THREE.InstancedBufferAttribute(aTint,4));
  geo.setAttribute("aState",new THREE.InstancedBufferAttribute(aSt,4));
  geo.setAttribute("aExt",new THREE.InstancedBufferAttribute(aExt,4));
  iMesh=new THREE.InstancedMesh(geo,mat,N);
  iMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);iMesh.castShadow=true;iMesh.receiveShadow=true;iMesh.frustumCulled=false;
  scene.add(iMesh);
  // growth: new agent notes rise; first load raises the whole campus from the Home tower outward
  growth=new Float32Array(NOTES.length).fill(1);delay=new Float32Array(NOTES.length);
  const maxR=Math.hypot(WORLD.W,WORLD.H)/2;
  if(prev){NOTES.forEach(n=>{if(!prev.has(n.name)){growth[n.id]=0;delay[n.id]=0}});introStart=time}
  else if(!reduced){const hm=byName.get("🏠 Home");const o=hm&&B[hm.id]?B[hm.id]:{cx:0,cz:0};NOTES.forEach(n=>{const b=B[n.id];growth[n.id]=0;delay[n.id]=Math.hypot(b.cx-o.cx,b.cz-o.cz)/maxR*1.7+hash01(n.name)*.35});introStart=time}
  writeMatrices();
  // pick boxes
  boxes=new Float32Array(N*6);boxB=new Int32Array(N);
  inst.forEach((it,i)=>{const t=it.t;boxes.set([t.x-t.w/2,t.y0,t.z-t.d/2,t.x+t.w/2,t.y1,t.z+t.d/2],i*6);boxB[i]=it.b.id});
}
function ease(x){x=clamp(x,0,1);return 1-Math.pow(1-x,3)}
function writeMatrices(){
  const a=iMesh.instanceMatrix.array;
  for(let i=0;i<inst.length;i++){
    const it=inst[i],t=it.t,g=ease((time-introStart-delay[it.b.id])/1.15)*(introStart<0?1:1);
    const gg=introStart<0?1:(growth[it.b.id]>=1?1:g);
    const o=i*16;
    a[o]=t.w;a[o+1]=0;a[o+2]=0;a[o+3]=0;a[o+4]=0;a[o+5]=Math.max(.001,(t.y1-t.y0)*gg);a[o+6]=0;a[o+7]=0;a[o+8]=0;a[o+9]=0;a[o+10]=t.d;a[o+11]=0;a[o+12]=t.x;a[o+13]=t.y0*gg;a[o+14]=t.z;a[o+15]=1;
  }
  iMesh.instanceMatrix.needsUpdate=true;
}
function applyState(){
  const st=iMesh.geometry.attributes.aState,arr=st.array;
  const busy=new Set();AG.forEach(m=>{if(m.grp.visible&&m.noteId>=0&&LIVE_ST.includes(m.info.status))busy.add(m.noteId)});
  for(let k=0;k<inst.length;k++){
    const b=inst[k].b.id;let hi=0,dim=1;
    if(sel>=0){if(b===sel)hi=1;else if(nbr.has(b))hi=.55;else dim=.5}
    if(b===hov&&b!==sel)hi=Math.max(hi,.4);
    if(busy.has(b)){hi=Math.max(hi,.7);dim=1}
    if(pulses.has(b)){hi=Math.max(hi,.95);dim=1}
    arr[k*4+1]=hi;arr[k*4+3]=dim;
  }
  st.needsUpdate=true;dirty=true;
}

// ---------- sky, light, mode
function skyMaterial(){
  return new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,fog:false,defines:{OCT:HI?5:3},
    uniforms:{top:{value:new THREE.Color()},mid:{value:new THREE.Color()},bot:{value:new THREE.Color()},haze:{value:new THREE.Color()},sunCol:{value:new THREE.Color()},sunDir:{value:new THREE.Vector3(0,1,0)},moonDir:{value:new THREE.Vector3(0,1,0)},moonI:{value:0},sunDisc:{value:1},uCloud:{value:.5},uTime:SH.uTime,uNight:SH.uNight},
    vertexShader:"varying vec3 vD;void main(){vD=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
    fragmentShader:`uniform vec3 top;uniform vec3 mid;uniform vec3 bot;uniform vec3 haze;uniform vec3 sunCol;uniform vec3 sunDir;uniform vec3 moonDir;uniform float moonI;uniform float sunDisc;uniform float uCloud;uniform float uTime;uniform float uNight;varying vec3 vD;
float hs(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hs(i),hs(i+vec2(1.0,0.0)),f.x),mix(hs(i+vec2(0.0,1.0)),hs(i+vec2(1.0,1.0)),f.x),f.y);}
float fbm(vec2 p){float a=0.5,s=0.0;for(int i=0;i<OCT;i++){s+=a*vn(p);p=p*2.03+vec2(17.1,9.2);a*=0.5;}return s;}
void main(){
  vec3 d=normalize(vD);float h=d.y;
  vec3 c=mix(bot,mid,smoothstep(-0.04,0.22,h));c=mix(c,top,smoothstep(0.16,0.8,h));
  // horizon haze: a soft band that thickens toward the sun side
  vec3 sd=normalize(sunDir);float s=max(dot(d,sd),0.0);
  float hz=exp(-abs(h)*9.0)*(0.55+0.45*pow(s,3.0));
  c=mix(c,haze,hz*0.6*(1.0-step(0.0,-h-0.08)));
  // forward scatter: a broad warm glow around a low sun, the sky's half of the light shafts
  c+=sunCol*pow(s,5.0)*0.22*(1.0-smoothstep(0.05,0.6,sd.y))*sunDisc;
  // cloud deck: fbm on a plane above the city, lit from the sun side, thinning at the horizon
  float cov=0.0;
  if(h>0.0){
    vec2 cp=d.xz/(h+0.11)*0.85+uTime*vec2(0.0045,0.0022);
    float n=fbm(cp);float n2=fbm(cp*1.9+3.7);
    float v=(n*0.75+n2*0.25-0.47)*2.4+0.5;
    cov=smoothstep(1.0-uCloud,1.0-uCloud+0.22,v)*smoothstep(0.02,0.2,h);
    float thick=smoothstep(0.5,0.95,v);
    vec3 shade=(mid*0.7+haze*0.3)*mix(1.0,0.6,thick);
    vec3 litc=(haze*0.6+sunCol*0.75)*(0.9+0.9*pow(s,6.0));
    vec3 cc=mix(shade,litc,clamp(0.55+0.45*pow(s,2.0)-thick*0.35,0.0,1.0));
    cc=mix(cc,(mid*1.4+top*0.6)*mix(1.25,0.8,thick)+vec3(0.010,0.012,0.022),uNight*0.9);
    // silver lining where thin cloud crosses the sun
    cc+=sunCol*pow(s,24.0)*(1.0-thick)*1.6*sunDisc;
    c=mix(c,cc,cov*0.92);
  }
  // sun: sharp disc with a soft glow, plus a wide warm wash low on the sky; clouds dim the disc
  float disc=smoothstep(0.99935,0.99965,s);
  c+=sunCol*(disc*6.0*(1.0-cov*0.85)+pow(s,220.0)*1.2+pow(s,10.0)*0.28+pow(s,2.0)*0.12*(1.0-smoothstep(0.0,0.5,h)))*sunDisc;
  // moon: a smaller disc opposite the sun, only when the sun is down
  vec3 md=normalize(moonDir);float m=max(dot(d,md),0.0);
  float mdisc=smoothstep(0.99975,0.99988,m);
  float face=1.0-0.35*smoothstep(0.2,0.6,hs(floor(d.xy*170.0)));
  c+=vec3(0.86,0.9,1.0)*(mdisc*2.4*face*(1.0-cov*0.7)+pow(m,900.0)*0.6+pow(m,40.0)*0.08)*moonI;
  gl_FragColor=vec4(c,1.0);
#include <tonemapping_fragment>
#include <encodings_fragment>
}`});
}
function makeStars(){
  const N=1600,pos=new Float32Array(N*3),col=new Float32Array(N*3),R=2300;
  for(let i=0;i<N;i++){const a=Math.random()*Math.PI*2,y=0.04+Math.random()*0.96,r=Math.sqrt(1-y*y);pos.set([Math.cos(a)*r*R,y*R,Math.sin(a)*r*R],i*3);
    const t=Math.random(),b=.45+.55*Math.random()*Math.random();col.set([b*(0.85+0.15*t),b*(0.88+0.1*t),b*(1.0-0.12*t)],i*3)}
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(pos,3));g.setAttribute("color",new THREE.BufferAttribute(col,3));
  const sc=document.createElement("canvas");sc.width=sc.height=32;const sg=sc.getContext("2d"),gr=sg.createRadialGradient(16,16,0,16,16,16);gr.addColorStop(0,"rgba(255,255,255,1)");gr.addColorStop(.35,"rgba(255,255,255,.55)");gr.addColorStop(1,"rgba(255,255,255,0)");sg.fillStyle=gr;sg.fillRect(0,0,32,32);
  const sprite=new THREE.CanvasTexture(sc);
  const p=new THREE.Points(g,new THREE.PointsMaterial({size:5,map:sprite,vertexColors:true,transparent:true,opacity:0,depthWrite:false,sizeAttenuation:false,fog:false,blending:THREE.AdditiveBlending}));
  p.renderOrder=-9;p.frustumCulled=false;p.visible=false;return p;
}
// Blend the key states by sun elevation (degrees) into CUR. night at -12 and below, twilight (dawn or dusk) at 0, day from +18.
function blendSky(e,morning){
  const tw=morning?MODES.dawn:MODES.dusk;
  let a,b,t;
  if(e<0){a=MODES.night;b=tw;t=clamp((e+12)/12,0,1);t=t*t*(3-2*t)}else{a=tw;b=MODES.day;t=clamp(e/18,0,1);t=t*t*(3-2*t)}
  NUM_KEYS.forEach(k=>CUR[k]=a[k]+(b[k]-a[k])*t);
  COL_KEYS.forEach(k=>{CUR[k].copy(lin(a[k])).lerp(_c2.copy(lin(b[k])),t)});
  CUR.ui=e>4?"light":"dark";
}
function copySky(m){NUM_KEYS.forEach(k=>CUR[k]=m[k]);COL_KEYS.forEach(k=>CUR[k].copy(lin(m[k])));CUR.ui=m.ui}
// Push CUR plus a light direction into the scene. dir is the sun when it is up, the moon when it is not.
function pushSky(dir,sunUp,moonI){
  const u=skyMat.uniforms;u.top.value.copy(CUR.top);u.mid.value.copy(CUR.mid);u.bot.value.copy(CUR.bot);u.haze.value.copy(CUR.haze);u.sunCol.value.copy(CUR.sun).multiplyScalar(.9);
  u.sunDir.value.copy(SOL.dir.y>-.3&&mode==="auto"?SOL.dir:dir);u.moonDir.value.copy(mode==="auto"?SOL.moon:dir);u.moonI.value=moonI;u.sunDisc.value=mode==="auto"?clamp((SOL.elev+3)/3,0,1):(mode==="night"?0:1);
  sun.color.copy(CUR.sun);sun.intensity=CUR.sunI;
  hemi.color.copy(CUR.hSky);hemi.groundColor.copy(CUR.hGnd);hemi.intensity=CUR.hI;
  scene.fog.color.copy(CUR.fog);scene.fog.density=CUR.fogD;
  renderer.toneMappingExposure=CUR.exp;if(uni.uWin)uni.uWin.value=CUR.win;
  u.uCloud.value=CUR.cloud;
  // shared world uniforms: in-scatter colour toward the light, sky colour for glass, cloud shadow, lamps, night
  const night=clamp((CUR.win-.35)/1.75,0,1);
  SH.uSunDir.value.copy(u.sunDir.value);SH.uSunFog.value.copy(CUR.fog).lerp(CUR.sun,sunUp?.55:.2);
  SH.uSkyRef.value.copy(CUR.mid).lerp(CUR.haze,.35).multiplyScalar(.55);
  SH.uCloudSh.value=sunUp?CUR.csh:0;SH.uLamp.value=clamp((CUR.win-.45)/1.1,0,1);SH.uNight.value=night;
  LIGHT.up=sunUp;LIGHT.elev=Math.asin(clamp(u.sunDir.value.y,-1,1))*180/Math.PI;LIGHT.col.copy(CUR.sun);
  if(water)water.material.uniforms.uSky.value.copy(CUR.haze).lerp(CUR.mid,.5);
  if(stars){stars.material.opacity=CUR.stars;stars.visible=CUR.stars>.01}
  bloomNow=CUR.bloom;
  // shadows re-render only when the light moves more than about half a degree
  if(shadowDir.dot(dir)<0.99996){shadowDir.copy(dir);sun.position.copy(dir).multiplyScalar(1100);renderer.shadowMap.needsUpdate=true}
  if(document.documentElement.dataset.theme!==CUR.ui){document.documentElement.dataset.theme=CUR.ui;store.set("vault.theme",CUR.ui)}
  dirty=true;
}
const _dir=new THREE.Vector3(),LIGHT={up:false,elev:0,col:new THREE.Color()};
function applyMode(name){
  mode=name==="auto"||name in MODES?name:"auto";if(mode==="dawn")mode="auto";
  if(mode==="auto"){
    solUpdate();const e=SOL.elev,morning=SOL.hours<12;blendSky(e,morning);
    const up=e>-0.5;_dir.copy(up?SOL.dir:SOL.moon);if(up&&_dir.y<.06)_dir.y=.06;_dir.normalize();
    pushSky(_dir,up,1-clamp((e+2)/4,0,1));
  }else{
    const m=MODES[mode];copySky(m);_dir.set(...m.dir).normalize();pushSky(_dir,mode!=="night",mode==="night"?1:0);
  }
  store.set("vault.time",mode);tipTime();
}
function tipTime(){
  const b=$("#rbTime");if(!b)return;
  const hh=Math.floor(SOL.hours),mm=Math.floor((SOL.hours-hh)*60);
  const clock=`${String(hh).padStart(2,"0")}:${String(mm).padStart(2,"0")} ${SOL.zone} · sun ${Math.round(SOL.elev)}°`;
  b.setAttribute("data-tip",`Time of day: ${mode}${mode==="auto"?" · "+clock:""}`);
}
function skyTick(){if(C.ok&&mode==="auto"&&!document.hidden)applyMode("auto")}
function fitShadow(){
  const S=GSIDE*.62;const c=sun.shadow.camera;c.left=-S;c.right=S;c.top=S;c.bottom=-S;c.near=20;c.far=2600;c.updateProjectionMatrix();renderer.shadowMap.needsUpdate=true;
}

// ---------- post: multisampled scene, bloom for windows and lamps, then one grade pass (light shafts, split tone, grain, sRGB)
// The r128 examples are not on cdnjs (404), so they come from the npm mirror on jsDelivr, pinned to the same three.js version.
const POST_SRC="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/";
const POST_FILES=["shaders/CopyShader.js","shaders/LuminosityHighPassShader.js","postprocessing/EffectComposer.js","postprocessing/RenderPass.js","postprocessing/ShaderPass.js","postprocessing/UnrealBloomPass.js"];
function wantPost(){return HI&&!reduced}
function loadPost(){
  if(postState!=="off"||!wantPost())return;postState="loading";
  const next=i=>{if(i>=POST_FILES.length){try{setupPost()}catch(e){console.warn("post unavailable:",e);postState="failed"}return}
    const s=document.createElement("script");s.src=POST_SRC+POST_FILES[i];s.crossOrigin="anonymous";s.onload=()=>next(i+1);s.onerror=()=>{postState="failed";console.warn("post unavailable:",POST_FILES[i])};document.head.appendChild(s)};
  next(0);
}
const GradeShader={
  uniforms:{tDiffuse:{value:null},uSun:{value:new THREE.Vector2(.5,.5)},uShaft:{value:0},uSunCol:{value:new THREE.Color(1,.8,.6)},uTime:{value:0},uRes:{value:new THREE.Vector2(1,1)},uGrain:{value:.018}},
  vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
  fragmentShader:`uniform sampler2D tDiffuse;uniform vec2 uSun;uniform float uShaft;uniform vec3 uSunCol;uniform float uTime;uniform vec2 uRes;uniform float uGrain;varying vec2 vUv;
float hh(vec2 p){p=fract(p*vec2(443.897,441.423));p+=dot(p,p.yx+19.19);return fract((p.x+p.y)*p.x);}
vec3 toSRGB(vec3 c){return mix(c*12.92,1.055*pow(c,vec3(0.41666))-0.055,step(0.0031308,c));}
void main(){
  vec3 c=texture2D(tDiffuse,vUv).rgb;
  // screen-space light shafts: march toward the sun and gather bright sky seen between the towers
  if(uShaft>0.002){
    vec2 dl=(vUv-uSun)*(0.9/28.0);vec2 tc=vUv;float il=1.0,acc=0.0;
    for(int i=0;i<28;i++){tc-=dl;vec3 s=texture2D(tDiffuse,clamp(tc,0.001,0.999)).rgb;acc+=max(dot(s,vec3(0.299,0.587,0.114))-0.68,0.0)*il*exp(-length((tc-uSun)*vec2(uRes.x/uRes.y,1.0))*3.0);il*=0.95;}
    c+=uSunCol*acc*(uShaft/28.0)*3.2;
  }
  // grade in linear light: a touch more colour, cool shadows, warm highlights
  float lum=dot(c,vec3(0.2126,0.7152,0.0722));
  c=max(mix(vec3(lum),c,1.07),0.0);
  c*=mix(vec3(0.93,0.98,1.07),vec3(1.05,1.0,0.92),smoothstep(0.04,0.55,lum));
  c=clamp(toSRGB(c),0.0,1.0);
  c=mix(c,c*c*(3.0-2.0*c),0.14);
  c+=(hh(vUv*uRes+fract(uTime*7.31)*91.0)-0.5)*uGrain;
  gl_FragColor=vec4(c,1.0);
}`};
function setupPost(){
  if(!THREE.EffectComposer||!THREE.UnrealBloomPass||!THREE.ShaderPass)throw new Error("examples missing");
  // MSAA survives the composer on WebGL2; on WebGL1 the scene goes through without it
  let rt;const pr=renderer.getPixelRatio();
  if(renderer.capabilities.isWebGL2&&THREE.WebGLMultisampleRenderTarget){rt=new THREE.WebGLMultisampleRenderTarget(W*pr,H*pr,{format:THREE.RGBAFormat});rt.samples=4}
  composer=new THREE.EffectComposer(renderer,rt);composer.setPixelRatio(pr);composer.setSize(W,H);
  composer.addPass(new THREE.RenderPass(scene,camera));
  bloomPass=new THREE.UnrealBloomPass(new THREE.Vector2(W,H),.6,.5,.84);composer.addPass(bloomPass);
  gradePass=new THREE.ShaderPass(GradeShader);composer.addPass(gradePass);
  postState="ready";dirty=true;
}
const _sp=new THREE.Vector3();
function updateGrade(){
  const g=gradePass.uniforms;g.uTime.value=time;g.uRes.value.set(W,H);
  // shafts only when the sun is up, low, and on or near the screen
  let k=0;
  if(LIGHT.up){_sp.copy(skyMat.uniforms.sunDir.value).multiplyScalar(1500).add(camera.position).project(camera);
    if(_sp.z<1){const off=Math.max(Math.abs(_sp.x),Math.abs(_sp.y));k=clamp(1.35-off,0,1)*(1-clamp((LIGHT.elev-8)/40,0,1)*.65);g.uSun.value.set(_sp.x*.5+.5,_sp.y*.5+.5)}}
  g.uShaft.value=k*.85;g.uSunCol.value.copy(LIGHT.col);
}

// ---------- world dressing: procedural textures, water, street lamps, trees, roof plant, drones and motes.
// Everything here is instanced or a single Points/mesh, so the whole layer adds about a dozen draw calls.
function canvasTex(S,draw,srgbEnc){const c=document.createElement("canvas");c.width=c.height=S;draw(c.getContext("2d"),S);const t=new THREE.CanvasTexture(c);if(srgbEnc)t.encoding=THREE.sRGBEncoding;t.wrapS=t.wrapT=THREE.RepeatWrapping;return t}
function proceduralTiles(){
  // foliage: overlapping leaf clusters drawn with wrap-around so the tile repeats without a seam
  const leaf=(g,S)=>{g.fillStyle="#34502a";g.fillRect(0,0,S,S);const greens=["#4a6e30","#5b8236","#6e9640","#3f6029","#7fa548","#55773a","#8db255"];
    for(let i=0;i<1700;i++){const x=Math.random()*S,y=Math.random()*S,r=2+Math.random()*6,a=Math.random()*Math.PI;g.fillStyle=greens[i%greens.length];g.globalAlpha=.55+Math.random()*.45;
      for(const ox of [-S,0,S])for(const oy of [-S,0,S]){g.beginPath();g.ellipse(x+ox,y+oy,r,r*.55,a,0,7);g.fill()}}
    g.globalAlpha=1};
  TEX.leaf=canvasTex(256,leaf,false);TEX.leafMap=canvasTex(256,leaf,true);
  // drop-in slot: assets/world/foliage.jpg replaces the canvas tile when it loads (a generated tile can overwrite the stand-in)
  const img=new Image();img.onload=()=>{const a=new THREE.Texture(img),b=new THREE.Texture(img);[a,b].forEach(t=>{t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=renderer.capabilities.getMaxAnisotropy();t.needsUpdate=true});b.encoding=THREE.sRGBEncoding;
    TEX.leaf=a;TEX.leafMap=b;if(uni.t_leaf)uni.t_leaf.value=a;if(DMAT.canopy){DMAT.canopy.map=b;DMAT.canopy.needsUpdate=true}dirty=true};
  img.onerror=()=>console.warn("texture missing: assets/world/foliage.jpg (canvas tile kept)");img.src="assets/world/foliage.jpg";
  TEX.glow=canvasTex(64,(g,S)=>{const gr=g.createRadialGradient(S/2,S/2,0,S/2,S/2,S/2);gr.addColorStop(0,"rgba(255,255,255,1)");gr.addColorStop(.18,"rgba(255,255,255,.55)");gr.addColorStop(.5,"rgba(255,255,255,.12)");gr.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=gr;g.fillRect(0,0,S,S)});
  TEX.glow.wrapS=TEX.glow.wrapT=THREE.ClampToEdgeWrapping;
}
// lamp and lobby spill painted once into a light map that the ground shader adds after dusk
function paintLightMap(lamps){
  const S=HI?2048:1024,c=document.createElement("canvas");c.width=c.height=S;const g=c.getContext("2d"),sc=S/GSIDE,X=x=>(x+GSIDE/2)*sc;
  g.fillStyle="#000";g.fillRect(0,0,S,S);g.globalCompositeOperation="lighter";
  const spot=(x,z,r,a)=>{const gr=g.createRadialGradient(X(x),X(z),0,X(x),X(z),r*sc);gr.addColorStop(0,`rgba(255,190,110,${a})`);gr.addColorStop(.45,`rgba(255,160,80,${a*.35})`);gr.addColorStop(1,"rgba(255,140,60,0)");g.fillStyle=gr;g.fillRect(X(x)-r*sc,X(z)-r*sc,2*r*sc,2*r*sc)};
  lamps.forEach(l=>spot(l.x,l.z,7.5,.75));
  B.forEach(b=>{if(!b)return;const t=b.tiers[0];g.fillStyle="rgba(255,170,90,.10)";for(let i=0;i<3;i++){const e=.4+i*.7;g.fillRect(X(t.x-t.w/2-e),X(t.z-t.d/2-e),(t.w+2*e)*sc,(t.d+2*e)*sc)}});
  const tex=new THREE.CanvasTexture(c);tex.generateMipmaps=false;tex.minFilter=tex.magFilter=THREE.LinearFilter;return tex;
}
const DMAT={};
function decorMaterials(){
  if(DMAT.ok)return DMAT;DMAT.ok=true;
  DMAT.pole=new THREE.MeshStandardMaterial({color:lin("#2a2f38"),roughness:.5,metalness:.6});
  DMAT.head=new THREE.MeshStandardMaterial({color:lin("#1b1e24"),roughness:.4,metalness:.5});
  DMAT.head.onBeforeCompile=sh=>{Object.assign(sh.uniforms,SH);
    sh.vertexShader=sh.vertexShader.replace("#include <common>","#include <common>\nattribute float aTh;uniform float uLamp;varying float vOn;").replace("#include <begin_vertex>","#include <begin_vertex>\nvOn=smoothstep(aTh,aTh+0.08,uLamp);");
    sh.fragmentShader=sh.fragmentShader.replace("#include <common>","#include <common>\nvarying float vOn;").replace("#include <emissivemap_fragment>","#include <emissivemap_fragment>\ntotalEmissiveRadiance+=vec3(1.0,0.72,0.4)*vOn*4.0;")};
  DMAT.trunk=new THREE.MeshStandardMaterial({color:lin("#3a2e24"),roughness:.9});
  DMAT.canopy=new THREE.MeshStandardMaterial({map:TEX.leafMap,color:0xffffff,roughness:.85,metalness:0});
  DMAT.hvac=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.55,metalness:.45});
  DMAT.mast=new THREE.MeshStandardMaterial({color:lin("#9aa2ae"),roughness:.4,metalness:.7});
  DMAT.solar=new THREE.MeshStandardMaterial({color:lin("#141c33"),roughness:.18,metalness:.55,emissive:lin("#0a1020"),emissiveIntensity:.4});
  DMAT.planter=new THREE.MeshStandardMaterial({color:lin("#8d867a"),roughness:.85});
  DMAT.halo=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false,
    uniforms:{map:{value:TEX.glow},uScale:{value:600},uLamp:SH.uLamp,uTime:SH.uTime,uNight:SH.uNight},
    vertexShader:"attribute float aTh;attribute float aKind;uniform float uScale;uniform float uLamp;uniform float uTime;uniform float uNight;varying float vI;varying vec3 vC;void main(){vec4 mv=modelViewMatrix*vec4(position,1.0);float lamp=smoothstep(aTh,aTh+0.08,uLamp);float avi=uNight*(0.25+0.75*step(0.55,fract(uTime*0.55+aTh*7.0)));vI=mix(lamp,avi,aKind);vC=mix(vec3(1.0,0.72,0.4),vec3(1.0,0.16,0.1),aKind);gl_PointSize=clamp(mix(2.6,1.6,aKind)*uScale/-mv.z,0.0,72.0);gl_Position=projectionMatrix*mv;}",
    fragmentShader:"uniform sampler2D map;varying float vI;varying vec3 vC;void main(){float a=texture2D(map,gl_PointCoord).a;gl_FragColor=vec4(vC*a*vI*0.95,1.0);}"});
  return DMAT;
}
function instMesh(geo,mat,list,shadow){const m=new THREE.InstancedMesh(geo,mat,Math.max(1,list.length));m.count=list.length;const o=new THREE.Object3D();
  list.forEach((p,i)=>{o.position.set(p.x,p.y||0,p.z);o.rotation.set(p.rx||0,p.ry||0,0);o.scale.set(p.sx||1,p.sy||1,p.sz||1);o.updateMatrix();m.setMatrixAt(i,o.matrix);if(p.c)m.setColorAt(i,p.c)});
  m.instanceMatrix.needsUpdate=true;if(m.instanceColor)m.instanceColor.needsUpdate=true;m.castShadow=!!shadow;m.receiveShadow=true;m.frustumCulled=false;return m}
function disposeGroup(gp){if(!gp)return;gp.traverse(o=>{if(o.geometry)o.geometry.dispose()});scene.remove(gp)}
function buildDecor(){
  disposeGroup(decor);disposeGroup(roofProps);decor=new THREE.Group();roofProps=new THREE.Group();scene.add(decor,roofProps);
  const M=decorMaterials(),R=(s)=>hash01(s);
  // street lamps: on the kerb just outside each district plot, every 20 units, switching on one by one at dusk
  const lamps=[];
  DIST.forEach(d=>{const off=1.5,edges=[[d.x,d.z-off,d.x+d.w,d.z-off,0],[d.x+d.w+off,d.z,d.x+d.w+off,d.z+d.d,-Math.PI/2],[d.x+d.w,d.z+d.d+off,d.x,d.z+d.d+off,Math.PI],[d.x-off,d.z+d.d,d.x-off,d.z,Math.PI/2]];
    edges.forEach(([x0,z0,x1,z1,ry],e)=>{const L=Math.hypot(x1-x0,z1-z0),n=Math.max(1,Math.floor(L/20));for(let i=0;i<=n;i++){const t=i/n;lamps.push({x:x0+(x1-x0)*t,z:z0+(z1-z0)*t,ry,th:.04+.55*R(d.top+e+":"+i)})}})});
  // waterfront promenade: lamps along the quay, arms over the water
  const qe=GSIDE/2-3;[[-qe,-qe,qe,-qe,0],[qe,-qe,qe,qe,-Math.PI/2],[qe,qe,-qe,qe,Math.PI],[-qe,qe,-qe,-qe,Math.PI/2]].forEach(([x0,z0,x1,z1,ry],e)=>{const n=Math.floor(GSIDE/18);for(let i=0;i<=n;i++){const t=i/n;lamps.push({x:x0+(x1-x0)*t,z:z0+(z1-z0)*t,ry,th:.04+.55*R("q"+e+":"+i)})}});
  const seen=new Set(),L2=lamps.filter(l=>{const k=Math.round(l.x/4)+","+Math.round(l.z/4);if(seen.has(k))return false;seen.add(k);return true});
  const poleG=new THREE.CylinderGeometry(.07,.11,5.4,6);poleG.translate(0,2.7,0);
  decor.add(instMesh(poleG,M.pole,L2,HI));
  const headG=new THREE.BoxGeometry(1.1,.16,.36);headG.translate(.45,5.4,0);
  const ths=new Float32Array(L2.length);L2.forEach((l,i)=>ths[i]=l.th);headG.setAttribute("aTh",new THREE.InstancedBufferAttribute(ths,1));
  decor.add(instMesh(headG,M.head,L2.map(l=>({x:l.x,z:l.z,ry:l.ry+Math.PI/2})),false));
  // halos: lamp heads plus red aviation lights on masts (aKind 1), one Points object
  const halo=[],hTh=[],hK=[];
  L2.forEach(l=>{const a=l.ry+Math.PI/2;halo.push(l.x+Math.cos(a)*.62,5.22,l.z-Math.sin(a)*.62);hTh.push(l.th);hK.push(0)});
  // trees: along the inside edge of every plot and scattered through open plaza cells, never on a building pad
  const trees=[],okCell=(x,z,r)=>{const [cx,cz]=cellOf(x,z);for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++)if(!free(cx+dx,cz+dz))return false;return true};
  const cap=HI?2200:700;
  DIST.forEach(d=>{const ins=2.4;const per=[[d.x+ins,d.z+ins,d.x+d.w-ins,d.z+ins],[d.x+d.w-ins,d.z+ins,d.x+d.w-ins,d.z+d.d-ins],[d.x+d.w-ins,d.z+d.d-ins,d.x+ins,d.z+d.d-ins],[d.x+ins,d.z+d.d-ins,d.x+ins,d.z+ins]];
    per.forEach(([x0,z0,x1,z1],e)=>{const L=Math.hypot(x1-x0,z1-z0),n=Math.floor(L/9);for(let i=1;i<n;i++){const t=(i+(R(d.top+"t"+e+i)-.5)*.4)/n,x=x0+(x1-x0)*t,z=z0+(z1-z0)*t;if(okCell(x,z,1))trees.push({x,z,k:R(d.top+"s"+e+i)})}})});
  const qt=GSIDE/2-8.5;[[-qt,-qt,qt,-qt],[qt,-qt,qt,qt],[qt,qt,-qt,qt],[-qt,qt,-qt,-qt]].forEach(([x0,z0,x1,z1],e)=>{const n=Math.floor(GSIDE/11);for(let i=1;i<n;i++){const t=i/n,x=x0+(x1-x0)*t,z=z0+(z1-z0)*t;if(okCell(x,z,1))trees.push({x,z,k:R("qt"+e+i)})}});
  for(let i=0;i<9000&&trees.length<cap;i++){const d=DIST[i%DIST.length],x=d.x+4+R("x"+i)*(d.w-8),z=d.z+4+R("z"+i)*(d.d-8);if(okCell(x,z,2))trees.push({x,z,k:R("k"+i)})}
  const trunkG=new THREE.CylinderGeometry(.16,.24,1,5);trunkG.translate(0,.5,0);
  const canG=new THREE.IcosahedronGeometry(1,1);canG.translate(0,1,0);
  const tc=new THREE.Color();
  decor.add(instMesh(trunkG,M.trunk,trees.map(t=>({x:t.x,z:t.z,sy:1.6+t.k*1.4})),false));
  decor.add(instMesh(canG,M.canopy,trees.map(t=>{const s=1.3+t.k*1.3;return{x:t.x,y:1.2+t.k*1.1,z:t.z,ry:t.k*6,sx:s,sy:s*(1.05+t.k*.35),sz:s*(.9+t.k*.2),c:tc.setHSL(.24+t.k*.08,.35+t.k*.2,.42+t.k*.18).clone()}}),HI));
  // planters: low stone boxes with a shrub, at plot corners
  const pl=[];DIST.forEach(d=>[[d.x+1.2,d.z+1.2],[d.x+d.w-1.2,d.z+1.2],[d.x+1.2,d.z+d.d-1.2],[d.x+d.w-1.2,d.z+d.d-1.2]].forEach(([x,z])=>{if(okCell(x,z,0))pl.push({x,z})}));
  const plG=new THREE.BoxGeometry(2.2,.7,2.2);plG.translate(0,.35,0);decor.add(instMesh(plG,M.planter,pl,false));
  decor.add(instMesh(canG,M.canopy,pl.map((p,i)=>({x:p.x,y:.3,z:p.z,sx:1,sy:.55,sz:1,c:tc.setHSL(.27,.4,.38).clone()})),false));
  // roof plant: HVAC boxes in the corners, solar rows on some roofs, masts with aviation lights on tall towers
  const hv=[],ms=[],so=[],hc=new THREE.Color();
  B.forEach(b=>{if(!b)return;const t=b.tiers[b.tiers.length-1],nm=NOTES[b.id].name,k=R(nm+"roof");if(Math.min(t.w,t.d)<4.6)return;
    const green=k>=.74;const n=1+Math.floor(R(nm+"n")*3);
    if(!green)for(let i=0;i<n;i++){const sx=i%2?1:-1,sz=(i>>1)%2||R(nm+"z"+i)<.5?1:-1,w=1+R(nm+"w"+i)*1.1,d=.9+R(nm+"d"+i)*.9,h=.7+R(nm+"h"+i)*.8;
      hv.push({x:t.x+sx*(t.w/2-.8-w/2),y:t.y1,z:t.z+sz*(t.d/2-.8-d/2),sx:w,sy:h,sz:d,c:hc.setHSL(.6,.05,.32+R(nm+"c"+i)*.25).clone()})}
    if(!green&&k>.46&&Math.min(t.w,t.d)>7.5){const rows=2+Math.floor(R(nm+"r")*2);for(let j=0;j<rows;j++)so.push({x:t.x-t.w*.08,y:t.y1+.45,z:t.z-t.d/2+1.4+j*1.5,sx:t.w*.45,sy:1,sz:1,rx:-.38})}
    if(b.h>24&&R(nm+"m")>.35){const mh=4+R(nm+"mh")*6,mx=t.x-(t.w/2-.7)*(R(nm+"mx")<.5?1:-1),mz=t.z+(t.d/2-.7)*(R(nm+"mz")<.5?1:-1);ms.push({x:mx,y:t.y1,z:mz,sy:mh});halo.push(mx,t.y1+mh+.2,mz);hTh.push(R(nm+"ph"));hK.push(1)}});
  const box=new THREE.BoxGeometry(1,1,1);box.translate(0,.5,0);
  roofProps.add(instMesh(box,M.hvac,hv,HI));
  const solG=new THREE.BoxGeometry(1,.08,1.1);roofProps.add(instMesh(solG,M.solar,so,false));
  const mastG=new THREE.CylinderGeometry(.06,.12,1,5);mastG.translate(0,.5,0);roofProps.add(instMesh(mastG,M.mast,ms,false));
  const hg=new THREE.BufferGeometry();hg.setAttribute("position",new THREE.Float32BufferAttribute(halo,3));hg.setAttribute("aTh",new THREE.Float32BufferAttribute(hTh,1));hg.setAttribute("aKind",new THREE.Float32BufferAttribute(hK,1));
  lampHalo=new THREE.Points(hg,M.halo);lampHalo.frustumCulled=false;decor.add(lampHalo);
  // quay: a stone kerb where the plan meets the water
  const q=GSIDE/2,qm=DMAT.quay||(DMAT.quay=new THREE.MeshStandardMaterial({color:lin("#3b3d42"),roughness:.8}));
  [[0,-q,GSIDE+2.4,2.4],[0,q,GSIDE+2.4,2.4],[-q,0,2.4,GSIDE],[q,0,2.4,GSIDE]].forEach(([x,z,w,d])=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,2.2,d),qm);m.position.set(x,-1,z);m.receiveShadow=true;decor.add(m)});
  roofProps.visible=introStart<0;
  return lamps;
}
function makeWater(){
  const u=THREE.UniformsUtils.merge([THREE.UniformsLib.fog,{uSky:{value:new THREE.Color()},uSunCol:{value:LIGHT.col},uSide:{value:GSIDE}}]);
  u.uSunCol.value=LIGHT.col;Object.assign(u,SH);
  const m=new THREE.ShaderMaterial({uniforms:u,fog:true,
    vertexShader:"varying vec3 vW;\n#include <fog_pars_vertex>\nvoid main(){vec4 w=modelMatrix*vec4(position,1.0);vW=w.xyz;vec4 mvPosition=viewMatrix*w;gl_Position=projectionMatrix*mvPosition;\n#include <fog_vertex>\n}",
    fragmentShader:"uniform vec3 uSky;uniform vec3 uSunCol;uniform float uSide;varying vec3 vW;\n#include <common>\n#include <fog_pars_fragment>\n"+SH_DECL+NOISE_GLSL+`
float wh(vec2 p){return vn(p*0.09+uTime*vec2(0.035,0.02))*0.6+vn(p*0.23-uTime*vec2(0.02,0.045))*0.4;}
void main(){
  vec2 p=vW.xz;float e=0.8;
  vec3 N=normalize(vec3(wh(p-vec2(e,0.0))-wh(p+vec2(e,0.0)),0.55,wh(p-vec2(0.0,e))-wh(p+vec2(0.0,e))));
  vec3 V=normalize(cameraPosition-vW);
  float fres=0.03+0.97*pow(1.0-max(dot(N,V),0.0),5.0);
  vec3 R=reflect(-V,N);
  vec3 deep=mix(vec3(0.012,0.04,0.055),vec3(0.002,0.005,0.012),uNight);
  vec3 c=mix(deep,uSky*1.05,fres);
  float up=step(0.0,uSunDir.y);
  c+=uSunCol*(pow(max(dot(R,uSunDir),0.0),420.0)*6.0+pow(max(dot(R,uSunDir),0.0),40.0)*0.12)*up;
  // the campus after dark: warm streaks on the water close to the quay
  float dE=max(abs(p.x),abs(p.y))-uSide*0.5;
  float streak=vn(vec2((abs(p.x)>abs(p.y)?p.y:p.x)*0.35,dE*0.04+uTime*0.05));
  c+=vec3(1.0,0.6,0.26)*uNight*exp(-max(dE,0.0)/38.0)*(0.15+0.85*streak*streak)*0.45;
  gl_FragColor=vec4(c,1.0);
  `+FOG_GLSL("vW")+`
#include <tonemapping_fragment>
#include <encodings_fragment>
}`});
  const w=new THREE.Mesh(new THREE.PlaneGeometry(14000,14000),m);w.rotation.x=-Math.PI/2;w.position.y=-.9;return w;
}
// drones: a few quiet couriers on slow loops above the roofs, each with an amber belly light
const DR=[];let droneBody=null,droneLights=null;
function makeDrones(){
  const g=new THREE.Group(),n=9;
  for(let i=0;i<n;i++)DR.push({cx:(hash01("dx"+i)-.5)*WORLD.W*.7,cz:(hash01("dz"+i)-.5)*WORLD.H*.7,r:50+hash01("dr"+i)*120,h:62+hash01("dh"+i)*55,sp:(.05+hash01("ds"+i)*.05)*(i%2?1:-1),ph:hash01("dp"+i)*6.28});
  const bg=new THREE.BoxGeometry(1.6,.28,1.6);droneBody=new THREE.InstancedMesh(bg,new THREE.MeshStandardMaterial({color:lin("#20242c"),roughness:.35,metalness:.7}),n);droneBody.frustumCulled=false;
  const lg=new THREE.BufferGeometry();lg.setAttribute("position",new THREE.BufferAttribute(new Float32Array(n*3),3));
  droneLights=new THREE.Points(lg,new THREE.PointsMaterial({color:lin("#FFC46B"),size:2.2,map:TEX.glow,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,sizeAttenuation:true,fog:false}));droneLights.frustumCulled=false;
  g.add(droneBody,droneLights);return g;
}
const _o=new THREE.Object3D();
function stepDrones(){
  if(!droneBody)return;const pa=droneLights.geometry.attributes.position.array;
  DR.forEach((d,i)=>{const a=d.ph+time*d.sp,x=d.cx+Math.cos(a)*d.r,z=d.cz+Math.sin(a)*d.r*.7,y=d.h+Math.sin(time*.4+d.ph)*3;
    _o.position.set(x,y,z);_o.rotation.set(Math.sin(time*.7+i)*.05,-a,0);_o.updateMatrix();droneBody.setMatrixAt(i,_o.matrix);pa.set([x,y-.35,z],i*3)});
  droneBody.instanceMatrix.needsUpdate=true;droneLights.geometry.attributes.position.needsUpdate=true;
}
// motes: dust in daylight, fireflies after dark; positions wrap around the camera target inside the vertex shader
function makeMotes(){
  const N=700,seed=new Float32Array(N*3);for(let i=0;i<seed.length;i++)seed[i]=Math.random();
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(seed,3));
  const m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false,
    uniforms:{uCenter:{value:new THREE.Vector3()},uScale:{value:600},map:{value:TEX.glow},uTime:SH.uTime,uNight:SH.uNight},
    vertexShader:`uniform vec3 uCenter;uniform float uScale;uniform float uTime;uniform float uNight;varying float vA;
void main(){vec3 s=position;vec3 box=vec3(320.0,mix(60.0,16.0,uNight),320.0);
 vec3 p=s*box;p.x+=uTime*0.7+sin(uTime*0.31+s.y*20.0)*3.0;p.z+=uTime*0.3+cos(uTime*0.27+s.z*17.0)*3.0;p.y+=sin(uTime*0.5+s.x*30.0)*1.2;
 p.xz=mod(p.xz-uCenter.xz+box.xz*0.5,box.xz)+uCenter.xz-box.xz*0.5;p.y=0.8+mod(p.y,box.y);
 vec4 mv=modelViewMatrix*vec4(p,1.0);float fl=0.5+0.5*sin(uTime*(1.3+s.z*2.0)+s.x*40.0);
 vA=mix(0.10,0.25+0.75*fl*fl,uNight)*smoothstep(260.0,60.0,-mv.z);
 gl_PointSize=clamp(mix(0.32,0.4,uNight)*uScale/-mv.z,0.0,14.0);gl_Position=projectionMatrix*mv;}`,
    fragmentShader:"uniform sampler2D map;uniform float uNight;varying float vA;void main(){float a=texture2D(map,gl_PointCoord).a;gl_FragColor=vec4(mix(vec3(1.0,0.95,0.85),vec3(1.0,0.78,0.36),uNight)*a*vA,1.0);}"});
  const p=new THREE.Points(g,m);p.frustumCulled=false;return p;
}

// ---------- build
function build(prev){
  layout();
  if(ground){scene.remove(ground);const ud=groundMat.map.userData;ud.mask.dispose();ud.ao.dispose();if(ud.light)ud.light.dispose();groundMat.map.dispose();groundMat.dispose();ground.geometry.dispose();groundUni=null}
  const tex=paintGround();
  groundMat=groundMaterial(tex);
  ground=new THREE.Mesh(new THREE.PlaneGeometry(GSIDE,GSIDE),groundMat);ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
  if(!water){water=makeWater();scene.add(water)}water.material.uniforms.uSide.value=GSIDE;
  buildInstances(prev);buildNav();
  const lamps=buildDecor();tex.userData.light=paintLightMap(lamps);if(groundUni)groundUni.t_light.value=tex.userData.light;
  fitShadow();applyState();buildChips();setMarkers(tasksMarks);
  renderer.shadowMap.needsUpdate=true;dirty=true;
}

// ---------- links drawn as cables for the open note
function clearBridges(){while(bridgeGroup.children.length){const m=bridgeGroup.children.pop();m.geometry.dispose()}ringMesh.visible=false}
const bridgeMats={};
function bridgeMat(col){
  if(bridgeMats[col])return bridgeMats[col];
  const m=new THREE.ShaderMaterial({uniforms:{time:{value:0},prog:{value:0},col:{value:lin(col)}},
    vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
    fragmentShader:"uniform float time;uniform float prog;uniform vec3 col;varying vec2 vUv;void main(){if(vUv.x>prog)discard;float d=0.62+0.38*sin(vUv.x*80.0-time*2.4);gl_FragColor=vec4(col*(0.55+d*0.75),1.0);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n}"});
  return bridgeMats[col]=m;
}
function topOf(id){const b=B[id];return new THREE.Vector3(b.cx,b.h+.2,b.cz)}
function buildBridges(){
  clearBridges();if(sel<0)return;
  const n=NOTES[sel],b=B[sel];
  const mk=(from,to,col)=>{
    const p0=topOf(from),p1=topOf(to);const dist=p0.distanceTo(p1);const mid=p0.clone().add(p1).multiplyScalar(.5);mid.y+=Math.min(70,7+dist*.2);
    const curve=new THREE.QuadraticBezierCurve3(p0,mid,p1);
    const tube=new THREE.Mesh(new THREE.TubeGeometry(curve,28,.14+dist*.0004,5,false),bridgeMat(col));tube.frustumCulled=false;bridgeGroup.add(tube);
  };
  [...n.out].slice(0,18).forEach(o=>mk(sel,o,"#F2B85B"));
  [...n.back].slice(0,18).forEach(i=>mk(i,sel,"#9CD3FF"));
  const r=Math.max(b.fw,b.fd)*.75+1.6;ringMesh.scale.set(r,r,r);ringMesh.position.set(b.cx,.25,b.cz);ringMesh.visible=true;
  bridgeProg=reduced?1:0;
}
let bridgeProg=1;

// ---------- selection
function select(n){
  sel=n?n.id:-1;nbr=new Map();
  if(n){n.out.forEach(i=>nbr.set(i,1));n.back.forEach(i=>nbr.set(i,nbr.has(i)?3:2))}
  applyState();buildBridges();
}
function focus(n){
  if(!C.ok||!B[n.id])return;
  select(n);auto=false;
  const b=B[n.id],span=Math.max(b.fw,b.fd);
  if(walk)exitWalk();
  goal.tx=b.cx;goal.tz=b.cz;goal.ty=b.h*.55;goal.dist=clamp(b.h*1.75+span*2.6+34,52,200);goal.pitch=b.h<20?.62:.52;
  dirty=true;
}
function clear(){if(!C.ok)return;sel=-1;nbr=new Map();applyState();clearBridges();dirty=true;cur=null;$("#crumb").innerHTML="Campus"}
function overview(){
  if(!C.ok)return;if(walk)exitWalk();
  select(null);cur=null;$("#crumb").innerHTML="Campus";
  goal.tx=0;goal.ty=0;goal.tz=0;goal.pitch=.62;goal.dist=GSIDE*.8;dirty=true;
}
function flyDistrict(top){
  const d=DIST.find(x=>x.top===top);if(!d)return;if(walk)exitWalk();auto=false;
  goal.tx=d.x+d.w/2;goal.tz=d.z+d.d/2;goal.ty=0;goal.dist=Math.max(d.w,d.d)*1.05+70;goal.pitch=.72;dirty=true;
}

// ---------- walking
function enterWalk(){
  if(walk)return;walk=true;auto=false;
  // start where the orbit camera is (or 45 units out when it is high above), then descend to eye height
  const D=Math.min(cam.dist,45),cp=Math.cos(cam.pitch);
  const px=cam.tx+Math.sin(cam.yaw)*cp*D,pz=cam.tz+Math.cos(cam.yaw)*cp*D,py=Math.max(3.4,cam.ty+Math.sin(cam.pitch)*D);
  cam.tx=goal.tx=clamp(px,-GSIDE/2+20,GSIDE/2-20);cam.tz=goal.tz=clamp(pz,-GSIDE/2+20,GSIDE/2-20);cam.ty=py;cam.dist=goal.dist=0;
  goal.ty=3.4;goal.pitch=.1;goal.yaw=cam.yaw;collide();cam.tx=goal.tx;cam.tz=goal.tz;
  $("#rbWalk").classList.add("on");$("#hint").firstElementChild.textContent="Drag · look   WASD · walk   Shift · run";dirty=true;
}
function exitWalk(){
  if(!walk)return;walk=false;
  cam.pitch=clamp(cam.pitch,.2,1.2);const d=90,cp=Math.cos(cam.pitch);
  const px=cam.tx,py=cam.ty,pz=cam.tz;
  // keep the camera where it is; put the orbit target in front of it
  cam.dist=d;cam.tx=px-Math.sin(cam.yaw)*cp*d;cam.ty=py-Math.sin(cam.pitch)*d;cam.tz=pz-Math.cos(cam.yaw)*cp*d;
  goal.tx=cam.tx;goal.ty=0;goal.tz=cam.tz;goal.dist=d+70;goal.pitch=.55;goal.yaw=cam.yaw;
  $("#rbWalk").classList.remove("on");$("#hint").firstElementChild.textContent="Drag · orbit   Right-drag · pan   Scroll · zoom";dirty=true;
}
function toggleWalk(force){if(!C.ok)return;if(force===true||!walk)enterWalk();else exitWalk()}
function collide(){
  const r=1.5,px=goal.tx,pz=goal.tz;
  for(let i=0;i<boxB.length;i++){const o=i*6;if(boxes[o+1]>1)continue;
    const x0=boxes[o]-r,z0=boxes[o+2]-r,x1=boxes[o+3]+r,z1=boxes[o+5]+r;
    if(goal.tx>x0&&goal.tx<x1&&goal.tz>z0&&goal.tz<z1){
      const l=goal.tx-x0,rr=x1-goal.tx,t=goal.tz-z0,bt=z1-goal.tz,m=Math.min(l,rr,t,bt);
      if(m===l)goal.tx=x0;else if(m===rr)goal.tx=x1;else if(m===t)goal.tz=z0;else goal.tz=z1;
    }}
  const lim=GSIDE/2-20;goal.tx=clamp(goal.tx,-lim,lim);goal.tz=clamp(goal.tz,-lim,lim);
}

// ---------- picking
function pick(cx,cy){
  const r=cv.getBoundingClientRect();const nx=(cx-r.left)/r.width*2-1,ny=-((cy-r.top)/r.height*2-1);
  rc.setFromCamera({x:nx,y:ny},camera);
  const o=rc.ray.origin,d=rc.ray.direction,ix=1/d.x,iy=1/d.y,iz=1/d.z;let best=-1,bt=1e9;
  for(let i=0;i<boxB.length;i++){
    if(growth[boxB[i]]<1&&introStart>=0&&(time-introStart-delay[boxB[i]])<.9)continue;
    const q=i*6;
    let t1=(boxes[q]-o.x)*ix,t2=(boxes[q+3]-o.x)*ix;let tmin=Math.min(t1,t2),tmax=Math.max(t1,t2);
    t1=(boxes[q+1]-o.y)*iy;t2=(boxes[q+4]-o.y)*iy;tmin=Math.max(tmin,Math.min(t1,t2));tmax=Math.min(tmax,Math.max(t1,t2));
    t1=(boxes[q+2]-o.z)*iz;t2=(boxes[q+5]-o.z)*iz;tmin=Math.max(tmin,Math.min(t1,t2));tmax=Math.min(tmax,Math.max(t1,t2));
    if(tmax>=Math.max(tmin,0)&&tmin<bt&&tmax>0){bt=Math.max(tmin,0);best=boxB[i]}
  }
  return best;
}

// ---------- labels
const pool=[];
function lbl(i){if(!pool[i]){const d=document.createElement("div");d.className="lbl";$("#labels").appendChild(d);pool[i]=d}return pool[i]}
const _v=new THREE.Vector3(),_f=new THREE.Vector3();
function updateLabels(){
  if(!C.ok)return;
  const cands=[],cp=camera.position;camera.getWorldDirection(_f);
  const addB=(id,cls,prio)=>{const b=B[id];if(!b)return;cands.push({x:b.cx,y:b.h+2.6,z:b.cz,t:NOTES[id].name,s:"",cls,prio,c:colorOf(NOTES[id])})};
  if(sel>=0)addB(sel,"sel",100);
  AG.forEach((m,id)=>{if(!m.grp.visible)return;const a=m.info,st=m.phaseName==='street'?'walking':m.phaseName==='lift'||m.phaseName==='descend'?'lift':a.status;const lv=a.level??levels.get(a.levelKey||a.id);
    cands.push({x:m.pos.x,y:m.pos.y+7,z:m.pos.z,t:`${a.name} · ${st}`,s:(lv>0?`L${lv} · `:"")+(a.ownerName?`${a.ownerName} · ${a.ownerBadge}`:a.task||""),cls:"ag",prio:110,c:a.color||"#E8A33D"});
    const bb=bubbles.get(id);if(bb)cands.push({x:m.pos.x,y:m.pos.y+8.3,z:m.pos.z,t:bb.text,s:"",cls:"say",prio:120,c:a.color||"#E8A33D"})});
  floaters.forEach(f=>{const e=time-f.t0;cands.push({x:f.x,y:f.y+e*3,z:f.z,t:f.text,s:"",cls:"xp",prio:130,c:f.color,op:1-e/2.2})});
  if(hov>=0&&hov!==sel)addB(hov,"hov",90);
  if(sel>=0){[...nbr.keys()].map(i=>({i,d:Math.hypot(B[i].cx-cp.x,B[i].cz-cp.z)})).sort((a,b)=>a.d-b.d).slice(0,13).forEach((o,k)=>addB(o.i,"",60-k))}
  const far=walk?0:cam.dist;
  if(!walk&&far>150)DIST.forEach(d=>cands.push({x:d.x+d.w/2,y:58,z:d.z+d.d/2,t:d.name,s:d.count+" notes",cls:"dl",prio:far>260?50:20,c:d.color}));
  if(sel<0||far>90){let k=0;LAND.forEach(id=>{const b=B[id];if(!b)return;const d=Math.hypot(b.cx-cp.x,b.cz-cp.z);if(d<(walk?160:420)&&far<300&&k<12){addB(id,"",40-d*.01);k++}})}
  if(walk||far<130){const near=[];NOTES.forEach(n=>{const b=B[n.id];const d=Math.hypot(b.cx-cp.x,b.cz-cp.z);if(d<(walk?85:95))near.push({id:n.id,sc:n.out.size+n.back.size-d*.08})});near.sort((a,b)=>b.sc-a.sc).slice(0,16).forEach((o,k)=>addB(o.id,"",30-k*.5))}
  if(Campus.labelCands&&Campus.labelCands.length)cands.push(...Campus.labelCands);
  cands.sort((a,b)=>b.prio-a.prio);
  const taken=[];let used=0;
  cands.forEach(c=>{
    _v.set(c.x-cp.x,c.y-cp.y,c.z-cp.z);if(_v.dot(_f)<2)return;
    _v.set(c.x,c.y,c.z).project(camera);if(Math.abs(_v.x)>1.02||Math.abs(_v.y)>1.02)return;
    const px=(_v.x*.5+.5)*W,py=(-_v.y*.5+.5)*H;const w=(Math.min(c.t.length,c.cls==="say"?40:99)*6.8+18),h=c.cls==="dl"?34:c.cls==="say"?40:22;
    const rect=[px-w/2,py-h,px+w/2,py];
    if(taken.some(r=>rect[0]<r[2]&&rect[2]>r[0]&&rect[1]<r[3]&&rect[3]>r[1]))return;
    taken.push(rect);const el=lbl(used++);el.className="lbl"+(c.cls?" "+c.cls:"");el.style.setProperty("--c",c.c);
    el.innerHTML=esc(c.t.length>(c.cls==="say"?120:44)?c.t.slice(0,43)+"…":c.t)+(c.s?`<small>${c.s}</small>`:"");el.style.opacity=c.op==null?"":String(Math.max(0,c.op));
    el.style.transform=`translate(${Math.round(px)}px,${Math.round(py)}px) translate(-50%,-100%)`;el.style.display="";
  });
  for(let i=used;i<pool.length;i++)pool[i].style.display="none";
}

// ---------- minimap and chips
function drawMini(){
  const c=$("#miniC");if(!c||!DIST.length)return;const g=c.getContext("2d"),w=c.clientWidth,h=c.clientHeight;if(!w)return;
  if(c.width!==w*2){c.width=w*2;c.height=h*2}
  g.setTransform(2,0,0,2,0,0);g.clearRect(0,0,w,h);
  const sc=Math.min(w/WORLD.W,h/WORLD.H)*.92,ox=w/2,oy=h/2;
  DIST.forEach(d=>{g.fillStyle=d.color+"66";g.fillRect(ox+d.x*sc,oy+d.z*sc,d.w*sc,d.d*sc);g.strokeStyle=d.color+"aa";g.lineWidth=.6;g.strokeRect(ox+d.x*sc,oy+d.z*sc,d.w*sc,d.d*sc)});
  if(sel>=0){const b=B[sel];g.fillStyle="#fff";g.fillRect(ox+b.cx*sc-1.5,oy+b.cz*sc-1.5,3,3)}
  const p=camera.position,px=ox+p.x*sc,pz=oy+p.z*sc;
  camera.getWorldDirection(_f);const a=Math.atan2(_f.z,_f.x);
  g.fillStyle="rgba(232,163,61,.35)";g.beginPath();g.moveTo(px,pz);g.arc(px,pz,26,a-.45,a+.45);g.closePath();g.fill();
  g.fillStyle="#E8A33D";g.beginPath();g.arc(px,pz,2.4,0,7);g.fill();
  g.strokeStyle="#fff";g.lineWidth=1;g.beginPath();g.arc(ox+cam.tx*sc,oy+cam.tz*sc,3.2,0,7);g.stroke();
}
$("#mini").addEventListener("pointerdown",e=>{if(!C.ok)return;const r=e.currentTarget.getBoundingClientRect(),w=r.width,h=r.height,sc=Math.min(w/WORLD.W,h/WORLD.H)*.92;
  const x=(e.clientX-r.left-w/2)/sc,z=(e.clientY-r.top-h/2)/sc;auto=false;if(walk){goal.tx=x;goal.tz=z}else{goal.tx=x;goal.tz=z;goal.ty=0}dirty=true});
function buildChips(){
  $("#chips").innerHTML=DIST.slice().sort((a,b)=>b.count-a.count).map(d=>`<button class="chip2" data-top="${esc(d.top)}"><i style="background:${d.color}"></i>${esc(d.name)}<b>${d.count}</b></button>`).join("");
}
$("#chips").addEventListener("click",e=>{const b=e.target.closest(".chip2");if(b){closeSheet();flyDistrict(b.dataset.top)}});
function markChip(){
  let best=null,bd=1e12;DIST.forEach(d=>{const dx=Math.max(d.x-cam.tx,0,cam.tx-(d.x+d.w)),dz=Math.max(d.z-cam.tz,0,cam.tz-(d.z+d.d)),q=dx*dx+dz*dz;if(q<bd){bd=q;best=d}});
  document.querySelectorAll(".chip2").forEach(c=>c.classList.toggle("on",best&&c.dataset.top===best.top&&!sheet.open));
}

// ---------- task markers: a lamp on the roof of any note with open agent work
const MK={open:"#9CD3FF",claimed:"#F2B85B",review:"#22D3EE",blocked:"#E5534B"};
function setMarkers(list){
  tasksMarks=list||[];if(!markerGroup)return;
  while(markerGroup.children.length){const m=markerGroup.children.pop();m.geometry.dispose();m.material.dispose()}
  const seen=new Set();
  tasksMarks.forEach(t=>{const n=byName.get(t.note);if(!n||!B[n.id]||seen.has(n.id))return;seen.add(n.id);const p=topOf(n.id);
    const col=lin(MK[t.status]||"#9CD3FF");
    const pole=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,7,6),new THREE.MeshBasicMaterial({color:lin("#c9ced9")}));pole.position.set(p.x,p.y+3.5,p.z);
    const lamp=new THREE.Mesh(new THREE.OctahedronGeometry(.95,0),new THREE.MeshBasicMaterial({color:col}));lamp.position.set(p.x,p.y+7.8,p.z);
    markerGroup.add(pole,lamp)});
  dirty=true;
}


// ---------- streets: a walkable grid over the plan. Buildings block cells; everything else is road or plaza.
const NAV={cell:3,n:0,ox:0,oz:0,blocked:null};
function buildNav(){
  const c=NAV.cell,n=Math.ceil(GSIDE/c);NAV.n=n;NAV.ox=-GSIDE/2;NAV.oz=-GSIDE/2;const bl=NAV.blocked=new Uint8Array(n*n);
  B.forEach(b=>{if(!b)return;const t=b.tiers[0],pad=1.1;const x0=Math.floor((t.x-t.w/2-pad-NAV.ox)/c),x1=Math.floor((t.x+t.w/2+pad-NAV.ox)/c),z0=Math.floor((t.z-t.d/2-pad-NAV.oz)/c),z1=Math.floor((t.z+t.d/2+pad-NAV.oz)/c);
    for(let z=Math.max(0,z0);z<=Math.min(n-1,z1);z++)for(let x=Math.max(0,x0);x<=Math.min(n-1,x1);x++)bl[z*n+x]=1});
  // doors: the nearest free cell in front of each building (toward +z), then any side
  B.forEach(b=>{if(!b)return;const t=b.tiers[0];const cx=Math.floor((t.x-NAV.ox)/c),cz=Math.floor((t.z-NAV.oz)/c);let best=null;
    for(let r=1;r<14&&!best;r++)for(const [dx,dz] of [[0,r],[r,0],[-r,0],[0,-r],[r,r],[-r,r],[r,-r],[-r,-r]]){const x=cx+dx,z=cz+dz;if(x>=0&&z>=0&&x<n&&z<n&&!bl[z*n+x]){best=[x,z];break}}
    b.door=best?{x:NAV.ox+(best[0]+.5)*c,z:NAV.oz+(best[1]+.5)*c}:{x:t.x,z:t.z+t.d/2+2}});
}
const cellOf=(x,z)=>[clamp(Math.floor((x-NAV.ox)/NAV.cell),0,NAV.n-1),clamp(Math.floor((z-NAV.oz)/NAV.cell),0,NAV.n-1)];
const free=(x,z)=>x>=0&&z>=0&&x<NAV.n&&z<NAV.n&&!NAV.blocked[z*NAV.n+x];
function nearestFree(x,z){if(free(x,z))return[x,z];for(let r=1;r<20;r++)for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++)if(Math.max(Math.abs(dx),Math.abs(dz))===r&&free(x+dx,z+dz))return[x+dx,z+dz];return[x,z]}
// A* on the grid, 8-connected without corner cutting, then a line-of-sight pull so Sentinels walk the street instead of the staircase.
function route(ax,az,bx,bz){
  const n=NAV.n,[sx,sz]=nearestFree(...cellOf(ax,az)),[gx,gz]=nearestFree(...cellOf(bx,bz));
  if(sx===gx&&sz===gz)return[[bx,bz]];
  const key=(x,z)=>z*n+x,open=[key(sx,sz)],g=new Map([[key(sx,sz),0]]),came=new Map(),f=new Map([[key(sx,sz),Math.hypot(gx-sx,gz-sz)]]),closed=new Set();
  const DIRS=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,1.414],[1,-1,1.414],[-1,1,1.414],[-1,-1,1.414]];let steps=0;
  while(open.length&&steps++<40000){
    let bi=0;for(let i=1;i<open.length;i++)if(f.get(open[i])<f.get(open[bi]))bi=i;
    const cur=open[bi];open[bi]=open[open.length-1];open.pop();if(closed.has(cur))continue;closed.add(cur);
    const cx=cur%n,cz=(cur-cx)/n;
    if(cx===gx&&cz===gz){const cells=[];let k=cur;while(k!==undefined){cells.push(k);k=came.get(k)}cells.reverse();
      const pts=cells.map(k=>{const x=k%n;return[NAV.ox+(x+.5)*NAV.cell,NAV.oz+((k-x)/n+.5)*NAV.cell]});
      const out=[pts[0]];let a=0;for(let i=2;i<=pts.length;i++){if(i===pts.length||!sight(pts[a],pts[i])){out.push(pts[i-1]);a=i-1}}
      out[out.length-1]=[bx,bz];return out}
    for(const [dx,dz,w] of DIRS){const nx=cx+dx,nz=cz+dz;if(!free(nx,nz))continue;if(dx&&dz&&(!free(cx+dx,cz)||!free(cx,cz+dz)))continue;
      const nk=key(nx,nz),ng=g.get(cur)+w;if(ng<(g.get(nk)??1e9)){g.set(nk,ng);came.set(nk,cur);f.set(nk,ng+Math.hypot(gx-nx,gz-nz));if(!closed.has(nk))open.push(nk)}}
  }
  return[[bx,bz]];
}
function sight(a,b){const d=Math.hypot(b[0]-a[0],b[1]-a[1]),k=Math.ceil(d/(NAV.cell*.5));for(let i=0;i<=k;i++){const t=i/k;if(!free(...cellOf(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t)))return false}return true}

// ---------- Vault Sentinels: articulated architectural avatars, shared cached geometry.
// Each one walks the streets to its building, rides a lift up the facade and takes a slot on the roof.
const AG=new Map(),pulses=new Map(),bubbles=new Map(),floaters=[],bursts=[];let agentGroup=null,lastAgents=[],levels=new Map();
const LIVE_ST=["working","writing","reading","thinking","reviewing"];
function disposeSentinel(m){SentinelMesh.dispose(m.grp);agentGroup.remove(m.grp);if(m.link){m.link.geometry.dispose();m.link.material.dispose();agentGroup.remove(m.link)}}
function roofSlot(n,slot,count){const b=B[n.id],r=Math.min(Math.max(b.fw,b.fd)*.5-1.2,2.8+count*.3);const a=slot*(2*Math.PI/Math.max(count,1))+hash01(NOTES[n.id].name)*6;return new THREE.Vector3(b.cx+Math.cos(a)*Math.max(.8,r),b.h,b.cz+Math.sin(a)*Math.max(.8,r))}
function setAgents(list){
  lastAgents=list||[];if(!agentGroup)return;const seen=new Set(),counts=new Map();
  lastAgents.forEach(a=>{if(a.note&&!a.position){const n=byName.get(a.note);if(n&&B[n.id])counts.set(n.id,(counts.get(n.id)||0)+1)}});
  const slots=new Map();
  lastAgents.forEach(a=>{
    seen.add(a.id);const n=a.note?byName.get(a.note):null,b=n?B[n.id]:null;let m=AG.get(a.id);
    const level=a.level??levels.get(a.levelKey||a.id)??0;
    const signature=JSON.stringify([Identity.form(a.form||'agent'),Identity.palette(a.palette||['#111827',a.color||'#C97B54','#E6E9F2'],a.form||'agent'),a.symbol,a.ownerColor,a.ownerBadge,level]);
    if(m&&m.signature!==signature){const keep={pos:m.pos.clone(),noteId:m.noteId,path:m.path,leg:m.leg,phaseName:m.phaseName,lift:m.lift};disposeSentinel(m);AG.delete(a.id);m=null;m=SentinelMesh.create({...a,level});Object.assign(m,keep);agentGroup.add(m.grp);AG.set(a.id,m)}
    if(!m){m=SentinelMesh.create({...a,level});agentGroup.add(m.grp);AG.set(a.id,m);m.phaseName='new'}
    m.info=a;
    if(a.position&&[a.position.x,a.position.z].every(Number.isFinite)){
      // a person walking: positions come from their own browser
      m.pos.set(clamp(a.position.x,-GSIDE/2,GSIDE/2),0,clamp(a.position.z,-GSIDE/2,GSIDE/2));m.grp.rotation.y=Number.isFinite(a.position.yaw)?a.position.yaw:0;m.noteId=-2;m.path=null;m.phaseName='placed';
      m.grp.visible=!(a.local&&a.position.walking);m.ring.scale.setScalar(1.6);
    }else if(b){
      const slot=slots.get(n.id)||0;slots.set(n.id,slot+1);const tgt=roofSlot(n,slot,counts.get(n.id)||1);
      if(m.noteId!==n.id){
        // new destination: start where it stands (or at the campus gate), walk the streets, then lift
        if(reduced||(m.phaseName==='new'&&time<4)){m.pos.copy(tgt);m.phaseName='roof';m.path=null}
        else{const from=m.phaseName==='roof'||m.phaseName==='placed'?{x:m.pos.x,z:m.pos.z}:(m.phaseName==='new'?gate():{x:m.pos.x,z:m.pos.z});
          if(m.phaseName==='roof'&&m.noteId>=0&&B[m.noteId]){const d=B[m.noteId].door;m.path=[[d.x,d.z]].concat(route(d.x,d.z,b.door.x,b.door.z));m.phaseName='descend';m.lift={from:m.pos.y,to:0,x:d.x,z:d.z,h:B[m.noteId].h}}
          else{m.path=route(from.x,from.z,b.door.x,b.door.z);m.phaseName='street';m.pos.set(from.x,0,from.z)}
          m.leg=0;m.pathT=time}
        m.noteId=n.id;m.roof=tgt;m.home=b;
      }else if(m.phaseName==='roof'){m.roof=tgt;if(m.pos.distanceTo(tgt)>.05)m.pos.lerp(tgt,.2)}
      m.grp.visible=true;m.ring.scale.setScalar(2.2);
    }else{m.grp.visible=false;m.noteId=-1;m.path=null;m.phaseName='new'}
    m.grp.position.copy(m.pos);
  });
  AG.forEach((m,id)=>{if(!seen.has(id)){disposeSentinel(m);AG.delete(id)}});if(iMesh)applyState();dirty=true;
}
function gate(){const hm=byName.get("🏠 Home");const b=hm&&B[hm.id]?B[hm.id]:null;return b?{x:b.door.x,z:b.door.z+8}:{x:0,z:GSIDE/2-30}}
function setLevels(map){levels=map||new Map();setAgents(lastAgents)}
function pulse(name){const n=byName.get(name);if(!n||!B[n.id])return;pulses.set(n.id,time+6);if(iMesh)applyState()}
function say(id,text,ttl=8){const m=AG.get(id);if(!m)return false;bubbles.set(id,{text:String(text).slice(0,120),until:time+ttl});if(!reduced)SentinelMesh.emote(m,'greet',time);lastLbl=0;dirty=true;return true}
function floater(id,text,color){const m=AG.get(id);if(!m||!m.grp.visible)return;floaters.push({x:m.pos.x,y:m.pos.y+7.5,z:m.pos.z,text,color:color||m.info.color||'#E8A33D',t0:time});dirty=true}
function emote(id,name){const m=AG.get(id);if(m&&!reduced)SentinelMesh.emote(m,name,time)}
// a burst of accent particles over a building: task done, level up
let burstGeo=null;
function celebrate(noteName,color){
  const n=byName.get(noteName);const b=n?B[n.id]:null;if(!b||reduced)return;
  const N=140,pos=new Float32Array(N*3),vel=[];for(let i=0;i<N;i++){const a=Math.random()*Math.PI*2,r=Math.random();pos.set([b.cx,b.h+1,b.cz],i*3);vel.push([Math.cos(a)*r*9,9+Math.random()*12,Math.sin(a)*r*9])}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));
  const p=new THREE.Points(g,new THREE.PointsMaterial({color:lin(color||'#F2B85B'),size:1.1,transparent:true,opacity:1,sizeAttenuation:true,fog:false}));
  agentGroup.add(p);bursts.push({p,vel,t0:time});pulses.set(n.id,time+5);applyState();
  AG.forEach(m=>{if(m.noteId===n.id)SentinelMesh.emote(m,'celebrate',time)});
}
const HUDDLE={until:0,a:null,b:null};
function stepAgents(dt){
  let live=false;const onRoof=new Map();
  AG.forEach(m=>{
    if(!m.grp.visible)return;live=true;const a=m.info;let status=a.status;
    if(m.phaseName==='descend'){const k=clamp((time-m.pathT)/Math.max(.8,m.lift.h/22),0,1);m.pos.set(m.lift.x,m.lift.from*(1-k),m.lift.z);m.grp.position.copy(m.pos);SentinelMesh.pose(m,time,'lifting',{beam:m.lift.h,beamBase:0});if(k>=1){m.phaseName='street';m.pathT=time;m.leg=0;m.pos.y=0}return}
    if(m.phaseName==='street'&&m.path){
      const speed=Math.max(14,pathLength(m.path,m.pos)/14)*dt;let left=speed;
      while(left>0&&m.leg<m.path.length){const [tx,tz]=m.path[m.leg];const dx=tx-m.pos.x,dz=tz-m.pos.z,d=Math.hypot(dx,dz);if(d<=left){m.pos.x=tx;m.pos.z=tz;left-=d;m.leg++}else{m.pos.x+=dx/d*left;m.pos.z+=dz/d*left;const yaw=Math.atan2(dx,dz);m.grp.rotation.y+=(((yaw-m.grp.rotation.y+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI)*Math.min(1,dt*10);left=0}}
      m.pos.y=0;m.grp.position.copy(m.pos);
      if(m.leg>=m.path.length){m.phaseName='lift';m.pathT=time;m.lift={from:0,to:m.home.h,x:m.pos.x,z:m.pos.z,h:m.home.h}}
      SentinelMesh.pose(m,time,'walking');return}
    if(m.phaseName==='lift'){const k=clamp((time-m.pathT)/Math.max(.9,m.lift.h/20),0,1),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;m.pos.y=m.lift.h*e;m.grp.position.copy(m.pos);SentinelMesh.pose(m,time,'lifting',{beam:m.lift.h,beamBase:0});if(k>=1){m.phaseName='roof';m.pathT=time;m.from.copy(m.pos);m.pos.y=m.home.h}return}
    if(m.phaseName==='roof'&&m.roof){const d=m.pos.distanceTo(m.roof);if(d>.08){const step=Math.min(d,dt*6);m.pos.lerp(m.roof,step/d);m.grp.position.copy(m.pos);const dx=m.roof.x-m.pos.x,dz=m.roof.z-m.pos.z;if(d>.4)m.grp.rotation.y=Math.atan2(dx,dz);SentinelMesh.pose(m,time,'walking');return}
      if(!onRoof.has(m.noteId))onRoof.set(m.noteId,[]);onRoof.get(m.noteId).push(m)}
    if(a.position)status=a.position.walking?'walking':'viewing';
    if(a.local)status='viewing';
    SentinelMesh.pose(m,time,status||'idle');
  });
  // huddles: Sentinels that share a roof face the center, and two of them trade a data beam now and then
  onRoof.forEach((group,noteId)=>{
    const b=B[noteId];group.forEach(m=>{const dx=b.cx-m.pos.x,dz=b.cz-m.pos.z;m.grp.rotation.y+=(((Math.atan2(dx,dz)-m.grp.rotation.y+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI)*Math.min(1,dt*3);m.face=null});
    if(group.length>=2){
      if(time>HUDDLE.until){const i=Math.floor(hash01(noteId+':'+Math.floor(time/7))*group.length),j=(i+1+Math.floor(hash01('j'+Math.floor(time/7))*(group.length-1)))%group.length;HUDDLE.a=group[i];HUDDLE.b=group[j];HUDDLE.until=time+7;HUDDLE.on=time+2.6;if(!reduced){SentinelMesh.emote(HUDDLE.a,'greet',time);setTimeout(()=>SentinelMesh.emote(HUDDLE.b,'nod',time+.6),500)}}
      if(HUDDLE.a&&HUDDLE.b&&group.includes(HUDDLE.a)&&group.includes(HUDDLE.b)){const A=HUDDLE.a,Bm=HUDDLE.b;A.face=Math.atan2(Bm.pos.x-A.pos.x,Bm.pos.z-A.pos.z);Bm.face=Math.atan2(A.pos.x-Bm.pos.x,A.pos.z-Bm.pos.z);
        if(time<HUDDLE.on){const l=SentinelMesh.prop(A,'link');l.visible=true;const from=new THREE.Vector3(0,4.3,0),to=Bm.grp.position.clone().sub(A.grp.position).add(new THREE.Vector3(0,4.3,0)).applyAxisAngle(new THREE.Vector3(0,1,0),-A.grp.rotation.y);const d=from.distanceTo(to);l.position.copy(from).lerp(to,.5);l.scale.set(1,d,1);l.lookAt(to);l.rotateX(Math.PI/2);l.material.opacity=.3+.3*Math.abs(Math.sin(time*14))}
        else if(A.props.link)A.props.link.visible=false}
    }
  });
  // particles
  for(let i=bursts.length-1;i>=0;i--){const b=bursts[i],e=time-b.t0,arr=b.p.geometry.attributes.position.array;for(let k=0;k<b.vel.length;k++){const v=b.vel[k];arr[k*3]+=v[0]*dt;arr[k*3+1]+=v[1]*dt;arr[k*3+2]+=v[2]*dt;v[1]-=22*dt}b.p.geometry.attributes.position.needsUpdate=true;b.p.material.opacity=Math.max(0,1-e/2.4);if(e>2.5){agentGroup.remove(b.p);b.p.geometry.dispose();b.p.material.dispose();bursts.splice(i,1)}}
  if(bursts.length)live=true;
  let exp=false;pulses.forEach((u,id)=>{if(u<time){pulses.delete(id);exp=true}});if(exp)applyState();
  bubbles.forEach((b,id)=>{if(b.until<time)bubbles.delete(id)});
  for(let i=floaters.length-1;i>=0;i--)if(time-floaters[i].t0>2.2)floaters.splice(i,1);
  return live||pulses.size>0||floaters.length>0;
}
function pathLength(path,pos){let l=0,px=pos.x,pz=pos.z;for(const [x,z] of path){l+=Math.hypot(x-px,z-pz);px=x;pz=z}return l}

// ---------- input
const ptrs=new Map();let moved=false,pinch=null,dragBtn=0;
function stopAuto(){auto=false}
cv.addEventListener("contextmenu",e=>e.preventDefault());
cv.addEventListener("pointerdown",e=>{cv.setPointerCapture(e.pointerId);ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,btn:e.button});moved=false;stopAuto();dragBtn=e.button;
  if(ptrs.size===2){const [a,b]=[...ptrs.values()];pinch={d:Math.hypot(a.x-b.x,a.y-b.y),cx:(a.x+b.x)/2,cy:(a.y+b.y)/2}}cv.focus({preventScroll:true})});
cv.addEventListener("pointermove",e=>{
  const p=ptrs.get(e.pointerId);
  if(!p){if(e.pointerType==="mouse")hoverAt(e.clientX,e.clientY);return}
  const dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;
  if(ptrs.size===1){
    if(Math.abs(e.clientX-p.sx)+Math.abs(e.clientY-p.sy)>5)moved=true;if(!moved)return;cv.classList.add("drag");
    if(p.btn===2||p.btn===1||e.shiftKey)pan(dx,dy);else if(walk){goal.yaw+=dx*.004;goal.pitch=clamp(goal.pitch-dy*.004,-1.2,1.2)}else{goal.yaw-=dx*.005;goal.pitch=clamp(goal.pitch+dy*.005,.06,1.5)}
  }else if(ptrs.size===2&&pinch){
    const [a,b]=[...ptrs.values()];const d=Math.hypot(a.x-b.x,a.y-b.y),cx=(a.x+b.x)/2,cy=(a.y+b.y)/2;moved=true;
    if(walk)walkMove((d-pinch.d)*.1,0);else{goal.dist=clamp(goal.dist*pinch.d/d,8,GSIDE*1.4);pan(cx-pinch.cx,cy-pinch.cy)}
    pinch={d,cx,cy};
  }
  dirty=true;
});
const pickers=[],frameHooks=[];
function endPtr(e){const p=ptrs.get(e.pointerId);if(!p)return;ptrs.delete(e.pointerId);cv.classList.remove("drag");if(ptrs.size<2)pinch=null;
  if(!moved&&ptrs.size===0&&e.type==="pointerup"&&p.btn===0){const r=cv.getBoundingClientRect();rc.setFromCamera({x:(e.clientX-r.left)/r.width*2-1,y:-((e.clientY-r.top)/r.height*2-1)},camera);if(pickers.some(f=>f(rc,e)))return;const id=pick(e.clientX,e.clientY);if(id>=0)open(NOTES[id])}}
cv.addEventListener("pointerup",endPtr);cv.addEventListener("pointercancel",endPtr);
cv.addEventListener("pointerleave",()=>{if(hov>=0){hov=-1;applyState();updateLabels()}});
cv.addEventListener("wheel",e=>{e.preventDefault();stopAuto();
  if(walk)walkMove(-e.deltaY*.04,0);else goal.dist=clamp(goal.dist*Math.exp(e.deltaY*.0011),8,GSIDE*1.4);dirty=true},{passive:false});
function pan(dx,dy){
  if(walk)return;const k=cam.dist*.0011,sy=Math.sin(cam.yaw),cy=Math.cos(cam.yaw);
  // right = (cy,0,-sy); forward = (-sy,0,-cy). Drag right moves the target left, drag down moves it forward.
  goal.tx+=(-cy*dx-sy*dy)*k;goal.tz+=(sy*dx-cy*dy)*k;
  clampTarget();
}
function clampTarget(){const lim=GSIDE/2;goal.tx=clamp(goal.tx,-lim,lim);goal.tz=clamp(goal.tz,-lim,lim)}
function walkMove(fwd,right){
  const sy=Math.sin(goal.yaw),cy=Math.cos(goal.yaw);
  goal.tx+=-sy*fwd+cy*right;goal.tz+=-cy*fwd-sy*right;collide();
}
let hoverRaf=0,hx=0,hy=0;
function hoverAt(x,y){hx=x;hy=y;if(hoverRaf)return;hoverRaf=requestAnimationFrame(()=>{hoverRaf=0;if(!C.ok||ptrs.size)return;const id=pick(hx,hy);if(id!==hov){hov=id;cv.classList.toggle("hov",id>=0);applyState();lastLbl=0}})}
document.addEventListener("keydown",e=>{
  if(/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName||"")||e.metaKey||e.ctrlKey||e.altKey)return;
  const k=e.key.toLowerCase();
  if(k==="shift")keys.add(k);
  else if(("wasdqe".includes(k)&&k.length===1)||k.startsWith("arrow")){keys.add(k);stopAuto();if(k.startsWith("arrow"))e.preventDefault()}
  else if(k==="f"){toggleWalk()}else if(k==="r"){closeSheet();overview()}
  else if(k==="="||k==="+"){goal.dist=clamp(goal.dist*.8,8,GSIDE*1.4)}else if(k==="-"){goal.dist=clamp(goal.dist*1.25,8,GSIDE*1.4)}
});
document.addEventListener("keyup",e=>keys.delete(e.key.toLowerCase()));
window.addEventListener("blur",()=>keys.clear());

// ---------- frame
function applyCamera(){
  const cp=Math.cos(cam.pitch),sp=Math.sin(cam.pitch),sy=Math.sin(cam.yaw),cy=Math.cos(cam.yaw),dx=sy*cp,dy=sp,dz=cy*cp;
  if(walk){camera.position.set(cam.tx,cam.ty,cam.tz);camera.lookAt(cam.tx-dx,cam.ty-dy,cam.tz-dz)}
  else{camera.position.set(cam.tx+dx*cam.dist,Math.max(2.5,cam.ty+dy*cam.dist),cam.tz+dz*cam.dist);camera.lookAt(cam.tx,cam.ty,cam.tz)}
}
function applyShift(){
  if(Math.abs(shiftNow.x)>.5||Math.abs(shiftNow.y)>.5)camera.setViewOffset(W,H,shiftNow.x,shiftNow.y,W,H);else camera.clearViewOffset();
  camera.updateProjectionMatrix();
}
function step(dt){
  // keys
  if(keys.size){
    const sy=Math.sin(goal.yaw),cy=Math.cos(goal.yaw);let f=0,r=0;
    if(keys.has("w")||keys.has("arrowup"))f++;if(keys.has("s")||keys.has("arrowdown"))f--;if(keys.has("d")||keys.has("arrowright"))r++;if(keys.has("a")||keys.has("arrowleft"))r--;
    if(walk){const v=26*(keys.has("shift")?2.6:1)*dt;if(f||r)walkMove(f*v,r*v);if(keys.has("q"))goal.yaw+=dt*1.4;if(keys.has("e"))goal.yaw-=dt*1.4}
    else{const v=goal.dist*.9*dt;goal.tx+=(-sy*f+cy*r)*v;goal.tz+=(-cy*f-sy*r)*v;clampTarget();if(keys.has("q"))goal.yaw+=dt*1.2;if(keys.has("e"))goal.yaw-=dt*1.2}
    dirty=true;
  }
  if(auto&&!walk&&!sheet.open){goal.yaw+=dt*.04;dirty=true}
  const k=reduced?1:1-Math.exp(-dt*(walk?13:5.5));
  let dyaw=((goal.yaw-cam.yaw+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;
  let mv=Math.abs(dyaw)+Math.abs(goal.pitch-cam.pitch)+Math.abs(goal.dist-cam.dist)*.01+Math.abs(goal.tx-cam.tx)*.01+Math.abs(goal.ty-cam.ty)*.01+Math.abs(goal.tz-cam.tz)*.01;
  cam.yaw+=dyaw*k;cam.pitch+=(goal.pitch-cam.pitch)*k;cam.dist+=(goal.dist-cam.dist)*k;cam.tx+=(goal.tx-cam.tx)*k;cam.ty+=(goal.ty-cam.ty)*k;cam.tz+=(goal.tz-cam.tz)*k;
  if(mv>.0008)dirty=true;
  // sheet shift
  const ks=1-Math.exp(-dt*9);const sx=shiftGoal.x-shiftNow.x,sy2=shiftGoal.y-shiftNow.y;
  if(Math.abs(sx)>.3||Math.abs(sy2)>.3){shiftNow.x+=sx*ks;shiftNow.y+=sy2*ks;applyShift();dirty=true}
}
function frame(t){
  requestAnimationFrame(frame);
  if(!C.ok||document.hidden||paused)return;
  const dt=Math.min(.05,(t-last)/1000||.016);last=t;time=t/1000;
  step(dt);
  const introRun=introStart>=0&&time-introStart<3.6;
  if(introRun){writeMatrices();renderer.shadowMap.needsUpdate=true;dirty=true}else if(introStart>=0){introStart=-1;growth.fill(1);writeMatrices();renderer.shadowMap.needsUpdate=true;dirty=true}
  if(bridgeGroup.children.length){
    if(bridgeProg<1)bridgeProg=Math.min(1,bridgeProg+dt*1.6);
    Object.values(bridgeMats).forEach(m=>{m.uniforms.time.value=time;m.uniforms.prog.value=bridgeProg});dirty=true;
  }
  if(stepAgents(dt))dirty=true;
  frameHooks.forEach(f=>{if(f(dt,time))dirty=true});
  // ambient life (clouds, water, motes, drones, blinking masts) keeps the frame going at up to 30 fps on its own
  if(AMB&&!dirty&&time-lastAmb>=1/30)dirty=true;
  if(roofProps)roofProps.visible=introStart<0;
  if(!dirty)return;
  dirty=false;lastAmb=time;
  if(AMB||introRun)SH.uTime.value=time;
  applyCamera();
  skyMesh.position.copy(camera.position);if(stars)stars.position.copy(camera.position);
  if(AMB){stepDrones();if(motes)motes.material.uniforms.uCenter.value.set(cam.tx,0,cam.tz)}
  if(composer&&postState==="ready"){bloomPass.enabled=bloomNow>.03;bloomPass.strength=.55*bloomNow;updateGrade();composer.render()}else renderer.render(scene,camera);
  if(!firstFrame){firstFrame=true;const l=$("#loading");l.style.opacity=0;setTimeout(()=>l.hidden=true,700)}
  if(t-lastLbl>90){lastLbl=t;updateLabels();markChip()}
  if(t-lastMini>120){lastMini=t;drawMini()}
}

// ---------- boot
function init(){
  try{
    if(typeof THREE==="undefined")throw new Error("three.js did not load");
    renderer=new THREE.WebGLRenderer({canvas:cv,antialias:true,powerPreference:"high-performance"});
    renderer.outputEncoding=THREE.sRGBEncoding;renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;
    scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x000000,.0008);
    camera=new THREE.PerspectiveCamera(48,1,2,5000);rc=new THREE.Raycaster();
    hemi=new THREE.HemisphereLight(0xffffff,0x222222,.6);scene.add(hemi);
    sun=new THREE.DirectionalLight(0xffffff,2);sun.castShadow=true;sun.shadow.mapSize.set(HI?4096:2048,HI?4096:2048);sun.shadow.bias=-.0015;sun.shadow.normalBias=2.4;scene.add(sun,sun.target);
    skyMat=skyMaterial();skyMesh=new THREE.Mesh(new THREE.SphereGeometry(2400,32,16),skyMat);skyMesh.renderOrder=-10;skyMesh.frustumCulled=false;scene.add(skyMesh);
    bridgeGroup=new THREE.Group();scene.add(bridgeGroup);markerGroup=new THREE.Group();scene.add(markerGroup);agentGroup=new THREE.Group();scene.add(agentGroup);
    ringMesh=new THREE.Mesh(new THREE.RingGeometry(.94,1,64),new THREE.MeshBasicMaterial({color:lin("#F2B85B"),transparent:true,opacity:.85,side:THREE.DoubleSide,fog:false}));ringMesh.rotation.x=-Math.PI/2;ringMesh.visible=false;scene.add(ringMesh);
    stars=makeStars();scene.add(stars);
    SentinelMesh.environment(renderer);
    loadTiles();mat=makeMaterial();solInit();
    const ro=new ResizeObserver(()=>resize());ro.observe(stage);
    build(null);
    if(AMB){scene.add(makeDrones());motes=makeMotes();scene.add(motes)}
    applyMode(mode);resize();
    // the real sun moves: once a minute, and again when the tab comes back
    skyTimer=setInterval(skyTick,60000);document.addEventListener("visibilitychange",skyTick);window.addEventListener("focus",skyTick);
    loadPost();
    // opening shot: high above the plan, then a slow drift
    cam.tx=goal.tx=0;cam.tz=goal.tz=0;cam.ty=goal.ty=0;cam.dist=GSIDE*1.05;goal.dist=GSIDE*.8;cam.pitch=.95;goal.pitch=.62;cam.yaw=goal.yaw=.5;
    C.ok=true;
    $("#plateP").textContent=`${NOTES.length} notes in ${DIST.length} districts. Click a building to read it. Open a note and the camera flies to it and draws its links.`;
    requestAnimationFrame(frame);
  }catch(err){
    console.warn("3D unavailable:",err);C.ok=false;
    ["#plate","#mini","#hint","#chips","#loading",".vig"].forEach(s=>{const e=document.querySelector(s);if(e)e.hidden=true});
    stage.insertAdjacentHTML("beforeend",`<div class="nogl"><div><b>The 3D campus needs WebGL</b>Your browser or this frame blocked it. The reader, explorer, search and agent desk still work.</div></div>`);
  }
}
function resize(){
  const r=stage.getBoundingClientRect();W=Math.max(1,r.width|0);H=Math.max(1,r.height|0);
  // pixel budget: 1.75x on desktop high, 1.5x on phones, 1x on low
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,QUALITY==="low"?1:innerWidth>760?1.75:1.5));renderer.setSize(W,H,false);camera.aspect=W/H;applyShift();
  const ps=H*renderer.getPixelRatio()*.5/Math.tan(camera.fov*Math.PI/360);
  if(DMAT.halo)DMAT.halo.uniforms.uScale.value=ps;if(motes)motes.material.uniforms.uScale.value=ps;
  if(composer){composer.setPixelRatio(renderer.getPixelRatio());composer.setSize(W,H)}
  dirty=true;
}
function cycleTime(){
  const m=MODE_ORDER[(MODE_ORDER.indexOf(mode)+1)%MODE_ORDER.length];
  if(!C.ok){mode=m;const ui=m==="auto"?(new Date().getHours()>=7&&new Date().getHours()<18?"light":"dark"):MODES[m].ui;document.documentElement.dataset.theme=ui;store.set("vault.theme",ui);store.set("vault.time",m);return}
  applyMode(m);toast("Time of day: "+(m==="auto"?"auto (your local sun)":m));
}
function shift(el){
  if(!C.ok)return;
  if(!el||!el.classList.contains("open")){shiftGoal.x=0;shiftGoal.y=0;$("#hint").style.right="14px";$("#floor").style.right="14px"}
  else if(innerWidth>760){shiftGoal.x=el.offsetWidth/2;shiftGoal.y=0;$("#hint").style.right=(el.offsetWidth+14)+"px";$("#floor").style.right=(el.offsetWidth+14)+"px"}
  else{shiftGoal.x=0;shiftGoal.y=el.offsetHeight/2}
  dirty=true;
}
function rebuild(prevNames){
  if(!C.ok)return;const selName=sel>=0?NOTES.find(n=>n.id===sel)?.name:null;
  build(prevNames);if(cur)cur=byName.get(cur.name)||null;
  if(selName&&byName.get(selName))select(byName.get(selName));else{sel=-1;nbr=new Map();applyState()}
  AG.forEach(m=>{m.noteId=-1;m.phaseName='placed'});setAgents(lastAgents);
}
function boot(){init();return C.ok}
function skipIntro(){introStart=-1;if(growth)growth.fill(1);if(iMesh)writeMatrices();auto=false;if(renderer)renderer.shadowMap.needsUpdate=true;dirty=true}
return {boot,skipIntro,setAgents,setLevels,pulse,say,floater,emote,celebrate,focus,clear,overview,toggleWalk,cycleTime,shift,rebuild,setMarkers,
  // integration points for other modules (guides, title, world): read-only handles plus hooks
  scene:()=>scene,camera:()=>camera,renderer:()=>renderer,districts:()=>DIST,buildings:()=>B,world:()=>({GSIDE,WORLD,NAV}),labelCands:[],addPicker:f=>pickers.push(f),onFrame:f=>frameHooks.push(f),route,gate,flyAt:(x,z,y=0,dist=40,pitch=.4)=>{if(!C.ok)return;if(walk)exitWalk();auto=false;goal.tx=x;goal.tz=z;goal.ty=y;goal.dist=dist;goal.pitch=pitch;dirty=true},mode:()=>mode,flyTo:id=>{const m=AG.get(id);if(!m||!C.ok)return false;if(walk)exitWalk();auto=false;goal.tx=m.pos.x;goal.tz=m.pos.z;goal.ty=m.pos.y;goal.dist=34;goal.pitch=.32;dirty=true;return true},pause:b=>{paused=!!b;if(!b)dirty=true},ok:()=>C.ok,selectedName:()=>sel>=0?NOTES[sel].name:null,position:()=>({x:cam.tx,z:cam.tz,yaw:cam.yaw,walking:walk}),debug:()=>({cam,goal,walk,mode,W,H,N:inst.length,districts:DIST.length,world:WORLD,sol:SOL,post:postState,tex:TEX,
    // testing only: pin the local clock to a decimal hour (null restores the real clock) and recompute the sky
    setClock:h=>{SOL.clockOverride=h==null?null:+h;if(C.ok)applyMode("auto")}})};
})();

