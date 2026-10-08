import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';

// Canvas pixels are verified by browser evidence; geometry and resource ownership
// can be checked without a GPU or any live-vault writes.
const context2d=new Proxy({}, {get:()=>()=>{},set:()=>true});
const context=vm.createContext({document:{createElement:()=>({getContext:()=>context2d})}});
vm.runInContext(fs.readFileSync('web-src/b_landscape.js','utf8')+'\nthis.landscape=VaultLandscape;',context);
const landscape=context.landscape;
const facadeContext=vm.createContext({THREE});
vm.runInContext(fs.readFileSync('web-src/b_buildings.js','utf8')+'\nthis.facades=Facades;',facadeContext);
const facades=facadeContext.facades;
const terrainContext=vm.createContext({});
vm.runInContext(fs.readFileSync('web-src/b_terrain.js','utf8')+'\nthis.terrain=VaultTerrain;',terrainContext);
const terrain=terrainContext.terrain;
const fixtures={THREE,districts:[{x:-100,z:-100,w:200,d:200}],side:240,
 buildings:[{cx:0,cz:0,fw:12,fd:12}],
 trees:[{x:0,z:0,k:.2},{x:7,z:0,k:.3},{x:18,z:18,k:.4},{x:-18,z:18,k:.8},{x:NaN,z:1}]};

test('garden geometry preserves building access, finite transforms and eight citywide batches',()=>{
 for(const high of [true,false]){
  const g=landscape.build({...fixtures,high});
  assert.equal(g.userData.landscape.counts.trees,2,'building pad and invalid anchors are excluded');
  assert.ok(g.children.length<=8);
  assert.equal(g.userData.landscape.counts.drawCalls,g.children.length);
  for(const mesh of g.children){
   const positions=mesh.geometry.attributes.position.array;
   assert.ok([...positions].every(Number.isFinite),mesh.name+' finite vertices');
   assert.ok([...mesh.instanceMatrix.array].every(Number.isFinite),mesh.name+' finite transforms');
   assert.ok([...mesh.instanceColor.array].every(Number.isFinite),mesh.name+' finite colors');
   assert.equal(mesh.castShadow,high&&/trunks|sprays|stones/.test(mesh.name));
   for(let i=0;i<mesh.count;i++){
    const m=new THREE.Matrix4();mesh.getMatrixAt(i,m);
    assert.ok(Math.abs(m.elements[12])>=8.2||Math.abs(m.elements[14])>=8.2,mesh.name+' preserves entrance margin');
   }
  }
  landscape.dispose(g);
 }
});

test('landscape tiers remain bounded under dense input and deterministic across rebuilds',()=>{
 const trees=Array.from({length:2400},(_,i)=>({x:18+(i%30)*.1,z:18+Math.floor(i/30)*.1,k:(i%10)/10}));
 for(const high of [true,false]){
  const a=landscape.build({...fixtures,trees,high}),b=landscape.build({...fixtures,trees,high});
  assert.equal(a.userData.landscape.counts.trees,high?2200:700);
  assert.ok(a.userData.landscape.counts.grass<=(high?14000:4300));
  assert.equal(a.children.length,b.children.length);
  a.children.forEach((m,i)=>assert.deepEqual(m.instanceMatrix.array,b.children[i].instanceMatrix.array));
  landscape.dispose(a);landscape.dispose(b);
 }
});

test('reduced motion is stationary and rebuild disposal releases resources exactly once',()=>{
 for(const trees of [fixtures.trees,[]]){
  const g=landscape.build({...fixtures,trees,reducedMotion:true}),parent=new THREE.Group();parent.add(g);
  const data=g.userData.landscape,resources=[...data.materials,...data.textures,...data.geometries];
  const disposed=new Map(resources.map(r=>[r,0]));resources.forEach(r=>r.addEventListener('dispose',()=>disposed.set(r,disposed.get(r)+1)));
  landscape.update(g,19);assert.equal(data.clock.value,0);
  data.reducedMotion=false;landscape.update(g,25);assert.equal(data.clock.value,25);
  landscape.dispose(g);landscape.dispose(g);
  assert.equal(g.parent,null);assert.equal(g.userData.landscape,undefined);
  resources.forEach(r=>assert.equal(disposed.get(r),1));
 }
});

