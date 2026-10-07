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
const TOUCH=matchMedia("(pointer:coarse)").matches||navigator.maxTouchPoints>0;
if(TOUCH)stage.classList.add("touch");
let renderer,scene,camera,sun,hemi,skyMat,skyMesh,ground,groundMat,iMesh,mat,uni={},ringMesh,bridgeGroup,markerGroup,rc;
let W=1,H=1,paused=false,dirty=true,last=0,time=0,lastLbl=0,lastMini=0,firstFrame=false,introStart=-1;
let B=[],DIST=[],BLOCKS=[],WORLD={W:1,H:1},GSIDE=1,inst=[],boxes=null,boxB=null,growth=null,delay=null,LAND=[];
let sel=-1,hov=-1,nbr=new Map(),mode=store.get("vault.time","auto"),walk=false,auto=!reduced,tasksMarks=[];
if(!["auto","dawn","dusk","night","day"].includes(mode))mode="auto";
// atmosphere and post state
let stars=null,groundUni=null,composer=null,bloomPass=null,gradePass=null,postState="off",bloomNow=0,skyTimer=0;
let glLost=false,tierNow=""; // GPU context state (see guardGL) and the quality tier last applied (applyQuality)
const TEX={},shadowDir=new THREE.Vector3(0,-1,0);
// Quality tiers. HI: desktop on "high". MID: a phone or narrow window on "high" (b_vfx.js "medium"): clouds, water,
// wind and a reduced atmosphere at a capped rate, no drones or post. AMB: the full ambient set (HI with motion allowed).
// Low keeps the city, trees and lamps but drops the moving extras, the post chain and half the shadow map.
// Read again on resize, rotation and title-settings changes (readQuality), so none of this needs a reload.
let QUALITY="high",HI=false,AMB=false,MID=false;
function readQuality(){
  QUALITY=store.get("vault.quality","high");HI=QUALITY!=="low"&&innerWidth>760;AMB=HI&&!reduced;MID=QUALITY!=="low"&&!HI&&!reduced;
  return typeof VFX!=="undefined"?VFX.tier():(HI?"high":QUALITY==="low"?"low":"medium");
}
readQuality();
// World uniforms shared by every patched material: one object per uniform, so a single write reaches all shaders.
const SH={uTime:{value:0},uSunDir:{value:new THREE.Vector3(0,1,0)},uSunFog:{value:new THREE.Color()},uFogH:{value:52},uCloudSh:{value:0},uSkyRef:{value:new THREE.Color()},uLamp:{value:0},uNight:{value:0},uOcc:{value:1}}; // uOcc: share of windows still lit (falls after midnight, world pass)
// b_vfx.js weather and ink uniforms (wetness, mist, wind, rain, write sweeps) ride the same object.
const VFXOK=typeof VFX!=="undefined";if(VFXOK)Object.assign(SH,VFX.U);
const SH_DECL="uniform float uTime;uniform vec3 uSunDir;uniform vec3 uSunFog;uniform float uFogH;uniform float uCloudSh;uniform vec3 uSkyRef;uniform float uLamp;uniform float uNight;uniform float uOcc;\n"+(VFXOK?VFX.DECL:"uniform float uMist;uniform float uWet;\n");
const NOISE_GLSL=`float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(h21(i),h21(i+vec2(1.0,0.0)),f.x),mix(h21(i+vec2(0.0,1.0)),h21(i+vec2(1.0,1.0)),f.x),f.y);}
float cloudSh(vec2 p){p=p*0.0032+uTime*vec2(0.0055,0.0027);float n=vn(p)*0.62+vn(p*2.31+7.0)*0.38;return 1.0-uCloudSh*smoothstep(0.5,0.74,n);}
`;
// Height fog with warm in-scatter toward the light: thick along the streets, thin over the roofs.
const FOG_GLSL=p=>`#ifdef USE_FOG
{vec3 fp=${p}-cameraPosition;float fd=max(length(fp),0.001);
 float hf=exp(-max(${p}.y,0.0)/(uFogH*(1.0+uMist*0.7)));float dens=fogDensity*(0.55+0.95*hf)*(1.0+uMist*(0.75-0.45*uNight)+uWet*0.08*(1.0-uNight));
 float ff=1.0-exp(-dens*dens*fd*fd);float sa=pow(max(dot(fp/fd,uSunDir),0.0),5.0);
 gl_FragColor.rgb=mix(gl_FragColor.rgb,mix(fogColor,uSunFog,sa*0.8),ff);}
#endif`;
let districtAssets=null;
// Facades (b_buildings.js): per-note signals, the one-draw dressing mesh, per-building instance ranges for partial
// state uploads, the busy set cached by setAgents, the pending aState range, and the walker's nearest door.
const FACADES=typeof Facades!=="undefined";
let facade=null,FSIG=[],bRange=[],busyIds=new Set(),stRange=null,doorNear=-1,lastDoorScan=0,taskOf=new Map();
let decor=null,roofProps=null,roofAnim=[],drones=null,motes=null,lampHalo=null,water=null,lastAmb=0;
const _c1=new THREE.Color(),_c2=new THREE.Color();
const cam={tx:0,ty:0,tz:0,yaw:.5,pitch:.62,dist:700},goal=Object.assign({},cam);
const shiftNow={x:0,y:0},shiftGoal={x:0,y:0};
const keys=new Set();
// Touch walking: an analog stick (left thumb) feeds the same walk step as WASD.
const joy={f:0,r:0,id:null};
const lin=h=>new THREE.Color(h).convertSRGBToLinear();

// Key states. "auto" blends between them from the real sun elevation (see SOL below); the three named ones are the manual presets.
// haze: horizon band colour. moon: moonlight colour used as the "sun" light when the sun is down.
// Daylight calibrated at city overview distance: retain surface contrast through haze.
// Night/dusk exposure and district palette stay independent of this midday key.
const MODES={
  dusk:{top:"#0f1733",mid:"#3a4577",bot:"#8a6a86",haze:"#c98a6e",sun:"#ff9a4d",sunI:3.6,dir:[.74,.3,.46],hSky:"#6f7fba",hGnd:"#3a2d3c",hI:.95,fog:"#6c5b7c",fogD:.00062,exp:1.1,win:1.5,ui:"dark",stars:.25,bloom:.55,cloud:.62,csh:.12},
  night:{top:"#03050d",mid:"#0b1230",bot:"#1b2650",haze:"#243052",sun:"#8fa8ff",sunI:.35,dir:[.5,.36,.5],hSky:"#283252",hGnd:"#0a0c16",hI:.7,fog:"#0a1024",fogD:.00105,exp:1.2,win:2.1,ui:"dark",stars:1,bloom:1,cloud:.4,csh:0},
  day:{top:"#6ea4d6",mid:"#d7e7f4",bot:"#f6efe2",haze:"#f4e6cf",sun:"#fff6d8",sunI:1.8,dir:[.38,.78,.36],hSky:"#e7f1fb",hGnd:"#7ea15c",hI:.65,fog:"#e7f0e4",fogD:.00018,exp:.92,win:.34,ui:"light",stars:0,bloom:.28,cloud:.28,csh:.16},
  dawn:{top:"#2a3a6e",mid:"#7a86b4",bot:"#e2a98c",haze:"#f0b08a",sun:"#ffc08a",sunI:2.6,dir:[.74,.3,.46],hSky:"#8c9ccc",hGnd:"#4a3d3c",hI:.9,fog:"#9a8a98",fogD:.0007,exp:1.05,win:1.0,ui:"dark",stars:.1,bloom:.4,cloud:.58,csh:.15}
};
const MODE_ORDER=["auto","dawn","day","dusk","night"];
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
// Architectural massing follows the district's stable identity, independent of note count.
function districtStyle(top){const n=parseInt(top,10);return Number.isFinite(n)?((n%5)+5)%5:Math.floor(hash01(top)*5)}
function tiersFor(cx,cz,fw,fd,h,rnd,style=0){
  if(style===1&&h>=15){const a=h*.22,b=h*.76;return[{x:cx,z:cz,w:fw,d:fd,y0:0,y1:a},{x:cx,z:cz,w:fw*.58,d:fd*.82,y0:a,y1:b},{x:cx,z:cz,w:fw*.72,d:fd*.9,y0:b,y1:h}]}
  if(style===2&&h>=15){return[{x:cx,z:cz,w:fw,d:fd,y0:0,y1:h*.32},{x:cx-fw*.13,z:cz,w:fw*.7,d:fd*.88,y0:h*.32,y1:h*.67},{x:cx-fw*.24,z:cz,w:fw*.46,d:fd*.72,y0:h*.67,y1:h}]}
  if(style===3&&h>=15){return[{x:cx,z:cz,w:fw,d:fd,y0:0,y1:h*.16},{x:cx,z:cz,w:fw*.88,d:fd*.62,y0:h*.16,y1:h*.91},{x:cx,z:cz,w:fw*.92,d:fd*.72,y0:h*.91,y1:h}]}
  if(style===4&&h>=15){return[{x:cx,z:cz,w:fw,d:fd,y0:0,y1:h*.42},{x:cx,z:cz,w:fw*.72,d:fd*.72,y0:h*.42,y1:h*.78},{x:cx,z:cz,w:fw*.32,d:fd*.32,y0:h*.78,y1:h}]}

  const j=(rnd-.5);
  if(h<15)return[{x:cx,z:cz,w:fw,d:fd,y0:0,y1:h}];
  if(h<32){const h1=h*(.38+.1*rnd);return[{x:cx,z:cz,w:fw,d:fd,y0:0,y1:h1},{x:cx+j*fw*.14,z:cz-j*fd*.12,w:fw*.68,d:fd*.7,y0:h1,y1:h}]}
  const h1=h*.28,h2=h*.64;
  return[{x:cx,z:cz,w:fw,d:fd,y0:0,y1:h1},{x:cx+j*fw*.12,z:cz+j*fd*.1,w:fw*.76,d:fd*.74,y0:h1,y1:h2},{x:cx+j*fw*.18,z:cz-j*fd*.14,w:fw*.5,d:fd*.52,y0:h2,y1:h}];
}
function layout(){
  const CELL=15,PAD=1.9;
  const groups=new Map();
  if(typeof Districts!=="undefined")Districts.all.forEach(d=>groups.set(d.folder,new Map()));
  NOTES.forEach(n=>{const parts=(n.folder||"").split("/");const top=typeof Districts!=="undefined"&&Districts.worldTop?Districts.worldTop(n):parts[0]||"Root";const sub=parts.length>1?parts[1]:"·";if(!groups.has(top))groups.set(top,new Map());const g=groups.get(top);if(!g.has(sub))g.set(sub,[]);g.get(sub).push(n)});
  const ds=[...groups].map(([top,subs])=>({top,subs,count:[...subs.values()].reduce((a,s)=>a+s.length,0)})).sort((a,b)=>b.count-a.count);
  const total=ds.reduce((a,d)=>a+(d.count+4)*CELL*CELL*PAD,0);
  const Wd=Math.sqrt(total*1.3),Hd=total/Wd;
  B=new Array(NOTES.length);DIST=[];BLOCKS=[];
  const rects=squarify(ds.map(d=>({d,v:d.count+4})),-Wd/2,-Hd/2,Wd,Hd);
  rects.forEach(r=>{
    const d=r.it.d,ROAD=9,px=r.x+ROAD/2,pz=r.y+ROAD/2,pw=r.w-ROAD,pd=r.h-ROAD;
    DIST.push({top:d.top,name:d.top.replace(/^\d+ - /,""),x:px,z:pz,w:pw,d:pd,count:d.count,color:(typeof Districts!=="undefined"?Districts.get(d.top)?.color:null)||FOLDER_COLORS[d.top]||"#8A93AD"});
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
        B[note.id]={id:note.id,cx,cz,fw,fd,h,rnd,worldTop:d.top,style:districtStyle(d.top),tiers:tiersFor(cx,cz,fw,fd,h,rnd,districtStyle(d.top))};
      });
    });
  });
  WORLD={W:Wd,H:Hd};GSIDE=Math.max(Wd,Hd)+160;
  LAND=NOTES.filter(n=>["division","moc","home"].includes(n.fm.type)||n.out.size+n.back.size>=34).map(n=>n.id);
}

// ---------- ground plan painted to one texture
function paintGround(){
  const S=HI?4096:2048,cvs=document.createElement("canvas");cvs.width=cvs.height=S;const g=cvs.getContext("2d"),sc=S/GSIDE;
  const X=x=>(x+GSIDE/2)*sc,Z=z=>(z+GSIDE/2)*sc;
  g.fillStyle="#5f9142";g.fillRect(0,0,S,S);
  for(let i=0;i<70;i++){const x=Math.random()*S,y=Math.random()*S,r=50+Math.random()*180;const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,Math.random()<.55?"rgba(132,176,74,.42)":"rgba(62,98,42,.34)");gr.addColorStop(1,"rgba(0,0,0,0)");g.fillStyle=gr;g.beginPath();g.arc(x,y,r,0,7);g.fill()}
  const rgb=h=>{const c=new THREE.Color(h);return [c.r*255|0,c.g*255|0,c.b*255|0]};
  // packed-earth avenues ring each court; the court paint covers the inner lawn
  DIST.forEach(d=>{
    g.fillStyle="#c6a36e";
    const pad=1.6,band=3.4;
    g.fillRect(X(d.x-pad-band),Z(d.z-pad-band),(d.w+(pad+band)*2)*sc,band*sc);
    g.fillRect(X(d.x-pad-band),Z(d.z+d.d+pad),(d.w+(pad+band)*2)*sc,band*sc);
    g.fillRect(X(d.x-pad-band),Z(d.z-pad),band*sc,(d.d+pad*2)*sc);
    g.fillRect(X(d.x+d.w+pad),Z(d.z-pad),band*sc,(d.d+pad*2)*sc);
  });
  DIST.forEach(d=>{
    const [r,gg,b]=rgb(d.color);
    g.setLineDash([]);g.fillStyle="#e6d8c2";g.fillRect(X(d.x),Z(d.z),d.w*sc,d.d*sc);
    g.fillStyle=`rgba(${r},${gg},${b},.14)`;g.fillRect(X(d.x),Z(d.z),d.w*sc,d.d*sc);
    g.strokeStyle=`rgba(${r},${gg},${b},.55)`;g.lineWidth=.55*sc;g.strokeRect(X(d.x),Z(d.z),d.w*sc,d.d*sc);
    g.setLineDash([11*sc,9*sc]);g.strokeStyle="rgba(255,236,200,.2)";g.lineWidth=.4*sc;g.strokeRect(X(d.x-4.5),Z(d.z-4.5),(d.w+9)*sc,(d.d+9)*sc);
    if(typeof DistrictLook!=="undefined")DistrictLook.paintCourt(g,d,X,Z,sc); // per-district paving and gateway medallion
  });
  const inCourt=(x,z)=>DIST.some(d=>x>=d.x&&z>=d.z&&x<=d.x+d.w&&z<=d.z+d.d);
  const petals=["#f6d76a","#f3b7c8","#fff8ee","#e07aa0","#d5e07a","#c9a4e0","#f7f3ea"];
  g.globalAlpha=.9;
  for(let i=0;i<2800;i++){const x=-GSIDE/2+Math.random()*GSIDE,z=-GSIDE/2+Math.random()*GSIDE;if(inCourt(x,z))continue;g.fillStyle=petals[i%petals.length];g.beginPath();g.arc(X(x),Z(z),.28*sc+Math.random()*.45*sc,0,7);g.fill()}
  g.globalAlpha=1;
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
  float drift=0.96+0.08*vn(wp*0.018);
  vec3 plan=diffuseColor.rgb;
  vec3 lawn=plan*vec3(0.9,1.08,0.8);
  // world pass: meadow patches, faint mowing bands, and worn footpaths that wander across the lawns (noise contours)
  lawn*=mix(0.86,1.1,vn(wp*0.06+3.1))*(1.0+0.035*step(0.5,fract(wp.x*0.11+vn(wp*0.01)*0.6)));
  float trail=1.0-smoothstep(0.0,0.03,abs(vn(wp*0.012+7.3)-0.5));
  lawn=mix(lawn,plan*vec3(1.12,0.98,0.82)*0.92,trail*0.5);
  vec3 court=plan*vec3(1.06,1.0,0.9);
  diffuseColor.rgb=mix(lawn,court,m)*drift*mix(0.78,1.0,ao)*cloudSh(wp);
  // after dark the plazas read slightly damp: lower roughness catches the lamp pools and window glow
  roughnessFactor=mix(0.92,0.78,m)-uNight*0.22*m;
