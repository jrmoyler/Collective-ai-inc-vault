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
let apron=null,renderer,scene,camera,sun,hemi,skyMat,skyMesh,ground,groundMat,iMesh,mat,uni={},ringMesh,bridgeGroup,markerGroup,rc;
let W=1,H=1,paused=false,dirty=true,last=0,time=0,lastLbl=0,lastMini=0,firstFrame=false,introStart=-1;
let B=[],DIST=[],BLOCKS=[],WORLD={W:1,H:1},GSIDE=1,inst=[],boxes=null,boxB=null,growth=null,delay=null,LAND=[];
let sel=-1,hov=-1,nbr=new Map(),mode=store.get("vault.time","dusk"),walk=false,auto=!reduced,tasksMarks=[];
const cam={tx:0,ty:0,tz:0,yaw:.5,pitch:.62,dist:700},goal=Object.assign({},cam);
const shiftNow={x:0,y:0},shiftGoal={x:0,y:0};
const keys=new Set();
const lin=h=>new THREE.Color(h).convertSRGBToLinear();

const MODES={
  dusk:{top:"#0f1733",mid:"#3a4577",bot:"#8a6a86",sun:"#ff9a4d",sunI:3.6,dir:[.74,.3,.46],hSky:"#6f7fba",hGnd:"#3a2d3c",hI:.95,fog:"#6c5b7c",fogD:.00062,exp:1.1,win:1.5,ui:"dark"},
  night:{top:"#03050d",mid:"#0b1230",bot:"#1b2650",sun:"#8fa8ff",sunI:.6,dir:[.5,.36,.5],hSky:"#2b3768",hGnd:"#0a0c16",hI:.55,fog:"#0a1024",fogD:.00105,exp:1.2,win:3.1,ui:"dark"},
  day:{top:"#5d8dd0",mid:"#a8c3de",bot:"#eadfca",sun:"#fff0d4",sunI:3.1,dir:[.46,.62,.42],hSky:"#b9cfe9",hGnd:"#968c7c",hI:.95,fog:"#cbd4dc",fogD:.00068,exp:1.0,win:.35,ui:"light"}
};

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
  return tex;
}