test('all planting layers follow terrain height and understory anchors do not create hidden trees',()=>{
 const flat=landscape.build(fixtures),raised=landscape.build({...fixtures,heightAt:()=>5});
 assert.deepEqual(flat.children.map(m=>m.name),raised.children.map(m=>m.name));
 flat.children.forEach((mesh,j)=>{
  const a=new THREE.Matrix4(),b=new THREE.Matrix4();
  for(let i=0;i<mesh.count;i++){
   mesh.getMatrixAt(i,a);raised.children[j].getMatrixAt(i,b);
   assert.ok(Math.abs(b.elements[13]-a.elements[13]-5)<1e-5,mesh.name+' follows terrain');
  }
 });
 const low=landscape.build({...fixtures,trees:[{x:18,z:18,k:.4,understoryOnly:true}],heightAt:()=>NaN});
 assert.equal(low.userData.landscape.counts.trees,0);
 assert.equal(low.getObjectByName('Branching hardwood trunks'),undefined);
 assert.equal(low.getObjectByName('Layered leaf sprays'),undefined);
 assert.ok(low.children.length>0,'understory still plants the boundary');
 low.children.forEach(mesh=>assert.ok([...mesh.instanceMatrix.array].every(Number.isFinite)));
 for(const g of [flat,raised,low])landscape.dispose(g);
});

test('terrain protects city foundations, central avenues and a twelve-meter waterfront promenade',()=>{
 const world={W:300,H:260},side=500;
 for(let x=-150;x<=150;x+=15)for(let z=-130;z<=130;z+=13)assert.equal(terrain.height(x,z,world,side),0);
 for(let z=-240;z<=240;z+=12)assert.equal(terrain.height(0,z,world,side),0);
 for(const sign of [-1,1])for(let shore=0;shore<=12;shore+=3)for(const along of [-150,-75,75,150]){
  assert.equal(terrain.height(sign*(side/2-shore),along,world,side),0,'east/west promenade');
  assert.equal(terrain.height(along,sign*(side/2-shore),world,side),0,'north/south promenade');
 }
 const hills=[];for(let x=185;x<225;x+=4)hills.push(terrain.height(x,100,world,side));
 assert.ok(hills.every(y=>Number.isFinite(y)&&y>=0));assert.ok(Math.max(...hills)>2);
 assert.ok(Math.max(...hills)-Math.min(...hills)>.2,'outer terrain has real variation');
});

test('terrain meshes use the same height sampler as the walker and planted layers',()=>{
 const world={W:300,H:260};
 for(const high of [true,false]){
  const g=terrain.geometry(THREE,500,world,high),p=g.attributes.position,n=g.attributes.normal;
  for(let i=0;i<p.count;i++){
   assert.ok(Math.abs(p.getY(i)-terrain.height(p.getX(i),p.getZ(i),world,500))<1e-5);
   assert.ok(Number.isFinite(n.getX(i))&&Number.isFinite(n.getY(i))&&Number.isFinite(n.getZ(i)));
  }
  g.dispose();
 }
 const campus=fs.readFileSync('web-src/c_campus.js','utf8');
 assert.match(campus,/if\(walk\)goal\.ty=2\.1\+VaultTerrain\.height\(goal\.tx,goal\.tz,WORLD,GSIDE\)/);
 assert.match(campus,/heightAt:\(x,z\)=>VaultTerrain\.height\(x,z,WORLD,GSIDE\)/);
});

test('physical material factories initialize derivative support on the shipped Three version',()=>{
 const source=fs.readFileSync('web-src/c_campus.js','utf8'),c=vm.createContext({THREE});
 for(const name of ['groundMaterial','makeMaterial']){
  const start=source.indexOf('function '+name+'('),end=source.indexOf('  return m;\n}',start)+'  return m;\n}'.length;
  assert.ok(start>=0&&end>start);vm.runInContext(source.slice(start,end),c);
  const material=c[name](new THREE.Texture());
  assert.equal(material.extensions.derivatives,true);
  assert.equal(typeof material.onBeforeCompile,'function');material.dispose();
 }
});