${VFXOK?VFX.GROUND_GLSL:""}
}`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
{ vec3 lm=texture2D(t_light,vec2(vGPos.x/uSide+0.5,0.5-vGPos.z/uSide)).rgb;totalEmissiveRadiance+=lm*lm*uLamp*1.3;
${VFXOK?VFX.GROUND_EM_GLSL:""} }`).replace("#include <fog_fragment>",FOG_GLSL("vGPos"));
    if(typeof DistrictLook!=="undefined")DistrictLook.patchGround(sh); // active-district inlay and entry sweep
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
      .replace("#include <common>","#include <common>\nuniform float uWin;uniform sampler2D t_glass;uniform sampler2D t_stone;uniform sampler2D t_steel;uniform sampler2D t_roof;uniform sampler2D t_leaf;varying vec3 vBCol;varying vec4 vBTint;varying vec4 vBSt;varying vec4 vBExt;varying vec3 vWPos;varying vec3 vBN;varying vec3 vLoc;varying vec3 vScl;\n"+SH_DECL+NOISE_GLSL+(VFXOK?VFX.INK_GLSL:"")+"vec3 srgb(vec3 c){return pow(c,vec3(2.2));}")
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
  // Facades.pack (b_buildings.js) in aExt.w: pattern + 5*(tone + 4*(weather + 3*(stale + 3*recent))), all <= 539
  float pk=floor(vBExt.w+0.5);
  float pat=mod(pk,5.0);pk=floor(pk/5.0);
  float tone=mod(pk,4.0);pk=floor(pk/4.0);
  float wthr=mod(pk,3.0)*0.5;pk=floor(pk/3.0);
  float stale=mod(pk,3.0)*0.5;float fresh=floor(pk/3.0)*0.5;
  float isOp=1.0-step(0.5,abs(tone-1.0)),isCh=1.0-step(0.5,abs(tone-2.0)),isPend=1.0-step(0.5,abs(tone-3.0));
  // window pattern per district style: 0 punched, 1 ribbon bands, 2 tall piers, 3 civic arches, 4 fine curtain wall
  vec2 pit=vec2(2.5,3.3);vec4 pb=vec4(0.14,0.86,0.24,0.78);float mw=0.04;float lobH=3.1;
  if(pat>0.5&&pat<1.5){pit=vec2(4.2,3.3);pb=vec4(0.02,0.98,0.34,0.74);mw=0.012;}
  else if(pat>1.5&&pat<2.5){pit=vec2(1.7,3.3);pb=vec4(0.24,0.76,0.12,0.88);mw=0.0;}
  else if(pat>2.5&&pat<3.5){pit=vec2(3.1,4.4);pb=vec4(0.2,0.8,0.14,0.84);mw=0.025;lobH=4.2;}
  else if(pat>3.5){pit=vec2(1.25,1.65);pb=vec4(0.06,0.94,0.07,0.93);mw=0.0;}
  vec2 g=vec2(u,vWPos.y)/pit;
  vec2 id=floor(g);vec2 f=fract(g);
  // distance-based level of detail: windows fade to an average glow far away (fwidth stippled on some GPUs)
  float far=smoothstep(240.0,620.0,length(cameraPosition-vWPos));
  float mull=step(mw,abs(f.x-0.5));
  float pane=step(pb.x,f.x)*step(f.x,pb.y)*step(pb.z,f.y)*step(f.y,pb.w)*mull;
  // civic windows close in a round arch
  float civ=1.0-step(0.5,abs(pat-3.0));
  pane*=mix(1.0,max(step(f.y,0.66),step(length(vec2((f.x-0.5)/0.3,(f.y-0.66)/0.18)),1.0)),civ);
  // solid corner piers, a coping band at the top of each tier, a spandrel above each setback
  float solid=smoothstep(0.55,0.95,edgeD)*step(0.95,topD)*step(0.7,botD+tier0);
  float inW=mix(pane,0.42,far)*solid;
  // quantize the per-building seed: interpolated attributes drift by an ulp and the hash would stipple
  float bs=floor(vBSt.z*997.0+0.5);
  float r=h21(id+bs*0.0917+useZ*17.0);
  // whole floors share a mood: some fully staffed, a few dark, the rest scattered
  float fl=h21(vec2(id.y*7.13+useZ,bs*0.0531));
  float pLit=clamp(vBSt.x*(0.2+1.05*fl)+step(0.9,fl)*0.55-step(fl,0.16)*0.6,0.0,1.0);
  pLit*=mix(0.3,1.0,uOcc); // world pass: after midnight the city goes to bed, floor by floor
  float rr=mix(r,fract(r+floor(uTime*0.012+r*9.0)*0.618),step(0.82,h21(id*5.3+1.7))); // a few rooms switch on and off
  float lit=mix(step(1.0-pLit,rr),pLit,far);
  // ground-floor lobby: a full-height glass storefront on the base tier
  float lobbyZ=wall*(1.0-step(lobH,vWPos.y))*tier0*smoothstep(0.3,0.7,edgeD);
  float lw=lobbyZ*step(0.1,fract(u/1.6))*step(0.3,vWPos.y)*step(vWPos.y,lobH-0.25)*(1.0-isPend)*(1.0-wthr*0.8);
  vec3 warm=mix(vec3(1.0,0.68,0.32),vec3(0.62,0.78,1.0),step(0.9,h21(id.yx+bs*0.013)));
  warm=mix(warm,vec3(1.0,0.86,0.66),step(0.62,fl)*0.55);
  warm=mix(warm,vBTint.rgb*1.6,0.3*step(0.55,h21(id*1.7+3.0)));
  // note recency: fresh notes burn warm and bright, stale ones cool and fade; chartered divisions read steady and cool
  warm=mix(warm,vec3(1.0,0.84,0.6),fresh*0.45);
  warm=mix(warm,vec3(0.56,0.64,0.8),stale*0.55);
  warm=mix(warm,vec3(0.74,0.86,1.0),isCh*0.5);
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
  float sy=abs(fract(vWPos.y/pit.y)-0.5),sx=abs(fract(u/pit.x)-0.5);
  float seam=1.0-0.42*(1.0-far)*(1.0-smoothstep(0.44,0.48,max(sy,sx)))*wall;
  seam=mix(seam,1.0,step(0.5,variant)*0.5);
  vec3 tex=mix(ft,rt*1.1,top);
  float coping=wall*(1.0-step(0.45,topD));
  float bev=wall*(1.0-smoothstep(0.0,0.28,edgeD));
  float ao=mix(1.0,mix(0.4,1.0,smoothstep(0.0,2.6,botD)),wall);
  vec3 base=tex*(0.42+vBCol*3.4)*mix(1.0,0.9,top)*seam;
  base*=mix(1.0,1.6,coping)*(1.0+0.4*bev)*ao*cloudSh(vWPos.xz)*mix(1.0,0.72,uNight);
  float dayL=1.0-uNight;
  float timber=max(smoothstep(0.40,0.48,abs(fract(u/pit.x)-0.5)),smoothstep(0.44,0.49,abs(fract(vWPos.y/pit.y)-0.5)));
  vec3 plaster=mix(vec3(0.84,0.76,0.64),vBTint.rgb,0.26);
  vec3 wallDay=mix(plaster,vec3(0.30,0.16,0.08),timber*0.92);
  base=mix(base,wallDay,dayL*0.88*wall);
  base=mix(base,mix(vec3(0.64,0.24,0.12),vBTint.rgb,0.16),dayL*0.92*top*(1.0-green));
  // glass: punched windows, the lobby, and on curtain-wall towers most of the face
  float glassM=max(w,lw);
  float reflM=wall*max(glassM,glassV*0.55*solid*(1.0-lobbyZ));
  glassM*=mix(1.0,0.2,dayL);
  reflM*=mix(1.0,0.08,dayL);
  diffuseColor.rgb=mix(base,vec3(0.010,0.013,0.024),glassM*mix(0.7,1.0,wk));
  // archived and superseded notes weather: grey, streaked under the sills, windows boarded, roofs mossed over
  float streak=smoothstep(0.42,0.86,vn(vec2(u*1.9,vWPos.y*0.07+bs)));
  vec3 grey=vec3(dot(diffuseColor.rgb,vec3(0.3,0.59,0.11)));
  diffuseColor.rgb=mix(diffuseColor.rgb,grey*0.78,wthr*0.75);
  diffuseColor.rgb*=1.0-wthr*0.38*streak*wall*(1.0-far);
  diffuseColor.rgb=mix(diffuseColor.rgb,vec3(0.16,0.11,0.07),wthr*w*0.85);
  diffuseColor.rgb=mix(diffuseColor.rgb,vec3(0.17,0.24,0.12),wthr*top*0.55*smoothstep(0.3,0.7,vn(vWPos.xz*0.6)));
  roughnessFactor=mix(roughnessFactor,mix(0.42,0.6,step(0.5,variant)),wall);
  metalnessFactor=mix(metalnessFactor,0.35*step(1.5,variant)+0.12*glassV,wall);
  roughnessFactor=mix(roughnessFactor,0.14,reflM);
  metalnessFactor=mix(metalnessFactor,0.05,glassM);
  roughnessFactor=mix(roughnessFactor,0.9,dayL*wall*(1.0-glassM));
  metalnessFactor=mix(metalnessFactor,0.02,dayL*wall);
  // sky in the glass: Fresnel-weighted, each pane a touch different so the grid reads
  vec3 V=normalize(cameraPosition-vWPos);
  float fres=pow(1.0-clamp(dot(N,V),0.0,1.0),4.0);
  vec3 em=uSkyRef*(0.16+0.9*fres)*(0.72+0.56*h21(id*3.1+1.0))*reflM;
  em+=warm*flick*ceilL*w*wk*lit*uWin*0.42*(1.0+hi*2.2)*(1.0+0.6*fresh)*(1.0-0.5*stale)*(1.0-0.9*wthr);
  em+=vec3(1.0,0.62,0.3)*lw*wk*uWin*0.3;
  em+=top*(1.0-green)*(vBTint.rgb*vBTint.a*1.1+vec3(1.0,0.62,0.2)*hi*0.9);
  em+=wall*(1.0-w)*vec3(1.0,0.6,0.2)*hi*0.10;
  // crown: a thin amber line under the coping of tall towers after dusk
  float crown=wall*vBExt.x*max(step(28.0,vBExt.y),isOp)*step(0.5,topD)*(1.0-step(0.78,topD))*(1.0-wthr);
  em+=vec3(1.0,0.64,0.24)*crown*wk*2.4;
  totalEmissiveRadiance+=em*vBSt.w;
  ${VFXOK?"totalEmissiveRadiance+=vfxInk(vWPos,wall,top);":""}
  diffuseColor.rgb*=vBSt.w;
}`).replace("#include <fog_fragment>",FOG_GLSL("vWPos"));
  };
  return m;
}
function buildInstances(prev){
  if(iMesh){scene.remove(iMesh);iMesh.geometry.dispose()}
  inst=[];bRange=[];stRange=null;B.forEach(b=>{if(!b)return;bRange[b.id]=[inst.length,b.tiers.length];b.tiers.forEach((t,k)=>inst.push({b,t,k}))});
  // one facade signal per note (status, age, links, last editor, task); read by the shader, the dressing and the hover sign
  const nowMs=Date.now();FSIG=FACADES?NOTES.map(n=>Facades.signal(n,{now:nowMs,byName,task:taskOf.get(n.id)})):[];
  const N=inst.length;
  const geo=new THREE.BoxGeometry(1,1,1);geo.translate(0,.5,0);
  const aCol=new Float32Array(N*3),aTint=new Float32Array(N*4),aSt=new Float32Array(N*4),aExt=new Float32Array(N*4);
  const wall=new THREE.Color(),c2=new THREE.Color(),tmp=new THREE.Color();
  inst.forEach((it,i)=>{
    const n=NOTES[it.b.id],rnd=it.b.rnd,deg=n.out.size+n.back.size,ty=n.fm.type,col=(typeof Districts!=="undefined"?Districts.get(it.b.worldTop)?.color:null)||FOLDER_COLORS[it.b.worldTop]||colorOf(n);
    wall.set(0x232a3d).lerp(c2.set(col),.11+.06*rnd).multiplyScalar(.82+.36*hash01(n.name+it.k));wall.convertSRGBToLinear();
    aCol.set([wall.r,wall.g,wall.b],i*3);
    tmp.set(col).convertSRGBToLinear();
    const lm=(["division","moc","home"].includes(ty)&&it.k===it.b.tiers.length-1)?1:0;
    aTint.set([tmp.r,tmp.g,tmp.b,lm],i*4);
    let lit=.2+.5*Math.min(1,deg/14);
    if(n.fm.status==="operating")lit+=.2;else if(n.fm.status==="pending")lit-=.1;
    if(n.agentTouched)lit+=.3;
    const fs=FSIG[it.b.id];
    // facade signals: stale notes fade, fresh ones glow, archives go dark (Facades.windowLight)
    if(fs)lit=Facades.windowLight(fs,lit-(n.fm.status==="operating"?.2:n.fm.status==="pending"?-.1:0));
    aSt.set([clamp(lit,fs?.04:.08,.95),0,rnd,1],i*4);
    aExt.set([it.k===it.b.tiers.length-1?1:0,it.b.h,it.k,fs?Facades.pack(it.b.style,fs):0],i*4);
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
function growthOf(id){if(introStart<0||!growth||growth[id]>=1)return 1;return ease((time-introStart-(delay?delay[id]:0))/1.15)}
function writeRoofs(){
  if(!roofAnim.length)return;
  const o=new THREE.Object3D(),seen=new Set();
  for(const r of roofAnim){const gg=growthOf(r.id);o.position.set(r.x,r.y*gg,r.z);o.rotation.set(0,r.ry,0);o.scale.set(r.sx,Math.max(.001,r.sy*gg),r.sz);o.updateMatrix();r.mesh.setMatrixAt(r.i,o.matrix);seen.add(r.mesh)}
  seen.forEach(m=>{m.instanceMatrix.needsUpdate=true});
}
function writeMatrices(){
  const a=iMesh.instanceMatrix.array;
  for(let i=0;i<inst.length;i++){
    const it=inst[i],t=it.t,g=ease((time-introStart-delay[it.b.id])/1.15);
    const gg=introStart<0?1:(growth[it.b.id]>=1?1:g);
    const o=i*16;
    a[o]=t.w;a[o+1]=0;a[o+2]=0;a[o+3]=0;a[o+4]=0;a[o+5]=Math.max(.001,(t.y1-t.y0)*gg);a[o+6]=0;a[o+7]=0;a[o+8]=0;a[o+9]=0;a[o+10]=t.d;a[o+11]=0;a[o+12]=t.x;a[o+13]=t.y0*gg;a[o+14]=t.z;a[o+15]=1;
  }
  iMesh.instanceMatrix.needsUpdate=true;
  writeRoofs();
}
// Highlight and dim per instance. ids: only those buildings (hover, pulse, busy change) with a partial upload;
// no ids: every instance (selection, rebuild). The busy set is cached by setAgents, not rebuilt per hover.
function stateRange(st,lo,hi){
  stRange=stRange?[Math.min(stRange[0],lo),Math.max(stRange[1],hi)]:[lo,hi];
  st.updateRange.offset=stRange[0]*4;st.updateRange.count=(stRange[1]-stRange[0])*4;st.needsUpdate=true;
}
function applyState(ids){
  const st=iMesh.geometry.attributes.aState,arr=st.array;
  const write=(k0,k1)=>{for(let k=k0;k<k1;k++){
    const b=inst[k].b.id;let hi=0,dim=1;
    if(sel>=0){if(b===sel)hi=1;else if(nbr.has(b))hi=.55;else dim=.5}
    if(b===hov&&b!==sel)hi=Math.max(hi,.4);
    if(busyIds.has(b)){hi=Math.max(hi,.7);dim=1}
    if(pulses.has(b)){hi=Math.max(hi,.95);dim=1}
    arr[k*4+1]=hi;arr[k*4+3]=dim;
  }};
  if(ids){let lo=Infinity,hi=-1;for(const id of ids){const r=id>=0?bRange[id]:null;if(!r)continue;write(r[0],r[0]+r[1]);lo=Math.min(lo,r[0]);hi=Math.max(hi,r[0]+r[1])}
    if(hi>lo)stateRange(st,lo,hi);}
  else{write(0,inst.length);stateRange(st,0,inst.length)}
  dirty=true;
}
function busySet(){const busy=new Set();AG.forEach(m=>{if(m.grp.visible&&m.noteId>=0&&m.info&&LIVE_ST.includes(m.info.status))busy.add(m.noteId)});return busy}

// ---------- sky, light, mode
function skyMaterial(){
  return new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,fog:false,defines:{OCT:HI?5:3},
    uniforms:{top:{value:new THREE.Color()},mid:{value:new THREE.Color()},bot:{value:new THREE.Color()},haze:{value:new THREE.Color()},sunCol:{value:new THREE.Color()},sunDir:{value:new THREE.Vector3(0,1,0)},moonDir:{value:new THREE.Vector3(0,1,0)},moonI:{value:0},sunDisc:{value:1},uCloud:{value:.5},uTime:SH.uTime,uNight:SH.uNight,uPhase:{value:.5},uBand:{value:new THREE.Vector3(.3,.2,.93)},uStars:{value:0},uShoot:{value:0}},
    vertexShader:"varying vec3 vD;void main(){vD=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
    fragmentShader:`uniform vec3 top;uniform vec3 mid;uniform vec3 bot;uniform vec3 haze;uniform vec3 sunCol;uniform vec3 sunDir;uniform vec3 moonDir;uniform float moonI;uniform float sunDisc;uniform float uCloud;uniform float uTime;uniform float uNight;uniform float uPhase;uniform vec3 uBand;uniform float uStars;uniform float uShoot;varying vec3 vD;
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
  // moon: a lit sphere in today's phase (uPhase 0 new, 0.5 full), maria, earthshine on the dark limb
  vec3 md=normalize(moonDir);float m=max(dot(d,md),0.0);
  vec3 mt=normalize(cross(md,abs(md.y)>0.99?vec3(1.0,0.0,0.0):vec3(0.0,1.0,0.0)));vec3 mb=cross(mt,md);
  vec2 ml=vec2(dot(d,mt),dot(d,mb))/0.0175;float mr=dot(ml,ml);
  float mdisc=(1.0-smoothstep(0.82,1.0,mr))*step(0.0,dot(d,md));
  vec3 mn=vec3(ml,sqrt(max(1.0-mr,0.0)));float ph=uPhase*6.2832;
  float mlit=smoothstep(-0.04,0.14,dot(mn,vec3(sin(ph),0.0,-cos(ph))));
  float face=1.0-0.3*smoothstep(0.45,0.72,vn(ml*2.3+7.0))-0.1*smoothstep(0.55,0.8,vn(ml*6.5+1.0));
  float illum=0.5-0.5*cos(ph);
  c+=vec3(0.86,0.9,1.0)*(mdisc*2.4*face*(0.035+0.965*mlit)*(1.0-cov*0.7)+(pow(m,900.0)*0.6+pow(m,40.0)*0.08)*(0.25+0.75*illum))*moonI;
  // milky way: a dusty band with a dark lane, turning with the stars
  if(uStars>0.01&&h>0.0){float bd=dot(d,normalize(uBand));float band=exp(-bd*bd/0.028);
    vec2 bp=vec2(atan(d.z,d.x)*3.0,bd*9.0);float dust=vn(bp*2.0)*0.6+vn(bp*5.3)*0.4;
    float lane=1.0-smoothstep(0.0,0.05,abs(bd+0.03*(vn(bp*3.0)-0.5)));
    c+=vec3(0.55,0.6,0.85)*band*(0.35+0.65*dust)*(1.0-0.6*lane*smoothstep(0.35,0.7,dust))*uStars*0.085*(1.0-cov)*smoothstep(0.0,0.25,h);}
  // shooting stars: at most one every few seconds, clear dark skies only, on tiers whose clock runs
  if(uShoot>0.5&&uStars>0.5&&h>0.15){
    float slot=floor(uTime/5.5),st=fract(uTime/5.5)*5.5;
    if(hs(vec2(slot,7.1))>0.5&&st<0.9){
      vec2 q=d.xz/(h+0.25);vec2 p0=(vec2(hs(vec2(slot,1.3)),hs(vec2(slot,2.9)))-0.5)*1.6;
      float an=hs(vec2(slot,4.7))*6.2832;vec2 v=vec2(cos(an),sin(an));float pr=st/0.9;
      vec2 w=q-(p0+v*0.55*pr);float along=dot(w,-v),across=abs(dot(w,vec2(-v.y,v.x)));
      float trail=step(0.0,along)*(1.0-smoothstep(0.0,0.16,along));
      c+=vec3(0.9,0.95,1.0)*trail*(1.0-smoothstep(0.0,0.0035+along*0.01,across))*sin(pr*3.1416)*2.2*(1.0-cov);
    }
  }
  gl_FragColor=vec4(c,1.0);
