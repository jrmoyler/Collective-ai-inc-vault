// Shared mesh factory used by the live city and the reference gallery.
// Geometry comes from Identity.blueprint. Every plate is merged into five rigid-skinned meshes, one per surface
// (body, armor, lit trim, joints, visor glass), driven by one 15-bone skeleton. A Sentinel costs 8 draw calls:
// the five surfaces, the chest terminal, the compass ring and the aura ring (hidden below tier 2).
// Props for a status (hologram slate, thought orbs, lift beam, data link) are added on demand and disposed with the figure.
// Surface detail: tileable textures in assets/sentinels/ are sampled triplanar in bind-pose space, so the merged meshes need
// no UVs. Until they load, or where they cannot load (tests, file errors), the code-only shading is used unchanged.
const SentinelMesh=(()=>{
const lin=h=>new THREE.Color(h).convertSRGBToLinear();
const G={};let ENV=null;
const hash=s=>{let h=2166136261;for(const c of String(s)){h=Math.imul(h^c.charCodeAt(0),16777619)}return (h>>>0)/4294967296};
const now=()=>typeof performance!=='undefined'&&performance.now?performance.now():Date.now();
// ---- reduced motion: follows the OS setting unless the page forces a value
let REDUCED=false,FORCED=null;
try{if(typeof matchMedia==='function'){const mq=matchMedia('(prefers-reduced-motion: reduce)');REDUCED=mq.matches;if(mq.addEventListener)mq.addEventListener('change',e=>{REDUCED=e.matches})}}catch(e){REDUCED=false}
const reducedNow=()=>FORCED==null?REDUCED:FORCED;
function reducedMotion(v){if(v!==undefined)FORCED=v==null?null:!!v;return reducedNow()}

// ---- geometry
// Unit cube with chamfered edges. A taper narrows the bottom face, for V-shaped plates. 'edge' marks chamfer faces.
function chamfer(c,taper){
  const P=(sx,sy,sz,ax)=>{const v=[sx*(ax===0?.5:.5-c),sy*(ax===1?.5:.5-c),sz*(ax===2?.5:.5-c)];if(taper&&sy<0){v[0]*=taper;v[2]*=.82}return v};
  const tri=[],quad=(a,b,c2,d)=>tri.push(a,b,c2,a,c2,d),S=[-1,1];
  for(const s of S){quad(P(s,-1,-1,0),P(s,1,-1,0),P(s,1,1,0),P(s,-1,1,0));quad(P(-1,s,-1,1),P(1,s,-1,1),P(1,s,1,1),P(-1,s,1,1));quad(P(-1,-1,s,2),P(1,-1,s,2),P(1,1,s,2),P(-1,1,s,2))}
  for(const a of S)for(const b of S){quad(P(a,b,-1,0),P(a,b,1,0),P(a,b,1,1),P(a,b,-1,1));quad(P(a,-1,b,0),P(a,1,b,0),P(a,1,b,2),P(a,-1,b,2));quad(P(-1,a,b,1),P(1,a,b,1),P(1,a,b,2),P(-1,a,b,2))}
  for(const x of S)for(const y of S)for(const z of S)tri.push(P(x,y,z,0),P(x,y,z,1),P(x,y,z,2));
  const pos=[],edge=[];
  for(let i=0;i<tri.length;i+=3){const a=tri[i];let b=tri[i+1],d=tri[i+2];
    const u=[b[0]-a[0],b[1]-a[1],b[2]-a[2]],v=[d[0]-a[0],d[1]-a[1],d[2]-a[2]],n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
    if(n[0]*(a[0]+b[0]+d[0])+n[1]*(a[1]+b[1]+d[1])+n[2]*(a[2]+b[2]+d[2])<0)[b,d]=[d,b];
    pos.push(...a,...b,...d);const e=i>=36?1:0;edge.push(e,e,e)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('edge',new THREE.Float32BufferAttribute(edge,1));g.computeVertexNormals();return g;
}
function plain(g){g=g.toNonIndexed();g.setAttribute('edge',new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count),1));return g}
// Compass ring under each Sentinel: a lit band, 36 ticks and four cardinal chevrons, laid flat. hi adds a dashed inner band and eight chevrons.
function ringGeometry(hi){
  const p=[],seg=64,band=(r0,r1,a0,a1)=>{const c0=Math.cos(a0),s0=Math.sin(a0),c1=Math.cos(a1),s1=Math.sin(a1);p.push(r0*c0,r0*s0,0,r1*c0,r1*s0,0,r1*c1,r1*s1,0,r0*c0,r0*s0,0,r1*c1,r1*s1,0,r0*c1,r0*s1,0)};
  for(let i=0;i<seg;i++)band(.9,.96,i/seg*Math.PI*2,(i+1)/seg*Math.PI*2);
  for(let i=0;i<36;i++){const a=i/36*Math.PI*2;band(1.02,i%9===0?1.2:1.09,a-.012,a+.012)}
  const chev=hi?8:4;for(let i=0;i<chev;i++){const a=i*Math.PI*2/chev+Math.PI/4;p.push(1.26*Math.cos(a),1.26*Math.sin(a),0,1.36*Math.cos(a-.05),1.36*Math.sin(a-.05),0,1.36*Math.cos(a+.05),1.36*Math.sin(a+.05),0)}
  if(hi)for(let i=0;i<48;i+=2)band(.74,.78,i/48*Math.PI*2,(i+1)/48*Math.PI*2);
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.rotateX(-Math.PI/2);return g;
}
// ---- shared textures: detail masks are optional; the shader falls back to plain shading while TEX.on is 0
const TEX={plating:{value:null},carbon:{value:null},circuit:{value:null},iri:{value:null},on:{value:0},iriOn:{value:0},base:'assets/sentinels/',state:'idle'};
function loadTextures(){
  if(TEX.state!=='idle')return;TEX.state='skipped';
  if(typeof window==='undefined'||typeof Image==='undefined'||typeof document==='undefined'||!document.createElementNS||!THREE.TextureLoader)return;
  TEX.state='loading';const L=new THREE.TextureLoader();let left=3;
  const done=()=>{if(--left===0){TEX.on.value=1;TEX.state='ready'}};
  for(const k of ['plating','carbon','circuit'])L.load(TEX.base+k+'.webp',t=>{t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=4;TEX[k].value=t;done()},undefined,()=>{TEX.state='failed'});
  L.load(TEX.base+'iridescence.webp',t=>{t.encoding=THREE.sRGBEncoding;t.wrapS=THREE.RepeatWrapping;TEX.iri.value=t;TEX.iriOn.value=1},undefined,()=>{});
}
// Fades the aura from bright at the ring to nothing at its top. Built from bytes so it works without a DOM.
function auraAlpha(){const n=32,d=new Uint8Array(n*4);for(let i=0;i<n;i++){const a=Math.round(255*Math.pow(1-i/(n-1),3.2));d.set([a,a,a,a],i*4)}const t=new THREE.DataTexture(d,1,n,THREE.RGBAFormat);t.needsUpdate=true;return t}
function shared(){
  if(G.box)return G;
  G.box=plain(new THREE.BoxGeometry(1,1,1));G.bevel=chamfer(.14);G.taper=chamfer(.14,.72);G.cap=plain(new THREE.CylinderGeometry(.5,.5,1,10).rotateZ(Math.PI/2));
  G.ring=ringGeometry(false);G.ringHi=ringGeometry(true);G.aura=new THREE.CylinderGeometry(1.02,1.12,1.5,48,1,true).translate(0,.75,0);G.auraTex=auraAlpha();
  G.slate=new THREE.PlaneGeometry(1,.62);G.orb=new THREE.SphereGeometry(.07,8,6);G.beam=new THREE.CylinderGeometry(.12,.12,1,8,1,true);G.link=new THREE.CylinderGeometry(.05,.05,1,5,1,true);
  G.set=new Set([G.box,G.bevel,G.taper,G.cap,G.ring,G.ringHi,G.aura,G.slate,G.orb,G.beam,G.link]);
  loadTextures();
  return G;
}
// Image-based light for the metals: a dusk gradient dome with soft boxes, prefiltered once per renderer.
function environment(renderer){
  if(ENV||!renderer||!THREE.PMREMGenerator)return ENV;
  try{
    const pm=new THREE.PMREMGenerator(renderer),s=new THREE.Scene(),g=new THREE.SphereGeometry(10,32,16),c=[],p=g.attributes.position;
    const top=new THREE.Color('#6E9BC4'),mid=new THREE.Color('#C4B48A'),bot=new THREE.Color('#2A241C');
    for(let i=0;i<p.count;i++){const y=p.getY(i)/10,col=y>0?mid.clone().lerp(top,Math.min(1,y*1.7)):mid.clone().lerp(bot,Math.min(1,-y*3));c.push(col.r,col.g,col.b)}
    g.setAttribute('color',new THREE.Float32BufferAttribute(c,3));s.add(new THREE.Mesh(g,new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.BackSide})));
    const soft=(w,h,x,y,z,col)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:col,side:THREE.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);s.add(m)};
    soft(6,3,5,6,6,new THREE.Color(2.4,2.3,2.1));soft(3,8,-7,2,-3,new THREE.Color(.6,.8,1.3));soft(10,.6,0,-1,8,new THREE.Color(1.2,1,.8));
    ENV=pm.fromScene(s,.04).texture;pm.dispose();s.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)o.material.dispose()});
  }catch(e){ENV=null}
  return ENV;
}