// ---------- scene
function makeMaterial(){
  const m=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.72,metalness:.1});m.extensions={derivatives:true};
  m.onBeforeCompile=sh=>{
    sh.uniforms.uWin={value:MODES[mode].win};uni=sh.uniforms;
    sh.vertexShader=sh.vertexShader
      .replace("#include <common>","#include <common>\nattribute vec3 aCol;attribute vec4 aTint;attribute vec4 aState;varying vec3 vBCol;varying vec4 vBTint;varying vec4 vBSt;varying vec3 vWPos;varying vec3 vBN;")
      .replace("#include <begin_vertex>","#include <begin_vertex>\nvWPos=(modelMatrix*instanceMatrix*vec4(transformed,1.0)).xyz;vBN=normal;vBCol=aCol;vBTint=aTint;vBSt=aState;");
    sh.fragmentShader=sh.fragmentShader
      .replace("#include <common>","#include <common>\nuniform float uWin;varying vec3 vBCol;varying vec4 vBTint;varying vec4 vBSt;varying vec3 vWPos;varying vec3 vBN;\nfloat h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}")
      .replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
{
  vec3 N=normalize(vBN);
  float wall=step(abs(N.y),0.5);
  float top=step(0.5,N.y);
  float useZ=step(0.5,abs(N.x));
  float u=mix(vWPos.x,vWPos.z,useZ);
  vec2 g=vec2(u,vWPos.y)/vec2(2.5,3.3);
  vec2 id=floor(g);vec2 f=fract(g);
  vec2 fwv=fwidth(g);float far=smoothstep(0.28,0.7,max(fwv.x,fwv.y));
  float inW=mix(step(0.17,f.x)*step(f.x,0.83)*step(0.2,f.y)*step(f.y,0.8),0.42,far);
  float r=h21(id+vBSt.z*91.7+useZ*17.0);
  float lit=mix(step(1.0-vBSt.x,r),vBSt.x,far);
  float lobby=1.0-step(1.7,vWPos.y);
  vec3 warm=mix(vec3(1.0,0.68,0.32),vec3(0.62,0.78,1.0),step(0.9,h21(id.yx+vBSt.z*13.0)));
  warm=mix(warm,vBTint.rgb*1.6,0.3*step(0.55,h21(id*1.7+3.0)));
  float flick=0.7+0.3*h21(id+7.0);
  float w=wall*inW;
  float hi=vBSt.y;
  vec3 base=vBCol*mix(1.0,1.28,top);
  diffuseColor.rgb=mix(base,base*0.16+vec3(0.008,0.012,0.026),w);
  roughnessFactor=mix(roughnessFactor,0.5,w);
  metalnessFactor=mix(metalnessFactor,0.05,w);
  vec3 em=warm*flick*w*(lit+lobby*0.9)*uWin*(1.0+hi*1.3);
  em+=top*(vBTint.rgb*vBTint.a*1.1+vec3(1.0,0.62,0.2)*hi*0.9);
  em+=wall*(1.0-w)*vec3(1.0,0.6,0.2)*hi*0.10;
  totalEmissiveRadiance+=em*vBSt.w;
  diffuseColor.rgb*=vBSt.w;
}`);
  };
  return m;
}
function buildInstances(prev){
  if(iMesh){scene.remove(iMesh);iMesh.geometry.dispose()}
  inst=[];B.forEach(b=>{if(b)b.tiers.forEach((t,k)=>inst.push({b,t,k}))});
  const N=inst.length;
  const geo=new THREE.BoxGeometry(1,1,1);geo.translate(0,.5,0);
  const aCol=new Float32Array(N*3),aTint=new Float32Array(N*4),aSt=new Float32Array(N*4);
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
  });
  geo.setAttribute("aCol",new THREE.InstancedBufferAttribute(aCol,3));
  geo.setAttribute("aTint",new THREE.InstancedBufferAttribute(aTint,4));
  geo.setAttribute("aState",new THREE.InstancedBufferAttribute(aSt,4));
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
  return new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,fog:false,
    uniforms:{top:{value:new THREE.Color()},mid:{value:new THREE.Color()},bot:{value:new THREE.Color()},sunCol:{value:new THREE.Color()},sunDir:{value:new THREE.Vector3()}},
    vertexShader:"varying vec3 vD;void main(){vD=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
    fragmentShader:"uniform vec3 top;uniform vec3 mid;uniform vec3 bot;uniform vec3 sunCol;uniform vec3 sunDir;varying vec3 vD;void main(){vec3 d=normalize(vD);float h=d.y;vec3 c=mix(bot,mid,smoothstep(-0.04,0.2,h));c=mix(c,top,smoothstep(0.15,0.75,h));float s=max(dot(d,normalize(sunDir)),0.0);c+=sunCol*(pow(s,64.0)*1.1+pow(s,6.0)*0.3+pow(s,2.0)*0.12*(1.0-smoothstep(0.0,0.5,h)));gl_FragColor=vec4(c,1.0);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n}"});
}
function applyMode(name){
  const m=MODES[name]||MODES.dusk;mode=name in MODES?name:"dusk";
  skyMat.uniforms.top.value.copy(lin(m.top));skyMat.uniforms.mid.value.copy(lin(m.mid));skyMat.uniforms.bot.value.copy(lin(m.bot));skyMat.uniforms.sunCol.value.copy(lin(m.sun)).multiplyScalar(.9);
  const d=new THREE.Vector3(...m.dir).normalize();skyMat.uniforms.sunDir.value.copy(d);
  sun.color.copy(lin(m.sun));sun.intensity=m.sunI;sun.position.copy(d).multiplyScalar(1100);
  hemi.color.copy(lin(m.hSky));hemi.groundColor.copy(lin(m.hGnd));hemi.intensity=m.hI;
  scene.fog.color.set(m.fog);scene.fog.density=m.fogD;
  renderer.toneMappingExposure=m.exp;if(uni.uWin)uni.uWin.value=m.win;
  document.documentElement.dataset.theme=m.ui;store.set("vault.theme",m.ui);store.set("vault.time",mode);
  renderer.shadowMap.needsUpdate=true;dirty=true;
}
function fitShadow(){
  const S=GSIDE*.62;const c=sun.shadow.camera;c.left=-S;c.right=S;c.top=S;c.bottom=-S;c.near=20;c.far=2600;c.updateProjectionMatrix();renderer.shadowMap.needsUpdate=true;
}

// ---------- build
function build(prev){
  layout();
  if(ground){scene.remove(ground);groundMat.map.dispose();ground.geometry.dispose()}
  const tex=paintGround();
  groundMat=new THREE.MeshStandardMaterial({map:tex,roughness:.88,metalness:0});
  ground=new THREE.Mesh(new THREE.PlaneGeometry(GSIDE,GSIDE),groundMat);ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
  if(!apron){apron=new THREE.Mesh(new THREE.PlaneGeometry(14000,14000),new THREE.MeshStandardMaterial({color:lin('#0c111b'),roughness:1,metalness:0}));apron.rotation.x=-Math.PI/2;apron.position.y=-.12;scene.add(apron)}
  buildInstances(prev);fitShadow();applyState();buildChips();setMarkers(tasksMarks);
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
  AG.forEach(m=>{if(!m.grp.visible)return;const a=m.info;cands.push({x:m.pos.x,y:m.pos.y+7,z:m.pos.z,t:`${a.name} · ${a.status}`,s:a.ownerName?`${a.ownerName} · ${a.ownerBadge}`:a.task||"",cls:"ag",prio:110,c:a.color||"#E8A33D"})});
  if(hov>=0&&hov!==sel)addB(hov,"hov",90);
  if(sel>=0){[...nbr.keys()].map(i=>({i,d:Math.hypot(B[i].cx-cp.x,B[i].cz-cp.z)})).sort((a,b)=>a.d-b.d).slice(0,13).forEach((o,k)=>addB(o.i,"",60-k))}
  const far=walk?0:cam.dist;
  if(!walk&&far>150)DIST.forEach(d=>cands.push({x:d.x+d.w/2,y:58,z:d.z+d.d/2,t:d.name,s:d.count+" notes",cls:"dl",prio:far>260?50:20,c:d.color}));
  if(sel<0||far>90){let k=0;LAND.forEach(id=>{const b=B[id];if(!b)return;const d=Math.hypot(b.cx-cp.x,b.cz-cp.z);if(d<(walk?160:420)&&far<300&&k<12){addB(id,"",40-d*.01);k++}})}
  if(walk||far<130){const near=[];NOTES.forEach(n=>{const b=B[n.id];const d=Math.hypot(b.cx-cp.x,b.cz-cp.z);if(d<(walk?85:95))near.push({id:n.id,sc:n.out.size+n.back.size-d*.08})});near.sort((a,b)=>b.sc-a.sc).slice(0,16).forEach((o,k)=>addB(o.id,"",30-k*.5))}
  cands.sort((a,b)=>b.prio-a.prio);
  const taken=[];let used=0;
  cands.forEach(c=>{
    _v.set(c.x-cp.x,c.y-cp.y,c.z-cp.z);if(_v.dot(_f)<2)return;
    _v.set(c.x,c.y,c.z).project(camera);if(Math.abs(_v.x)>1.02||Math.abs(_v.y)>1.02)return;
    const px=(_v.x*.5+.5)*W,py=(-_v.y*.5+.5)*H;const w=(c.t.length*6.8+18),h=c.cls==="dl"?34:22;
    const rect=[px-w/2,py-h,px+w/2,py];
    if(taken.some(r=>rect[0]<r[2]&&rect[2]>r[0]&&rect[1]<r[3]&&rect[3]>r[1]))return;
    taken.push(rect);const el=lbl(used++);el.className="lbl"+(c.cls?" "+c.cls:"");el.style.setProperty("--c",c.c);
    el.innerHTML=esc(c.t.length>44?c.t.slice(0,43)+"…":c.t)+(c.s?`<small>${c.s}</small>`:"");
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


// ---------- Vault Sentinels: articulated architectural avatars, shared cached geometry.
const AG=new Map(),pulses=new Map();let agentGroup=null,lastAgents=[];
const LIVE_ST=["working","writing","reading","thinking","reviewing"];
function disposeSentinel(m){SentinelMesh.dispose(m.grp);agentGroup.remove(m.grp)}
function setAgents(list){
  lastAgents=list||[];if(!agentGroup)return;const seen=new Set(),slots=new Map();
  lastAgents.forEach(a=>{
    seen.add(a.id);const n=a.note?byName.get(a.note):null,b=n?B[n.id]:null;let m=AG.get(a.id);
    const signature=JSON.stringify([Identity.form(a.form||'agent'),Identity.palette(a.palette||['#111827',a.color||'#C97B54','#E6E9F2'],a.form||'agent'),a.symbol,a.ownerColor,a.ownerBadge]);
    if(m&&m.signature!==signature){disposeSentinel(m);AG.delete(a.id);m=null}
    if(!m){m=SentinelMesh.create(a);agentGroup.add(m.grp);AG.set(a.id,m)}m.info=a;
    let tgt=null;
    if(a.position&&[a.position.x,a.position.z].every(Number.isFinite)){tgt=new THREE.Vector3(clamp(a.position.x,-GSIDE/2,GSIDE/2),0,clamp(a.position.z,-GSIDE/2,GSIDE/2));m.grp.rotation.y=Number.isFinite(a.position.yaw)?a.position.yaw:0}
    else if(b){const slot=slots.get(n.id)||0;slots.set(n.id,slot+1);tgt=new THREE.Vector3(b.cx+Math.cos(slot*2.4)*2.8,b.h,b.cz+Math.sin(slot*2.4)*2.8)}
    if(tgt){if(m.noteId!==(n?.id??-2)||m.to.distanceTo(tgt)>.05){if(reduced||!m.grp.visible||m.noteId===-1){m.pos.copy(tgt);m.to.copy(tgt);m.t0=-1}else{m.from.copy(m.pos);m.to.copy(tgt);m.t0=time}m.noteId=n?.id??-2}m.grp.visible=!(a.local&&a.position?.walking);m.ring.scale.setScalar(a.position?1.6:2.4)}else{m.grp.visible=false;m.noteId=-1}m.grp.position.copy(m.pos);
  });
  AG.forEach((m,id)=>{if(!seen.has(id)){disposeSentinel(m);AG.delete(id)}});if(iMesh)applyState();dirty=true;
}
function pulse(name){const n=byName.get(name);if(!n||!B[n.id])return;pulses.set(n.id,time+6);if(iMesh)applyState()}
function stepAgents(dt){
  let live=false;
  AG.forEach(m=>{
    if(!m.grp.visible)return;live=true;
    if(m.t0>=0){const k=clamp((time-m.t0)/1.5,0,1),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;m.pos.lerpVectors(m.from,m.to,e);if(!m.info.position)m.pos.y+=Math.sin(Math.PI*k)*28;if(k>=1){m.t0=-1;m.pos.copy(m.to)}m.grp.position.copy(m.pos)}
    if(!reduced)m.legs.forEach((leg,i)=>leg.rotation.x=m.t0>=0?Math.sin(time*8+i*Math.PI)*.3:0);
  });
  let exp=false;pulses.forEach((u,id)=>{if(u<time){pulses.delete(id);exp=true}});if(exp)applyState();
  return live||pulses.size>0;
}

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
function endPtr(e){const p=ptrs.get(e.pointerId);if(!p)return;ptrs.delete(e.pointerId);cv.classList.remove("drag");if(ptrs.size<2)pinch=null;
  if(!moved&&ptrs.size===0&&e.type==="pointerup"&&p.btn===0){const id=pick(e.clientX,e.clientY);if(id>=0)open(NOTES[id])}}
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
  if(!dirty)return;
  dirty=false;
  applyCamera();
  skyMesh.position.copy(camera.position);
  renderer.render(scene,camera);
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
    sun=new THREE.DirectionalLight(0xffffff,2);sun.castShadow=true;sun.shadow.mapSize.set(4096,4096);sun.shadow.bias=-.0015;sun.shadow.normalBias=2.4;scene.add(sun,sun.target);
    skyMat=skyMaterial();skyMesh=new THREE.Mesh(new THREE.SphereGeometry(2400,32,16),skyMat);skyMesh.renderOrder=-10;skyMesh.frustumCulled=false;scene.add(skyMesh);
    bridgeGroup=new THREE.Group();scene.add(bridgeGroup);markerGroup=new THREE.Group();scene.add(markerGroup);agentGroup=new THREE.Group();scene.add(agentGroup);
    ringMesh=new THREE.Mesh(new THREE.RingGeometry(.94,1,64),new THREE.MeshBasicMaterial({color:lin("#F2B85B"),transparent:true,opacity:.85,side:THREE.DoubleSide,fog:false}));ringMesh.rotation.x=-Math.PI/2;ringMesh.visible=false;scene.add(ringMesh);
    mat=makeMaterial();
    const ro=new ResizeObserver(()=>resize());ro.observe(stage);
    build(null);applyMode(mode);resize();
    $("#rbTime").setAttribute("data-tip","Time of day: "+mode);
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
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.75));renderer.setSize(W,H,false);camera.aspect=W/H;applyShift();dirty=true;
}
function cycleTime(){const o=["dusk","night","day"];const m=o[(o.indexOf(mode)+1)%3];if(!C.ok){document.documentElement.dataset.theme=MODES[m].ui;mode=m;store.set("vault.time",m);return}applyMode(m);$("#rbTime").setAttribute("data-tip","Time of day: "+m);toast("Time of day: "+m)}
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
  AG.forEach(m=>m.noteId=-1);setAgents(lastAgents);
}
function boot(){init();return C.ok}
function skipIntro(){introStart=-1;if(growth)growth.fill(1);if(iMesh)writeMatrices();auto=false;if(renderer)renderer.shadowMap.needsUpdate=true;dirty=true}
return {boot,skipIntro,setAgents,pulse,focus,clear,overview,toggleWalk,cycleTime,shift,rebuild,setMarkers,pause:b=>{paused=!!b;if(!b)dirty=true},ok:()=>C.ok,selectedName:()=>sel>=0?NOTES[sel].name:null,position:()=>({x:cam.tx,z:cam.tz,yaw:cam.yaw,walking:walk}),debug:()=>({cam,goal,walk,mode,W,H,N:inst.length,districts:DIST.length,world:WORLD})};
})();