#include <tonemapping_fragment>
#include <encodings_fragment>
}`});
}
function makeStars(){
  // a full sphere: the field turns about the celestial pole with the hour (skyRotate), so stars set and rise
  const N=HI?2600:1500,pos=new Float32Array(N*3),col=new Float32Array(N*3),seed=new Float32Array(N),R=2300;
  for(let i=0;i<N;i++){const a=Math.random()*Math.PI*2,y=-1+Math.random()*2,r=Math.sqrt(1-y*y);pos.set([Math.cos(a)*r*R,y*R,Math.sin(a)*r*R],i*3);seed[i]=Math.random();
    const t=Math.random(),b=.45+.55*Math.random()*Math.random();col.set([b*(0.85+0.15*t),b*(0.88+0.1*t),b*(1.0-0.12*t)],i*3)}
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(pos,3));g.setAttribute("color",new THREE.BufferAttribute(col,3));g.setAttribute("aSeed",new THREE.BufferAttribute(seed,1));
  const sc=document.createElement("canvas");sc.width=sc.height=32;const sg=sc.getContext("2d"),gr=sg.createRadialGradient(16,16,0,16,16,16);gr.addColorStop(0,"rgba(255,255,255,1)");gr.addColorStop(.35,"rgba(255,255,255,.55)");gr.addColorStop(1,"rgba(255,255,255,0)");sg.fillStyle=gr;sg.fillRect(0,0,32,32);
  const sprite=new THREE.CanvasTexture(sc);
  // twinkle: brightness and size scintillate per star, strongest low on the horizon; nothing below it
  const p=new THREE.Points(g,new THREE.ShaderMaterial({transparent:true,depthWrite:false,fog:false,blending:THREE.AdditiveBlending,
    uniforms:{map:{value:sprite},opacity:{value:0},uTime:SH.uTime,uPR:{value:1}},
    vertexShader:"attribute vec3 color;attribute float aSeed;uniform float uTime;uniform float uPR;varying vec3 vC;varying float vT;void main(){vec4 mv=modelViewMatrix*vec4(position,1.0);vec3 wd=normalize((modelMatrix*vec4(position,0.0)).xyz);float low=1.0-smoothstep(0.0,0.5,wd.y);float tw=0.5+0.5*sin(uTime*(1.3+aSeed*3.1)+aSeed*61.0);vT=mix(1.0,0.45+0.75*tw,0.3+0.6*low)*smoothstep(-0.01,0.07,wd.y);vC=color;gl_PointSize=5.0*uPR*mix(0.86,1.14,tw*step(0.6,aSeed));gl_Position=projectionMatrix*mv;}",
    fragmentShader:"uniform sampler2D map;uniform float opacity;varying vec3 vC;varying float vT;void main(){float a=texture2D(map,gl_PointCoord).a;gl_FragColor=vec4(vC*a*vT*opacity,1.0);}"}));
  p.renderOrder=-9;p.frustumCulled=false;p.visible=false;return p;
}
// Blend the key states by sun elevation (degrees) into CUR. night at -16 and below, twilight (dawn or dusk) at 0, day from +18.
// review fix: night used to arrive at -12, so an 18:30 visit already looked like 22:00. The twilight band now runs to -16 and holds its
// warmth longer (t^0.7), so a typical evening keeps a warm horizon before full night.
function blendSky(e,morning){
  const tw=morning?MODES.dawn:MODES.dusk;
  let a,b,t;
  if(e<0){a=MODES.night;b=tw;t=Math.pow(clamp((e+16)/16,0,1),.7);t=t*t*(3-2*t)}else{a=tw;b=MODES.day;t=clamp(e/18,0,1);t=t*t*(3-2*t)}
  NUM_KEYS.forEach(k=>CUR[k]=a[k]+(b[k]-a[k])*t);
  COL_KEYS.forEach(k=>{CUR[k].copy(lin(a[k])).lerp(_c2.copy(lin(b[k])),t)});
  CUR.ui=e>4?"light":"dark";
}
function copySky(m){NUM_KEYS.forEach(k=>CUR[k]=m[k]);COL_KEYS.forEach(k=>CUR[k].copy(lin(m[k])));CUR.ui=m.ui}
// Push CUR plus a light direction into the scene. dir is the sun when it is up, the moon when it is not.
function pushSky(dir,sunUp,moonI){
  if(VFXOK)VFX.adjustSky(CUR); // today's weather: heavier cloud, dimmer sun, hidden stars (CUR is rebuilt every call)
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
  if(stars){stars.material.uniforms.opacity.value=CUR.stars;stars.visible=CUR.stars>.01}u.uStars.value=CUR.stars;u.uShoot.value=(AMB||MID)&&!reduced?1:0;
  bloomNow=CUR.bloom;
  worldColors();SH.uOcc.value=occupancy();if(stars)skyRotate();
  // shadows re-render only when the light moves more than about half a degree
  if(shadowDir.dot(dir)<0.99996){shadowDir.copy(dir);sun.position.copy(dir).multiplyScalar(1100);renderer.shadowMap.needsUpdate=true}
  if(document.documentElement.dataset.theme!==CUR.ui){const de=document.documentElement;de.classList.add("theme-swap");de.dataset.theme=CUR.ui;store.set("vault.theme",CUR.ui);requestAnimationFrame(()=>requestAnimationFrame(()=>de.classList.remove("theme-swap")))} // review fix: no dark-on-dark flash on .btn
  if(window.HUD)HUD.phase(mode==="auto"?LIGHT.elev:mode,CUR.ui); // UI hook: golden/dusk/night HUD tint (b_hud.js); only touches the DOM when the phase changes
  dirty=true;
}
const _dir=new THREE.Vector3(),LIGHT={up:false,elev:0,col:new THREE.Color()};
function applyMode(name,animate){
  // the state on screen now (mid-glide if a transition is running), so a second tap starts from what is visible
  const shown=SKYB.on?lerpSnap(SKYB.from,SKYB.to,SKYB.e):SKYB.last;
  mode=name==="auto"||name in MODES?name:"auto";
  let up,moonI;
  if(mode==="auto"){
    solUpdate();const e=SOL.elev,morning=SOL.hours<12;blendSky(e,morning);
    up=e>-0.5;_dir.copy(up?SOL.dir:SOL.moon);if(up&&_dir.y<.06)_dir.y=.06;_dir.normalize();moonI=1-clamp((e+2)/4,0,1);
  }else{
    const m=MODES[mode];copySky(m);_dir.set(...m.dir).normalize();up=mode!=="night";moonI=mode==="night"?1:0;
  }
  const next=snapSky(_dir,up,moonI);
  if(animate&&shown&&!reduced&&C.ok){SKYB.from=shown;SKYB.to=next;SKYB.t0=performance.now();SKYB.e=0;SKYB.on=true;stepSkyBlend()}
  else{SKYB.on=false;pushSky(_dir,up,moonI)}
  SKYB.last=next;
  store.set("vault.time",mode);tipTime();
}
// ---------- sky transitions (world pass): a tap on the time button glides the whole key over ~2 s instead of cutting.
// Every CUR value, the light direction, sun disc and moon fade together; uLamp sweeps through each lamp's threshold, so
// the street lamps come on (or go off) one by one. Reduced motion keeps the instant cut.
const SKYB={on:false,t0:0,dur:2.2,e:0,from:null,to:null,last:null},_bd=new THREE.Vector3();
function snapSky(dir,up,moonI){
  const o={dir:dir.clone(),up,moonI,ui:CUR.ui};NUM_KEYS.forEach(k=>o[k]=CUR[k]);COL_KEYS.forEach(k=>o[k]=CUR[k].clone());
  o.sunDirU=(mode==="auto"&&SOL.dir.y>-.3?SOL.dir:dir).clone();o.moonDirU=(mode==="auto"?SOL.moon:dir).clone();
  o.disc=mode==="auto"?clamp((SOL.elev+3)/3,0,1):(mode==="night"?0:1);return o;
}
function lerpSnap(a,b,e){
  const o={up:e<.5?a.up:b.up,ui:e<.5?a.ui:b.ui,moonI:a.moonI+(b.moonI-a.moonI)*e,disc:a.disc+(b.disc-a.disc)*e};
  NUM_KEYS.forEach(k=>o[k]=a[k]+(b[k]-a[k])*e);COL_KEYS.forEach(k=>o[k]=a[k].clone().lerp(b[k],e));
  ["dir","sunDirU","moonDirU"].forEach(k=>{o[k]=a[k].clone().lerp(b[k],e);if(o[k].lengthSq()<1e-6)o[k].copy(b[k]);o[k].normalize()});
  return o;
}
function stepSkyBlend(){
  if(!SKYB.on||!skyMat)return false;
  const t=clamp((performance.now()-SKYB.t0)/(SKYB.dur*1000),0,1),e=easeIO(t),a=SKYB.from,b=SKYB.to;SKYB.e=e;
  NUM_KEYS.forEach(k=>CUR[k]=a[k]+(b[k]-a[k])*e);COL_KEYS.forEach(k=>CUR[k].copy(a[k]).lerp(b[k],e));CUR.ui=e<.5?a.ui:b.ui;
  _bd.copy(a.dir).lerp(b.dir,e);if(_bd.lengthSq()<1e-6)_bd.copy(b.dir);_bd.normalize();
  pushSky(_bd,e<.5?a.up:b.up,a.moonI+(b.moonI-a.moonI)*e);
  const u=skyMat.uniforms;u.sunDisc.value=a.disc+(b.disc-a.disc)*e;
  u.sunDir.value.copy(a.sunDirU).lerp(b.sunDirU,e).normalize();u.moonDir.value.copy(a.moonDirU).lerp(b.moonDirU,e).normalize();SH.uSunDir.value.copy(u.sunDir.value);
  if(t>=1)SKYB.on=false;
  return true;
}
// share of windows still lit: full through the evening, thinning to about a third by 03:30, back by 07:00
function occupancy(){
  if(mode!=="auto")return mode==="night"?.8:mode==="dawn"?.6:1;
  const h=SOL.hours;if(h>=17||h<.5)return 1;if(h<3.5)return 1-.65*(h-.5)/3;if(h<7)return .35+.65*(h-3.5)/3.5;return 1;
}
// moon phase from the date (mean synodic month from the 2000-01-06 18:14 UTC new moon): 0 new, 0.5 full
function moonPhase(now=Date.now()){const days=(now-Date.UTC(2000,0,6,18,14))/864e5;return((days/29.530588853)%1+1)%1}
// the star field turns about the celestial pole (elevation = latitude, due north) with local sidereal time
const _pole=new THREE.Vector3(),_band=new THREE.Vector3();
function skyRotate(){
  const lat=SOL.lat*Math.PI/180;_pole.set(0,Math.sin(lat),-Math.cos(lat)).normalize();
  const now=new Date(),doy=(now-new Date(now.getFullYear(),0,0))/864e5,ang=((SOL.hours+doy*24/365.2422+SOL.lon/15)/24)*Math.PI*2;
  stars.quaternion.setFromAxisAngle(_pole,-ang);
  if(skyMat){const u=skyMat.uniforms;u.uBand.value.copy(_band.set(.3,.2,.93).normalize().applyQuaternion(stars.quaternion));u.uPhase.value=moonPhase()}
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
// Postprocessing is bundled locally from the exact city renderer version.
const POST_SRC="vendor/three/examples/js/";
const POST_FILES=["shaders/CopyShader.js","shaders/LuminosityHighPassShader.js","postprocessing/EffectComposer.js","postprocessing/RenderPass.js","postprocessing/ShaderPass.js","postprocessing/UnrealBloomPass.js"];
function wantPost(){readQuality();return HI&&!reduced}
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
  if(VFXOK)VFX.patchGrade(GradeShader); // per-time colour balance and a light vignette (b_vfx.js)
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
  if(VFXOK)VFX.patchCanopy(DMAT.canopy,SH); // wind sway and gusts, vertex only
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
function gableGeometry(){
  const y=1,p=[];
  const tri=(...a)=>p.push(...a);
  tri(-.5,0,.5,.5,0,.5,.5,y,0,-.5,0,.5,.5,y,0,-.5,y,0);
  tri(-.5,0,-.5,-.5,y,0,.5,y,0,-.5,0,-.5,.5,y,0,.5,0,-.5);
  tri(-.5,0,-.5,-.5,0,.5,-.5,y,0);
  tri(.5,0,.5,.5,0,-.5,.5,y,0);
  const g=new THREE.BufferGeometry();
  g.setAttribute("position",new THREE.Float32BufferAttribute(p,3));
  g.computeVertexNormals();
  return g;
}
// Local roof details stay within the crown footprint; they never alter walking collision.
function crownDetails(t,style){
  const parts=[],add=(x,y,z,sx,sy,sz,kind)=>parts.push({x,y,z,sx,sy,sz,kind});
  const edge=.16,base=t.y1+.14;
  // A cut stone coping protects each terrace, with a deliberate opening at its front.
  add(t.x,base,t.z-t.d*.46,t.w*.94,.28,edge,"stone");
  [-1,1].forEach(side=>add(t.x+side*t.w*.46,base,t.z,edge,.28,t.d*.94,"stone"));
  if(style===1){
    // Twin photovoltaic rafts and their raised service spine.
    [-1,1].forEach(side=>add(t.x+side*t.w*.23,t.y1+.42,t.z,t.w*.34,.18,t.d*.68,"solar"));
    add(t.x,t.y1+.38,t.z,t.w*.07,.48,t.d*.76,"metal");
  }else if(style===3){
    // Civic lantern: four bronze uprights beneath a floating pavilion cap.
    [-1,1].forEach(x=>[-1,1].forEach(z=>add(t.x+x*t.w*.23,t.y1+1,t.z+z*t.d*.23,.12,2,.12,"metal")));
    add(t.x,t.y1+2.05,t.z,t.w*.64,.18,t.d*.64,"metal");
    add(t.x,t.y1+.2,t.z,t.w*.46,.22,t.d*.46,"solar");
  }else{
    // Stacked observatory crown, with a dark clerestory beneath its overhang.
    add(t.x,t.y1+.55,t.z,t.w*.6,1.1,t.d*.6,"solar");
    add(t.x,t.y1+1.15,t.z,t.w*.76,.16,t.d*.76,"metal");
  }
  return parts;
}
function pitchedRoofHeight(rise,depth,offset){return rise*Math.max(0,1-2*Math.abs(offset)/depth)}
// Narrow upper tiers (too slim for a gable or crown) still finish: a stone parapet ring and a roof hatch, inside the footprint.
function capDetails(t){
  const parts=[],e=Math.min(.16,t.w*.08,t.d*.08),y=t.y1+.15;
  parts.push({x:t.x,y,z:t.z-t.d/2+e/2,sx:t.w,sy:.3,sz:e,kind:"stone"},{x:t.x,y,z:t.z+t.d/2-e/2,sx:t.w,sy:.3,sz:e,kind:"stone"});
  parts.push({x:t.x-t.w/2+e/2,y,z:t.z,sx:e,sy:.3,sz:t.d-2*e,kind:"stone"},{x:t.x+t.w/2-e/2,y,z:t.z,sx:e,sy:.3,sz:t.d-2*e,kind:"stone"});
  parts.push({x:t.x,y:t.y1+.17,z:t.z,sx:t.w*.36,sy:.34,sz:t.d*.36,kind:"stone"});
  return parts;
}
function instMesh(geo,mat,list,shadow){const m=new THREE.InstancedMesh(geo,mat,Math.max(1,list.length));m.count=list.length;const o=new THREE.Object3D();
  list.forEach((p,i)=>{o.position.set(p.x,p.y||0,p.z);o.rotation.set(p.rx||0,p.ry||0,0);o.scale.set(p.sx||1,p.sy||1,p.sz||1);o.updateMatrix();m.setMatrixAt(i,o.matrix);if(p.c)m.setColorAt(i,p.c)});
  // r128 does not switch programs on instanceColor alone: a material shared by a tinted and an untinted batch
  // (lamp poles and rails share M.pole) would render the untinted one with a null colour buffer. Every batch
  // carries instance colour; parts without one stay white (no visual change).
  const white=new THREE.Color(1,1,1);
  if(!m.instanceColor){for(let i=0;i<Math.max(1,list.length);i++)m.setColorAt(i,white)}
  else list.forEach((p,i)=>{if(!p.c)m.setColorAt(i,white)});
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
  decor.add(instMesh(poleG,M.pole,typeof DistrictLook!=="undefined"?DistrictLook.lampFinish(L2):L2,HI)); // lamp finish per district
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
  decor.add(instMesh(canG,M.canopy,trees.map(t=>{const s=1.45+t.k*1.45,lk=typeof DistrictLook!=="undefined"?DistrictLook.tree(t.x,t.z,t.k):null;/* tree species per district */if(lk)return{x:t.x,y:1.35+t.k*1.15,z:t.z,ry:t.k*6,sx:s*lk.sx,sy:s*(1.12+t.k*.3)*lk.sy,sz:s*(.95+t.k*.18)*lk.sx,c:tc.setHSL(lk.h,lk.s,lk.l).clone()};return{x:t.x,y:1.35+t.k*1.15,z:t.z,ry:t.k*6,sx:s,sy:s*(1.12+t.k*.3),sz:s*(.95+t.k*.18),c:tc.setHSL(.28+t.k*.07,.5+t.k*.16,.42+t.k*.12).clone()}}),HI));
  // planters: low stone boxes with a shrub, at plot corners
  // Furniture remains outside building pads and uses three draw calls for the entire city.
  const seats=[],rails=[],wayfinding=[];
  DIST.forEach(d=>{
    const color=lin(d.color),step=HI?22:40;
    for(let i=step;i<d.w-step;i+=step){const x=d.x+i,z=d.z+2.5;if(!okCell(x,z,1))continue;
      seats.push({x,y:.65,z,sx:2.8,sy:.18,sz:.65,c:typeof DistrictLook!=="undefined"?DistrictLook.bench(d):undefined});
      rails.push({x:x-1,y:.28,z,sx:.14,sy:.65,sz:.65},{x:x+1,y:.28,z,sx:.14,sy:.65,sz:.65});
    }
    // Paired gate blades face each district entrance; colors match the explorer legend.
    const x=d.x+d.w*.5,z=d.z-2.5;
    [-1,1].forEach(side=>{wayfinding.push({x:x+side*2.1,y:2.6,z,sx:.22,sy:5.2,sz:.6,c:color,top:d.top});rails.push({x:x+side*2.1,y:2.6,z:z+.36,sx:.5,sy:5.6,sz:.22})});
  });
  const furnitureG=new THREE.BoxGeometry(1,1,1);
  decor.add(instMesh(furnitureG,M.planter,seats,false));
  decor.add(instMesh(furnitureG.clone(),M.pole,rails,HI));
  if(!DMAT.wayfinding){DMAT.wayfinding=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.3,metalness:.45,emissive:0xffffff,emissiveIntensity:.35});DMAT.wayfinding.onBeforeCompile=sh=>{Object.assign(sh.uniforms,SH);sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\n'+SH_DECL).replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance *= diffuseColor.rgb * (0.25 + uLamp * 1.8);');if(typeof DistrictLook!=="undefined")DistrictLook.patchGate(sh)}}
  const gateBlades=instMesh(furnitureG.clone(),DMAT.wayfinding,wayfinding,false);if(typeof DistrictLook!=="undefined")DistrictLook.tagGates(gateBlades,wayfinding);decor.add(gateBlades);
  const pl=[];DIST.forEach(d=>[[d.x+1.2,d.z+1.2],[d.x+d.w-1.2,d.z+1.2],[d.x+1.2,d.z+d.d-1.2],[d.x+d.w-1.2,d.z+d.d-1.2]].forEach(([x,z])=>{if(okCell(x,z,0))pl.push({x,z})}));
  const plG=new THREE.BoxGeometry(2.2,.7,2.2);plG.translate(0,.35,0);decor.add(instMesh(plG,M.planter,pl,false));
  decor.add(instMesh(canG,M.canopy,pl.map((p,i)=>({x:p.x,y:.3,z:p.z,sx:1,sy:.55,sz:1,c:tc.setHSL(.27,.4,.38).clone()})),false));
  // District-specific crowns and pitched roofs. Landmark notes keep their authored assembly.
  const authoredRoofs=new Set(districtAssets?.userData.records.map(r=>r.noteId)||[]);
  B.forEach(b=>{if(b){b.roofClearance=b.h;b.roofSupports=[];b.authoredRoof=false}});
  (districtAssets?.userData.records||[]).forEach(r=>{if(B[r.noteId]){B[r.noteId].roofClearance=r.y+(r.height||0);B[r.noteId].authoredRoof=true}});
  const crownStone=[],crownMetal=[],crownSolar=[];
  const gables=[],chimneys=[],ridges=[],ms=[],clay=lin("#9a3e28"),tint=new THREE.Color();
  B.forEach(b=>{
    if(!b||authoredRoofs.has(b.id))return;
    const t=b.tiers[b.tiers.length-1];
    if(Math.min(t.w,t.d)<2.2){capDetails(t).forEach(p=>{p.id=b.id;crownStone.push(p)});return}
    const along=t.w>=t.d,span=along?t.w:t.d,depth=along?t.d:t.w,rise=Math.min(4.6,Math.max(1.15,depth*.55));
    const col=(typeof Districts!=="undefined"?Districts.get(b.worldTop)?.color:null)||FOLDER_COLORS[b.worldTop]||"#9a3e28";
    if(b.h>=15&&[1,3,4].includes(b.style)){
      crownDetails(t,b.style).forEach(p=>{p.id=b.id;p.c=p.kind==="metal"?lin(col).lerp(lin("#b8ab8c"),.65):undefined;(p.kind==="stone"?crownStone:p.kind==="solar"?crownSolar:crownMetal).push(p)});
      return;
    }
    gables.push({id:b.id,x:t.x,y:t.y1,z:t.z,ry:along?0:Math.PI/2,sx:span*1.04,sy:rise,sz:depth*1.06,c:clay.clone().lerp(tint.copy(lin(col)),.28)});
    // ridge cap: a dark tile line along the apex so short pitched notes read as roofs, not boxes, from overview distance
    ridges.push({id:b.id,x:t.x,y:t.y1+rise-.06,z:t.z,ry:along?0:Math.PI/2,sx:span*1.08,sy:.2,sz:.3});
    const nm=NOTES[b.id].name;
    if(R(nm+"ch")>.38){const ox=(R(nm+"cx")-.5)*span*.45,oz=(R(nm+"cz")-.5)*depth*.2,ch=.7+R(nm+"chh")*.9;
      chimneys.push({id:b.id,x:t.x+(along?ox:oz),y:t.y1+pitchedRoofHeight(rise,depth,oz)-.06,z:t.z+(along?oz:-ox),sx:.42,sy:ch,sz:.42})}
    if(b.h>28&&R(nm+"m")>.55){const mh=3+R(nm+"mh")*4;ms.push({id:b.id,x:t.x,y:t.y1+rise,z:t.z,sx:1,sy:mh,sz:1});halo.push(t.x,t.y1+rise+mh+.15,t.z);hTh.push(R(nm+"ph"));hK.push(1)}
  });
  if(!DMAT.thatch)DMAT.thatch=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.88,metalness:0});
  if(!DMAT.brick)DMAT.brick=new THREE.MeshStandardMaterial({color:lin("#7a4030"),roughness:.94,metalness:0});
  const gableMesh=instMesh(gableGeometry(),DMAT.thatch,gables,HI);
  const chimG=new THREE.BoxGeometry(1,1,1);chimG.translate(0,.5,0);
  const chimneyList=chimneys.concat(ridges),chimneyMesh=instMesh(chimG,DMAT.brick,chimneyList,false);
  const mastG=new THREE.CylinderGeometry(.06,.12,1,5);mastG.translate(0,.5,0);
  const mastMesh=instMesh(mastG,M.mast,ms,false);
  const crownG=new THREE.BoxGeometry(1,1,1);
  const stoneMesh=instMesh(crownG,M.planter,crownStone,HI),metalMesh=instMesh(crownG.clone(),M.hvac,crownMetal,HI),solarMesh=instMesh(crownG.clone(),M.solar,crownSolar,false);
  roofProps.add(gableMesh,chimneyMesh,mastMesh,stoneMesh,metalMesh,solarMesh);
  // Track actual geometry bounds, not the building's original rectangular base.
  [gables,chimneyList,ms].forEach(list=>list.forEach(p=>{B[p.id].roofClearance=Math.max(B[p.id].roofClearance,p.y+p.sy)}));
  [crownStone,crownMetal,crownSolar].forEach(list=>list.forEach(p=>{B[p.id].roofClearance=Math.max(B[p.id].roofClearance,p.y+p.sy*.5)}));
  gables.forEach(p=>B[p.id].roofSupports.push({...p,kind:"gable"}));
  chimneys.forEach(p=>B[p.id].roofSupports.push({...p,kind:"box",top:p.y+p.sy}));
  ms.forEach(p=>B[p.id].roofSupports.push({...p,sx:.24,sz:.24,kind:"box",top:p.y+p.sy}));
  [crownStone,crownMetal,crownSolar].forEach(list=>list.forEach(p=>B[p.id].roofSupports.push({...p,kind:"box",top:p.y+p.sy*.5})));
  roofAnim=[];
  const track=(mesh,list)=>list.forEach((p,i)=>roofAnim.push({mesh,i,id:p.id,x:p.x,y:p.y||0,z:p.z,ry:p.ry||0,sx:p.sx||1,sy:p.sy||1,sz:p.sz||1}));
  track(gableMesh,gables);track(chimneyMesh,chimneyList);track(mastMesh,ms);track(stoneMesh,crownStone);track(metalMesh,crownMetal);track(solarMesh,crownSolar);
  writeRoofs();
  roofProps.visible=true;
  const hg=new THREE.BufferGeometry();hg.setAttribute("position",new THREE.Float32BufferAttribute(halo,3));hg.setAttribute("aTh",new THREE.Float32BufferAttribute(hTh,1));hg.setAttribute("aKind",new THREE.Float32BufferAttribute(hK,1));
  lampHalo=new THREE.Points(hg,M.halo);lampHalo.frustumCulled=false;decor.add(lampHalo);
  // quay: a stone kerb where the plan meets the water
  const q=GSIDE/2,qm=DMAT.quay||(DMAT.quay=new THREE.MeshStandardMaterial({color:lin("#3b3d42"),roughness:.8}));
  [[0,-q,GSIDE+2.4,2.4],[0,q,GSIDE+2.4,2.4],[-q,0,2.4,GSIDE],[q,0,2.4,GSIDE]].forEach(([x,z,w,d])=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,2.2,d),qm);m.position.set(x,-1,z);m.receiveShadow=true;decor.add(m)});
  // District gateways, banners, name plates and activity beacons: five shared draws (b_districts.js)
  if(typeof DistrictLook!=="undefined")decor.add(DistrictLook.build({okCell,SH,HI,reduced,onFrame:f=>frameHooks.push(f)}));
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
  vec2 p=vW.xz;
  // No sea fragments under the island: the very large water triangles otherwise
  // compete with the ground depth at overview distances on software/mobile GPUs.
  if(max(abs(p.x),abs(p.y))<uSide*0.5)discard;
  float e=0.8;
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
  c+=vec3(1.0,0.6,0.26)*uNight*exp(-max(dE,0.0)/38.0)*(0.15+0.85*streak*streak)*0.3*(0.7+0.6*N.x); // world pass: dimmer, broken by the waves
  // shoreline (world pass): broken foam against the quay and slow swell lines rolling in toward it
  float sw=sin(dE*0.55-uTime*1.1+vn(p*0.05)*4.0);
  float foamN=vn(p*0.45+uTime*vec2(0.12,-0.08))*0.6+vn(p*1.3-uTime*0.2)*0.4;
  float foam=(1.0-smoothstep(1.0,8.0+5.0*foamN,dE))*smoothstep(0.3,0.7,foamN+0.3);
  foam+=smoothstep(0.84,0.99,sw)*(1.0-smoothstep(6.0,48.0,dE))*smoothstep(0.4,0.7,foamN)*0.7;
  c=mix(c,mix(uSky*1.6+vec3(0.12),vec3(0.06,0.08,0.12),uNight*0.85),clamp(foam,0.0,1.0)*0.85);
  `+(VFXOK?VFX.WATER_GLSL:"")+`
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
  // b_vfx.js atmosphere: the same dust and fireflies plus today's rain, one Points draw sized by tier
  if(VFXOK){const p=VFX.atmosphere(SH,TEX.glow,VFX.budget(readQuality()).atmos);if(p)return p}
  const N=700,seed=new Float32Array(N*3);for(let i=0;i<seed.length;i++)seed[i]=Math.random();
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(seed,3));
  const m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false,
    uniforms:{uCenter:{value:new THREE.Vector3()},uScale:{value:600},map:{value:TEX.glow},uTime:SH.uTime,uNight:SH.uNight},
    vertexShader:`uniform vec3 uCenter;uniform float uScale;uniform float uTime;uniform float uNight;varying float vA;