// ---- materials. One program per surface kind, shared by every Sentinel; uniforms are per figure.
// Common pieces: bind-pose position and normal for triplanar detail and the visor scan; a fresnel rim weighted toward
// top edges; status-driven glow.
const V_HEAD='attribute float glow;\nattribute float cloth;\nuniform float uTime;\nuniform float uSway;\nvarying float vGlow;\nvarying float vCloth;\nvarying vec3 vLocal;\nvarying vec3 vLocalN;\n';
const V_BODY='#include <begin_vertex>\n\tvGlow=glow;vCloth=cloth;vLocal=position;vLocalN=normal;\n\tfloat hem=smoothstep(4.35,2.55,position.y)*cloth;\n\ttransformed.x+=sin(uTime*1.7+position.x*1.8)*0.11*hem*uSway;\n\ttransformed.z+=sin(uTime*1.15+position.y)*0.045*hem*uSway;';
const F_HEAD=`uniform vec3 uRim;uniform float uRimGain;uniform float glowGain;uniform float uTime;uniform float uScan;uniform float uCircuit;
uniform sampler2D tDetail;uniform sampler2D tCircuit;uniform sampler2D tIri;uniform float uTexOn;uniform float uIriOn;
varying float vGlow;varying float vCloth;varying vec3 vLocal;varying vec3 vLocalN;
float triplanar(sampler2D t,vec3 p,vec3 n,float s){vec3 w=pow(abs(n),vec3(4.0));w/=max(dot(w,vec3(1.0)),1e-4);
  return texture2D(t,p.zy*s).g*w.x+texture2D(t,p.xz*s).g*w.y+texture2D(t,p.xy*s).g*w.z;}
`;
const RIM=`{vec3 vd=normalize(vViewPosition);float fr=pow(1.0-max(dot(normal,vd),0.0),3.0);
  totalEmissiveRadiance+=uRim*fr*uRimGain*(0.55+0.45*clamp(normal.y*0.5+0.5,0.0,1.0));}`;
