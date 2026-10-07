// =====================================================================
// VFX: the light and weather layer over the campus.
// Every effect here is pooled and GPU-driven: fixed-size buffers allocated once, spawn writes a few floats,
// the shaders do the motion from one shared clock (uVfxT). No per-event geometry, no per-building loops.
// Draw cost when everything is live: atmosphere 1, bursts 1, rings+columns 1, sparks 1, district curtain 1.
// Tiers: "high" desktop on High, "medium" a phone or narrow window on High, "low" when the reader chose Low.
// Reduced motion: nothing travels; pulses become a still glow that fades in place.
// =====================================================================
const VFX=(()=>{
const HAS3=typeof THREE!=="undefined";
const INK=6,BURSTS=6,BP=120,RINGS=10,SPARKS=256,ATMOS=1400;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const motionOff=()=>{try{return matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}};
const qPref=()=>{try{return typeof store!=="undefined"?store.get("vault.quality","high"):"high"}catch(e){return"high"}};
// Read fresh every call: rotation, a resize past 760 px or a change in title settings takes effect without a reload.
function tierFor(q,width){if(q==="low")return"low";return(width>760)?"high":"medium"}
function tier(){return tierFor(qPref(),typeof innerWidth!=="undefined"?innerWidth:1024)}
// Per-tier budgets. Pools are allocated at the high size once; lower tiers draw a prefix (setDrawRange), so a tier
// change never reallocates.
const BUDGET={
  high:{atmos:1400,bp:120,ambientHz:30,post:true},
  medium:{atmos:520,bp:64,ambientHz:15,post:false},
  low:{atmos:0,bp:40,ambientHz:0,post:false}};
function budget(t){return BUDGET[t||tier()]||BUDGET.high}

// ---------- weather: deterministic per local day, never from the network.
// One hash of the date picks the day's character; a second places a shower window inside it.
function hashStr(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return(h>>>0)/4294967296}
function dayKey(d){return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()}
const KINDS={clear:{rain:0,mist:0},mist:{rain:0,mist:.85},drizzle:{rain:.42,mist:.25},rain:{rain:.9,mist:.22}};
function weatherFor(date,hours){
  const d=date||new Date(),key=dayKey(d),r=hashStr("wx:"+key),w=hashStr("wind:"+key),s=hashStr("win:"+key);
  const kind=r<.56?"clear":r<.76?"mist":r<.9?"drizzle":"rain";
  const h=hours==null?d.getHours()+d.getMinutes()/60:hours;
  // showers fall inside a 3 to 9 hour window; streets stay wet for two hours after it closes
  const start=s*20,len=3+hashStr("len:"+key)*6,end=start+len;
  const inWin=clamp(Math.min(h-start,end-h)/.75,0,1);
  const base=KINDS[kind];
  const rain=base.rain*inWin;
  const wet=base.rain?Math.max(rain>0?.35+rain*.65:0,h>end?clamp(1-(h-end)/2,0,1)*.8:0):0;
  // mist burns off by late morning and comes back after dark
  const mistHour=h<10?1:h<12?1-(h-10)/2:h>19?Math.min(1,(h-19)/2):0;
  const mist=Math.max(base.mist*(kind==="mist"?mistHour:1)*(kind==="mist"?1:inWin),0);
  return{key,kind,rain,wet,mist,wind:.25+.75*w,window:[start,end]};
}

// ---------- shared uniforms. c_campus merges these into its world uniform object (SH) so every patched shader sees them.
const V3=()=>HAS3?new THREE.Vector4(0,0,0,0):{x:0,y:0,z:0,w:0,set(){return this}};
const U={uVfxT:{value:0},uVfxRM:{value:motionOff()?1:0},uWet:{value:0},uMist:{value:0},uWind:{value:.4},uRain:{value:0},
  uInkA:{value:Array.from({length:INK},V3)},uInkB:{value:Array.from({length:INK},()=>{const v=V3();v.x=-99;return v})},uInkC:{value:Array.from({length:INK},V3)}};
const DECL=`uniform float uVfxT;uniform float uVfxRM;uniform float uWet;uniform float uMist;uniform float uWind;uniform float uRain;uniform vec4 uInkA[${INK}];uniform vec4 uInkB[${INK}];uniform vec4 uInkC[${INK}];\n`;

// Ink: a scanline sweep climbs the facade of the building a live write landed on, then the roof flashes.
// Rect footprint test against the six most recent writes; constant-index loop (legal in WebGL1 fragment shaders).
const INK_GLSL=`
vec3 vfxInk(vec3 wp,float wall,float top){
  vec3 acc=vec3(0.0);
  for(int i=0;i<${INK};i++){
    vec4 a=uInkA[i];vec4 b=uInkB[i];
    float e=uVfxT-b.x;
    if(e<0.0||e>2.8)continue;
    vec2 d=abs(wp.xz-a.xy)-a.zw;
    if(max(d.x,d.y)>0.06)continue;
    float h=b.y;
    float head=mix(e/1.5*h*1.1,wp.y,uVfxRM);
    float band=exp(-abs(wp.y-head)*0.85)*step(wp.y,h+0.6);
    float trail=(1.0-smoothstep(0.0,max(head,0.01),wp.y))*0.22*step(wp.y,head);
    float scan=mix(0.5+0.5*step(0.5,fract(wp.y*1.15-uVfxT*2.6)),1.0,uVfxRM);
    float fade=1.0-smoothstep(1.7,2.8,e);
    float cap=top*smoothstep(1.1,1.5,e)*(1.0-smoothstep(1.5,2.6,e));
    acc+=uInkC[i].rgb*(wall*(band*1.7*scan+trail)*mix(1.0,0.45,uVfxRM)+cap*1.6)*fade;
  }
  return acc;
}
`;
// Ground: damp pavers darken, gloss over, pool in the low spots and mirror the sky and the lamp map.
const GROUND_GLSL=`
{ float pud=smoothstep(0.52,0.78,vn(wp*0.045)+0.25*vn(wp*0.31));
  float wetM=uWet*(0.55+0.45*pud);
  diffuseColor.rgb*=1.0-0.3*wetM;
  roughnessFactor=mix(roughnessFactor,0.12+0.2*(1.0-pud),wetM*0.9); }
`;
const GROUND_EM_GLSL=`
{ vec3 Vg=normalize(cameraPosition-vGPos);float fr=pow(1.0-clamp(Vg.y,0.0,1.0),4.0);
  float pud=smoothstep(0.52,0.78,vn(vGPos.xz*0.045)+0.25*vn(vGPos.xz*0.31));
  totalEmissiveRadiance+=(uSkyRef*fr*0.55+lm*lm*uLamp*1.6)*uWet*(0.35+0.65*pud); }
`;
// Water: a mirrored skyline strip near the quay, lit windows in it after dusk, quay lamp streaks whenever the
// lamps are on, sun glitter on the chop, and rain rings when it rains. Uses the water shader's locals.
const WATER_GLSL=`
{ float along=abs(p.x)>abs(p.y)?p.y:p.x;
  vec2 rp=vec2(along+N.x*7.0,dE+N.z*5.0);
  float sky=16.0+44.0*vn(vec2(rp.x*0.035,3.1))+22.0*step(0.7,vn(vec2(rp.x*0.11,7.7)));
  float mir=(1.0-smoothstep(sky*0.7,sky*1.15,rp.y))*step(0.0,dE);
  float fall=exp(-max(dE,0.0)/150.0);
  vec3 sil=mix(uSky*0.42,vec3(0.018,0.022,0.036),uNight);
  c=mix(c,sil,mir*0.5*fall*(1.0-fres*0.55));
  vec2 wc=floor(vec2(rp.x/2.5,rp.y/3.3));
  c+=vec3(1.0,0.68,0.34)*step(0.64,h21(wc))*mir*fall*uLamp*0.32*(0.7+0.3*sin(uTime*1.3+wc.x));
  float qe=uSide*0.5-3.0;float nL=max(1.0,floor(uSide/18.0));float stepL=(2.0*qe)/nL;
  float lph=abs(fract((along+qe)/stepL+0.5)-0.5)*stepL;
  float lampRow=exp(-lph*lph*0.6);
  c+=vec3(1.0,0.64,0.3)*lampRow*exp(-max(dE,0.0)/28.0)*uLamp*(0.35+0.65*streak)*0.8*(1.0+uWet);
  float sp=pow(max(dot(R,uSunDir),0.0),70.0)*up;
  float gl=step(0.94,h21(floor(p*0.85)+floor(uTime*4.0)));
  c+=uSunCol*gl*sp*2.4*(1.0-uRain*0.7);
  vec2 rc=fract(p*0.11+floor(uTime*1.7)*0.37)-0.5;float rr=length(rc);float ph=fract(uTime*1.7+h21(floor(p*0.11)));
  c+=uSkyRef*uRain*0.35*smoothstep(0.03,0.0,abs(rr-ph*0.45))*(1.0-ph)*step(0.55,h21(floor(p*0.11)+3.0));
}
`;
// Wind in the canopies: a slow sway plus a gust that rolls across the city. Vertex only; shadows keep the rest pose.
const SWAY_GLSL=`
#ifdef USE_INSTANCING
vec2 vfxIp=vec2(instanceMatrix[3][0],instanceMatrix[3][2]);
#else
vec2 vfxIp=vec2(0.0);
#endif
float vfxG=0.6+0.4*sin(uTime*0.35+vfxIp.x*0.012+vfxIp.y*0.008);
float vfxS=(sin(uTime*1.1+vfxIp.x*0.07+vfxIp.y*0.05)+0.5*sin(uTime*2.3+vfxIp.x*0.13))*uWind*vfxG*0.06*max(position.y,0.0);
transformed.x+=vfxS;transformed.z+=vfxS*0.6;
`;

// ---------- runtime state
const S={scene:null,SH:null,glow:null,t:0,lastSky:-1,w:null,override:null,inkI:0,burstI:0,ringI:0,sparkI:0,
  active:0,quiet:0,trailT:typeof WeakMap!=="undefined"?new WeakMap():null,inkCool:new Map(),lost:0,ready:false,meshes:[]};
const cur={rain:0,wet:0,mist:0,wind:.4},tgt={rain:0,wet:0,mist:0,wind:.4};
function weatherTarget(now){
  const w=S.override?{...KINDS[S.override]||KINDS.clear,kind:S.override,wet:(KINDS[S.override]||KINDS.clear).rain?.85:0,wind:.6,key:"override"}:weatherFor(now);
  S.w=w;tgt.rain=w.rain;tgt.wet=w.wet;tgt.mist=w.mist;tgt.wind=w.wind;
}
function snapWeather(){Object.assign(cur,tgt);pushWeather()}
function pushWeather(){U.uRain.value=cur.rain;U.uWet.value=cur.wet;U.uMist.value=cur.mist;U.uWind.value=cur.wind}

// ---------- atmosphere: dust by day, fireflies after dark, rain streaks when it rains. One Points draw.
function atmosphere(SH,glow,count){
  if(!HAS3)return null;
  const N=ATMOS,seed=new Float32Array(N*3),k=new Float32Array(N);
  for(let i=0;i<N;i++){seed[i*3]=hashStr("ax"+i);seed[i*3+1]=hashStr("ay"+i);seed[i*3+2]=hashStr("az"+i);k[i]=hashStr("ak"+i)}
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(seed,3));g.setAttribute("aK",new THREE.BufferAttribute(k,1));
  g.setDrawRange(0,clamp(count==null?budget().atmos:count,0,N));
  const m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false,
    uniforms:{uCenter:{value:new THREE.Vector3()},uScale:{value:600},map:{value:glow},uTime:SH.uTime,uNight:SH.uNight,uSkyRef:SH.uSkyRef,uRain:U.uRain,uWind:U.uWind,uMist:U.uMist},
    vertexShader:`attribute float aK;uniform vec3 uCenter;uniform float uScale;uniform float uTime;uniform float uNight;uniform float uRain;uniform float uWind;uniform float uMist;varying float vA;varying float vR;
void main(){vec3 s=position;vec3 p;
 float isR=step(aK,uRain*0.88);
 if(isR>0.5){
  vec3 rb=vec3(96.0,54.0,96.0);p=s*rb;
  p.y=mod(p.y-uTime*(46.0+s.x*14.0),rb.y);
  p.xz+=vec2(uWind*9.0,uWind*3.0)*(p.y/rb.y);
  p.xz=mod(p.xz-uCenter.xz+rb.xz*0.5,rb.xz)+uCenter.xz-rb.xz*0.5;p.y+=0.5;
 }else{
  vec3 box=vec3(320.0,mix(60.0,16.0,uNight),320.0);p=s*box;
  p.x+=uTime*(0.7+uWind*1.6)+sin(uTime*0.31+s.y*20.0)*3.0;p.z+=uTime*0.3+cos(uTime*0.27+s.z*17.0)*3.0;p.y+=sin(uTime*0.5+s.x*30.0)*1.2;
  p.xz=mod(p.xz-uCenter.xz+box.xz*0.5,box.xz)+uCenter.xz-box.xz*0.5;p.y=0.8+mod(p.y,box.y);
 }
 vec4 mv=modelViewMatrix*vec4(p,1.0);float fl=0.5+0.5*sin(uTime*(1.3+s.z*2.0)+s.x*40.0);
 float mote=mix(0.34*(1.0-uMist*0.5),0.28+0.72*fl*fl,uNight)*(1.0-uRain*0.75);
 vA=mix(mote*smoothstep(260.0,60.0,-mv.z),0.5*smoothstep(95.0,6.0,-mv.z),isR);vR=isR;
 gl_PointSize=clamp(mix(mix(0.85,0.45,uNight),3.2,isR)*uScale/-mv.z,0.0,mix(18.0,48.0,isR));gl_Position=projectionMatrix*mv;}`,
    fragmentShader:`uniform sampler2D map;uniform float uNight;uniform vec3 uSkyRef;varying float vA;varying float vR;
void main(){vec2 pc=gl_PointCoord;float a;vec3 col;
 if(vR>0.5){a=smoothstep(0.09,0.0,abs(pc.x-0.5))*smoothstep(0.0,0.35,pc.y)*smoothstep(1.0,0.75,pc.y);col=mix(vec3(0.62,0.7,0.82),uSkyRef*2.2+vec3(0.12,0.1,0.08),0.5);}
 else{a=texture2D(map,pc).a;col=mix(vec3(1.0,0.86,0.42),vec3(1.0,0.72,0.32),uNight);}
 gl_FragColor=vec4(col*a*vA,1.0);}`});
  const p=new THREE.Points(g,m);p.frustumCulled=false;p.userData.vfx="atmosphere";S.atmos=p;return p;
}