void main(){vec3 s=position;vec3 box=vec3(320.0,mix(60.0,16.0,uNight),320.0);
 vec3 p=s*box;p.x+=uTime*0.7+sin(uTime*0.31+s.y*20.0)*3.0;p.z+=uTime*0.3+cos(uTime*0.27+s.z*17.0)*3.0;p.y+=sin(uTime*0.5+s.x*30.0)*1.2;
 p.xz=mod(p.xz-uCenter.xz+box.xz*0.5,box.xz)+uCenter.xz-box.xz*0.5;p.y=0.8+mod(p.y,box.y);
 vec4 mv=modelViewMatrix*vec4(p,1.0);float fl=0.5+0.5*sin(uTime*(1.3+s.z*2.0)+s.x*40.0);
 vA=mix(0.34,0.28+0.72*fl*fl,uNight)*smoothstep(260.0,60.0,-mv.z);
 gl_PointSize=clamp(mix(0.85,0.45,uNight)*uScale/-mv.z,0.0,18.0);gl_Position=projectionMatrix*mv;}`,
    fragmentShader:"uniform sampler2D map;uniform float uNight;varying float vA;void main(){float a=texture2D(map,gl_PointCoord).a;gl_FragColor=vec4(mix(vec3(1.0,0.86,0.42),vec3(1.0,0.72,0.32),uNight)*a*vA,1.0);}"});
  const p=new THREE.Points(g,m);p.frustumCulled=false;return p;
}

// ---------- the world past the quay (world pass): far shore, sea traffic, birds, contact shadows.
// Budget: horizon 1 draw, boats 1, birds 1, piers 1, contact shadows 1. All motion lives in vertex shaders driven by
// SH.uTime, which only advances on tiers that run ambient frames (AMB desktop, MID phone); low tier hides the movers.
const WORLDX={horizon:null,boats:null,birds:null,piers:null,blobs:null,casters:[],blobN:0};
// Far shore: three rings of low-poly hills, two distant towns on the near ring, and a lighthouse on a headland.
// Aerial perspective and night windows are in the shader; geometry is built once per layout.
function horizonGeometry(){
  const pos=[],kind=[],layer=[],R0=GSIDE*.5+Math.max(320,GSIDE*.5),SEG=HI?120:72;
  const tri=(a,b,c,k,l)=>{pos.push(...a,...b,...c);kind.push(k,k,k);layer.push(l,l,l)};
  const quad=(a,b,c,d,k,l)=>{tri(a,b,c,k,l);tri(a,c,d,k,l)};
  const hillH=(a,l)=>{let h=0,amp=1,f=1;for(let o=0;o<4;o++){h+=amp*(.5+.5*Math.sin(a*f*(3+l*2)+hash01("hz"+l+":"+o)*6.28));amp*=.5;f*=2.13}return h};
  for(let l=0;l<3;l++){
    const R=Math.min(2150,R0+l*(GSIDE*.3+180)),base=18+l*26,amp=26+l*44;
    for(let i=0;i<SEG;i++){
      const a0=i/SEG*Math.PI*2,a1=(i+1)/SEG*Math.PI*2,h0=base+amp*hillH(a0,l),h1=base+amp*hillH(a1,l);
      const p=(a,r,y)=>[Math.cos(a)*r,y,Math.sin(a)*r];
      quad(p(a0,R,-3),p(a1,R,-3),p(a1,R,h1),p(a0,R,h0),0,l/2);
    }
  }
  // towns: clusters of flat skyline cards facing the island, on the near ring; windows are drawn by the shader
  const R=R0-12;[.62,2.35,4.4].forEach((az,t)=>{const n=HI?26:14;
    for(let i=0;i<n;i++){const a=az+(i-n/2)*.016+(hash01("tw"+t+i)-.5)*.008,w=.008+hash01("tww"+t+i)*.01,h=14+Math.pow(hash01("twh"+t+i),2)*70,r=R-hash01("twr"+t+i)*30;
      const p=(aa,y)=>[Math.cos(aa)*r,y,Math.sin(aa)*r];quad(p(a-w,-2),p(a+w,-2),p(a+w,h),p(a-w,h),1,0)}});
  // lighthouse: a white tower on the near ring; its lamp (kind 2) sweeps and flashes toward the viewer
  const la=5.5,lr=R0-20,lp=(da,y,dr=0)=>[Math.cos(la+da)*(lr+dr),y,Math.sin(la+da)*(lr+dr)];
  const tw=.0045;quad(lp(-tw,0),lp(tw,0),lp(tw*.6,46),lp(-tw*.6,46),3,0);
  quad(lp(-tw*.9,46),lp(tw*.9,46),lp(tw*.9,53),lp(-tw*.9,53),2,0);
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));
  g.setAttribute("aKind",new THREE.Float32BufferAttribute(kind,1));g.setAttribute("aLayer",new THREE.Float32BufferAttribute(layer,1));
  g.userData.lamp=lp(0,49.5);return g;
}
function makeHorizon(){
  const u=THREE.UniformsUtils.merge([THREE.UniformsLib.fog,{uHaze:{value:new THREE.Color()},uLand:{value:new THREE.Color()},uLampPos:{value:new THREE.Vector3()}}]);Object.assign(u,SH);
  const m=new THREE.ShaderMaterial({uniforms:u,fog:true,side:THREE.DoubleSide,
    vertexShader:"attribute float aKind;attribute float aLayer;varying float vK;varying float vL;varying vec3 vW;\n#include <fog_pars_vertex>\nvoid main(){vK=aKind;vL=aLayer;vec4 w=modelMatrix*vec4(position,1.0);vW=w.xyz;vec4 mvPosition=viewMatrix*w;gl_Position=projectionMatrix*mvPosition;\n#include <fog_vertex>\n}",
    fragmentShader:"uniform vec3 uHaze;uniform vec3 uLand;uniform vec3 uLampPos;varying float vK;varying float vL;varying vec3 vW;\n#include <common>\n#include <fog_pars_fragment>\n"+SH_DECL+NOISE_GLSL+`