// kind: body | armor | joint | trim | visor
function surface(kind,U,opts){
  const m=new THREE.MeshStandardMaterial({vertexColors:true,skinning:true,...opts});
  // r128 standard materials already enable derivatives; expose an extension request
  // for versions that read material.extensions without assuming it exists.
  m.extensions={...(m.extensions||{}),derivatives:true};
  const detail=kind==='armor'?TEX.plating:kind==='trim'||kind==='visor'?null:TEX.carbon,scale=kind==='armor'?1.4:2.2,amt=kind==='armor'?.35:kind==='joint'?.25:.22;
  m.onBeforeCompile=s=>{
    Object.assign(s.uniforms,{uRim:U.rimColor,uRimGain:U.rim,glowGain:U.glow,uTime:U.time,uSway:U.sway,uScan:U.scan,uCircuit:U.circuit,tDetail:detail||TEX.carbon,tCircuit:TEX.circuit,tIri:TEX.iri,uTexOn:detail?TEX.on:{value:0},uIriOn:TEX.iriOn});
    s.vertexShader=V_HEAD+s.vertexShader.replace('#include <begin_vertex>',V_BODY);
    let f=s.fragmentShader;
    f=f.replace('#include <color_fragment>',`#include <color_fragment>
\tfloat sDetail=uTexOn>0.5?triplanar(tDetail,vLocal,vLocalN,${scale.toFixed(2)}):0.55;
\tdiffuseColor.rgb*=mix(mix(1.0,0.5+0.92*sDetail,uTexOn*${amt.toFixed(2)}),1.0,vCloth);
\t// Fine machined lines use derivative filtering to avoid distant shimmer. No texture download required.
\tvec3 seamP=vLocal*${kind==='armor'?'9.0':'28.0'};vec3 seamW=fwidth(seamP)+vec3(0.003);
\tvec3 seamD=abs(fract(seamP-0.5)-0.5);vec3 seams=vec3(1.0)-smoothstep(vec3(0.015),vec3(0.015)+seamW,seamD);
\tvec3 faceW=abs(normalize(vLocalN));float machining=dot(seams,vec3(1.0)-faceW)*${kind==='armor'?'0.03':'0.012'}*(1.0-vCloth);
\tdiffuseColor.rgb*=1.0-machining*0.22;
\tdiffuseColor.rgb=mix(diffuseColor.rgb,diffuseColor.rgb*vec3(1.02,0.94,0.82)*(0.9+0.14*abs(sin(vLocal.x*46.0)*sin(vLocal.y*46.0))),vCloth);`);
    f=f.replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\n\troughnessFactor=mix(clamp(roughnessFactor+(0.55-sDetail)*0.45*uTexOn,0.04,1.0),0.94,vCloth);');
    let em=RIM;
    if(kind==='trim')em+='\n\ttotalEmissiveRadiance+=vColor*vGlow*glowGain;';
    if(kind==='armor')em+=`\n\tif(uCircuit>0.0&&uTexOn>0.5){float c=triplanar(tCircuit,vLocal,vLocalN,0.7);float flow=0.35+0.65*pow(0.5+0.5*sin(vLocal.y*3.0-uTime*2.2),3.0);totalEmissiveRadiance+=uRim*c*uCircuit*flow*glowGain;}`;
    if(kind==='visor')em+=`
\t{vec3 vd=normalize(vViewPosition);float fr=pow(1.0-max(dot(normal,vd),0.0),1.6);float h=fract(fr*1.25+uTime*0.035+vLocal.y*0.55);
\t vec3 film=uIriOn>0.5?texture2D(tIri,vec2(h,0.5)).rgb:0.5+0.5*cos(6.2832*(vec3(0.0,0.33,0.67)+h));
\t totalEmissiveRadiance+=film*(0.06+0.55*fr);
\t float band=exp(-pow((vLocal.y-uScan)*16.0,2.0));
\t totalEmissiveRadiance+=uRim*(0.22+band*0.7)*glowGain;}`;
    f=f.replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\n\t'+em);
    s.fragmentShader=F_HEAD+f};
  m.customProgramCacheKey=()=>'sentinel-painted-v5-'+kind;return m;
}

// ---- skeleton. Rigid skinning: each plate follows one bone, so armor never smears.
const BONES=['hips','spine','head','armL','foreL','handL','armR','foreR','handR','legL','shinL','footL','legR','shinR','footR'];
const PARENT=[-1,0,1,1,3,4,1,6,7,0,9,10,0,12,13];
const HIPS=0,SPINE=1,HEAD=2,AL=3,FL=4,HL=5,AR=6,FR=7,HR=8,LL=9,SL=10,FTL=11,LR=12,SR=13,FTR=14,NB=15,HX=45,HY=46,HZ=47,NCH=48;
const L1=1.24,L2=1.32;
function restOf(bp){const p=bp.pivots,r=new Float32Array(NB*3),set=(i,x,y,z)=>{r[i*3]=x;r[i*3+1]=y;r[i*3+2]=z};
  set(HIPS,0,3.05,0);set(SPINE,0,3.42,0);set(HEAD,...p.head);
  for(const [a,f,h,s] of [[AL,FL,HL,-1],[AR,FR,HR,1]]){const q=p[s<0?'armL':'armR'];set(a,...q);set(f,q[0]+s*.08,q[1]-.84,0);set(h,q[0]+s*.08,q[1]-1.7,0)}
  for(const [l,s2,ft,s] of [[LL,SL,FTL,-1],[LR,SR,FTR,1]]){const q=p[s<0?'legL':'legR'];set(l,...q);set(s2,q[0],q[1]-L1,0);set(ft,q[0],q[1]-2.56,0)}
  return r}
function boneOf(q){
  if(q.slot==='torso')return q.y<3.38?HIPS:SPINE;
  if(q.slot==='head')return HEAD;
  const L=q.slot.endsWith('L');
  if(q.slot.startsWith('arm'))return q.y>-.62?(L?AL:AR):q.y>-1.62?(L?FL:FR):(L?HL:HR);
  return q.y>-1.1?(L?LL:LR):q.y>-2.45?(L?SL:SR):(L?FTL:FTR);
}
const _m=new THREE.Matrix4(),_q=new THREE.Quaternion(),_e=new THREE.Euler(),_s=new THREE.Vector3(),_p=new THREE.Vector3(),_n=new THREE.Matrix3(),_v=new THREE.Vector3();
// Bakes one plate into a surface buffer. Chamfer faces catch a little more light; plates darken slightly toward their base.
function put(t,geo,q,origin,col,glow,shade,bone){
  _m.compose(_p.set(origin[0]+q.x,origin[1]+q.y,origin[2]+q.z),_q.setFromEuler(_e.set(q.rx||0,0,q.rz||0)),_s.set(q.w,q.h,q.d));_n.getNormalMatrix(_m);
  const P=geo.attributes.position,N=geo.attributes.normal,E=geo.attributes.edge;
  for(let i=0;i<P.count;i++){const ly=P.getY(i),k=shade*(E.getX(i)?1.13:1)*(glow?1:.9+.2*(ly+.5));
    _v.fromBufferAttribute(P,i).applyMatrix4(_m);t.pos.push(_v.x,_v.y,_v.z);_v.fromBufferAttribute(N,i).applyMatrix3(_n).normalize();t.nrm.push(_v.x,_v.y,_v.z);
    t.col.push(col.r*k,col.g*k,col.b*k);t.glow.push(glow);t.cloth.push(q.k===5?1:0);t.bone.push(bone,0,0,0)}
}
function geometryOf(t){const g=new THREE.BufferGeometry(),n=t.glow.length,w=new Float32Array(n*4);for(let i=0;i<n;i++)w[i*4]=1;
  g.setAttribute('position',new THREE.Float32BufferAttribute(t.pos,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(t.nrm,3));g.setAttribute('color',new THREE.Float32BufferAttribute(t.col,3));
  g.setAttribute('glow',new THREE.Float32BufferAttribute(t.glow,1));g.setAttribute('cloth',new THREE.Float32BufferAttribute(t.cloth,1));g.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(t.bone,4));g.setAttribute('skinWeight',new THREE.Float32BufferAttribute(w,4));
  g.computeBoundingSphere();g.boundingSphere.radius*=1.35;return g}