// ---------- pooled bursts: task done, level up. Seeds are fixed hashes; the vertex shader flies them.
function makeBursts(){
  const N=BURSTS*BP,seed=new Float32Array(N*3),slot=new Float32Array(N);
  for(let i=0;i<N;i++){seed[i*3]=hashStr("bx"+i);seed[i*3+1]=hashStr("by"+i);seed[i*3+2]=hashStr("bz"+i);slot[i]=Math.floor(i/BP)}
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(seed,3));g.setAttribute("aSlot",new THREE.BufferAttribute(slot,1));
  const m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false,
    uniforms:{uB:{value:Array.from({length:BURSTS},()=>new THREE.Vector4(0,0,0,-99))},uC:{value:Array.from({length:BURSTS},()=>new THREE.Vector3(1,.8,.4))},uVfxT:U.uVfxT,uScale:{value:600},uBP:{value:BP},map:{value:S.glow}},
    vertexShader:`attribute float aSlot;uniform vec4 uB[${BURSTS}];uniform vec3 uC[${BURSTS}];uniform float uVfxT;uniform float uScale;uniform float uBP;varying float vA;varying vec3 vC;
void main(){vec4 b=vec4(0.0,0.0,0.0,-99.0);vec3 c=vec3(1.0);
 for(int i=0;i<${BURSTS};i++){if(abs(float(i)-aSlot)<0.5){b=uB[i];c=uC[i];}}
 float e=uVfxT-b.w;vec3 s=position;
 if(e<0.0||e>2.6||fract(s.x*7.31+s.y*3.17)*${BP}.0>=uBP){gl_Position=vec4(2.0,2.0,2.0,1.0);gl_PointSize=0.0;vA=0.0;vC=c;return;}
 float a=s.x*6.2832,r=sqrt(s.y),drag=1.0-exp(-e*2.2);
 vec3 v=vec3(cos(a)*r*15.0,9.0+s.z*14.0,sin(a)*r*15.0);
 vec3 p=b.xyz+v*drag/1.6-vec3(0.0,4.0*e*e,0.0);
 vec4 mv=modelViewMatrix*vec4(p,1.0);
 vA=(1.0-e/2.6)*(0.65+0.35*sin(e*22.0+s.x*40.0));vC=mix(c,vec3(1.0),0.25*step(0.8,s.z));
 gl_PointSize=clamp((1.2+s.z*1.4)*uScale/-mv.z,1.0,44.0);gl_Position=projectionMatrix*mv;}`,
    fragmentShader:"uniform sampler2D map;varying float vA;varying vec3 vC;void main(){float a=texture2D(map,gl_PointCoord).a;gl_FragColor=vec4(vC*a*vA,1.0);}"});
  const p=new THREE.Points(g,m);p.frustumCulled=false;p.renderOrder=5;p.userData.vfx="bursts";return p;
}
// ---------- pooled rings and light columns: write shockwave, burst halo, sentinel arrival. One instanced draw.
function ringGeometry(){
  const pos=[],part=[],vv=[],idx=[];const SEG=48;
  for(let i=0;i<=SEG;i++){const a=i/SEG*Math.PI*2,c=Math.cos(a),s=Math.sin(a);pos.push(c*.8,0,s*.8,c,0,s);part.push(0,0);vv.push(0,1)}
  for(let i=0;i<SEG;i++){const o=i*2;idx.push(o,o+1,o+2,o+1,o+3,o+2)}
  const b=pos.length/3;const CS=24;
  for(let i=0;i<=CS;i++){const a=i/CS*Math.PI*2,c=Math.cos(a),s=Math.sin(a);pos.push(c,0,s,c,1,s);part.push(1,1);vv.push(0,1)}
  for(let i=0;i<CS;i++){const o=b+i*2;idx.push(o,o+1,o+2,o+1,o+3,o+2)}
  const g=new THREE.InstancedBufferGeometry();
  g.setIndex(idx);g.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));g.setAttribute("aPart",new THREE.Float32BufferAttribute(part,1));g.setAttribute("aV",new THREE.Float32BufferAttribute(vv,1));
  g.setAttribute("iA",new THREE.InstancedBufferAttribute(new Float32Array(RINGS*4).fill(-99),4));
  g.setAttribute("iB",new THREE.InstancedBufferAttribute(new Float32Array(RINGS*4),4));
  g.setAttribute("iC",new THREE.InstancedBufferAttribute(new Float32Array(RINGS*4),4));
  g.instanceCount=RINGS;return g;
}
function makeRings(){
  const m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false,side:THREE.DoubleSide,
    uniforms:{uVfxT:U.uVfxT,uVfxRM:U.uVfxRM},
    vertexShader:`attribute float aPart;attribute float aV;attribute vec4 iA;attribute vec4 iB;attribute vec4 iC;uniform float uVfxT;uniform float uVfxRM;varying float vA;varying vec3 vC;varying float vP;varying float vV;
void main(){float life=max(iC.z,0.4);float e=uVfxT-iA.w;float k=e/life;
 vC=iB.rgb;vP=aPart;vV=aV;
 if(e<0.0||k>1.0||(aPart>0.5&&iC.y<0.5)){gl_Position=vec4(2.0,2.0,2.0,1.0);vA=0.0;return;}
 float grow=mix(1.0-pow(1.0-k,3.0),0.85,uVfxRM);
 vec3 p=position;
 if(aPart<0.5){p.xz*=iB.w*(0.3+1.5*grow);vA=mix((1.0-k)*(1.0-k),sin(k*3.1416)*0.8,uVfxRM);}
 else{p.xz*=iB.w*0.5*(0.85+0.3*grow);p.y*=iC.x;vA=sin(k*3.1416)*0.55;vV=mix(aV-min(k*1.6,1.0),aV-0.5,uVfxRM);}
 p+=iA.xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,
    fragmentShader:`varying float vA;varying vec3 vC;varying float vP;varying float vV;
void main(){float a;if(vP<0.5){a=smoothstep(0.0,0.35,vV)*smoothstep(1.0,0.65,vV)*1.6;}else{float y=vV;a=(exp(-y*y*60.0)*0.9+0.18*step(y,0.0))*smoothstep(-1.0,-0.6,y);}
 gl_FragColor=vec4(vC*a*vA,1.0);}`});
  const mesh=new THREE.Mesh(ringGeometry(),m);mesh.frustumCulled=false;mesh.renderOrder=4;mesh.userData.vfx="rings";return mesh;
}
// ---------- sparks: a ring buffer of glowing points left by sentinels riding the lift. One Points draw.
function makeSparks(){
  const pos=new Float32Array(SPARKS*3),t0=new Float32Array(SPARKS).fill(-99),col=new Float32Array(SPARKS*3);
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(pos,3));g.setAttribute("aT",new THREE.BufferAttribute(t0,1));g.setAttribute("aCol",new THREE.BufferAttribute(col,3));
  [g.attributes.position,g.attributes.aT,g.attributes.aCol].forEach(a=>a.setUsage(THREE.DynamicDrawUsage));
  const m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false,
    uniforms:{uVfxT:U.uVfxT,uScale:{value:600},map:{value:S.glow}},
    vertexShader:`attribute float aT;attribute vec3 aCol;uniform float uVfxT;uniform float uScale;varying float vA;varying vec3 vC;
void main(){float e=uVfxT-aT;vC=aCol;if(e<0.0||e>1.3){gl_Position=vec4(2.0,2.0,2.0,1.0);gl_PointSize=0.0;vA=0.0;return;}
 vec3 p=position+vec3(sin(aT*91.0)*0.4*e,e*2.2,cos(aT*57.0)*0.4*e);vec4 mv=modelViewMatrix*vec4(p,1.0);
 vA=(1.0-e/1.3);gl_PointSize=clamp(0.9*uScale/-mv.z,1.0,26.0);gl_Position=projectionMatrix*mv;}`,
    fragmentShader:"uniform sampler2D map;varying float vA;varying vec3 vC;void main(){float a=texture2D(map,gl_PointCoord).a;gl_FragColor=vec4(vC*a*vA*1.3,1.0);}"});
  const p=new THREE.Points(g,m);p.frustumCulled=false;p.userData.vfx="sparks";return p;
}
// ---------- district curtain: a light wall rises around the district you enter, a bright head runs its perimeter.
function makeCurtain(){
  const pos=[],edge=[],tt=[],idx=[];const C=[[0,0],[1,0],[1,1],[0,1]];
  for(let e=0;e<4;e++){const a=C[e],b=C[(e+1)%4],o=pos.length/3;
    pos.push(a[0],0,a[1],b[0],0,b[1],a[0],1,a[1],b[0],1,b[1]);edge.push(e,e,e,e);tt.push(0,1,0,1);idx.push(o,o+1,o+2,o+1,o+3,o+2)}
  const g=new THREE.BufferGeometry();g.setIndex(idx);g.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));g.setAttribute("aEdge",new THREE.Float32BufferAttribute(edge,1));g.setAttribute("aT",new THREE.Float32BufferAttribute(tt,1));
  const m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false,side:THREE.DoubleSide,
    uniforms:{uVfxT:U.uVfxT,uVfxRM:U.uVfxRM,uT0:{value:-99},uCol:{value:new THREE.Color(1,.8,.5)},uWD:{value:new THREE.Vector2(1,1)}},
    vertexShader:"attribute float aEdge;attribute float aT;varying float vE;varying float vT;varying float vY;void main(){vE=aEdge;vT=aT;vY=position.y;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
    fragmentShader:`uniform float uVfxT;uniform float uVfxRM;uniform float uT0;uniform vec3 uCol;uniform vec2 uWD;varying float vE;varying float vT;varying float vY;
void main(){float e=uVfxT-uT0;if(e<0.0||e>3.2)discard;
 float w=uWD.x,d=uWD.y,L=2.0*(w+d);float ei=floor(vE+0.5);
 float s=ei<0.5?vT*w:ei<1.5?w+vT*d:ei<2.5?w+d+vT*w:2.0*w+d+vT*d;s/=L;
 float run=fract(e/2.2);float hd=min(abs(s-run),1.0-abs(s-run));float hd2=min(abs(s-fract(run+0.5)),1.0-abs(s-fract(run+0.5)));
 float head=mix(exp(-hd*hd*900.0)+exp(-hd2*hd2*900.0),0.0,uVfxRM);
 float rise=mix(smoothstep(0.0,0.7,e),1.0,uVfxRM);float fade=1.0-smoothstep(2.0,3.2,e);
 float wall=pow(1.0-vY,1.8)*step(vY,rise)*0.55+smoothstep(0.06,0.0,vY)*0.9;
 gl_FragColor=vec4(uCol*(wall+head*(1.0-vY)*2.2)*fade*mix(1.0,0.6,uVfxRM),1.0);}`});
  const mesh=new THREE.Mesh(g,m);mesh.frustumCulled=false;mesh.visible=false;mesh.renderOrder=3;mesh.userData.vfx="curtain";return mesh;
}

// ---------- lifecycle
function init(scene,SH,glow){
  if(!HAS3||!scene)return false;
  dispose();
  S.scene=scene;S.SH=SH||null;S.glow=glow||null;U.uVfxRM.value=motionOff()?1:0;
  S.bursts=makeBursts();S.rings=makeRings();S.sparks=makeSparks();S.curtain=makeCurtain();
  S.meshes=[S.bursts,S.rings,S.sparks,S.curtain];S.meshes.forEach(m=>scene.add(m));
  weatherTarget(new Date());snapWeather();S.ready=true;applyTier();return true;
}
function dispose(){S.meshes.forEach(m=>{if(m.parent)m.parent.remove(m);m.geometry.dispose();m.material.dispose()});S.meshes=[];S.ready=false}
function applyTier(t){
  const b=budget(t);
  if(S.atmos)S.atmos.geometry.setDrawRange(0,b.atmos);
  if(S.bursts)S.bursts.material.uniforms.uBP.value=b.bp;
  return b;
}
function setScale(px){[S.bursts,S.sparks,S.atmos].forEach(m=>{if(m&&m.material.uniforms.uScale)m.material.uniforms.uScale.value=px})}
const _col=HAS3?new THREE.Color():null;
function rgb(c,out){const o=out||_col;try{o.set(c||"#F2B85B")}catch(e){o.set("#F2B85B")}return o}
function wake(sec){S.active=Math.max(S.active,S.t+sec)}

// A live write landed on a building: ground ring, light column, facade scanline. Cooldown per building.
function ink(b,color,kind){
  if(!S.ready||!b)return false;const id=b.id!=null?b.id:(b.cx+","+b.cz);
  const last=S.inkCool.get(id);if(last!=null&&S.t-last<2.4)return false;S.inkCool.set(id,S.t);
  if(S.inkCool.size>64)S.inkCool.clear();
  const i=S.inkI++%INK,c=rgb(color||(kind==="done"?"#5EE6C8":"#FFB45A"));
  U.uInkA.value[i].set(b.cx,b.cz,(b.fw||8)/2+.08,(b.fd||8)/2+.08);U.uInkB.value[i].set(S.t,b.h||12,0,0);U.uInkC.value[i].set(c.r,c.g,c.b,0);
  ring(b.cx,.3,b.cz,color||"#FFB45A",Math.max(b.fw||8,b.fd||8)*.95+2,{column:(b.h||12)+10,life:1.9});
  wake(3);return true;
}
function ring(x,y,z,color,size,opt={}){
  if(!S.ready)return -1;const i=S.ringI++%RINGS,g=S.rings.geometry,c=rgb(color);
  g.attributes.iA.setXYZW(i,x,y,z,S.t+(opt.delay||0));g.attributes.iB.setXYZW(i,c.r,c.g,c.b,size||6);g.attributes.iC.setXYZW(i,opt.column||0,opt.column?1:0,opt.life||1.6,0);
  g.attributes.iA.needsUpdate=g.attributes.iB.needsUpdate=g.attributes.iC.needsUpdate=true;wake((opt.life||1.6)+(opt.delay||0)+.2);return i;
}
// Celebrate: GPU burst plus a halo; reduced motion gets the still halo only.
function burst(x,y,z,color,opt={}){
  if(!S.ready)return false;const span=Math.max(opt.w||8,opt.d||8);
  ring(x,y-.6,z,color,span*.9+3,{life:2.2});
  if(U.uVfxRM.value>.5||budget().bp===0)return true;
  const i=S.burstI++%BURSTS,u=S.bursts.material.uniforms,c=rgb(color);
  u.uB.value[i].set(x,y,z,S.t);u.uC.value[i].set(c.r,c.g,c.b);wake(2.8);return true;
}
// Sentinel lift trail: rate-limited sparks per figure. arrive(): a small ring where it steps onto the roof.
function trail(key,x,y,z,color){
  if(!S.ready||U.uVfxRM.value>.5||tier()==="low")return false;
  if(S.trailT&&key){const l=S.trailT.get(key)||0;if(S.t-l<(tier()==="high"?.045:.09))return false;S.trailT.set(key,S.t)}
  const i=S.sparkI++%SPARKS,g=S.sparks.geometry,c=rgb(color);
  g.attributes.position.setXYZ(i,x+(hashStr("s"+S.sparkI)-.5)*.9,y,z+(hashStr("t"+S.sparkI)-.5)*.9);g.attributes.aT.setX(i,S.t);g.attributes.aCol.setXYZ(i,c.r,c.g,c.b);
  g.attributes.position.needsUpdate=g.attributes.aT.needsUpdate=g.attributes.aCol.needsUpdate=true;wake(1.4);return true;
}
function arrive(x,y,z,color){return ring(x,y+.08,z,color,2.2,{life:1.1})>=0}
// District entry: one curtain at a time; a newer district replaces it.
function district(d){
  if(!S.ready||!d)return false;const m=S.curtain,u=m.material.uniforms;
  m.position.set(d.x,0,d.z);m.scale.set(d.w,Math.min(40,14+Math.sqrt(d.w*d.d)*.12),d.d);m.updateMatrix();
  u.uT0.value=S.t;rgb(d.color,u.uCol.value);u.uWD.value.set(d.w,d.d);m.visible=true;wake(3.3);return true;
}
// Huddle data link: packets travel from speaker to listener along the beam.
function linkMaterial(color){
  if(!HAS3)return null;
  return new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false,side:THREE.DoubleSide,
    uniforms:{uVfxT:U.uVfxT,uVfxRM:U.uVfxRM,uCol:{value:rgb(color,new THREE.Color())},uOn:{value:1}},
    vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
    fragmentShader:"uniform float uVfxT;uniform float uVfxRM;uniform vec3 uCol;uniform float uOn;varying vec2 vUv;void main(){float pk=mix(pow(0.5+0.5*sin(vUv.y*28.0-uVfxT*16.0),6.0),0.4,uVfxRM);gl_FragColor=vec4(uCol*(0.28+0.9*pk)*uOn,1.0);}"});
}

// Grade pass patch: per-time colour balance, a very light vignette over the existing CSS one, mist-boosted shafts.
function patchGrade(G){
  if(!G||G.__vfx)return G;G.__vfx=true;
  G.uniforms.uVig={value:.1};G.uniforms.uGain={value:HAS3?new THREE.Vector3(1,1,1):null};G.uniforms.uLift={value:HAS3?new THREE.Vector3(0,0,0):null};
  G.fragmentShader=G.fragmentShader.replace("uniform float uGrain;","uniform float uGrain;uniform float uVig;uniform vec3 uGain;uniform vec3 uLift;")
    .replace("gl_FragColor=vec4(c,1.0);","{vec2 q=vUv-0.5;q.x*=uRes.x/max(uRes.y,1.0);c*=1.0-uVig*smoothstep(0.38,1.05,length(q));c=clamp(c*uGain+uLift*(1.0-c),0.0,1.0);}\n  gl_FragColor=vec4(c,1.0);");
  return G;
}
function grade(night,sunY){
  const up=night<.5,gold=up?1-clamp((sunY-.05)/.4,0,1):0;
  const gain=[1+.05*gold-.03*night,1-.005*gold,1-.08*gold+.04*night];
  const lift=[.004*gold,.004*night,.02*night+.004*cur.mist];
  return{gain,lift,vig:.09+.06*night,threshold:.86-.15*night-.05*cur.wet,radius:.36+.28*night+.14*cur.mist,shaft:1+cur.mist*.9};
}
function post(bloomPass,g){
  if(!S.SH)return;const n=S.SH.uNight.value,y=S.SH.uSunDir.value.y,k=grade(n,y);
  if(bloomPass){bloomPass.threshold=k.threshold;bloomPass.radius=k.radius}
  if(g&&g.uGain){g.uGain.value.set(...k.gain);g.uLift.value.set(...k.lift);g.uVig.value=k.vig;if(g.uShaft)g.uShaft.value=Math.min(1.2,g.uShaft.value*k.shaft)}
}
// Weather pushes into the sky key before it reaches the uniforms. Called inside pushSky, so it never accumulates.
function adjustSky(CUR){
  if(!CUR)return;const r=cur.rain,m=cur.mist;
  CUR.cloud=Math.min(.96,(CUR.cloud||0)+r*.34+m*.12);CUR.csh=(CUR.csh||0)*(1-r*.7);CUR.sunI=(CUR.sunI||0)*(1-r*.42-m*.15);
  CUR.bloom=(CUR.bloom||0)*(1+cur.wet*.3);if(CUR.stars!=null)CUR.stars*=1-Math.max(r,m*.6);
}

// Frame step. Returns true while something needs a render.
function step(dt,t){
  S.t=t;U.uVfxT.value=t;
  if(S.lastSky<0||t-S.lastSky>30){S.lastSky=t;weatherTarget(new Date())}
  const k=1-Math.exp(-(dt||.016)*.25);let moved=false;
  ["rain","wet","mist","wind"].forEach(n=>{const d=tgt[n]-cur[n];if(Math.abs(d)>.002){cur[n]+=d*k;moved=true}});
  if(moved)pushWeather();
  if(S.curtain&&S.curtain.visible&&t-S.curtain.material.uniforms.uT0.value>3.3)S.curtain.visible=false;
  return t<S.active;
}
// WebGL context loss: stop default teardown so the context can come back, and report both edges.
function guardContext(canvas,h={}){
  if(!canvas||!canvas.addEventListener)return()=>{};
  const lost=e=>{try{e.preventDefault()}catch(_){}S.lost++;try{h.onLost&&h.onLost(e)}catch(err){console.warn(err)}};
  const back=e=>{try{h.onRestored&&h.onRestored(e)}catch(err){console.warn(err)}};
  canvas.addEventListener("webglcontextlost",lost,false);canvas.addEventListener("webglcontextrestored",back,false);
  return()=>{canvas.removeEventListener("webglcontextlost",lost,false);canvas.removeEventListener("webglcontextrestored",back,false)};
}
function setWeather(kind){S.override=kind&&KINDS[kind]?kind:null;weatherTarget(new Date());snapWeather();return S.w}

return{U,DECL,INK_GLSL,GROUND_GLSL,GROUND_EM_GLSL,WATER_GLSL,SWAY_GLSL,BUDGET,
  tier,tierFor,budget,applyTier,motionOff,weatherFor,weather:()=>({...S.w,now:{...cur}}),setWeather,
  init,dispose,ready:()=>S.ready,step,setScale,atmosphere,ink,ring,burst,trail,arrive,district,linkMaterial,
  patchGrade,grade,post,adjustSky,guardContext,
  patchCanopy(m,SH){if(!m||m.userData.vfx)return m;m.userData.vfx=true;const prev=m.onBeforeCompile;
    m.onBeforeCompile=(sh,r)=>{if(prev)prev(sh,r);sh.uniforms.uTime=SH.uTime;sh.uniforms.uWind=U.uWind;sh.vertexShader=sh.vertexShader.replace("#include <common>","#include <common>\nuniform float uTime;uniform float uWind;").replace("#include <begin_vertex>","#include <begin_vertex>\n"+SWAY_GLSL)};
    m.needsUpdate=true;return m},
  stats:()=>({ready:S.ready,draws:S.meshes.filter(m=>m.visible).length+(S.atmos?1:0),lost:S.lost,pools:{ink:INK,bursts:BURSTS,perBurst:BP,rings:RINGS,sparks:SPARKS,atmosphere:ATMOS}})};
})();