void main(){
  float k=vK;
  // aerial perspective: far ridges sink into the haze, near ones keep a little land colour
  vec3 land=mix(uLand,uHaze,0.42+0.4*vL);
  float shade=0.82+0.18*vn(vW.xz*0.02+vW.y*0.05);
  vec3 c=land*shade*mix(1.0,0.82,smoothstep(0.0,40.0,vW.y)*(1.0-uNight));
  c=mix(c,uHaze*0.9,(1.0-smoothstep(-3.0,22.0,vW.y))*0.55);   // a low mist line where the shore meets the sea
  float town=step(0.5,k)*(1.0-step(1.5,k));
  if(town>0.5){
    c=mix(c,land*0.7,0.6)*mix(1.0,0.35,uNight); // review fix: build on the hazed ridge colour and darken at night, not raw uLand
    vec2 g=vec2(atan(vW.z,vW.x)*length(vW.xz)/3.2,vW.y/3.4);vec2 id=floor(g),f=fract(g);
    float win=step(0.25,f.x)*step(f.x,0.75)*step(0.3,f.y)*step(f.y,0.8);
    float on=step(0.55-0.3*uOcc,h21(id))*(0.75+0.25*sin(uTime*(0.4+h21(id+3.0))+h21(id)*30.0));
    // past ~700 units a window is smaller than a pixel: blend to the average glow instead of shimmering speckle
    float farW=smoothstep(500.0,900.0,length(vW-cameraPosition));
    // far: lights become sparse, stable dots on a 2x2-window cell (about 3 px at overview range) instead of a flat average,
    // so the town reads as lit windows on a dark skyline and not as a uniformly tinted block
    vec2 cg=floor(g*0.5);float dot2=step(0.5,fract(g.x*0.5))*step(0.5,fract(g.y*0.5));
    float farOn=step(0.78-0.12*uOcc,h21(cg+7.0))*dot2*(0.85+0.15*h21(cg));
    c+=vec3(1.0,0.66,0.34)*mix(win*on,(0.22+0.12*uOcc)*4.0*farOn,farW)*uNight*0.85;
    c+=vec3(1.0,0.2,0.12)*step(0.985,h21(id*0.13))*step(0.7,fract(uTime*0.5+h21(id)))*uNight*step(60.0,vW.y); // mast lights
  }
  if(town>0.5)c=mix(c,uHaze,smoothstep(600.0,1400.0,length(vW-cameraPosition))*0.6); // town cards sit in the same air as the ridges
  if(k>2.5)c=mix(vec3(0.86,0.84,0.8),uHaze,0.35)*mix(1.0,0.25,uNight)*(0.85+0.15*step(0.5,fract(vW.y*0.09)));
  if(k>1.5&&k<2.5){
    // the lamp: a slow sweep, brightest when the beam points at the camera
    vec2 toCam=normalize(cameraPosition.xz-uLampPos.xz);float beam=uTime*0.9;
    float face=pow(max(dot(toCam,vec2(cos(beam),sin(beam))),0.0),24.0);
    c=vec3(1.0,0.9,0.66)*(0.35+uNight*(0.6+5.0*face))+uHaze*0.1;
  }
  gl_FragColor=vec4(c,1.0);
  #ifdef USE_FOG
  float fd=length(vW-cameraPosition);gl_FragColor.rgb=mix(gl_FragColor.rgb,fogColor,(1.0-exp(-fogDensity*fogDensity*fd*fd*0.16))*(k>1.5&&k<2.5?0.3:1.0));
  #endif
#include <tonemapping_fragment>
#include <encodings_fragment>
}`});
  const g=horizonGeometry();m.uniforms.uLampPos.value.set(...g.userData.lamp);
  const mesh=new THREE.Mesh(g,m);mesh.frustumCulled=false;mesh.renderOrder=-8;mesh.name="horizon";return mesh;
}
// Piers: timber jetties off the quay with mooring posts, one instanced draw. Boats tie up at their ends.
function makePiers(){
  const list=[],moor=[],q=GSIDE/2+1.2;
  [[0,-1,.18],[1,0,.66],[0,1,-.42],[-1,0,.1]].forEach(([sx,sz,off],e)=>{
    const along=off*GSIDE*.8,L=26+hash01("pier"+e)*18;
    const x0=sx?sx*q:along,z0=sz?sz*q:along,dx=sx,dz=sz;
    list.push({x:x0+dx*L/2,y:-.35,z:z0+dz*L/2,sx:sx?L:4,sy:.35,sz:sz?L:4,c:lin("#6b5440")});
    for(let i=0;i<=4;i++){const t=i/4*L;[-1,1].forEach(s=>list.push({x:x0+dx*t+(sz?s*1.9:0),y:-1.4,z:z0+dz*t+(sx?s*1.9:0),sx:.32,sy:2.4,sz:.32,c:lin("#3a2d22")}))}
    moor.push({x:x0+dx*(L+5),z:z0+dz*(L+5),ry:Math.atan2(dz,dx)});
  });
  const g=new THREE.BoxGeometry(1,1,1);
  if(!DMAT.pier)DMAT.pier=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.92,metalness:0});
  const m=instMesh(g,DMAT.pier,list,false);m.receiveShadow=false;m.userData.moor=moor;return m;
}
// Boats: an instanced fleet. Most sail slow loops around the island, a few ride at the piers; hull, deckhouse and
// lit portholes are one geometry. Position, heading, bob and roll are computed in the vertex shader.
function boatGeometry(){
  const pos=[],part=[];const P=(a,k)=>{pos.push(...a);part.push(k)};
  const tri=(a,b,c,k)=>{P(a,k);P(b,k);P(c,k)};const quad=(a,b,c,d,k)=>{tri(a,b,c,k);tri(a,c,d,k)};
  // hull: a box with a pointed bow, 1 unit wide, 3.2 long (z+ is forward)
  const w=.5,L=1.4,b=2.0,y0=-.25,y1=.35;
  const s=[[-w,y0,-L],[w,y0,-L],[w,y0,L*.6],[0,y0,b],[-w,y0,L*.6]],t=s.map(p=>[p[0]*1.1,y1,p[2]]);
  for(let i=0;i<5;i++){const j=(i+1)%5;quad(s[i],s[j],t[j],t[i],0)}
  tri(t[0],t[2],t[1],1);tri(t[0],t[4],t[2],1);tri(t[4],t[3],t[2],1);
  // deckhouse with a window band
  const hx=.36,hz0=-.9,hz1=.2,hy=.95;const box=[[-hx,y1,hz0],[hx,y1,hz0],[hx,y1,hz1],[-hx,y1,hz1]],top=box.map(p=>[p[0],hy,p[2]]);
  for(let i=0;i<4;i++){const j=(i+1)%4;quad(box[i],box[j],top[j],top[i],2)}
  quad(top[0],top[3],top[2],top[1],3);
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));g.setAttribute("aPart",new THREE.Float32BufferAttribute(part,1));g.computeVertexNormals();return g;
}
function makeBoats(moor){
  const n=MID?10:22,g=boatGeometry(),ib=new THREE.InstancedBufferAttribute(new Float32Array(n*4),4),ic=new THREE.InstancedBufferAttribute(new Float32Array(n*4),4);
  const half=GSIDE/2,palette=["#e9e4da","#c8463a","#2f5d8a","#f0c24b","#d9d4c8","#3d6b50"];
  for(let i=0;i<n;i++){
    const m=moor[i%moor.length],moored=i<moor.length;
    // a: radius or mooring x, b: speed (0 = moored) or mooring z, c: phase or heading, d: scale
    if(moored)ib.setXYZW(i,m.x,m.z,m.ry,1.6);
    else ib.setXYZW(i,half*1.45+30+hash01("br"+i)*Math.max(160,GSIDE*.45),(.006+hash01("bs"+i)*.012)*(i%2?1:-1),hash01("bp"+i)*6.283,1.4+hash01("bk"+i)*1.8);
    const c=lin(palette[i%palette.length]);ic.setXYZW(i,c.r,c.g,c.b,moored?1:0);
  }
  g.setAttribute("aB",ib);g.setAttribute("aC",ic);
  const mat=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.6,metalness:.1});
  mat.onBeforeCompile=sh=>{Object.assign(sh.uniforms,SH);
    sh.vertexShader=sh.vertexShader.replace("#include <common>","#include <common>\nattribute vec4 aB;attribute vec4 aC;attribute float aPart;varying vec3 vBoat;varying float vPart;varying float vLit;\n"+SH_DECL)
      .replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
  float moored=aC.w;float ang=aB.z+uTime*aB.y;
  vec2 cen=mix(vec2(cos(ang),sin(ang)*0.86)*aB.x,aB.xy,moored);
  float head=mix(ang+(aB.y>0.0?1.5708:-1.5708),aB.z,moored);
  float roll=sin(uTime*1.1+aB.z*9.0)*0.05,pitchB=sin(uTime*0.8+aB.z*5.0)*0.035;
  mat3 Rz=mat3(cos(roll),sin(roll),0.0,-sin(roll),cos(roll),0.0,0.0,0.0,1.0);
  mat3 Rx=mat3(1.0,0.0,0.0,0.0,cos(pitchB),sin(pitchB),0.0,-sin(pitchB),cos(pitchB));
  float ch=cos(-head+1.5708),shd=sin(-head+1.5708);mat3 Ry=mat3(ch,0.0,-shd,0.0,1.0,0.0,shd,0.0,ch);
  mat3 RB=Ry*Rx*Rz;objectNormal=RB*objectNormal;`)
      .replace("#include <begin_vertex>",`#include <begin_vertex>
  transformed=RB*(transformed*aB.w)+vec3(cen.x,-0.75+sin(uTime*1.3+aB.z*7.0)*0.12,cen.y);
  vBoat=aC.rgb;vPart=aPart;vLit=step(0.5,h21(vec2(aB.z*13.0,aB.x)));`);
    // r128 InstancedMesh: instanceMatrix stays identity here; the shader owns the transform
    sh.vertexShader=sh.vertexShader.replace("void main() {","float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}\nvoid main() {");
    sh.fragmentShader=sh.fragmentShader.replace("#include <common>","#include <common>\nvarying vec3 vBoat;varying float vPart;varying float vLit;\n"+SH_DECL)
      .replace("#include <color_fragment>",`#include <color_fragment>
  vec3 hull=vPart<0.5?vBoat*0.85:(vPart<1.5?vec3(0.55,0.42,0.3):(vPart<2.5?vec3(0.92,0.9,0.86):vBoat));
  diffuseColor.rgb=hull;`)
      .replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  float band=step(1.5,vPart)*step(vPart,2.5);
  totalEmissiveRadiance+=vec3(1.0,0.72,0.42)*band*vLit*uNight*1.4;`);
  };
  const mesh=new THREE.InstancedMesh(g,mat,n);mesh.frustumCulled=false;mesh.castShadow=false;mesh.receiveShadow=false;mesh.name="boats";
  // the vertex shader positions every boat; identity instance matrices keep three's instancing path (and normals) sane
  const I=new THREE.Matrix4();for(let i=0;i<n;i++)mesh.setMatrixAt(i,I);mesh.instanceMatrix.needsUpdate=true;
  return mesh;
}
// Birds: gulls over the quay by day, swifts over the roofs at dusk. A flat V per bird, wings flap in the shader.
function makeBirds(){
  const n=MID?18:44,pos=[],side=[];
  const tri=(a,b,c,s)=>{pos.push(...a,...b,...c);side.push(...s)};
  tri([0,0,.35],[-1,0,-.1],[0,0,-.25],[0,1,0]);tri([0,0,.35],[0,0,-.25],[1,0,-.1],[0,0,1]);
  const g=new THREE.InstancedBufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));g.setAttribute("aWing",new THREE.Float32BufferAttribute(side,1));g.instanceCount=n;
  const a=new Float32Array(n*4),half=GSIDE/2;
  for(let i=0;i<n;i++){const flock=i%4,shore=flock<2;
    const cx=shore?(flock?1:-1)*(half+10):(hash01("fx"+flock)-.5)*WORLD.W*.5,cz=shore?(hash01("fz"+flock)-.5)*GSIDE*.6:(hash01("fz"+flock)-.5)*WORLD.H*.5;
    a.set([cx+(hash01("bx"+i)-.5)*30,cz+(hash01("bz"+i)-.5)*30,hash01("bph"+i)*6.283,(shore?28:46)+hash01("bh"+i)*30],i*4)}
  g.setAttribute("aBird",new THREE.InstancedBufferAttribute(a,4));
  const m=new THREE.ShaderMaterial({side:THREE.DoubleSide,fog:true,uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.fog,{uCol:{value:new THREE.Color()}}]),
    vertexShader:`attribute float aWing;attribute vec4 aBird;uniform float uTime;uniform float uNight;varying float vA;
#include <fog_pars_vertex>
void main(){
  float t=uTime*0.16+aBird.z;float r=24.0+18.0*fract(aBird.z*3.7);
  vec3 c=vec3(aBird.x+cos(t)*r,aBird.w+sin(uTime*0.7+aBird.z*4.0)*2.5,aBird.y+sin(t*1.3)*r*0.7);
  float flap=sin(uTime*(7.0+3.0*fract(aBird.z*11.0))+aBird.z*20.0);
  float s=1.5*(1.0-smoothstep(0.45,0.75,uNight));
  vec3 p=position*s;p.y+=aWing*flap*0.55*s*abs(position.x);
  vec2 v=vec2(-sin(t),cos(t)*1.3);float h=atan(v.x,v.y);
  mat2 R=mat2(cos(h),-sin(h),sin(h),cos(h));p.xz=R*p.xz;
  vA=s;vec4 mvPosition=modelViewMatrix*vec4(c+p,1.0);gl_Position=projectionMatrix*mvPosition;
#include <fog_vertex>
}`,
    fragmentShader:`uniform vec3 uCol;varying float vA;