function terminal(a,f,pal){
  const canvas=document.createElement('canvas');canvas.width=256;canvas.height=180;const ctx=canvas.getContext('2d');
  ctx.fillStyle=pal[0];ctx.fillRect(0,0,256,180);ctx.fillStyle=pal[2];
  for(const [x,y,w,h] of [[8,8,240,4],[8,168,240,4],[8,8,4,164],[244,8,4,164],[20,128,216,2]])ctx.fillRect(x,y,w,h);
  for(let i=0;i<4;i++)ctx.fillRect(22+i*9,30-i*5,5,10+i*5);
  ctx.textAlign='center';ctx.font='bold 66px monospace';ctx.fillText(String(a.symbol||Identity.FORMS[f].symbol).slice(0,8),128,108);
  ctx.font='26px monospace';ctx.fillText(a.ownerBadge||Identity.badge(a.id),128,158);
  if(a.level>0){ctx.textAlign='right';ctx.font='bold 24px monospace';ctx.fillText('L'+Math.min(99,a.level|0),234,42)}
  const tex=new THREE.CanvasTexture(canvas);tex.encoding=THREE.sRGBEncoding;return tex;
}
// The last level each id was built at, so a rebuild at a higher level plays the level-up ceremony.
const SEEN=new Map();
const SURF={0:'body',5:'body',1:'armor',2:'trim',3:'trim',4:'joint',6:'visor'};
function makeSentinel(a){
  const g=shared(),f=Identity.form(a.form||'agent'),pal=Identity.palette(a.palette||['#111827',a.color||'#C97B54','#E6E9F2'],f),level=a.level|0;
  const owner=a.ownerColor&&Identity.HEX.test(a.ownerColor)?a.ownerColor:null,bp=Identity.blueprint(f,{owner:!!owner,level}),tone=Identity.tones(pal,owner).map(lin);
  const tier=bp.tier|0,grp=new THREE.Group(),white=new THREE.Color(1,1,1),seed=hash(a.id||f),buf={},rest=restOf(bp);
  const U={glow:{value:1},rim:{value:.3},rimColor:{value:tone[2]},time:{value:0},sway:{value:.28},scan:{value:5.3},circuit:{value:tier>=4?.24:tier>=3?.18:tier>=2?.12:0}};
  // Each plate gets its own shade (0.86 to 1.08) so neighboring panels read as separate pieces of metal.
  bp.parts.forEach((q,i)=>{
    const geo=q.shape==='box'||Math.min(q.w,q.h,q.d)<.09?g.box:g[q.shape]||g.box,kind=SURF[q.k]||'body',lit=q.k===2?1:q.k===3?.6:q.k===6?.08:0;
    const shade=lit?1:.86+.22*hash(seed+i),col=q.k===5?tone[q.k].clone().lerp(lin('#C4A574'),.42):(kind==='armor'?white:tone[q.k]),origin=bp.pivots[q.slot]||[0,0,0];
    if(!buf[kind])buf[kind]={pos:[],nrm:[],col:[],glow:[],cloth:[],bone:[]};put(buf[kind],geo,q,origin,col,lit,shade,boneOf(q));
  });
  // bones in bind pose (no rotation), positioned relative to their parent
  const bones=BONES.map(name=>{const b=new THREE.Bone();b.name=name;return b});
  bones.forEach((b,i)=>{const p=PARENT[i],x=rest[i*3]-(p<0?0:rest[p*3]),y=rest[i*3+1]-(p<0?0:rest[p*3+1]),z=rest[i*3+2]-(p<0?0:rest[p*3+2]);b.position.set(x,y,z);(p<0?grp:bones[p]).add(b)});
  grp.updateMatrixWorld(true);const skeleton=new THREE.Skeleton(bones),I=new THREE.Matrix4();
  const env=ENV?{envMap:ENV}:{},MATS={
    body:()=>surface('body',U,{roughness:.88,metalness:.02,envMapIntensity:.35,...env}),
    armor:()=>surface('armor',U,{color:tone[1],roughness:.74,metalness:.05,envMapIntensity:.4,...env}),
    trim:()=>surface('trim',U,{roughness:.45,metalness:.04}),
    joint:()=>surface('joint',U,{roughness:.9,metalness:.02,envMapIntensity:.25,...env}),
    visor:()=>surface('visor',U,{roughness:.18,metalness:.12,...(ENV?{envMap:ENV,envMapIntensity:.35}:{})})};
  const surfaces={};
  for(const kind of ['body','armor','trim','joint','visor'])if(buf[kind]){const mesh=new THREE.SkinnedMesh(geometryOf(buf[kind]),MATS[kind]());mesh.name='sentinel-'+kind;grp.add(mesh);mesh.bind(skeleton,I);surfaces[kind]=mesh}
  const t=bp.terminal,plate=new THREE.Mesh(new THREE.PlaneGeometry(t.w,t.h),new THREE.MeshBasicMaterial({map:terminal(a,f,pal)}));plate.position.set(t.x-rest[SPINE*3],t.y-rest[SPINE*3+1],t.z);bones[SPINE].add(plate);
  const ring=new THREE.Mesh(tier>=3?g.ringHi:g.ring,new THREE.MeshBasicMaterial({color:tone[2],transparent:true,opacity:.65,side:THREE.DoubleSide,fog:false,depthWrite:false}));ring.position.y=.06;grp.add(ring);
  const aura=new THREE.Mesh(g.aura,new THREE.MeshBasicMaterial({color:tone[2],alphaMap:g.auraTex,transparent:true,opacity:0,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,depthWrite:false,fog:false}));aura.visible=tier>=2;aura.name='sentinel-aura';ring.add(aura);
  const key=a.id||f,prev=SEEN.get(key),stamp=now();let pendingEmote=null;
  if(prev&&level>prev.level&&stamp-prev.at>5000&&a.celebrateLevelUp!==false)pendingEmote='levelup';
  SEEN.set(key,{level,at:prev&&prev.level===level?prev.at:stamp});
  const anim={t:-1,S:new Float32Array(NCH),V:new Float32Array(NCH),T:new Float32Array(NCH),P:new Float32Array(NCH),walkW:0,gait:0,speed:0,px:0,pz:0,lookY:0,lookP:0,lookW:0,glow:1,rim:.3,slate:0,orbs:0,flash:0,jump:0};
  const head=bones[HEAD],arms=[bones[AL],bones[AR]],legs=[bones[LL],bones[LR]];
  return {grp,ring,aura,legs,arms,head,bones,skeleton,surfaces,plate,glow:U.glow,rimGain:U.rim,uniforms:U,accent:surfaces.trim?surfaces.trim.material:null,tone,tier,level,rest,anim,
    props:{},status:'idle',emote:null,emoteT:0,pendingEmote,lookAt:null,walkSpeed:null,phase:(parseInt(Identity.badge(a.id||f),36)%628)/100,
    pos:new THREE.Vector3(),from:new THREE.Vector3(),to:new THREE.Vector3(),t0:-1,noteId:-1,signature:JSON.stringify([f,pal,a.symbol,a.ownerColor,a.ownerBadge,level])};
}
// ---- props, created the first time a status needs them
function prop(m,name){
  if(m.props[name])return m.props[name];const g=shared(),c=m.tone[2];let o;
  if(name==='slate'){o=new THREE.Mesh(g.slate,new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.35,side:THREE.DoubleSide,depthWrite:false,fog:false}));const edge=new THREE.Mesh(g.slate,new THREE.MeshBasicMaterial({color:c,wireframe:true,transparent:true,opacity:.9,fog:false}));edge.scale.set(1.02,1.02,1);o.add(edge);o.scale.setScalar(1.1);(m.bones?m.bones[SPINE]:m.grp).add(o);m.props[name]=o;return o}
  else if(name==='orbs'){o=new THREE.Group();for(let i=0;i<3;i++){const s=new THREE.Mesh(g.orb,new THREE.MeshBasicMaterial({color:c,fog:false,transparent:true}));s.scale.setScalar(.7+i*.25);o.add(s)}(m.bones?m.bones[HEAD]:m.grp).add(o);m.props[name]=o;return o}
  else if(name==='beam'){o=new THREE.Mesh(g.beam,new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.35,side:THREE.DoubleSide,depthWrite:false,fog:false}))}
  else if(name==='link'){o=new THREE.Mesh(g.link,new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.55,side:THREE.DoubleSide,depthWrite:false,fog:false}))}
  else o=new THREE.Group();
  m.props[name]=o;m.grp.add(o);return o;
}
const BUSY={working:1,writing:1,reading:1,thinking:1,reviewing:1,'in use':1};
const STATUSES=['idle','viewing','walking','working','in use','writing','reading','thinking','reviewing','blocked','lifting'];
const EMOTES={celebrate:3,greet:1.8,nod:1.3,levelup:3.8};

