// Shared mesh factory used by the live city and the reference gallery.
// Geometry comes from Identity.blueprint. Torso plates are merged into one mesh per palette color;
// head, arms and legs are one vertex-colored mesh each, so a Sentinel costs at most 11 draw calls.
// Props for a status (hologram slate, thought orbs, lift beam) are added on demand and disposed with the figure.
const SentinelMesh=(()=>{
const lin=h=>new THREE.Color(h).convertSRGBToLinear();
const G={};let ENV=null;
const hash=s=>{let h=2166136261;for(const c of String(s)){h=Math.imul(h^c.charCodeAt(0),16777619)}return (h>>>0)/4294967296};
// Unit cube with chamfered edges. A taper narrows the bottom face, for V-shaped plates.
function chamfer(c,taper){
  const P=(sx,sy,sz,ax)=>{const v=[sx*(ax===0?.5:.5-c),sy*(ax===1?.5:.5-c),sz*(ax===2?.5:.5-c)];if(taper&&sy<0){v[0]*=taper;v[2]*=.82}return v};
  const tri=[],quad=(a,b,c2,d)=>tri.push(a,b,c2,a,c2,d),S=[-1,1];
  for(const s of S){quad(P(s,-1,-1,0),P(s,1,-1,0),P(s,1,1,0),P(s,-1,1,0));quad(P(-1,s,-1,1),P(1,s,-1,1),P(1,s,1,1),P(-1,s,1,1));quad(P(-1,-1,s,2),P(1,-1,s,2),P(1,1,s,2),P(-1,1,s,2))}
  for(const a of S)for(const b of S){quad(P(a,b,-1,0),P(a,b,1,0),P(a,b,1,1),P(a,b,-1,1));quad(P(a,-1,b,0),P(a,1,b,0),P(a,1,b,2),P(a,-1,b,2));quad(P(-1,a,b,1),P(1,a,b,1),P(1,a,b,2),P(-1,a,b,2))}
  for(const x of S)for(const y of S)for(const z of S)tri.push(P(x,y,z,0),P(x,y,z,1),P(x,y,z,2));
  const pos=[];
  for(let i=0;i<tri.length;i+=3){const a=tri[i];let b=tri[i+1],d=tri[i+2];
    const u=[b[0]-a[0],b[1]-a[1],b[2]-a[2]],v=[d[0]-a[0],d[1]-a[1],d[2]-a[2]],n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
    if(n[0]*(a[0]+b[0]+d[0])+n[1]*(a[1]+b[1]+d[1])+n[2]*(a[2]+b[2]+d[2])<0)[b,d]=[d,b];
    pos.push(...a,...b,...d)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.computeVertexNormals();return g;
}
// Compass ring under each Sentinel: a lit band, 36 ticks and four cardinal chevrons, laid flat.
function ringGeometry(){
  const p=[],seg=64,band=(r0,r1,a0,a1)=>{const c0=Math.cos(a0),s0=Math.sin(a0),c1=Math.cos(a1),s1=Math.sin(a1);p.push(r0*c0,r0*s0,0,r1*c0,r1*s0,0,r1*c1,r1*s1,0,r0*c0,r0*s0,0,r1*c1,r1*s1,0,r0*c1,r0*s1,0)};
  for(let i=0;i<seg;i++)band(.9,.96,i/seg*Math.PI*2,(i+1)/seg*Math.PI*2);
  for(let i=0;i<36;i++){const a=i/36*Math.PI*2;band(1.02,i%9===0?1.2:1.09,a-.012,a+.012)}
  for(let i=0;i<4;i++){const a=i*Math.PI/2+Math.PI/4;p.push(1.26*Math.cos(a),1.26*Math.sin(a),0,1.36*Math.cos(a-.05),1.36*Math.sin(a-.05),0,1.36*Math.cos(a+.05),1.36*Math.sin(a+.05),0)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.rotateX(-Math.PI/2);return g;
}
function shared(){
  if(G.box)return G;
  G.box=new THREE.BoxGeometry(1,1,1).toNonIndexed();G.bevel=chamfer(.14);G.taper=chamfer(.14,.72);G.ring=ringGeometry();
  G.slate=new THREE.PlaneGeometry(1,.62);G.orb=new THREE.SphereGeometry(.07,8,6);G.beam=new THREE.CylinderGeometry(.12,.12,1,8,1,true);G.link=new THREE.CylinderGeometry(.05,.05,1,5,1,true);
  G.set=new Set([G.box,G.bevel,G.taper,G.ring,G.slate,G.orb,G.beam,G.link]);
  return G;
}
// Image-based light for the metals: a dusk gradient dome with soft boxes, prefiltered once per renderer.
function environment(renderer){
  if(ENV||!renderer||!THREE.PMREMGenerator)return ENV;
  try{
    const pm=new THREE.PMREMGenerator(renderer),s=new THREE.Scene(),g=new THREE.SphereGeometry(10,32,16),c=[],p=g.attributes.position;
    const top=new THREE.Color('#1C2747'),mid=new THREE.Color('#5A4430'),bot=new THREE.Color('#05070F');
    for(let i=0;i<p.count;i++){const y=p.getY(i)/10,col=y>0?mid.clone().lerp(top,Math.min(1,y*1.7)):mid.clone().lerp(bot,Math.min(1,-y*3));c.push(col.r,col.g,col.b)}
    g.setAttribute('color',new THREE.Float32BufferAttribute(c,3));s.add(new THREE.Mesh(g,new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.BackSide})));
    const soft=(w,h,x,y,z,col)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:col,side:THREE.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);s.add(m)};
    soft(6,3,5,6,6,new THREE.Color(2.4,2.3,2.1));soft(3,8,-7,2,-3,new THREE.Color(.6,.8,1.3));soft(10,.6,0,-1,8,new THREE.Color(1.2,1,.8));
    ENV=pm.fromScene(s,.04).texture;pm.dispose();s.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)o.material.dispose()});
  }catch(e){ENV=null}
  return ENV;
}
// Fresnel rim: a thin edge light in the accent color so plates separate from the background at any distance.
function rim(m,color,gain){
  const prev=m.onBeforeCompile;
  m.onBeforeCompile=s=>{if(prev)prev(s);s.uniforms.uRim={value:color};s.uniforms.uRimGain=gain;
    s.fragmentShader='uniform vec3 uRim;uniform float uRimGain;\n'+s.fragmentShader.replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\n\t{vec3 vd=normalize(vViewPosition);float fr=pow(1.0-max(dot(normal,vd),0.0),3.2);totalEmissiveRadiance+=uRim*fr*uRimGain;}')};
  return m;
}
// Vertex-colored standard material; accent vertices add their own color as emission, scaled by a pulsing uniform.
function glowMaterial(glow,rimColor,rimGain){
  const m=new THREE.MeshStandardMaterial({vertexColors:true,roughness:.42,metalness:ENV?.66:.42,envMap:ENV,envMapIntensity:1});
  m.onBeforeCompile=s=>{s.uniforms.glowGain=glow;
    s.vertexShader='attribute float glow;\nvarying float vGlow;\n'+s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n\tvGlow=glow;');
    s.fragmentShader='uniform float glowGain;\nvarying float vGlow;\n'+s.fragmentShader.replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\n\ttotalEmissiveRadiance+=vColor*vGlow*glowGain;')};
  rim(m,rimColor,rimGain);m.customProgramCacheKey=()=>'sentinel-glow';return m;
}
const _m=new THREE.Matrix4(),_q=new THREE.Quaternion(),_e=new THREE.Euler(),_s=new THREE.Vector3(),_p=new THREE.Vector3(),_n=new THREE.Matrix3(),_v=new THREE.Vector3();
function put(t,geo,q,col,glow,shade){
  _m.compose(_p.set(q.x,q.y,q.z),_q.setFromEuler(_e.set(q.rx||0,0,q.rz||0)),_s.set(q.w,q.h,q.d));_n.getNormalMatrix(_m);
  const P=geo.attributes.position,N=geo.attributes.normal;
  for(let i=0;i<P.count;i++){_v.fromBufferAttribute(P,i).applyMatrix4(_m);t.pos.push(_v.x,_v.y,_v.z);_v.fromBufferAttribute(N,i).applyMatrix3(_n).normalize();t.nrm.push(_v.x,_v.y,_v.z);t.col.push(col.r*shade,col.g*shade,col.b*shade);t.glow.push(glow)}
}
function geometryOf(t){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(t.pos,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(t.nrm,3));g.setAttribute('color',new THREE.Float32BufferAttribute(t.col,3));g.setAttribute('glow',new THREE.Float32BufferAttribute(t.glow,1));g.computeBoundingSphere();return g}
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
function makeSentinel(a){
  const g=shared(),f=Identity.form(a.form||'agent'),pal=Identity.palette(a.palette||['#111827',a.color||'#C97B54','#E6E9F2'],f),level=a.level|0;
  const owner=a.ownerColor&&Identity.HEX.test(a.ownerColor)?a.ownerColor:null,bp=Identity.blueprint(f,{owner:!!owner,level}),tone=Identity.tones(pal,owner).map(lin);
  const grp=new THREE.Group(),glow={value:1},rimGain={value:.3},torso=new Map(),slots={},white=new THREE.Color(1,1,1),seed=hash(a.id||f);
  // Each plate gets its own shade (0.86 to 1.08) so neighboring panels read as separate pieces of metal.
  bp.parts.forEach((q,i)=>{
    const geo=q.shape==='box'||Math.min(q.w,q.h,q.d)<.09?g.box:g[q.shape],shade=q.k===2||q.k===3?1:.86+.22*hash(seed+i),lit=q.k===2?1:q.k===3?.6:q.k===6?.08:0;
    if(q.slot==='torso'){const k=q.k===4||q.k===6?0:q.k;if(!torso.has(k))torso.set(k,{pos:[],nrm:[],col:[],glow:[]});put(torso.get(k),geo,q,white,lit,q.k===4||q.k===6?shade*.4:shade)}
    else{if(!slots[q.slot])slots[q.slot]={pos:[],nrm:[],col:[],glow:[]};put(slots[q.slot],geo,q,tone[q.k],lit,shade)}
  });
  const env=ENV?{envMap:ENV,envMapIntensity:1}:{};
  const MAT={0:()=>new THREE.MeshStandardMaterial({color:tone[0],vertexColors:true,roughness:.52,metalness:ENV?.6:.4,...env}),1:()=>new THREE.MeshStandardMaterial({color:tone[1],vertexColors:true,roughness:.3,metalness:ENV?.85:.45,...env}),2:()=>new THREE.MeshStandardMaterial({color:tone[2],vertexColors:true,emissive:tone[2],emissiveIntensity:.9,roughness:.4,metalness:.2}),5:()=>new THREE.MeshStandardMaterial({color:tone[5],vertexColors:true,roughness:.75,metalness:.05,...env})};
  let accent=null;
  [...torso.keys()].sort().forEach(k=>{const mesh=new THREE.Mesh(geometryOf(torso.get(k)),rim(MAT[k](),tone[2],rimGain));if(k===2)accent=mesh.material;grp.add(mesh)});
  const joint=name=>{const j=new THREE.Group();j.position.fromArray(bp.pivots[name]);if(slots[name])j.add(new THREE.Mesh(geometryOf(slots[name]),glowMaterial(glow,tone[2],rimGain)));grp.add(j);return j};
  const head=joint('head'),arms=[joint('armL'),joint('armR')],legs=[joint('legL'),joint('legR')];
  const t=bp.terminal,plate=new THREE.Mesh(new THREE.PlaneGeometry(t.w,t.h),new THREE.MeshBasicMaterial({map:terminal(a,f,pal)}));plate.position.set(t.x,t.y,t.z);grp.add(plate);
  const ring=new THREE.Mesh(g.ring,new THREE.MeshBasicMaterial({color:tone[2],transparent:true,opacity:.65,side:THREE.DoubleSide,fog:false,depthWrite:false}));ring.position.y=.06;grp.add(ring);
  return {grp,ring,legs,arms,head,plate,glow,rimGain,accent,tone,props:{},status:'idle',emote:null,emoteT:0,phase:(parseInt(Identity.badge(a.id||f),36)%628)/100,pos:new THREE.Vector3(),from:new THREE.Vector3(),to:new THREE.Vector3(),t0:-1,noteId:-1,signature:JSON.stringify([f,pal,a.symbol,a.ownerColor,a.ownerBadge,level])};
}
// ---- props, created the first time a status needs them
function prop(m,name){
  if(m.props[name])return m.props[name];const g=shared(),c=m.tone[2];let o;
  if(name==='slate'){o=new THREE.Mesh(g.slate,new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.35,side:THREE.DoubleSide,depthWrite:false,fog:false}));const edge=new THREE.Mesh(g.slate,new THREE.MeshBasicMaterial({color:c,wireframe:true,transparent:true,opacity:.9,fog:false}));edge.scale.set(1.02,1.02,1);o.add(edge);o.scale.setScalar(1.1)}
  else if(name==='orbs'){o=new THREE.Group();for(let i=0;i<3;i++){const s=new THREE.Mesh(g.orb,new THREE.MeshBasicMaterial({color:c,fog:false}));s.scale.setScalar(.7+i*.25);o.add(s)}}
  else if(name==='beam'){o=new THREE.Mesh(g.beam,new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.35,side:THREE.DoubleSide,depthWrite:false,fog:false}))}
  else if(name==='link'){o=new THREE.Mesh(g.link,new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.55,side:THREE.DoubleSide,depthWrite:false,fog:false}))}
  m.props[name]=o;m.grp.add(o);return o;
}
function hideProps(m,keep){for(const k in m.props)m.props[k].visible=k===keep||(Array.isArray(keep)&&keep.includes(k))}
const BUSY={working:1,writing:1,reading:1,thinking:1,reviewing:1,'in use':1};
// One pose function for the city and the gallery. status: walking | lifting | working | writing | reading | thinking | reviewing | blocked | idle | viewing | 'in use'.
// m.emote: 'celebrate' | 'greet' | 'nod' for a few seconds over the status. m.face: yaw of a partner to look toward, or null.
function pose(m,t,status,opt={}){
  status=typeof status==='boolean'?(status?'walking':m.status||'idle'):(status||m.status||'idle');
  const ph=m.phase,moving=status==='walking',breathe=Math.sin(t*1.7+ph),L=m.legs,A=m.arms,H=m.head;
  const stride=moving?Math.sin(t*7.5+ph):0;
  // base: breathing figure
  L[0].rotation.x=stride*.42;L[1].rotation.x=-stride*.42;L[0].rotation.z=L[1].rotation.z=0;
  A.forEach((arm,i)=>{const s=i?1:-1;arm.rotation.set(-s*stride*.36+(moving?0:breathe*.025),0,s*(.05+(moving?0:breathe*.012)))});
  H.rotation.set(moving?.05:Math.sin(t*.31+ph*2)*.05,moving?Math.sin(t*3.75+ph)*.05:Math.sin(t*.42+ph)*.42*Math.max(0,Math.sin(t*.13+ph*3)),0);
  let bob=moving?Math.abs(Math.cos(t*7.5+ph))*.07:breathe*.02,keep=null,glowK=.85+.3*(.5+.5*Math.sin(t*2.6+ph)),rimK=.3;
  if(status==='lifting'){A[0].rotation.x=A[1].rotation.x=-.25;A[0].rotation.z=-.3;A[1].rotation.z=.3;H.rotation.x=-.35;const b=prop(m,'beam');keep='beam';b.visible=true;b.scale.set(1.6,opt.beam||1,1.6);b.position.y=(opt.beam||1)/2-m.grp.position.y+(opt.beamBase||0);b.material.opacity=.18+.12*Math.sin(t*9);bob=0}
  else if(status==='working'||status==='in use'){const tap=Math.sin(t*9+ph);A[0].rotation.set(-1.15+tap*.08,0,-.28);A[1].rotation.set(-1.15-tap*.08,0,.28);H.rotation.set(.22,Math.sin(t*1.3+ph)*.08,0);const s=prop(m,'slate');keep='slate';s.position.set(0,3.95,1.05);s.rotation.set(-.35,0,0);s.material.opacity=.3+.1*Math.sin(t*5+ph)}
  else if(status==='writing'){const w=Math.sin(t*11+ph);A[0].rotation.set(-1.05,0,-.35);A[1].rotation.set(-1.3+w*.05,0,.55+w*.08);H.rotation.set(.3,-.15,0);const s=prop(m,'slate');keep='slate';s.position.set(-.35,3.65,.95);s.rotation.set(-.9,.2,.1);s.scale.setScalar(.85);s.material.opacity=.32}
  else if(status==='reading'){A[0].rotation.set(-1.6,0,-.15);A[1].rotation.set(-1.6,0,.15);H.rotation.set(.38,Math.sin(t*.9+ph)*.12,0);const s=prop(m,'slate');keep='slate';s.position.set(0,4.45,.95);s.rotation.set(-.55,0,0);s.scale.setScalar(1);s.material.opacity=.28+.06*Math.sin(t*2+ph)}
  else if(status==='thinking'){A[1].rotation.set(-2.1,0,.45);A[0].rotation.set(-.15,0,-.1);H.rotation.set(-.08,Math.sin(t*.6+ph)*.3,.1);const o=prop(m,'orbs');keep='orbs';o.children.forEach((s,i)=>{const a=t*(1.2+i*.3)+i*2.1+ph;s.position.set(Math.cos(a)*.55,5.9+Math.sin(a*1.7)*.14+i*.12,Math.sin(a)*.55)});bob+=.01*Math.sin(t*2)}
  else if(status==='reviewing'){A[0].rotation.set(-1.25,0,-.95);A[1].rotation.set(-1.4,0,.95);H.rotation.set(.1,Math.sin(t*1.1+ph)*.4,0);rimK=.45}
  else if(status==='blocked'){A[0].rotation.set(.1,0,-.06);A[1].rotation.set(.1,0,.06);H.rotation.set(.42,0,.08);glowK=.35+.25*Math.max(0,Math.sin(t*1.4+ph));rimK=.12;bob=-.03}
  if(m.emote){const k=Math.min(1,(t-m.emoteT)/.3),e=t-m.emoteT;
    if(m.emote==='celebrate'){A[0].rotation.set(-2.6*k,0,-.5);A[1].rotation.set(-2.6*k,0,.5);H.rotation.x=-.3*k;bob+=Math.abs(Math.sin(e*6))*.35*k;glowK=1.6;rimK=.6;if(e>3)m.emote=null}
    else if(m.emote==='greet'){A[1].rotation.set(-2.3*k,0,.35+Math.sin(e*7)*.25*k);if(e>1.6)m.emote=null}
    else if(m.emote==='nod'){H.rotation.x+=Math.sin(e*8)*.18*k;if(e>1.2)m.emote=null}
    else m.emote=null}
  if(m.face!=null&&!moving){const d=((m.face-m.grp.rotation.y+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;H.rotation.y+=Math.max(-.9,Math.min(.9,d))*.8}
  hideProps(m,keep);
  m.grp.position.y=m.pos.y+bob;
  m.ring.rotation.y=t*.3;m.ring.material.opacity=(status==='blocked'?.3:.5)+.18*Math.sin(t*2+ph);
  m.glow.value=glowK;m.rimGain.value=rimK;if(m.accent)m.accent.emissiveIntensity=.9*glowK;
  m.status=status;
}
function emote(m,name,t){m.emote=name;m.emoteT=t}
function dispose(grp){const g=shared();grp.traverse(o=>{if(o.material){if(o.material.map)o.material.map.dispose();o.material.dispose()}if(o.geometry&&!g.set.has(o.geometry))o.geometry.dispose()})}
return {create:makeSentinel,dispose,pose,emote,prop,environment,BUSY};
})();
