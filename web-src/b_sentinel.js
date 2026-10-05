// Shared mesh factory used by the live city and the reference gallery.
// Geometry comes from Identity.blueprint. Torso armor is merged into one mesh per palette color;
// head, arms and legs are one vertex-colored mesh each, so a Sentinel costs at most 11 draw calls.
const SentinelMesh=(()=>{
const lin=h=>new THREE.Color(h).convertSRGBToLinear();
const G={};let ENV=null;
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
  G.box=new THREE.BoxGeometry(1,1,1).toNonIndexed();G.bevel=chamfer(.14);G.taper=chamfer(.14,.72);G.ring=ringGeometry();G.set=new Set([G.box,G.bevel,G.taper,G.ring]);
  return G;
}
// Image-based light for the metals: a dusk gradient dome with two soft boxes, prefiltered once per renderer.
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
// Vertex-colored standard material; accent vertices add their own color as emission, scaled by a pulsing uniform.
function glowMaterial(glow){
  const m=new THREE.MeshStandardMaterial({vertexColors:true,roughness:.4,metalness:ENV?.66:.42,envMap:ENV,envMapIntensity:1});
  m.onBeforeCompile=s=>{s.uniforms.glowGain=glow;
    s.vertexShader='attribute float glow;\nvarying float vGlow;\n'+s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n\tvGlow=glow;');
    s.fragmentShader='uniform float glowGain;\nvarying float vGlow;\n'+s.fragmentShader.replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\n\ttotalEmissiveRadiance+=vColor*vGlow*glowGain;')};
  m.customProgramCacheKey=()=>'sentinel-glow';return m;
}
const _m=new THREE.Matrix4(),_q=new THREE.Quaternion(),_e=new THREE.Euler(),_s=new THREE.Vector3(),_p=new THREE.Vector3(),_n=new THREE.Matrix3(),_v=new THREE.Vector3();
function put(t,geo,q,col,glow){
  _m.compose(_p.set(q.x,q.y,q.z),_q.setFromEuler(_e.set(q.rx||0,0,q.rz||0)),_s.set(q.w,q.h,q.d));_n.getNormalMatrix(_m);
  const P=geo.attributes.position,N=geo.attributes.normal;
  for(let i=0;i<P.count;i++){_v.fromBufferAttribute(P,i).applyMatrix4(_m);t.pos.push(_v.x,_v.y,_v.z);_v.fromBufferAttribute(N,i).applyMatrix3(_n).normalize();t.nrm.push(_v.x,_v.y,_v.z);if(t.col){t.col.push(col.r,col.g,col.b);t.glow.push(glow)}}
}
function geometryOf(t){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(t.pos,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(t.nrm,3));if(t.col){g.setAttribute('color',new THREE.Float32BufferAttribute(t.col,3));g.setAttribute('glow',new THREE.Float32BufferAttribute(t.glow,1))}g.computeBoundingSphere();return g}
function terminal(a,f,pal){
  const canvas=document.createElement('canvas');canvas.width=256;canvas.height=180;const ctx=canvas.getContext('2d');
  ctx.fillStyle=pal[0];ctx.fillRect(0,0,256,180);ctx.fillStyle=pal[2];
  for(const [x,y,w,h] of [[8,8,240,4],[8,168,240,4],[8,8,4,164],[244,8,4,164],[20,128,216,2]])ctx.fillRect(x,y,w,h);
  for(let i=0;i<4;i++)ctx.fillRect(22+i*9,30-i*5,5,10+i*5);
  ctx.textAlign='center';ctx.font='bold 66px monospace';ctx.fillText(String(a.symbol||Identity.FORMS[f].symbol).slice(0,8),128,108);
  ctx.font='26px monospace';ctx.fillText(a.ownerBadge||Identity.badge(a.id),128,158);
  const tex=new THREE.CanvasTexture(canvas);tex.encoding=THREE.sRGBEncoding;return tex;
}
function makeSentinel(a){
  const g=shared(),f=Identity.form(a.form||'agent'),pal=Identity.palette(a.palette||['#111827',a.color||'#C97B54','#E6E9F2'],f);
  const owner=a.ownerColor&&Identity.HEX.test(a.ownerColor)?a.ownerColor:null,bp=Identity.blueprint(f,{owner:!!owner}),tone=Identity.tones(pal,owner).map(lin);
  const grp=new THREE.Group(),glow={value:1},torso=new Map(),slots={};
  bp.parts.forEach(q=>{
    const geo=q.shape==='box'||Math.min(q.w,q.h,q.d)<.09?g.box:g[q.shape];
    if(q.slot==='torso'){const k=q.k===4||q.k===6?0:q.k;if(!torso.has(k))torso.set(k,{pos:[],nrm:[]});put(torso.get(k),geo,q)}
    else{if(!slots[q.slot])slots[q.slot]={pos:[],nrm:[],col:[],glow:[]};put(slots[q.slot],geo,q,tone[q.k],q.k===2?1:q.k===3?.6:q.k===6?.08:0)}
  });
  const env=ENV?{envMap:ENV,envMapIntensity:1}:{};
  const MAT={0:()=>new THREE.MeshStandardMaterial({color:tone[0],roughness:.5,metalness:ENV?.6:.4,...env}),1:()=>new THREE.MeshStandardMaterial({color:tone[1],roughness:.32,metalness:ENV?.85:.45,...env}),2:()=>new THREE.MeshStandardMaterial({color:tone[2],emissive:tone[2],emissiveIntensity:.9,roughness:.4,metalness:.2}),5:()=>new THREE.MeshStandardMaterial({color:tone[5],roughness:.75,metalness:.05,...env})};
  let accent=null;
  [...torso.keys()].sort().forEach(k=>{const mesh=new THREE.Mesh(geometryOf(torso.get(k)),MAT[k]());if(k===2)accent=mesh.material;grp.add(mesh)});
  const joint=name=>{const j=new THREE.Group();j.position.fromArray(bp.pivots[name]);if(slots[name])j.add(new THREE.Mesh(geometryOf(slots[name]),glowMaterial(glow)));grp.add(j);return j};
  const head=joint('head'),arms=[joint('armL'),joint('armR')],legs=[joint('legL'),joint('legR')];
  const t=bp.terminal,plate=new THREE.Mesh(new THREE.PlaneGeometry(t.w,t.h),new THREE.MeshBasicMaterial({map:terminal(a,f,pal)}));plate.position.set(t.x,t.y,t.z);grp.add(plate);
  const ring=new THREE.Mesh(g.ring,new THREE.MeshBasicMaterial({color:tone[2],transparent:true,opacity:.65,side:THREE.DoubleSide,fog:false,depthWrite:false}));ring.position.y=.06;grp.add(ring);
  return {grp,ring,legs,arms,head,plate,glow,accent,phase:(parseInt(Identity.badge(a.id||f),36)%628)/100,pos:new THREE.Vector3(),from:new THREE.Vector3(),to:new THREE.Vector3(),t0:-1,noteId:-1,signature:JSON.stringify([f,pal,a.symbol,a.ownerColor,a.ownerBadge])};
}
// One pose function for the city and the gallery: stride when moving; breathing, a slow visor scan and a glow pulse at rest.
function pose(m,t,moving){
  const ph=m.phase,stride=moving?Math.sin(t*7.5+ph):0,breathe=Math.sin(t*1.7+ph);
  m.legs[0].rotation.x=stride*.42;m.legs[1].rotation.x=-stride*.42;
  m.arms.forEach((arm,i)=>{const s=i?1:-1;arm.rotation.x=-s*stride*.36+(moving?0:breathe*.025);arm.rotation.z=s*(.05+(moving?0:breathe*.012))});
  m.head.rotation.y=moving?Math.sin(t*3.75+ph)*.05:Math.sin(t*.42+ph)*.42*Math.max(0,Math.sin(t*.13+ph*3));
  m.head.rotation.x=moving?.05:Math.sin(t*.31+ph*2)*.05;
  m.grp.position.y=m.pos.y+(moving?Math.abs(Math.cos(t*7.5+ph))*.07:breathe*.02);
  m.ring.rotation.y=t*.3;m.ring.material.opacity=.5+.18*Math.sin(t*2+ph);
  const k=.85+.3*(.5+.5*Math.sin(t*2.6+ph));m.glow.value=k;if(m.accent)m.accent.emissiveIntensity=.9*k;
}
function dispose(grp){const g=shared();grp.traverse(o=>{if(o.material){if(o.material.map)o.material.map.dispose();o.material.dispose()}if(o.geometry&&!g.set.has(o.geometry))o.geometry.dispose()})}
return {create:makeSentinel,dispose,pose,environment};
})();