// ---- animation math. Everything below runs per frame and allocates nothing.
const clamp=(x,a,b)=>x<a?a:x>b?b:x,sm=x=>{x=clamp(x,0,1);return x*x*(3-2*x)},ease=x=>{x=clamp(x,0,1);return x<.5?2*x*x:1-(-2*x+2)*(-2*x+2)/2};
const back=x=>{x=clamp(x,0,1)-1;return 1+2.70158*x*x*x+1.70158*x*x};          // ease out with overshoot
const rate=(dt,k)=>1-Math.exp(-dt*k);
const wrap=a=>((a+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;
// Keyframes as a flat [t0,v0,t1,v1,...] list, smoothstep between keys.
function kf(K,e){if(e<=K[0])return K[1];for(let i=2;i<K.length;i+=2)if(e<=K[i]){const t0=K[i-2];return K[i-1]+(K[i+1]-K[i-1])*sm((e-t0)/(K[i]-t0))}return K[K.length-1]}
const NOD=[0,0,.15,-.09,.38,.34,.6,-.05,.82,.2,1.1,0];
const hv=(th,tz,kn)=>Math.cos(tz)*(L1*Math.cos(th)+L2*Math.cos(th+kn));   // hip-to-ankle height of a leg
function R(A,b,x,y,z){const i=b*3;A[i]=x;A[i+1]=y;A[i+2]=z}
function arms(A,x,y,z,fx){R(A,AL,x,y,z);R(A,AR,x,-y,-z);A[FL*3]=fx;A[FR*3]=fx}
function mixTo(P,i,v,w){P[i]+=(v-P[i])*w}
// Slate placement per status, in chest-bone space: x, y, z, pitch, yaw, roll, scale.
const SLATE={working:[0,.46,1.22,-.55,0,0,1.1],'in use':[0,.46,1.22,-.55,0,0,1.1],writing:[-.3,.28,1.1,-1.0,.25,.1,.85],reading:[0,1.18,1.12,-.12,0,0,1]};
// Glow and rim targets per status.
const GLOW={idle:[.95,.3],viewing:[.95,.3],walking:[1,.3],working:[1.1,.34],'in use':[1.1,.34],writing:[1.05,.32],reading:[1.05,.32],thinking:[1,.36],reviewing:[1.15,.46],blocked:[.4,.12],lifting:[1.25,.4]};

function target(T,status){
  T.fill(0);arms(T,0,0,-.07,-.18);T[HL*3]=T[HR*3]=-.05;
  switch(status){
    case 'walking':arms(T,0,0,-.05,-.3);break;
    case 'working':case 'in use':arms(T,-.42,.35,-.16,-1.1);T[HL*3]=T[HR*3]=.15;T[HEAD*3]=.26;T[SPINE*3]=.06;break;
    case 'writing':R(T,AL,-.35,.5,-.1);T[FL*3]=-1.3;R(T,AR,-.5,-.25,.12);T[FR*3]=-1.4;R(T,HEAD,.38,-.12,0);T[SPINE*3]=.08;break;
    case 'reading':arms(T,-.72,.38,-.12,-1.65);T[HEAD*3]=.18;break;
    case 'thinking':R(T,AR,-.62,-.55,.2);T[FR*3]=-2.25;T[HR*3]=-.3;R(T,AL,-.35,.85,.05);T[FL*3]=-1.45;R(T,HEAD,-.06,.22,.12);T[SPINE*3+2]=.03;break;
    case 'reviewing':R(T,AL,-.42,.95,.08);T[FL*3]=-1.8;R(T,AR,-.5,-.95,-.08);T[FR*3]=-1.7;T[SPINE*3]=-.05;break;
    case 'blocked':T[SPINE*3]=.24;R(T,HEAD,.42,0,.1);arms(T,-.06,0,-.03,-.08);for(const [l,s] of [[LL,SL],[LR,SR]]){T[l*3]=-.08;T[s*3]=.18}break;
    case 'lifting':arms(T,-.15,0,-.45,-.3);T[HEAD*3]=-.35;T[LL*3+2]=.03;T[LR*3+2]=-.03;break;
  }
}
// Gait: distance-matched cadence, heel strike and toe-off, knee flexion in swing, pelvis drop, sway, roll and twist,
// counter-rotating chest and arms. Blends from walk to run with speed.
function gait(P,phi,A,run,w){
  const s=Math.sin(phi),c=Math.cos(phi),ksw=.95+.75*run,arm=(.4+.25*run)*A/.4;
  for(let side=0;side<2;side++){const sg=side?-1:1,ss=sg*s,cc=sg*c,l=side?LR:LL,k=side?SR:SL,ft=side?FTR:FTL;
    const th=-A*ss,kn=ksw*Math.pow(Math.max(0,cc),1.3)+.1+.12*run,stance=sm(-cc*2+.5);
    const foot=-(th+kn)*(.5+.5*stance)-.32*Math.pow(Math.max(0,ss),6)+.55*Math.pow(Math.max(0,-Math.sin(phi+side*Math.PI+.3)),6);
    P[l*3]+=th*w;P[k*3]+=kn*w;P[ft*3]+=foot*w}
  const D=.22*A;
  P[HIPS*3+1]+=D*s*w;P[SPINE*3+1]-=1.5*D*s*w;P[HEAD*3+1]+=.5*D*s*w;
  P[HIPS*3+2]+=.05*(1-.4*run)*c*w;P[SPINE*3+2]-=.03*c*w;
  P[HX]+=.06*(1-.5*run)*c*w;
  P[SPINE*3]+=(.04+.16*run)*w;P[HEAD*3]-=(.02+.1*run)*w;
  P[AL*3]+=arm*s*w;P[AR*3]-=arm*s*w;
  P[FL*3]-=(.25*Math.max(0,-s)+1.0*run)*w;P[FR*3]-=(.25*Math.max(0,s)+1.0*run)*w;
  P[AL*3+2]-=.04*run*w;P[AR*3+2]+=.04*run*w;
}
// Emotes write over the pose with weight w and may set a jump height and a glow boost. Each has anticipation,
// action with overshoot, follow-through and settle.
function emoteLayer(m,P,name,e,w){
  const a=m.anim;let jump=0,glow=0;
  if(name==='celebrate'){
    const crouch=e<.28?ease(e/.28):e<.42?1-ease((e-.28)/.14):e>1&&e<1.3?.7*Math.sin(Math.PI*(e-1)/.3):0;
    const up=e<.28?0:back((e-.28)/.3);
    if(e>.28&&e<1)jump=1.1*Math.sin(Math.PI*(e-.28)/.72);
    const pump=e>1.25?Math.max(0,Math.sin((e-1.25)*9)):0,hop=e>1.25&&e<2.6?.14*Math.abs(Math.sin((e-1.25)*9)):0;jump+=hop;
    mixTo(P,AL*3,.4*crouch-2.85*up,w);mixTo(P,AR*3,.4*crouch-2.85*up,w);mixTo(P,AL*3+2,-.35*up,w);mixTo(P,AR*3+2,.35*up,w);
    mixTo(P,FL*3,-.2-.9*pump,w);mixTo(P,FR*3,-.2-.9*(e>1.25?Math.max(0,-Math.sin((e-1.25)*9)):0),w);
    for(const [l,k] of [[LL,SL],[LR,SR]]){mixTo(P,l*3,-.55*crouch-(jump>.3?.3:0),w);mixTo(P,k*3,1.1*crouch+(jump>.3?.6:0),w)}
    mixTo(P,SPINE*3,.25*crouch-.1*up,w);mixTo(P,HEAD*3,-.3*up,w);glow=.8;
  }else if(name==='greet'){
    const raise=e<.18?0:e<1.4?back((e-.18)/.32):1-ease((e-1.4)/.4),pre=e<.18?ease(e/.18):Math.max(0,1-(e-.18)/.15);
    const wv=e>.5&&e<1.45?Math.sin((e-.5)*11):0,lag=e>.5&&e<1.55?Math.sin((e-.5)*11-.9):0;
    mixTo(P,AR*3,.22*pre-.3*raise,w);mixTo(P,AR*3+2,.07+.25*pre+2.35*raise+.2*wv*raise,w);mixTo(P,FR*3,-.15-.25*raise,w);
    mixTo(P,FR*3+2,.35*lag*raise,w);mixTo(P,HR*3+2,.3*Math.sin((e-.5)*11-1.6)*raise,w);
    mixTo(P,HEAD*3+2,-.1*raise,w);mixTo(P,SPINE*3+2,-.04*raise,w);glow=.15*raise;
  }else if(name==='nod'){
    P[HEAD*3]+=kf(NOD,e)*w;P[SPINE*3]+=.12*kf(NOD,e-.05)*w;
  }else if(name==='levelup'){
    const crouch=e<.35?ease(e/.35)*.95:e<.5?.95*(1-ease((e-.35)/.15)):e>1.25&&e<1.55?.6*Math.sin(Math.PI*(e-1.25)/.3):0;
    const air=e>.35&&e<1.25?(e-.35)/.9:0;if(air)jump=1.6*Math.sin(Math.PI*air);
    const spread=air?Math.sin(Math.PI*air):0,fist=e>1.4?back((e-1.4)/.45):0;
    P[HIPS*3+1]+=(e>.35?2*Math.PI*ease((e-.35)/.9):0)*w;
    mixTo(P,AL*3,.3*crouch-.2*fist,w);mixTo(P,AL*3+1,.5*crouch,w);mixTo(P,AL*3+2,-1.35*spread-.45*fist,w);mixTo(P,FL*3,-.4*crouch-1.4*fist,w);
    mixTo(P,AR*3,.3*crouch-2.95*fist,w);mixTo(P,AR*3+1,-.5*crouch,w);mixTo(P,AR*3+2,1.35*spread+.22*fist,w);mixTo(P,FR*3,-.4*crouch-.25*fist,w);
    for(const [l,k] of [[LL,SL],[LR,SR]]){mixTo(P,l*3,-.6*crouch-.45*spread,w);mixTo(P,k*3,1.2*crouch+.8*spread,w)}
    mixTo(P,SPINE*3,.3*crouch-.12*fist,w);mixTo(P,HEAD*3,.3*crouch-.25*fist-.15*spread,w);
    glow=e<.35?1.4*e/.35:1.4*(1-sm((e-2.6)/1.2));a.flash=Math.max(a.flash,e<1.6?1:1-sm((e-1.6)/1.6));
  }
  a.jump=jump;return glow*w;
}
// One pose function for the city and the gallery. status: walking | lifting | working | writing | reading | thinking |
// reviewing | blocked | idle | viewing | 'in use'. m.emote: 'celebrate' | 'greet' | 'nod' | 'levelup' over the status.
// m.face: yaw of a partner to look toward, or null. m.lookAt or opt.look: a world point for the head to track.
// opt.speed: ground speed in m/s for the gait when the figure is not actually moving (the gallery treadmill).
const NOOPT={};
function pose(m,t,status,opt){
  opt=opt||NOOPT;status=typeof status==='boolean'?(status?'walking':m.status||'idle'):(status||m.status||'idle');
  const a=m.anim;if(!a)return;const red=reducedNow(),ph=m.phase,T=a.T,S=a.S,V=a.V,P=a.P;
  let dt=t-a.t;const first=a.t<0||dt<0||dt>1;if(first)dt=1/60;a.t=t;
  if(m.pendingEmote){if(!red)emote(m,m.pendingEmote,t);m.pendingEmote=null}
  const moving=status==='walking';
  // ground speed from the figure's own travel; falls back to opt.speed for the gallery treadmill
  const gx=m.grp.position.x,gz=m.grp.position.z;let v=first?0:Math.hypot(gx-a.px,gz-a.pz)/dt;a.px=gx;a.pz=gz;if(v>40)v=0;
  if(moving){const want=v>.3?v:(opt.speed!=null?opt.speed:(m.walkSpeed||3.4));a.speed+=(want-a.speed)*(first?1:rate(dt,4))}
  a.walkW+=((moving&&!red?1:0)-a.walkW)*(first?1:rate(dt,7));
  // status pose through a slightly underdamped spring: transitions settle with a small overshoot
  target(T,status);
  if(first||red){S.set(T);V.fill(0)}
  else{let left=dt;while(left>1e-5){const h=Math.min(left,1/60);left-=h;for(let i=0;i<NCH;i++){V[i]+=(90*(T[i]-S[i])-13.7*V[i])*h;S[i]+=V[i]*h}}}
  P.set(S);
  if(!red){
    const idleW=1-a.walkW,br=Math.sin(t*1.6+ph);
    // breathing, and a slow weight shift with the unweighted knee relaxing
    P[SPINE*3]+=.02*br*idleW;P[AL*3+2]-=.016*br*idleW;P[AR*3+2]+=.016*br*idleW;P[HEAD*3]-=.012*br*idleW;
    if(status!=='lifting'&&status!=='blocked'){const ws=Math.sin(t*.45+ph*2)*idleW,wl=Math.max(0,ws),wr=Math.max(0,-ws);
      P[HX]+=.05*ws;P[HIPS*3+2]+=.035*ws;P[SPINE*3+2]-=.03*ws;
      P[SL*3]+=.14*wl;P[LL*3]-=.05*wl;P[SR*3]+=.14*wr;P[LR*3]-=.05*wr}
    switch(status){
      case 'idle':case 'viewing':P[HEAD*3+1]+=Math.sin(t*.42+ph)*.42*Math.max(0,Math.sin(t*.13+ph*3));P[HEAD*3]+=Math.sin(t*.31+ph*2)*.04;break;
      case 'working':case 'in use':{const tap=Math.sin(t*9+ph);P[FL*3]+=tap*.07;P[FR*3]-=tap*.07;P[HL*3]+=Math.max(0,tap)*.12;P[HR*3]+=Math.max(0,-tap)*.12;P[HEAD*3+1]+=Math.sin(t*1.3+ph)*.08;break}
      case 'writing':{const w=Math.sin(t*11+ph);P[FR*3]+=w*.05;P[AR*3+2]+=Math.sin(t*7+ph)*.04;P[HR*3+2]+=Math.sin(t*13+ph)*.12;P[HEAD*3+1]+=Math.sin(t*.8+ph)*.05;break}
      case 'reading':{const turn=Math.pow(Math.max(0,Math.sin(t*.8+ph)),12);P[AR*3+1]-=.35*turn;P[FR*3+2]+=.25*turn;P[HEAD*3+1]+=Math.sin(t*.9+ph)*.12;break}
      case 'thinking':P[HEAD*3+1]+=Math.sin(t*.6+ph)*.25;P[HR*3+2]+=Math.sin(t*1.7+ph)*.06;break;
      case 'reviewing':P[HEAD*3+1]+=Math.sin(t*1.1+ph)*.4;P[SPINE*3+1]+=Math.sin(t*1.1+ph-.5)*.06;break;
      case 'blocked':P[HEAD*3+1]+=Math.sin(t*.3+ph)*.08;break;
    }
    // locomotion layer
    if(a.walkW>.001||moving){const spd=Math.max(.5,a.speed),A=clamp(.26+.03*spd,.28,.62),step=2*2.9*Math.sin(A)*.85;a.gait+=Math.PI*spd*dt/step;
      gait(P,a.gait+ph,A,sm((spd-5)/5),a.walkW)}
  }
  // emote over the pose
  let glowBoost=0;a.jump=0;
  if(m.emote){const D=EMOTES[m.emote];if(!D||red)m.emote=null;else{const e=t-m.emoteT;
    if(e>D)m.emote=null;else if(e>=0){const w=Math.min(1,e/.12)*Math.min(1,(D-e)/.35);glowBoost=emoteLayer(m,P,m.emote,e,w)}}}
  // look-at: partner yaw (m.face) or a world point; split between chest and head, smoothed
  let ly=0,lp=0,lw=0;const look=opt.look||m.lookAt;
  if(look){_v.copy(look);m.grp.worldToLocal(_v);_v.y-=5.2+m.anim.P[HY];ly=clamp(Math.atan2(_v.x,_v.z),-1.1,1.1);lp=clamp(-Math.atan2(_v.y,Math.hypot(_v.x,_v.z)),-.5,.5);lw=Math.abs(Math.atan2(_v.x,_v.z))<2.2?1:0}
  else if(m.face!=null&&!moving){ly=clamp(wrap(m.face-m.grp.rotation.y),-.9,.9)*.8;lw=1}
  const lk=red||first?1:rate(dt,5);a.lookY+=(ly-a.lookY)*lk;a.lookP+=(lp-a.lookP)*lk;a.lookW+=(lw-a.lookW)*lk;
  if(a.lookW>.001){P[HEAD*3+1]=P[HEAD*3+1]*(1-a.lookW*.7)+a.lookY*.68*a.lookW;P[SPINE*3+1]+=a.lookY*.3*a.lookW;P[HEAD*3]=P[HEAD*3]*(1-a.lookW*.6)+a.lookP*.85*a.lookW}
  // legs keep vertical against pelvis roll and sway; feet stay flat outside the gait; the pelvis drops to the lower foot
  const rl=P[HIPS*3+2],sway=Math.atan(P[HX]/2.9)*.7,flat=1-a.walkW;
  P[LL*3+2]-=rl+sway;P[LR*3+2]-=rl+sway;
  P[FTL*3]-=(P[LL*3]+P[SL*3])*flat;P[FTR*3]-=(P[LR*3]+P[SR*3])*flat;
  P[HY]-=L1+L2-Math.max(hv(P[LL*3],P[LL*3+2],P[SL*3]),hv(P[LR*3],P[LR*3+2],P[SR*3]));
  P[HY]+=a.jump;
  const B=m.bones,r=m.rest;
  for(let i=0;i<NB;i++)B[i].rotation.set(P[i*3],P[i*3+1],P[i*3+2]);
  B[HIPS].position.set(r[0]+P[HX],r[1]+P[HY],r[2]+P[HZ]);
  // materials: status glow and rim, eased; the visor scan sweeps; the circuit flow scrolls
  const G0=GLOW[status]||GLOW.idle,gk=first||red?1:rate(dt,4);a.glow+=(G0[0]-a.glow)*gk;a.rim+=(G0[1]-a.rim)*gk;
  let pulse=1;
  if(!red){pulse=status==='working'||status==='in use'?1+.12*Math.sin(t*6+ph)*Math.sin(t*1.1):status==='thinking'?1+.25*Math.sin(t*3.1+ph):status==='blocked'?.6+.4*Math.max(0,Math.sin(t*1.4+ph))*(hash(Math.floor(t*12))>.25?1:.3):1+.08*Math.sin(t*2.6+ph)}
  const U=m.uniforms;U.glow.value=a.glow*pulse+glowBoost;U.rim.value=a.rim+(m.emote?.25:0);U.time.value=red?0:t;U.sway.value=red?0:.28+.85*a.walkW+(m.emote?.4:0);
  U.scan.value=red?5.3:5.3+.2*Math.sin(t*(status==='reading'?2.4:1.1)+ph);
  if(m.accent&&m.accent.emissive)m.accent.emissiveIntensity=0;
  // props, faded in and out
  const wantSlate=!!SLATE[status],wantOrbs=status==='thinking',pk=first||red?1:rate(dt,8);
  a.slate+=((wantSlate?1:0)-a.slate)*pk;a.orbs+=((wantOrbs?1:0)-a.orbs)*pk;
  if(a.slate>.01||wantSlate){const s=prop(m,'slate'),c=SLATE[status];if(c){s.position.set(c[0],c[1],c[2]);s.rotation.set(c[3],c[4],c[5]);s.userData.k=c[6]}
    s.scale.setScalar((s.userData.k||1)*(.6+.4*a.slate));s.material.opacity=(.26+(red?0:.08*Math.sin(t*4+ph)))*a.slate;s.children[0].material.opacity=.9*a.slate;s.visible=a.slate>.01}
  else if(m.props.slate)m.props.slate.visible=false;
  if(a.orbs>.01){const o=prop(m,'orbs');o.visible=true;for(let i=0;i<3;i++){const s=o.children[i],ang=(red?0:t)*(1.2+i*.3)+i*2.1+ph;s.position.set(Math.cos(ang)*.55,1.12+Math.sin(ang*1.7)*.14+i*.12,Math.sin(ang)*.55);s.material.opacity=a.orbs}}
  else if(m.props.orbs)m.props.orbs.visible=false;
  if(status==='lifting'){const b=prop(m,'beam');b.visible=true;b.scale.set(1.6,opt.beam||1,1.6);b.position.y=(opt.beam||1)/2-m.grp.position.y+(opt.beamBase||0);b.material.opacity=red?.22:.18+.12*Math.sin(t*9)}
  else if(m.props.beam)m.props.beam.visible=false;
  if(m.props.link)m.props.link.visible=false;
  m.grp.position.y=m.pos.y;
  // ring and aura: the aura shows from tier 2 and flares during a level-up
  m.ring.rotation.y=red?0:t*.3;m.ring.material.opacity=(status==='blocked'?.3:.5)+(red?0:.18*Math.sin(t*2+ph))+.3*a.flash;
  const auraBase=m.tier>=4?.2:m.tier>=3?.15:m.tier>=2?.1:0;a.flash=Math.max(0,a.flash-dt*.8);
  m.aura.visible=auraBase>0||a.flash>.01;m.aura.material.opacity=auraBase*(red?1:.8+.2*Math.sin(t*1.3+ph))+.35*a.flash;m.aura.scale.set(1+.15*a.flash,1+(red?0:.06*Math.sin(t*1.7+ph))+.8*a.flash,1+.15*a.flash);
  m.status=status;
}
function emote(m,name,t){m.emote=name;m.emoteT=t;if(m.anim&&name==='levelup')m.anim.flash=Math.max(m.anim.flash,.01)}
function dispose(grp){const g=shared();grp.traverse(o=>{if(o.material){if(o.material.map)o.material.map.dispose();o.material.dispose()}if(o.geometry&&!g.set.has(o.geometry))o.geometry.dispose();if(o.skeleton&&o.skeleton.boneTexture){o.skeleton.boneTexture.dispose();o.skeleton.boneTexture=null}})}
// Cost of one figure: draw calls (visible meshes), vertices, materials and bones.
function stats(m){let draws=0,verts=0,mats=0;m.grp.traverse(o=>{if(o.isMesh){mats++;if(o.visible){draws++;verts+=o.geometry.attributes.position.count}}});return {draws,verts,materials:mats,bones:m.bones?m.bones.length:0}}
function textures(base){if(base&&TEX.state==='idle')TEX.base=base;return {state:TEX.state,base:TEX.base}}
return {create:makeSentinel,dispose,pose,emote,prop,environment,BUSY,STATUSES,EMOTES,stats,textures,reducedMotion,tier:l=>Identity.tier(l)};
})();

