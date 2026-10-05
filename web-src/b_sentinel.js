// Shared mesh factory used by the live city and the reference gallery.
const SentinelMesh=(()=>{
const lin=h=>new THREE.Color(h).convertSRGBToLinear();
let sentinelBox=null;
function makeSentinel(a){
  if(!sentinelBox)sentinelBox=new THREE.BoxGeometry(1,1,1);
  const f=Identity.form(a.form||'agent'),pal=Identity.palette(a.palette||['#111827',a.color||'#C97B54','#E6E9F2'],f),grp=new THREE.Group();
  const mats=pal.map(c=>new THREE.MeshStandardMaterial({color:lin(c),roughness:.65,metalness:.35}));
  const part=(w,h,d,x,y,z,k=0,parent=grp)=>{const o=new THREE.Mesh(sentinelBox,mats[k].clone());o.scale.set(w,h,d);o.position.set(x,y,z);parent.add(o);return o};
  const broad=f==='jr'?1.18:f==='ahmad'?1.1:1;
  part(1.6*broad,2.1,.85,0,3.6,0);part(1.45*broad,1.05,.96,0,3.9,.04,1);part(1.1,.35,.9,0,2.4,0,1);
  part(.92,.85,.8,0,5.2,0,1);part(.73,.58,.05,0,5.28,.43,0);for(const x of [-.24,-.08,.08,.24])part(.045,.48,.04,x,5.28,.47,2);part(.12,.6,.62,-.53,5.2,0,0);part(.12,.6,.62,.53,5.2,0,0);
  const legs=[];for(const side of [-1,1]){const leg=new THREE.Group();leg.position.set(side*.46,2.2,0);grp.add(leg);part(.58,1.7,.58,0,-.82,0,0,leg);part(.68,.35,.96,0,-1.75,.16,1,leg);legs.push(leg);const arm=part(.5,1.6,.6,side*1.13*broad,3.2,0);arm.rotation.z=side*.08;part(.62,.74,.72,side*1.16*broad,2.7,.03,1);part(.42,.34,.5,side*1.18*broad,2.13,0);for(let finger=0;finger<3;finger++)part(.07,.24,.18,side*1.18*broad+(finger-1)*.12,1.93,.2,0);part(.55,.22,.66,side*1.13*broad,2.85,0,2)}
  for(const side of [-1,1]){const shoulder=part(.68,.56,.93,side*1.1*broad,4.55,0,1);if(f==='kenza'){shoulder.rotation.z=side*.5;shoulder.scale.y=1.25}if(f==='devon')part(.26,1.3,.48,side*1.17,4.8,-.18,1);if(f==='ahmad')part(.8,.8,.98,side*1.1,4.4,0,1)}
  if(f==='jr'){for(let layer=0;layer<4;layer++){const plate=part(1.15-layer*.14,.14,1.15-layer*.08,-1.23+layer*.045,4.85+layer*.22,0,1);plate.rotation.z=-.15;}part(.42,1.3,.16,-.45,2.05,.48,1).rotation.z=-.12;part(.42,1.3,.16,.45,2.05,.48,1).rotation.z=.12;}
  if(f==='kenza'){for(const side of [-1,1])part(.57,1,.18,side*.63,2,.47,1).rotation.z=-side*.2;}
  if(f==='member'){part(.16,1.8,.08,-.62,3.65,.51,1);part(.16,1.8,.08,.62,3.65,.51,1)}
  if(f==='devon')part(1.7,.3,.35,0,4.4,-.7,1);
  if(f==='ahmad'){part(1.14,.18,.08,0,3.65,.56,2);part(1.14,.18,.08,0,4.13,.56,2)}
  for(const x of [-.54,-.35,.35,.54])part(.055,.86,.06,x,3.9,.56,0);
  for(const side of [-1,1]){part(.18,1.7,.14,side*.82,3.5,.42,1);part(.12,.13,.16,side*.66,4.57,.5,2)}
  const canvas=document.createElement('canvas');canvas.width=256;canvas.height=128;const ctx=canvas.getContext('2d');ctx.fillStyle=pal[0];ctx.fillRect(0,0,256,128);ctx.fillStyle=pal[2];ctx.textAlign='center';ctx.font='bold 46px monospace';ctx.fillText(String(a.symbol||Identity.FORMS[f].symbol).slice(0,8),128,53);ctx.font='23px monospace';ctx.fillText(a.ownerBadge||Identity.badge(a.id),128,99);
  const tex=new THREE.CanvasTexture(canvas),plate=new THREE.Mesh(new THREE.PlaneGeometry(.7,.38),new THREE.MeshBasicMaterial({map:tex}));plate.position.set(0,3.9,.59);grp.add(plate);
  if(a.ownerColor&&Identity.HEX.test(a.ownerColor))part(.64,.3,.7,1.13*broad,3.17,0,0).material.color.copy(lin(a.ownerColor));
  const ring=new THREE.Mesh(new THREE.RingGeometry(.86,1,24),new THREE.MeshBasicMaterial({color:lin(pal[2]),transparent:true,opacity:.65,side:THREE.DoubleSide,fog:false}));ring.rotation.x=-Math.PI/2;ring.position.y=.1;grp.add(ring);
  const rigid=grp.children.filter(o=>o.isMesh&&o.geometry===sentinelBox);
  const buckets=new Map();grp.updateMatrixWorld(true);
  rigid.forEach(o=>{const key=o.material.color.getHex();if(!buckets.has(key))buckets.set(key,{material:o.material.clone(),positions:[],normals:[]});const bucket=buckets.get(key),g=sentinelBox.toNonIndexed(),normalMatrix=new THREE.Matrix3().getNormalMatrix(o.matrix);for(let i=0;i<g.attributes.position.count;i++){const v=new THREE.Vector3().fromBufferAttribute(g.attributes.position,i).applyMatrix4(o.matrix),n=new THREE.Vector3().fromBufferAttribute(g.attributes.normal,i).applyMatrix3(normalMatrix).normalize();bucket.positions.push(v.x,v.y,v.z);bucket.normals.push(n.x,n.y,n.z)}g.dispose();o.material.dispose();grp.remove(o)});
  buckets.forEach(b=>{const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(b.positions,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(b.normals,3));grp.add(new THREE.Mesh(g,b.material))});mats.forEach(m=>m.dispose());
  return {grp,ring,legs,pos:new THREE.Vector3(),from:new THREE.Vector3(),to:new THREE.Vector3(),t0:-1,noteId:-1,signature:JSON.stringify([f,pal,a.symbol,a.ownerColor,a.ownerBadge])};
}
function dispose(grp){grp.traverse(o=>{if(o.material){if(o.material.map)o.material.map.dispose();o.material.dispose()}if(o.geometry&&o.geometry!==sentinelBox)o.geometry.dispose()})}
return {create:makeSentinel,dispose};
})();