#include <common>
#include <fog_pars_fragment>
void main(){if(vA<0.01)discard;gl_FragColor=vec4(uCol,1.0);
#include <fog_fragment>
#include <tonemapping_fragment>
#include <encodings_fragment>
}`});
  m.uniforms.uTime=SH.uTime;m.uniforms.uNight=SH.uNight;
  const b=new THREE.Mesh(g,m);b.frustumCulled=false;b.name="birds";return b;
}
// Contact shadows: a soft dark disc under every Sentinel (and anything else that registers), one instanced draw.
// The sun's shadow map only re-renders when the light moves, so moving figures need these to sit on the ground.
const BLOB_MAX=96,_bo=new THREE.Object3D();
function makeBlobs(){
  const g=new THREE.PlaneGeometry(1,1);g.rotateX(-Math.PI/2);
  const m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2,
    uniforms:{uNight:SH.uNight},vertexShader:"varying vec2 vU;void main(){vU=uv*2.0-1.0;gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position,1.0);}",
    fragmentShader:"uniform float uNight;varying vec2 vU;void main(){float d=dot(vU,vU);float a=(1.0-smoothstep(0.15,1.0,d))*mix(0.42,0.26,uNight);gl_FragColor=vec4(0.0,0.0,0.0,a);}"});
  const mesh=new THREE.InstancedMesh(g,m,BLOB_MAX);mesh.count=0;mesh.frustumCulled=false;mesh.renderOrder=2;mesh.name="contact-shadows";return mesh;
}
function stepBlobs(){
  const bm=WORLDX.blobs;if(!bm)return false;let n=0;
  const put=(x,y,z,r)=>{if(n>=BLOB_MAX||!Number.isFinite(x+y+z+r))return;_bo.position.set(x,y+.06,z);_bo.rotation.set(0,0,0);_bo.scale.set(r,1,r);_bo.updateMatrix();bm.setMatrixAt(n++,_bo.matrix)};
  AG.forEach(m=>{if(m.grp.visible&&m.pos)put(m.pos.x,m.pos.y,m.pos.z,2.2)});
  for(const f of WORLDX.casters){try{const list=f();if(list)for(const c of list)put(c[0],c[1],c[2],c[3]||1.8)}catch(e){}}
  bm.count=n;if(n)bm.instanceMatrix.needsUpdate=true;
  return false; // figures that move already mark the frame dirty; a still crowd must not keep the loop awake
}
function buildWorldEdge(){
  if(WORLDX.horizon){scene.remove(WORLDX.horizon);WORLDX.horizon.geometry.dispose()}
  WORLDX.horizon=makeHorizon();scene.add(WORLDX.horizon);
  if(WORLDX.piers){scene.remove(WORLDX.piers);WORLDX.piers.geometry.dispose()}
  WORLDX.piers=makePiers();scene.add(WORLDX.piers);
  ["boats","birds"].forEach(k=>{if(WORLDX[k]){scene.remove(WORLDX[k]);WORLDX[k].geometry.dispose();WORLDX[k]=null}});
  if(AMB||MID){WORLDX.boats=makeBoats(WORLDX.piers.userData.moor);WORLDX.birds=makeBirds();scene.add(WORLDX.boats,WORLDX.birds)}
  if(!WORLDX.blobs){WORLDX.blobs=makeBlobs();scene.add(WORLDX.blobs)}
  worldColors();
}
// Horizon and bird colours follow the sky key (called from pushSky).
function worldColors(){
  const h=WORLDX.horizon;if(h){h.material.uniforms.uHaze.value.copy(CUR.haze).lerp(CUR.fog,.5);h.material.uniforms.uLand.value.copy(CUR.hGnd).lerp(CUR.bot,.25).multiplyScalar(.9)}
  const b=WORLDX.birds;if(b)b.material.uniforms.uCol.value.copy(CUR.top).multiplyScalar(.25);
}
// ---------- photo mode: the chrome steps aside, the camera keeps flying, one button saves a PNG of the frame.
const PHOTO={on:false,hidden:[],bar:null,timer:0};
function photoBar(){
  if(PHOTO.bar)return PHOTO.bar;const el=document.createElement("div");el.id="photoBar";el.setAttribute("role","toolbar");el.setAttribute("aria-label","Photo mode");
  el.style.cssText="position:fixed;left:50%;bottom:max(16px,env(safe-area-inset-bottom));transform:translateX(-50%);z-index:60;display:flex;gap:8px;padding:8px;border-radius:16px;background:rgba(8,11,20,.72);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);box-shadow:0 10px 40px rgba(0,0,0,.35);transition:opacity .4s";
  const btn=(label,fn)=>{const b=document.createElement("button");b.type="button";b.textContent=label;b.style.cssText="min-width:44px;min-height:44px;padding:0 16px;border:1px solid rgba(255,255,255,.18);border-radius:12px;background:rgba(255,255,255,.06);color:#F4EFE6;font:600 14px/1 system-ui,sans-serif;cursor:pointer";b.addEventListener("click",e=>{e.stopPropagation();fn()});el.appendChild(b);return b};
  btn("Save image",savePhoto);PHOTO.orbitBtn=btn("Orbit",()=>{auto=!auto;PHOTO.orbitBtn.setAttribute("aria-pressed",String(auto));dirty=true});btn("Exit",()=>setPhoto(false));
  const wake=()=>{el.style.opacity="1";clearTimeout(PHOTO.timer);PHOTO.timer=setTimeout(()=>{if(PHOTO.on)el.style.opacity=".08"},2600)};
  el.addEventListener("pointerenter",wake);el.addEventListener("focusin",wake);PHOTO.wake=wake;PHOTO.bar=el;return el;
}
function setPhoto(on){
  on=!!on;if(!C.ok||on===PHOTO.on)return PHOTO.on;PHOTO.on=on;
  if(on){
    // hide every sibling on the path from the canvas up to <body>; the canvas and the bar stay
    PHOTO.hidden=[];let node=cv;
    while(node&&node.parentElement){const parent=node.parentElement;for(const sib of parent.children)if(sib!==node&&sib.id!=="photoBar"&&!/^(SCRIPT|STYLE|LINK)$/.test(sib.tagName)){PHOTO.hidden.push([sib,sib.style.visibility]);sib.style.visibility="hidden"}if(parent===document.body)break;node=parent}
    document.body.appendChild(photoBar());PHOTO.bar.hidden=false;PHOTO.wake();PHOTO.orbitBtn.setAttribute("aria-pressed",String(auto));
    document.documentElement.classList.add("photo-mode");if(typeof toast==="function")toast("Photo mode. P or Esc to leave.");
  }else{
    PHOTO.hidden.forEach(([el,v])=>{el.style.visibility=v});PHOTO.hidden=[];if(PHOTO.bar)PHOTO.bar.hidden=true;auto=false;
    document.documentElement.classList.remove("photo-mode");
  }
  dirty=true;return PHOTO.on;
}
function savePhoto(){
  if(!C.ok)return false;
  // draw a fresh frame and read it back in the same task, before the drawing buffer is presented and cleared
  applyCamera();
  if(composer&&postState==="ready"&&HI&&!reduced)composer.render();else renderer.render(scene,camera);
  const d=new Date(),p=n=>String(n).padStart(2,"0"),name=`vault-campus-${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}.png`;
  try{cv.toBlob(b=>{if(!b)return;const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500)},"image/png")}catch(e){console.warn("photo:",e);return false}
  if(typeof toast==="function")toast("Saved "+name);return true;
}
document.addEventListener("keydown",e=>{
  if(/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName||"")||e.metaKey||e.ctrlKey||e.altKey||document.querySelector("dialog[open]"))return;
  const k=e.key.toLowerCase();
  if(k==="p"){setPhoto(!PHOTO.on);e.preventDefault()}
  else if(PHOTO.on&&k==="escape"){setPhoto(false);e.stopPropagation()}
  else if(PHOTO.on&&k==="enter"){savePhoto();e.preventDefault()}
  if(PHOTO.on&&PHOTO.wake)PHOTO.wake();
},true);
// ---------- eased camera flights: an ease-in-out move with a lift in the middle, so long hops arc over the roofs
// instead of sliding through them. Any user input cancels the flight and hands control back to the damped follow.
let flight=null;
const easeIO=x=>{x=clamp(x,0,1);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
function fly(){
  if(reduced||walk||!C.ok){flight=null;return}
  const travel=Math.hypot(goal.tx-cam.tx,goal.tz-cam.tz)+Math.abs(goal.dist-cam.dist)*.5;
  if(travel<6){flight=null;return}
  flight={t0:time,dur:clamp(.9+travel/520,1,2.6),arc:Math.min(travel*.32,GSIDE*.35),from:{...cam},to:{...goal}};
}
function stepFlight(){
  if(!flight)return false;
  // a goal edited by something else (zoom keys, a new focus) re-aims the flight at the new goal
  const f=flight;
  // something placed the camera directly (a test snap, walk entry): the flight yields instead of yanking it back
  if(f.last&&(Math.abs(cam.tx-f.last[0])>.01||Math.abs(cam.tz-f.last[1])>.01||Math.abs(cam.dist-f.last[2])>.01)){flight=null;return false}
  const t=(time-f.t0)/f.dur,e=easeIO(t);
  const dyaw=((goal.yaw-f.from.yaw+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;
  cam.tx=f.from.tx+(goal.tx-f.from.tx)*e;cam.ty=f.from.ty+(goal.ty-f.from.ty)*e;cam.tz=f.from.tz+(goal.tz-f.from.tz)*e;
  cam.yaw=f.from.yaw+dyaw*e;cam.pitch=f.from.pitch+(goal.pitch-f.from.pitch)*e+Math.sin(Math.PI*e)*.12*Math.min(1,f.arc/120);
  cam.dist=f.from.dist+(goal.dist-f.from.dist)*e+Math.sin(Math.PI*e)*f.arc;
  if(t>=1){cam.yaw=goal.yaw;cam.pitch=goal.pitch;cam.dist=goal.dist;flight=null}else f.last=[cam.tx,cam.tz,cam.dist];
  return true;
}
// ---------- orbit camera collision: never park the lens inside a building. A ray from the target to the eye is
// tested against the building boxes; the eye stops just short of the first hit (boxes holding the target are skipped).
let eyeDist=-1;
function eyeClear(dx,dy,dz,dist){
  if(!boxes||dist>320)return dist;
  const ox=cam.tx,oy=cam.ty,oz=cam.tz,ix=1/(dx||1e-9),iy=1/(dy||1e-9),iz=1/(dz||1e-9);let hit=dist;
  for(let q=0;q<boxes.length;q+=6){
    let t1=(boxes[q]-ox)*ix,t2=(boxes[q+3]-ox)*ix,tmin=Math.min(t1,t2),tmax=Math.max(t1,t2);
    t1=(boxes[q+1]-oy)*iy;t2=(boxes[q+4]-oy)*iy;tmin=Math.max(tmin,Math.min(t1,t2));tmax=Math.min(tmax,Math.max(t1,t2));
    t1=(boxes[q+2]-oz)*iz;t2=(boxes[q+5]-oz)*iz;tmin=Math.max(tmin,Math.min(t1,t2));tmax=Math.min(tmax,Math.max(t1,t2));
    if(tmax>=tmin&&tmin>0.5&&tmin<hit)hit=tmin;
  }
  return hit<dist?Math.max(6,hit-2.5):dist;
}
// ---------- perf: renderer counters are summed across every pass of a frame (shadow, scene, bloom, grade).
// autoReset is off and the counters are cleared once per rendered frame, so info.render.calls is the frame total.
const PERF={frames:0,ms:new Float32Array(120),i:0,calls:0,tris:0,points:0,lines:0,last:0};
function perfFrame(ms){
  const r=renderer.info.render;PERF.calls=r.calls;PERF.tris=r.triangles;PERF.points=r.points;PERF.lines=r.lines;
  PERF.ms[PERF.i]=ms;PERF.i=(PERF.i+1)%PERF.ms.length;PERF.frames++;
}
function perfStats(){
  const n=Math.min(PERF.frames,PERF.ms.length),a=Array.from(PERF.ms.slice(0,n)).sort((x,y)=>x-y),avg=n?a.reduce((s,v)=>s+v,0)/n:0;
  return {calls:PERF.calls,triangles:PERF.tris,points:PERF.points,lines:PERF.lines,frames:PERF.frames,cpuMsAvg:+avg.toFixed(2),cpuMsP95:n?+a[Math.min(n-1,Math.floor(n*.95))].toFixed(2):0,
    geometries:renderer?renderer.info.memory.geometries:0,textures:renderer?renderer.info.memory.textures:0,programs:renderer&&renderer.info.programs?renderer.info.programs.length:0,scale:renderBudget.scale,tier:tierNow,
    world:{horizon:!!WORLDX.horizon,boats:WORLDX.boats?WORLDX.boats.count:0,birds:WORLDX.birds?WORLDX.birds.geometry.instanceCount:0,contactShadows:WORLDX.blobs?WORLDX.blobs.count:0}};
}
// ---------- build
function build(prev){
  layout();
  if(typeof DistrictLook!=="undefined")DistrictLook.bind(DIST,B,NOTES); // district identity (b_districts.js)
  if(ground){scene.remove(ground);const ud=groundMat.map.userData;ud.mask.dispose();ud.ao.dispose();if(ud.light)ud.light.dispose();groundMat.map.dispose();groundMat.dispose();ground.geometry.dispose();groundUni=null}
  const tex=paintGround();
  groundMat=groundMaterial(tex);
  ground=new THREE.Mesh(new THREE.PlaneGeometry(GSIDE,GSIDE),groundMat);ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
  if(!water){water=makeWater();scene.add(water)}water.material.uniforms.uSide.value=GSIDE;
  buildInstances(prev);buildNav();
  if(typeof DistrictAssets!=="undefined"){
    DistrictAssets.dispose(districtAssets);districtAssets=DistrictAssets.build(DIST,B,NOTES,renderer);scene.add(districtAssets);
    DIST.forEach(d=>{d.landmark=districtAssets.userData.records.find(r=>r.folder===d.top)||null});
  }
  const lamps=buildDecor();buildFacades();buildWorldEdge(); // world pass: far shore, piers, boats, birds, contact shadows
  tex.userData.light=paintLightMap(lamps);if(groundUni)groundUni.t_light.value=tex.userData.light;
  fitShadow();applyState();buildChips();setMarkers(tasksMarks);
  renderer.shadowMap.needsUpdate=true;dirty=true;
}

// ---------- facade dressing (b_buildings.js): doors, awnings, signs, balconies, roof stubs, scaffolding. One draw call.
// Built after buildDecor so roof stubs sit on the real roof surface (gables, crowns, parapets).
function buildFacades(){
  if(!FACADES)return;
  if(facade){Facades.dispose(facade);facade=null}
  try{
    const items=[];
    B.forEach(b=>{if(!b||!FSIG[b.id])return;
      const color=(typeof Districts!=="undefined"?Districts.get(b.worldTop)?.color:null)||FOLDER_COLORS[b.worldTop]||"#D4A843";
      items.push({b:{id:b.id,tiers:b.tiers,door:b.door,h:b.h,style:b.style,color},s:FSIG[b.id],surf:(x,z)=>roofSurfaceAt(b,x,z)})});
    // stale-first ordering is the caller's job: newest edits and link problems are laid out first inside the budget
    facade=Facades.build(items,{SH,cap:HI?Facades.LIMIT.high:QUALITY==="low"?Facades.LIMIT.low:Facades.LIMIT.medium,shadow:false});
    scene.add(facade);doorNear=-1;refreshDoors();facade.visible=introStart<0;
  }catch(e){console.warn("facade dressing unavailable:",e);facade=null}
}
function doorStateOf(id){return id===sel?2:id===doorNear?3:taskOf.has(id)?1:0}
function refreshDoors(ids){
  if(!facade)return;let ch=false;
  (ids||[...facade.userData.doors.keys()]).forEach(id=>{if(id>=0&&Facades.setDoor(facade,id,doorStateOf(id),taskOf.get(id)))ch=true});
  if(ch)dirty=true;
}
// Per frame (cheap): hide dressing during the growth intro and from far overview; in walk mode light the nearest door.
function facadeTick(){
  if(!facade)return false;let ch=false;
  const vis=introStart<0&&(walk||cam.dist<(HI?720:460));
  if(facade.visible!==vis){facade.visible=vis;ch=true}
  if(time-lastDoorScan>.25){lastDoorScan=time;let best=-1;
    if(walk){let bd=56;B.forEach(b=>{if(!b||!b.door)return;const dx=b.door.x-cam.tx,dz=b.door.z-cam.tz,d=dx*dx+dz*dz;if(d<bd){bd=d;best=b.id}})}
    if(best!==doorNear){const p=doorNear;doorNear=best;refreshDoors([p,best]);lastLbl=0;ch=true}}
  return ch;
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
function rooftopAnchor(b){const t=b.tiers[b.tiers.length-1];return{x:t.x,z:t.z,y:Math.max(t.y1,b.roofClearance||t.y1)+.25,w:t.w,d:t.d}}
function topOf(id){const r=rooftopAnchor(B[id]);return new THREE.Vector3(r.x,r.y,r.z)}
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
  const prevSel=sel;sel=n?n.id:-1;nbr=new Map();
  if(n){n.out.forEach(i=>nbr.set(i,1));n.back.forEach(i=>nbr.set(i,nbr.has(i)?3:2))}
  applyState();buildBridges();refreshDoors([prevSel,sel]);
}
function focus(n){
  if(!C.ok||!B[n.id])return;
  select(n);auto=false;
  const b=B[n.id],span=Math.max(b.fw,b.fd);
  if(walk)exitWalk();
  goal.tx=b.cx;goal.tz=b.cz;goal.ty=b.h*.55;goal.dist=clamp(b.h*1.75+span*2.6+34,52,200);goal.pitch=b.h<20?.62:.52;
  fly();dirty=true;
}
function clear(){if(!C.ok)return;const prevSel=sel;sel=-1;nbr=new Map();applyState();refreshDoors([prevSel]);clearBridges();dirty=true;cur=null;$("#crumb").innerHTML="Campus"}
function overview(){
  if(!C.ok)return;if(walk)exitWalk();
  select(null);cur=null;$("#crumb").innerHTML="Campus";
  goal.tx=0;goal.ty=0;goal.tz=0;goal.pitch=.62;goal.dist=GSIDE*.8;fly();dirty=true;
}
function flyDistrict(top){
  const d=DIST.find(x=>x.top===top);if(!d)return;if(walk)exitWalk();auto=false;
  goal.tx=d.x+d.w/2;goal.tz=d.z+d.d/2;goal.ty=0;goal.dist=Math.max(d.w,d.d)*1.05+70;goal.pitch=.72;fly();dirty=true;
  $("#plate").hidden=true;showDistrict(d,true);
}
// Drop in at street level at a district's north-west corner, looking down the edge road into the blocks.
function walkDistrict(top){
  const d=DIST.find(x=>x.top===top);if(!d||!C.ok)return false;
  if(!walk)enterWalk();
  goal.tx=d.x+2;goal.tz=d.z-2.5;goal.yaw=-1.9;goal.pitch=.06;collide();
  cam.tx=goal.tx;cam.tz=goal.tz;cam.yaw=goal.yaw;cam.pitch=goal.pitch;cam.ty=goal.ty=3.4;dirty=true;showDistrict(d,false);
  return true;
}

// ---------- walking
function enterWalk(){
  if(walk)return;walk=true;auto=false;
  // start where the orbit camera is (or 45 units out when it is high above), then descend to eye height
  const D=Math.min(cam.dist,45),cp=Math.cos(cam.pitch);
  const px=cam.tx+Math.sin(cam.yaw)*cp*D,pz=cam.tz+Math.cos(cam.yaw)*cp*D,py=Math.max(3.4,cam.ty+Math.sin(cam.pitch)*D);
  cam.tx=goal.tx=clamp(px,-GSIDE/2+20,GSIDE/2-20);cam.tz=goal.tz=clamp(pz,-GSIDE/2+20,GSIDE/2-20);cam.ty=py;cam.dist=goal.dist=0;
  goal.ty=3.4;goal.pitch=.1;goal.yaw=cam.yaw;collide();cam.tx=goal.tx;cam.tz=goal.tz;
  $("#rbWalk").classList.add("on");$("#hint").firstElementChild.textContent="Drag · look   WASD · walk   Shift · run";stage.classList.add("walking");bannerTop=null;dirty=true;
}
function exitWalk(){
  if(!walk)return;walk=false;
  cam.pitch=clamp(cam.pitch,.2,1.2);const d=90,cp=Math.cos(cam.pitch);
  const px=cam.tx,py=cam.ty,pz=cam.tz;
  // keep the camera where it is; put the orbit target in front of it
  cam.dist=d;cam.tx=px-Math.sin(cam.yaw)*cp*d;cam.ty=py-Math.sin(cam.pitch)*d;cam.tz=pz-Math.cos(cam.yaw)*cp*d;
  goal.tx=cam.tx;goal.ty=0;goal.tz=cam.tz;goal.dist=d+70;goal.pitch=.55;goal.yaw=cam.yaw;
  $("#rbWalk").classList.remove("on");$("#hint").firstElementChild.textContent="Drag · orbit   Right-drag · pan   Scroll · zoom";stage.classList.remove("walking");joyReset();dirty=true;
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
  // hover and open signs carry the facade reading (status, links, last edit, task) under the note name
  const addB=(id,cls,prio)=>{const b=B[id];if(!b)return;cands.push({x:b.cx,y:b.h+2.6,z:b.cz,t:NOTES[id].name,s:(cls==="hov"||cls==="sel")&&FACADES&&FSIG[id]?Facades.caption(FSIG[id]):"",cls,prio,c:colorOf(NOTES[id])})};
  if(sel>=0)addB(sel,"sel",100);
  if(walk&&doorNear>=0&&doorNear!==sel&&doorNear!==hov)addB(doorNear,"hov",95);
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
  if(districtAssets&&(walk||far<240))districtAssets.userData.records.forEach(r=>{
    if(Math.hypot(r.x-cp.x,r.z-cp.z)<(walk?100:220))cands.push({x:r.x,y:r.y+6*r.scale,z:r.z,t:r.title,s:"Open district work kit",cls:"dl",prio:45,c:DIST.find(d=>d.top===r.folder)?.color||"#D4A843"});
  });
  if(Campus.labelCands&&Campus.labelCands.length)cands.push(...Campus.labelCands);
  cands.sort((a,b)=>b.prio-a.prio);
  const taken=[],viewport=stage.getBoundingClientRect();let used=0;
  // Reserve only real HUD rectangles so NPC labels remain useful near the horizon.
  ["#hint","#mini","#chips","#floor","#plate"].forEach(selector=>{
    const el=$(selector);if(!el||el.hidden||!el.getClientRects().length)return;
    const r=el.getBoundingClientRect();if(!r.width||!r.height)return;
    taken.push([r.left-viewport.left-6,r.top-viewport.top-6,r.right-viewport.left+6,r.bottom-viewport.top+6]);
  });
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
  const count=typeof Districts!=="undefined"?Districts.all.length:DIST.length;
  $("#chips").innerHTML=`<button class="chip2 navchip" id="districtNavigator" type="button" aria-label="Open district navigator"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h7v6H4zM13 5h7v4h-7zM13 11h7v8h-7zM4 13h7v6H4z"/></svg>${count} districts</button>`+DIST.slice().sort((a,b)=>b.count-a.count).map(d=>`<button class="chip2" data-top="${esc(d.top)}"><i style="background:${d.color}"></i>${esc(d.name)}<b>${d.count}</b></button>`).join("");
}
$("#chips").addEventListener("click",e=>{const b=e.target.closest(".chip2");if(!b)return;if(b.id==="districtNavigator"){if(typeof Journey!=="undefined")Journey.show(cur&&typeof Districts!=="undefined"?Districts.worldTop(cur):undefined);return}closeSheet();flyDistrict(b.dataset.top)});
function markChip(){
  let best=null,bd=1e12;DIST.forEach(d=>{const dx=Math.max(d.x-cam.tx,0,cam.tx-(d.x+d.w)),dz=Math.max(d.z-cam.tz,0,cam.tz-(d.z+d.d)),q=dx*dx+dz*dz;if(q<bd){bd=q;best=d}});
  document.querySelectorAll(".chip2").forEach(c=>c.classList.toggle("on",best&&c.dataset.top===best.top&&!sheet.open));
  // Street level: announce each district as you walk into it.
  if(walk&&best&&bd===0&&best.top!==bannerTop)showDistrict(best,false);
  if(typeof DistrictLook!=="undefined")DistrictLook.near(best&&bd===0?best.top:null); // keep the current district lit while the view stays in it
}
let bannerTop=null,bannerT=0;
function districtInfo(d){const def=typeof Districts!=="undefined"?Districts.get(d.top):null;return {title:def?.title||d.name,purpose:def?.purpose||"",virtual:!!def?.virtual}}
function showDistrict(d,flown){
  bannerTop=d.top;if(typeof DistrictLook!=="undefined")DistrictLook.enter(d.top);if(VFXOK)VFX.district(d); // light curtain around the plot (b_vfx.js)
  const el=$("#districtBanner");if(!el)return;const info=districtInfo(d);
  document.querySelector(".brief")?.remove();
  el.innerHTML=`<i style="background:${esc(d.color)}"></i><div><small>${flown?"District":"Entering"} · ${esc(d.top)}</small><b>${esc(info.title)}</b><span>${d.count} notes${info.purpose?" · "+esc(info.purpose):""}</span></div><div class="db-go"><button class="btn" type="button" data-act="dir">Directory</button>${walk?"":`<button class="btn" type="button" data-act="walk">Walk here</button>`}</div><button class="ib x" type="button" aria-label="Dismiss district card"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>`;
  el.dataset.top=d.top;el.hidden=false;el.classList.remove("in");void el.offsetWidth;el.classList.add("in");
  clearTimeout(bannerT);bannerT=setTimeout(()=>{el.hidden=true},walk?5200:12000);
}
$("#districtBanner")?.addEventListener("click",e=>{const el=e.currentTarget,b=e.target.closest("button");if(!b)return;const top=el.dataset.top;el.hidden=true;
  if(b.dataset.act==="dir"&&typeof Journey!=="undefined")Journey.show(top);else if(b.dataset.act==="walk")walkDistrict(top)});