test('campus figure scale and photo visibility preserve remote people while hiding the local camera avatar',()=>{
 const source=fs.readFileSync('web-src/c_campus.js','utf8');
 const create=()=>({grp:new THREE.Group(),ring:new THREE.Object3D(),pos:new THREE.Vector3(),from:new THREE.Vector3(),noteId:-1});
 const c=vm.createContext({THREE,AG:new Map(),B:[],byName:new Map(),levels:new Map(),agentGroup:new THREE.Group(),lastAgents:[],GSIDE:500,WORLD:{W:300,H:260},VaultTerrain:terrain,
  PHOTO:{on:false},Identity:{form:x=>x,palette:x=>x},SentinelMesh:{create},disposeSentinel:()=>{},clamp:(n,a,b)=>Math.max(a,Math.min(b,n)),iMesh:null,dirty:false,time:0});
 vm.runInContext(source.slice(source.indexOf('function setAgents('),source.indexOf('function gate(')),c);
 const avatars=[{id:'local',local:true,position:{x:20,z:15,walking:false}},{id:'remote',local:false,position:{x:30,z:15,walking:true}}];
 c.setAgents(avatars);assert.equal(c.AG.get('local').grp.visible,true);assert.equal(c.AG.get('remote').grp.visible,true);
 for(const m of c.AG.values())assert.ok(Math.abs(m.grp.scale.x-.6)<1e-6,'world figure scale matches street dimensions');
 c.PHOTO.on=true;c.setAgents(avatars);assert.equal(c.AG.get('local').grp.visible,false);assert.equal(c.AG.get('remote').grp.visible,true);
 c.PHOTO.on=false;c.setAgents(avatars);assert.equal(c.AG.get('local').grp.visible,true);
 avatars[0].position.walking=true;c.setAgents(avatars);assert.equal(c.AG.get('local').grp.visible,false,'first person still hides its own avatar');
 avatars[1].position={x:200,z:100,walking:true};c.setAgents(avatars);
 assert.equal(c.AG.get('remote').pos.y,terrain.height(200,100,c.WORLD,500));
 assert.ok(c.AG.get('remote').pos.y>1,'remote walkers follow the same hills as local walkers');
 const guides=fs.readFileSync('web-src/c_npc.js','utf8');assert.match(guides,/m\.grp\.scale\.setScalar\(\.6\)/,'guides share the street scale');
});

test('carved arch is a real opening and glazing covers the opening with finite curved geometry',()=>{
 const stone=facades.archGeometry(),glass=facades.archGeometry(true),material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
 const frame=new THREE.Mesh(stone,material),pane=new THREE.Mesh(glass,material);
 const ray=new THREE.Raycaster(new THREE.Vector3(0,.5,2),new THREE.Vector3(0,0,-1));
 assert.equal(ray.intersectObject(frame).length,0,'the aperture remains open');
 assert.ok(ray.intersectObject(pane).length>0,'recessed glazing has its own physical surface');
 ray.ray.origin.x=.45;assert.ok(ray.intersectObject(frame).length>0,'stone jamb has actual depth');
 for(const geometry of [stone,glass,facades.tileGeometry()]){
  for(const key of ['position','normal'])assert.ok([...geometry.attributes[key].array].every(Number.isFinite));
  geometry.dispose();
 }
 material.dispose();
});

test('curved roof dressing honors hard caps and only admits complete rotated roofs',()=>{
 const make=(id,angle=0)=>({s:{archived:false},b:{id,color:'#D4A843',door:{x:10,z:28},tiers:[{x:10,z:20,w:12,d:12,y0:0,y1:14}],roofSupports:[{kind:'gable',x:10,z:20,y:14,sx:8,sz:6,sy:3,ry:angle}]}});
 const one=facades.craftLayout([make(0)]),count=one.tiles.length;
 assert.ok(count>0);
 const limited=facades.craftLayout(Array.from({length:100},(_,i)=>make(i)),{craftCap:17,tileCap:count+1});
 assert.equal(limited.frames.length,17);assert.equal(limited.tiles.length,count,'cap must not truncate a tiled roof');
 const geo=facades.tileGeometry(),v=new THREE.Vector3(),o=new THREE.Object3D();o.rotation.order='YXZ';
 for(const angle of [0,Math.PI/2,.47]){
  const layout=facades.craftLayout([make(0,angle)]),c=Math.cos(angle),s=Math.sin(angle);
  assert.equal(layout.tiles.length,count);
  for(const p of layout.tiles){
   o.position.set(p.x,p.y,p.z);o.rotation.set(p.rx,p.ry,0);o.scale.set(p.sx,p.sy,p.sz);o.updateMatrix();
   for(let i=0;i<geo.attributes.position.count;i++){
    v.fromBufferAttribute(geo.attributes.position,i).applyMatrix4(o.matrix);
    const x=v.x-10,z=v.z-20,lx=c*x-s*z,lz=s*x+c*z;
    assert.ok(Number.isFinite(v.y));assert.ok(Math.abs(lx)<4.01,'tiles fit roof width');
    assert.ok(Math.abs(lz)<3.25,'only the designed downhill tile lap extends past the roof');
    assert.ok(v.y>=13.8,'tiles follow the roof instead of cutting into the room');
   }
  }
 }
 geo.dispose();
});