// ---------- touch stick
function joyReset(){joy.f=joy.r=0;joy.id=null;const k=$("#joy i");if(k)k.style.transform=""}
(()=>{const pad=$("#joy");if(!pad)return;
  const move=e=>{const r=pad.getBoundingClientRect(),R=r.width/2;let x=e.clientX-r.left-R,y=e.clientY-r.top-R;const m=Math.hypot(x,y);if(m>R){x*=R/m;y*=R/m}
    joy.r=Math.abs(x)<R*.12?0:x/R;joy.f=Math.abs(y)<R*.12?0:-y/R;pad.firstElementChild.style.transform=`translate(${x}px,${y}px)`;auto=false;dirty=true};
  pad.addEventListener("pointerdown",e=>{e.preventDefault();e.stopPropagation();pad.setPointerCapture(e.pointerId);joy.id=e.pointerId;move(e)});
  pad.addEventListener("pointermove",e=>{if(e.pointerId===joy.id)move(e)});
  ["pointerup","pointercancel","lostpointercapture"].forEach(t=>pad.addEventListener(t,e=>{if(e.pointerId===joy.id)joyReset()}));
})();

// ---------- task markers: a lamp on the roof of any note with open agent work
const MK={open:"#9CD3FF",claimed:"#F2B85B",review:"#22D3EE",blocked:"#E5534B"};
function setMarkers(list){
  tasksMarks=list||[];if(typeof DistrictLook!=="undefined")DistrictLook.tasks(tasksMarks); // district beacons
  // door lights follow open tasks (the most urgent status wins per note)
  const prevTasks=taskOf,rank={blocked:4,review:3,claimed:2,open:1};taskOf=new Map();
  tasksMarks.forEach(t=>{const n=byName.get(t.note);if(n&&(rank[t.status]||0)>(rank[taskOf.get(n.id)]||0))taskOf.set(n.id,t.status)});
  FSIG.forEach((s,id)=>{if(s)s.task=taskOf.get(id)||null});
  refreshDoors([...new Set([...prevTasks.keys(),...taskOf.keys()])]);
  if(!markerGroup)return;
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
const AG=new Map(),pulses=new Map(),bubbles=new Map(),floaters=[];let agentGroup=null,lastAgents=[],levels=new Map();
const LIVE_ST=["working","writing","reading","thinking","reviewing"];
function disposeSentinel(m){SentinelMesh.dispose(m.grp);agentGroup.remove(m.grp);if(m.link){m.link.geometry.dispose();m.link.material.dispose();agentGroup.remove(m.link)}}
function roofSurfaceAt(b,x,z){
  let y=b.tiers[b.tiers.length-1].y1;
  (b.roofSupports||[]).forEach(p=>{
    const dx=x-p.x,dz=z-p.z,c=Math.cos(p.ry||0),s=Math.sin(p.ry||0),lx=c*dx-s*dz,lz=s*dx+c*dz;
    if(Math.abs(lx)>p.sx/2||Math.abs(lz)>p.sz/2)return;
    y=Math.max(y,p.kind==="gable"?p.y+pitchedRoofHeight(p.sy,p.sz,lz):p.top);
  });
  return y;
}
function roofSlot(n,slot,count){
  const b=B[n.id],roof=rooftopAnchor(b),a=slot*(2*Math.PI/Math.max(count,1))+hash01(NOTES[n.id].name)*6;
  let x,z;
  if(b.authoredRoof){
    // Authored geometry is fitted inside a padded crown. Use its uncovered perimeter.
    const c=Math.cos(a),s=Math.sin(a),edge=Math.max(Math.abs(c),Math.abs(s));
    x=roof.x+c/edge*Math.max(.01,roof.w*.5-.01);z=roof.z+s/edge*Math.max(.01,roof.d*.5-.01);
  }else{
    const radius=Math.max(.12,Math.min(roof.w,roof.d)*.5-.65);
    x=roof.x+Math.cos(a)*radius;z=roof.z+Math.sin(a)*radius;
  }
  return new THREE.Vector3(x,roofSurfaceAt(b,x,z),z);
}
function stepRoofSurface(m,dt){
  const dx=m.roof.x-m.pos.x,dz=m.roof.z-m.pos.z,d=Math.hypot(dx,dz),step=Math.min(d,dt*6);
  if(d>.001){m.pos.x+=dx/d*step;m.pos.z+=dz/d*step;m.grp.rotation.y=Math.atan2(dx,dz)}
  const growth=growthOf(m.home.id);
  m.roof.y=roofSurfaceAt(m.home,m.roof.x,m.roof.z)*growth;
  // Sample support along the whole crossing, including ridges between two low slots.
  m.pos.y=roofSurfaceAt(m.home,m.pos.x,m.pos.z)*growth;
  m.grp.position.copy(m.pos);return d>.08;
}
function setAgents(list){
  lastAgents=list||[];if(!agentGroup)return;const seen=new Set(),counts=new Map();
  lastAgents.forEach(a=>{if(a.note&&!a.position){const n=byName.get(a.note);if(n&&B[n.id])counts.set(n.id,(counts.get(n.id)||0)+1)}});
  const slots=new Map();
  lastAgents.forEach(a=>{
    seen.add(a.id);const n=a.note?byName.get(a.note):null,b=n?B[n.id]:null;let m=AG.get(a.id);
    const level=a.level??levels.get(a.levelKey||a.id)??0;
    const signature=JSON.stringify([Identity.form(a.form||'agent'),Identity.palette(a.palette||['#111827',a.color||'#C97B54','#E6E9F2'],a.form||'agent'),a.symbol,a.ownerColor,a.ownerBadge,level]);
    if(m&&m.signature!==signature){const keep={pos:m.pos.clone(),noteId:m.noteId,path:m.path,leg:m.leg,phaseName:m.phaseName,lift:m.lift,home:m.home,roof:m.roof,pathT:m.pathT,from:m.from?.clone()};const prevM=m;disposeSentinel(m);AG.delete(a.id);m=null;m=SentinelMesh.create({...a,level});Object.assign(m,keep);/* sentinel continuity: pose, emote, LOD, talks and forge sweep carry over (b_sentinel.js) */if(SentinelMesh.carry)SentinelMesh.carry(prevM,m,time);agentGroup.add(m.grp);AG.set(a.id,m)}
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
          if(m.phaseName==='roof'&&m.noteId>=0&&B[m.noteId]){const d=B[m.noteId].door;m.path=[[d.x,d.z]].concat(route(d.x,d.z,b.door.x,b.door.z));m.phaseName='descend';m.lift={from:m.pos.y,to:0,x:d.x,z:d.z,h:B[m.noteId].h};/* audio hook */if(typeof VaultAudio!=="undefined")VaultAudio.sfx("sentinel.land",{position:m.pos})}
          else{m.path=route(from.x,from.z,b.door.x,b.door.z);m.phaseName='street';m.pos.set(from.x,0,from.z)}
          m.leg=0;m.pathT=time}
        m.noteId=n.id;m.roof=tgt;m.home=b;
      }
      m.home=b;m.roof=tgt;
      m.grp.visible=true;m.ring.scale.setScalar(2.2);
    }else{m.grp.visible=false;m.noteId=-1;m.path=null;m.phaseName='new'}
    m.grp.position.copy(m.pos);
  });
  AG.forEach((m,id)=>{if(!seen.has(id)){disposeSentinel(m);AG.delete(id)}});
  // cache the busy set here; only buildings whose busy state changed get a state upload
  if(iMesh){const nb=busySet(),diff=[];nb.forEach(id=>{if(!busyIds.has(id))diff.push(id)});busyIds.forEach(id=>{if(!nb.has(id))diff.push(id)});busyIds=nb;
    if(diff.length)applyState(diff)}
  dirty=true;
}
function gate(){const hm=byName.get("🏠 Home");const b=hm&&B[hm.id]?B[hm.id]:null;return b?{x:b.door.x,z:b.door.z+8}:{x:0,z:GSIDE/2-30}}
function setLevels(map){levels=map||new Map();setAgents(lastAgents)}
function pulse(name){const n=byName.get(name);if(!n||!B[n.id])return;if(typeof DistrictLook!=="undefined")DistrictLook.write(B[n.id].worldTop);pulses.set(n.id,time+6);if(iMesh)applyState([n.id]);ink(name)}
function say(id,text,ttl=8){const m=AG.get(id);if(!m)return false;bubbles.set(id,{text:String(text).slice(0,120),until:time+ttl});if(!reduced)SentinelMesh.emote(m,'greet',time);lastLbl=0;dirty=true;return true}
function floater(id,text,color){const m=AG.get(id);if(!m||!m.grp.visible)return;floaters.push({x:m.pos.x,y:m.pos.y+7.5,z:m.pos.z,text,color:color||m.info.color||'#E8A33D',t0:time});dirty=true}
function emote(id,name){const m=AG.get(id);if(m&&!reduced)SentinelMesh.emote(m,name,time)}
// a burst of accent particles over a building: task done, level up.
// Pooled and GPU-driven in b_vfx.js (fixed seeds, shader time): no allocation per event, one draw for every burst.
// Reduced motion gets a still halo that fades in place, so the event is still visible.
function celebrate(noteName,color){
  const n=byName.get(noteName);const b=n?B[n.id]:null;if(!b)return;
  if(VFXOK)VFX.burst(b.cx,(b.roofClearance||b.h)+1,b.cz,color||'#F2B85B',{w:b.fw,d:b.fd});
  pulses.set(n.id,time+5);applyState([n.id]);dirty=true;
  if(!reduced)AG.forEach(m=>{if(m.noteId===n.id)SentinelMesh.emote(m,'celebrate',time)});
}
// A live write landed on a note: a ring and light column at its door, a scanline sweep up its facade (b_vfx.js).
function ink(name,color){const n=byName.get(name);const b=n?B[n.id]:null;if(!b||!VFXOK)return false;const ok=VFX.ink({id:n.id,cx:b.cx,cz:b.cz,fw:b.fw,fd:b.fd,h:b.h},color);if(ok)dirty=true;return ok}
// Huddles: one state per shared roof (several roofs can huddle at once), reused vectors, shader-pulsed link.
const HUDDLES=new Map(),_hFrom=new THREE.Vector3(),_hTo=new THREE.Vector3(),_hDir=new THREE.Vector3(),_hUp=new THREE.Vector3(0,1,0);
function stepAgents(dt){
  let live=false;const onRoof=new Map();
  /* sentinel crowd director: distance LOD, frustum skip, pose budget (b_sentinel.js) */if(typeof SentinelCrowd!=="undefined")SentinelCrowd.begin(AG,camera,time,{hi:HI});
  AG.forEach(m=>{
    if(!m.grp.visible)return;live=true;const a=m.info;let status=a.status;
    if(m.phaseName==='descend'){const k=clamp((time-m.pathT)/Math.max(.8,m.lift.h/22),0,1);m.pos.set(m.lift.x,m.lift.from*(1-k),m.lift.z);m.grp.position.copy(m.pos);SentinelMesh.pose(m,time,'lifting',{beam:m.lift.h,beamBase:0});if(k>=1){m.phaseName='street';m.pathT=time;m.leg=0;m.pos.y=0}return}
    if(m.phaseName==='street'&&m.path){
      const speed=Math.max(14,pathLength(m.path,m.pos)/14)*dt;let left=speed;
      while(left>0&&m.leg<m.path.length){const [tx,tz]=m.path[m.leg];const dx=tx-m.pos.x,dz=tz-m.pos.z,d=Math.hypot(dx,dz);if(d<=left){m.pos.x=tx;m.pos.z=tz;left-=d;m.leg++}else{m.pos.x+=dx/d*left;m.pos.z+=dz/d*left;const yaw=Math.atan2(dx,dz);m.grp.rotation.y+=(((yaw-m.grp.rotation.y+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI)*Math.min(1,dt*10);left=0}}
      m.pos.y=0;m.grp.position.copy(m.pos);
      if(m.leg>=m.path.length){m.phaseName='lift';m.pathT=time;m.lift={from:0,to:m.roof.y,x:m.pos.x,z:m.pos.z,h:m.roof.y};/* audio hook */if(typeof VaultAudio!=="undefined")VaultAudio.sfx("sentinel.lift",{position:m.pos})}
      SentinelMesh.pose(m,time,'walking');return}
    if(m.phaseName==='lift'){const k=clamp((time-m.pathT)/Math.max(.9,m.lift.h/20),0,1),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;m.pos.y=m.lift.h*e;m.grp.position.copy(m.pos);SentinelMesh.pose(m,time,'lifting',{beam:m.lift.h,beamBase:0});
      if(VFXOK)VFX.trail(m,m.pos.x,m.pos.y+1,m.pos.z,a.color||'#E8A33D'); // spark trail up the facade
      if(k>=1){m.phaseName='roof';m.pathT=time;m.from.copy(m.pos);m.pos.y=m.roof.y;if(VFXOK)VFX.arrive(m.pos.x,m.pos.y,m.pos.z,a.color||'#E8A33D')}return}
    if(m.phaseName==='roof'&&m.roof){if(stepRoofSurface(m,dt)){SentinelMesh.pose(m,time,'walking');return}
      if(!onRoof.has(m.noteId))onRoof.set(m.noteId,[]);onRoof.get(m.noteId).push(m)}
    if(a.position)status=a.position.walking?'walking':'viewing';
    if(a.local)status='viewing';
    SentinelMesh.pose(m,time,status||'idle');
  });
  // huddles: Sentinels that share a roof face the center, and two of them trade a data beam now and then
  onRoof.forEach((group,noteId)=>{
    const b=B[noteId];group.forEach(m=>{const dx=b.cx-m.pos.x,dz=b.cz-m.pos.z;m.grp.rotation.y+=(((Math.atan2(dx,dz)-m.grp.rotation.y+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI)*Math.min(1,dt*3);m.face=null});
    const H=HUDDLES.get(noteId);
    if(group.length<2){if(H){if(H.a&&H.a.props&&H.a.props.link)H.a.props.link.visible=false;HUDDLES.delete(noteId)}return}
    const h=H||{until:0,on:0,nodAt:0,a:null,b:null};if(!H)HUDDLES.set(noteId,h);
    if(time>h.until){const slot=Math.floor(time/7),i=Math.floor(hash01(noteId+':'+slot)*group.length),j=(i+1+Math.floor(hash01('j'+noteId+':'+slot)*(group.length-1)))%group.length;
      if(h.a&&h.a.props&&h.a.props.link)h.a.props.link.visible=false;
      h.a=group[i];h.b=group[j];h.until=time+7;h.on=time+2.6;h.nodAt=reduced?0:time+.5;if(!reduced)SentinelMesh.emote(h.a,'greet',time)}
    // the listener nods half a second later, on the frame clock (no timer outlives a disposed figure)
    if(h.nodAt&&time>=h.nodAt){h.nodAt=0;if(group.includes(h.b))SentinelMesh.emote(h.b,'nod',time)}
    if(h.a&&h.b&&group.includes(h.a)&&group.includes(h.b)){const A=h.a,Bm=h.b;A.face=Math.atan2(Bm.pos.x-A.pos.x,Bm.pos.z-A.pos.z);Bm.face=Math.atan2(A.pos.x-Bm.pos.x,A.pos.z-Bm.pos.z);
      if(time<h.on){const l=SentinelMesh.prop(A,'link');
        if(VFXOK&&!l.userData.vfxLink){const c=l.material.color;l.material.dispose();l.material=VFX.linkMaterial(c);l.userData.vfxLink=true}
        l.visible=true;_hFrom.set(0,4.3,0);_hTo.copy(Bm.grp.position).sub(A.grp.position);_hTo.y+=4.3;_hTo.applyAxisAngle(_hUp,-A.grp.rotation.y);
        const d=_hFrom.distanceTo(_hTo);l.position.copy(_hFrom).lerp(_hTo,.5);l.scale.set(1,d,1);
        // orient the cylinder's axis along the beam in A's own frame (lookAt expects world space)
        _hDir.copy(_hTo).sub(_hFrom);if(d>1e-4)l.quaternion.setFromUnitVectors(_hUp,_hDir.multiplyScalar(1/d));
        if(!l.userData.vfxLink)l.material.opacity=.3+.3*Math.abs(Math.sin(time*14))}
      else if(A.props.link)A.props.link.visible=false}
  });
  HUDDLES.forEach((h,id)=>{if(!onRoof.has(id)){if(h.a&&h.a.props&&h.a.props.link)h.a.props.link.visible=false;HUDDLES.delete(id)}});
  const exp=[];pulses.forEach((u,id)=>{if(u<time){pulses.delete(id);exp.push(id)}});if(exp.length)applyState(exp);
  bubbles.forEach((b,id)=>{if(b.until<time)bubbles.delete(id)});
  for(let i=floaters.length-1;i>=0;i--)if(time-floaters[i].t0>2.2)floaters.splice(i,1);
  /* sentinel crowd director: street lanes, door queues, directed talks, spatial steps; calm figures cap at 30 fps */
  if(typeof SentinelCrowd!=="undefined")live=SentinelCrowd.end(AG,time,dt);
  return live||pulses.size>0||floaters.length>0;
}
function pathLength(path,pos){let l=0,px=pos.x,pz=pos.z;for(const [x,z] of path){l+=Math.hypot(x-px,z-pz);px=x;pz=z}return l}

// ---------- input
const ptrs=new Map();let moved=false,pinch=null,dragBtn=0;
function stopAuto(){auto=false;flight=null} // user input also cancels an eased camera flight
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
pickers.push(ray=>{
  if(!districtAssets||typeof DistrictAssets==="undefined")return false;
  const intersection=ray.intersectObjects(districtAssets.children,false)[0],record=DistrictAssets.hit(intersection);
  if(!record)return false;
  // Respect occlusion: an asset behind a note building must not steal that building's click.
  const noteHit=iMesh?ray.intersectObject(iMesh,false)[0]:null;if(noteHit&&noteHit.distance<intersection.distance-.05)return false;
  if(typeof Journey!=="undefined")Journey.show(record.folder);else if(record.sourceNotes.length){const note=byName.get(record.sourceNotes[0]);if(note)open(note)}
  return true;
});
function endPtr(e){const p=ptrs.get(e.pointerId);if(!p)return;ptrs.delete(e.pointerId);cv.classList.remove("drag");if(ptrs.size<2)pinch=null;
  if(!moved&&ptrs.size===0&&e.type==="pointerup"&&p.btn===0){const r=cv.getBoundingClientRect();rc.setFromCamera({x:(e.clientX-r.left)/r.width*2-1,y:-((e.clientY-r.top)/r.height*2-1)},camera);if(pickers.some(f=>f(rc,e)))return;const id=pick(e.clientX,e.clientY);if(id>=0)open(NOTES[id])}}
cv.addEventListener("pointerup",endPtr);cv.addEventListener("pointercancel",endPtr);
cv.addEventListener("pointerleave",()=>{if(hov>=0){const p=hov;hov=-1;applyState([p]);updateLabels()}});
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
function hoverAt(x,y){hx=x;hy=y;if(hoverRaf)return;hoverRaf=requestAnimationFrame(()=>{hoverRaf=0;if(!C.ok||ptrs.size)return;const id=pick(hx,hy);if(id!==hov){const p=hov;hov=id;cv.classList.toggle("hov",id>=0);applyState([p,id]);lastLbl=0}})}
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
  else{const want=eyeClear(dx,dy,dz,cam.dist);eyeDist=eyeDist<0||want<eyeDist?want:eyeDist+(want-eyeDist)*.18;const d=Math.min(cam.dist,eyeDist);
    camera.position.set(cam.tx+dx*d,Math.max(2.5,cam.ty+dy*d),cam.tz+dz*d);camera.lookAt(cam.tx,cam.ty,cam.tz)}
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
  if(walk&&(joy.f||joy.r)){const m=Math.hypot(joy.f,joy.r),v=26*(m>.92?2.2:1)*dt;walkMove(joy.f*v,joy.r*v);dirty=true}
  if(auto&&!walk&&!sheet.open){goal.yaw+=dt*.04;dirty=true}
  if(stepFlight()){dirty=true}else{
  const k=reduced?1:1-Math.exp(-dt*(walk?13:5.5));
  let dyaw=((goal.yaw-cam.yaw+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;
  let mv=Math.abs(dyaw)+Math.abs(goal.pitch-cam.pitch)+Math.abs(goal.dist-cam.dist)*.01+Math.abs(goal.tx-cam.tx)*.01+Math.abs(goal.ty-cam.ty)*.01+Math.abs(goal.tz-cam.tz)*.01;
  cam.yaw+=dyaw*k;cam.pitch+=(goal.pitch-cam.pitch)*k;cam.dist+=(goal.dist-cam.dist)*k;cam.tx+=(goal.tx-cam.tx)*k;cam.ty+=(goal.ty-cam.ty)*k;cam.tz+=(goal.tz-cam.tz)*k;
  if(mv>.0008)dirty=true;
  }
  // sheet shift
  const ks=1-Math.exp(-dt*9);const sx=shiftGoal.x-shiftNow.x,sy2=shiftGoal.y-shiftNow.y;
  if(Math.abs(sx)>.3||Math.abs(sy2)>.3){shiftNow.x+=sx*ks;shiftNow.y+=sy2*ks;applyShift();dirty=true}
}
let renderWasActive=false;
const renderBudget={scale:1,slow:0,fast:0,extreme:0,samples:0,ms:0,changes:0};
function sampleRenderBudget(ms){
  if(!Number.isFinite(ms)||ms<=0){renderBudget.extreme=0;return}
  // Three consecutive very slow visible frames trigger a bounded emergency step.
  // A single tab/task stall cannot poison the normal average or force a reduction.
  if(ms>150){
    if(++renderBudget.extreme<3)return;
    renderBudget.extreme=0;renderBudget.slow=0;renderBudget.fast=0;renderBudget.samples=0;renderBudget.ms=0;
    if(renderBudget.scale>.6){renderBudget.scale=Math.max(.6,renderBudget.scale-.15);renderBudget.changes++;resize()}
    return;
  }
  renderBudget.extreme=0;
  renderBudget.ms+=ms;renderBudget.samples++;
  if(renderBudget.samples<90)return;
  const average=renderBudget.ms/renderBudget.samples;renderBudget.samples=0;renderBudget.ms=0;
  renderBudget.slow=average>27?renderBudget.slow+1:0;renderBudget.fast=average<20?renderBudget.fast+1:0;
  if(renderBudget.slow>=2&&renderBudget.scale>.6){renderBudget.scale=Math.max(.6,renderBudget.scale-.15);renderBudget.slow=0;renderBudget.fast=0;renderBudget.changes++;resize()}
  else if(renderBudget.fast>=5&&renderBudget.scale<1){renderBudget.scale=Math.min(1,renderBudget.scale+.1);renderBudget.fast=0;renderBudget.changes++;resize()}
}
function frame(t){
  requestAnimationFrame(frame);
  const priorRenderActive=renderWasActive;renderWasActive=false;
  if(!C.ok||document.hidden||paused||glLost)return;
  const frameMs=t-last;const dt=Math.min(.05,frameMs/1000||.016);last=t;time=t/1000;
  step(dt);
  const introRun=introStart>=0&&time-introStart<3.6;
  if(introRun){writeMatrices();renderer.shadowMap.needsUpdate=true;dirty=true}else if(introStart>=0){introStart=-1;growth.fill(1);writeMatrices();renderer.shadowMap.needsUpdate=true;dirty=true}
  if(bridgeGroup.children.length){
    if(bridgeProg<1)bridgeProg=Math.min(1,bridgeProg+dt*1.6);
    Object.values(bridgeMats).forEach(m=>{m.uniforms.time.value=time;m.uniforms.prog.value=bridgeProg});dirty=true;
  }
  if(stepAgents(dt))dirty=true;
  frameHooks.forEach(f=>{if(f(dt,time))dirty=true});
  // ambient life (clouds, water, motes, drones, blinking masts) keeps the frame going on its own:
  // 30 fps on desktop, 15 on a phone (MID) while it holds full resolution; once the adaptive budget has had to
  // back off, the phone stops ambient-only frames so interaction keeps the pixels (renderBudget can recover)
  const ambHz=AMB?30:MID?(renderBudget.scale<.95?0:15):0;
  if(ambHz&&!dirty&&time-lastAmb>=1/ambHz)dirty=true;
  if(!dirty)return;
  dirty=false;lastAmb=time;
  if(AMB||MID||introRun)SH.uTime.value=time;
  applyCamera();
  skyMesh.position.copy(camera.position);if(stars)stars.position.copy(camera.position);
  if(AMB)stepDrones();
  if(motes&&(AMB||MID))motes.material.uniforms.uCenter.value.set(cam.tx,0,cam.tz);
  const renderStart=performance.now();renderer.info.reset(); // counters sum every pass of this frame (autoReset is off)
  if(composer&&postState==="ready"&&HI&&!reduced){bloomPass.enabled=bloomNow>.03;bloomPass.strength=.55*bloomNow;updateGrade();if(VFXOK)VFX.post(bloomPass,gradePass.uniforms);composer.render()}else renderer.render(scene,camera);
  perfFrame(performance.now()-renderStart);
  stRange=null; // the aState range uploaded with this frame (three resets updateRange after the upload)
  // Consecutive rendered frames include GPU/compositor pressure; idle 30 Hz frames do not.
  sampleRenderBudget(Math.max(performance.now()-renderStart,priorRenderActive?frameMs:0));renderWasActive=true;
  if(!firstFrame){firstFrame=true;const l=$("#loading");l.style.opacity=0;setTimeout(()=>l.hidden=true,700)}
  if(t-lastLbl>90){lastLbl=t;updateLabels();markChip()}
  if(t-lastMini>120){lastMini=t;drawMini()}
}

// ---------- quality tier, live: rotation, a resize past 760 px or a title-settings change adapts without a reload
function applyQuality(){
  const t=readQuality();if(!scene||t===tierNow)return t;tierNow=t;
  if((AMB||MID)&&!motes){motes=makeMotes();scene.add(motes)}
  if(motes)motes.visible=AMB||MID;
  if(AMB&&!droneBody)scene.add(makeDrones());
  if(droneBody&&droneBody.parent)droneBody.parent.visible=AMB;
  if(VFXOK)VFX.applyTier(t);
  if(WORLDX.horizon&&(AMB||MID)!==!!WORLDX.boats)buildWorldEdge(); // boats and birds only where ambient frames run
  if(postState==="off"&&wantPost())loadPost();
  dirty=true;return t;
}
// ---------- GPU context loss (Android backgrounding, memory pressure on A15-class phones).
// three.js keeps every geometry, texture and material on the JS side and re-uploads after a restore; this pauses the
// loop while the context is gone, tells the reader the 3D view is paused (the reader keeps working), and on restore
// re-flags instances, materials, shadows and the post chain so the next frame rebuilds them.
function glNotice(on){
  let el=document.getElementById("glLost");
  if(!on){if(el)el.remove();return}
  if(el)return;el=document.createElement("div");el.id="glLost";el.setAttribute("role","status");
  el.style.cssText="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:30;max-width:min(360px,calc(100% - 32px));padding:16px 18px;border-radius:14px;background:rgba(8,11,20,.88);color:#F4EFE6;text-align:center;font:14px/1.45 system-ui,sans-serif;box-shadow:0 10px 40px rgba(0,0,0,.4)";
  el.innerHTML="<b style='display:block;font-size:16px;margin-bottom:4px'>3D view paused</b>The graphics chip reset. Notes, search and the agent desk still work. The city comes back on its own; if it does not, reload the view.<br><button type='button' class='btn' style='margin-top:12px;min-height:44px;min-width:44px;padding:0 18px'>Reload view</button>";
  el.querySelector("button").addEventListener("click",()=>location.reload());
  stage.appendChild(el);
}
function restoreGL(){
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
  if(iMesh){iMesh.instanceMatrix.needsUpdate=true;stRange=null;Object.values(iMesh.geometry.attributes).forEach(a=>{a.updateRange.count=-1;a.needsUpdate=true})}
  if(facade){[facade.geometry.attributes.aGlow,facade.instanceColor,facade.instanceMatrix].forEach(a=>{if(a){a.updateRange.count=-1;a.needsUpdate=true}})} // facade dressing re-uploads whole
  scene.traverse(o=>{if(o.material)[].concat(o.material).forEach(m=>{m.needsUpdate=true})});
  if(typeof SentinelMesh!=="undefined"&&SentinelMesh.refreshEnvironment)try{SentinelMesh.refreshEnvironment(renderer,scene)}catch(e){} // integrator: the PMREM target does not survive a context loss
  if(postState==="ready"){try{setupPost()}catch(e){console.warn("post unavailable after restore:",e);postState="failed"}}
  glLost=false;glNotice(false);resize();dirty=true;
}
function guardGL(){
  const lost=()=>{glLost=true;glNotice(true);if(typeof toast==="function")toast("3D view paused. The reader keeps working.")};
  if(VFXOK)VFX.guardContext(cv,{onLost:lost,onRestored:restoreGL});
  else{cv.addEventListener("webglcontextlost",e=>{e.preventDefault();lost()});cv.addEventListener("webglcontextrestored",restoreGL)}
}

// ---------- boot
function init(){
  try{
    if(typeof THREE==="undefined")throw new Error("three.js did not load");
    renderer=new THREE.WebGLRenderer({canvas:cv,antialias:true,powerPreference:"high-performance"});
    renderer.outputEncoding=THREE.sRGBEncoding;renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;
    renderer.info.autoReset=false; // perf: frame totals across shadow, scene and post passes (see perfFrame)
    readQuality();guardGL();
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
    // pooled effects layer (b_vfx.js): write pulses, bursts, sparks, district curtain, weather; one frame hook
    if(VFXOK&&VFX.init(scene,SH,TEX.glow))frameHooks.push((dt,t)=>VFX.step(dt,t));
    frameHooks.push(stepSkyBlend); // manual time-of-day glides (world pass)
    frameHooks.push(stepBlobs); // contact shadows under moving figures (world pass)
    frameHooks.push(facadeTick); // facade dressing LOD and the walker's door light (b_buildings.js)
    build(null);
    applyQuality();
    applyMode(mode);resize();
    // the real sun moves: once a minute, and again when the tab comes back
    skyTimer=setInterval(skyTick,60000);document.addEventListener("visibilitychange",skyTick);window.addEventListener("focus",skyTick);
    loadPost();
    // opening shot: high above the plan, then a slow drift
    cam.tx=goal.tx=0;cam.tz=goal.tz=0;cam.ty=goal.ty=0;cam.dist=GSIDE*1.05;goal.dist=GSIDE*.8;cam.pitch=.95;goal.pitch=.62;cam.yaw=goal.yaw=.5;
    C.ok=true;
    $("#plateP").textContent=`${NOTES.length} notes in ${DIST.length} districts. ${TOUCH?"Tap":"Click"} a building to read it. Open a note and the camera flies to it and draws its links.`;
    requestAnimationFrame(frame);
  }catch(err){
    console.warn("3D unavailable:",err);C.ok=false;
    ["#plate","#mini","#hint","#chips","#loading",".vig"].forEach(s=>{const e=document.querySelector(s);if(e)e.hidden=true});
    stage.insertAdjacentHTML("beforeend",`<div class="nogl"><div><b>The 3D campus needs WebGL</b>Your browser or this frame blocked it. The reader, explorer, search and agent desk still work.</div></div>`);
  }
}
function resize(){
  const r=stage.getBoundingClientRect();W=Math.max(1,r.width|0);H=Math.max(1,r.height|0);applyQuality();
  // pixel budget: 1.75x on desktop high, 1.5x on phones, 1x on low
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,(QUALITY==="low"?1:innerWidth>760?1.75:1.5)*renderBudget.scale));renderer.setSize(W,H,false);camera.aspect=W/H;applyShift();
  const ps=H*renderer.getPixelRatio()*.5/Math.tan(camera.fov*Math.PI/360);
  if(DMAT.halo)DMAT.halo.uniforms.uScale.value=ps;if(stars)stars.material.uniforms.uPR.value=renderer.getPixelRatio();if(motes)motes.material.uniforms.uScale.value=ps;if(VFXOK)VFX.setScale(ps);
  if(composer){composer.setPixelRatio(renderer.getPixelRatio());composer.setSize(W,H)}
  dirty=true;
}
function cycleTime(){
  const m=MODE_ORDER[(MODE_ORDER.indexOf(mode)+1)%MODE_ORDER.length];
  if(!C.ok){mode=m;const ui=m==="auto"?(new Date().getHours()>=7&&new Date().getHours()<18?"light":"dark"):MODES[m].ui;document.documentElement.dataset.theme=ui;store.set("vault.theme",ui);store.set("vault.time",m);if(typeof HUD!=="undefined"&&HUD.phase)try{HUD.phase(m==="auto"?(ui==="light"?"day":"night"):m,ui)}catch(e){}/* integrator: no-WebGL path keeps the HUD tint in step */return}
  applyMode(m,true);toast("Time of day: "+(m==="auto"?"auto (your local sun)":m));
}
function shift(el){
  if(!C.ok)return;
  if(!el||!el.classList.contains("open")){shiftGoal.x=0;shiftGoal.y=0;$("#hint").style.right="14px";$("#floor").style.right="14px"}
  else if(innerWidth>760){shiftGoal.x=el.offsetWidth/2;shiftGoal.y=0;$("#hint").style.right=(el.offsetWidth+14)+"px";$("#floor").style.right=(el.offsetWidth+14)+"px"}
  else{shiftGoal.x=0;shiftGoal.y=el.offsetHeight/2}
  dirty=true;
}
function rebuild(prevNames,options={}){
  if(!C.ok)return;const selName=sel>=0?NOTES.find(n=>n.id===sel)?.name:null;
  const view=options.preserveCamera?{cam:{...cam},goal:{...goal},walk,auto}:null;
  build(prevNames);if(cur)cur=byName.get(cur.name)||null;
  if(selName&&byName.get(selName))select(byName.get(selName));else{sel=-1;nbr=new Map();applyState()}
  AG.forEach(m=>{m.noteId=-1;m.phaseName='placed'});setAgents(lastAgents);
  if(view){
    Object.assign(cam,view.cam);Object.assign(goal,view.goal);walk=view.walk;auto=view.auto;
    if(walk){
      // Catalog regrouping can put a new building under the member. Keep the walking
      // view and heading, moving only to a nearby free street cell when necessary.
      const [x,z]=cellOf(goal.tx,goal.tz);
      if(!free(x,z)){const [fx,fz]=nearestFree(x,z);if(free(fx,fz)){cam.tx=goal.tx=NAV.ox+(fx+.5)*NAV.cell;cam.tz=goal.tz=NAV.oz+(fz+.5)*NAV.cell}else exitWalk()}
      if(walk){const x0=goal.tx,z0=goal.tz;collide();if(goal.tx!==x0||goal.tz!==z0){cam.tx=goal.tx;cam.tz=goal.tz}}
    }
    applyCamera();dirty=true;
  }
}
function boot(){init();return C.ok}
function skipIntro(){introStart=-1;if(growth)growth.fill(1);if(iMesh)writeMatrices();auto=false;if(renderer)renderer.shadowMap.needsUpdate=true;dirty=true}
return {boot,skipIntro,setAgents,setLevels,pulse,ink,say,floater,emote,celebrate,focus,clear,overview,toggleWalk,flyDistrict,walkDistrict,cycleTime,shift,rebuild,setMarkers,
  // integration points for other modules (guides, title, world): read-only handles plus hooks
  /* UX hook (g_ux.js): apply a quality change from the Go-to palette without a reload */applyQuality:()=>{const t=applyQuality();if(renderer)resize();return t},
  /* world pass */photo:on=>on===undefined?PHOTO.on:setPhoto(on),savePhoto,perf:perfStats,addShadowCaster:f=>{if(typeof f==="function")WORLDX.casters.push(f)},
  scene:()=>scene,camera:()=>camera,renderer:()=>renderer,districts:()=>DIST,buildings:()=>B,world:()=>({GSIDE,WORLD,NAV}),labelCands:[],addPicker:f=>pickers.push(f),onFrame:f=>frameHooks.push(f),route,gate,flyAt:(x,z,y=0,dist=40,pitch=.4)=>{if(!C.ok)return;if(walk)exitWalk();auto=false;goal.tx=x;goal.tz=z;goal.ty=y;goal.dist=dist;goal.pitch=pitch;fly();dirty=true},mode:()=>mode,flyTo:id=>{const m=AG.get(id);if(!m||!C.ok)return false;if(walk)exitWalk();auto=false;goal.tx=m.pos.x;goal.tz=m.pos.z;goal.ty=m.pos.y;goal.dist=34;goal.pitch=.32;fly();dirty=true;return true},pause:b=>{paused=!!b;if(!b)dirty=true},/* audio hook: world position of a visible Sentinel, for spatial work sounds */agentPos:id=>{const m=AG.get(id);return m&&m.grp.visible?[m.pos.x,m.pos.y+1.5,m.pos.z]:null},ok:()=>C.ok,selectedName:()=>sel>=0?NOTES[sel].name:null,position:()=>({x:cam.tx,z:cam.tz,yaw:cam.yaw,walking:walk,dist:cam.dist}),debug:()=>({cam,goal,walk,mode,W,H,N:inst.length,districts:DIST.length,world:WORLD,sol:SOL,post:postState,tier:tierNow,glLost,vfx:VFXOK?VFX.stats():null,weather:VFXOK?VFX.weather():null,tex:TEX,landmarks:districtAssets?.userData.records||[],renderBudget:{...renderBudget},perf:perfStats(),flight:!!flight,
    // testing only: pin the local clock to a decimal hour (null restores the real clock) and recompute the sky
    setClock:h=>{SOL.clockOverride=h==null?null:+h;if(C.ok)applyMode("auto")},
    // testing only: force today's weather ("clear", "mist", "drizzle", "rain"; null restores the daily seed)
    setWeather:k=>{if(!VFXOK)return null;const w=VFX.setWeather(k);if(C.ok){applyMode(mode);dirty=true}return w}})};
})();



