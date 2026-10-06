import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync('web-src/c_campus.js','utf8');
const ctx=vm.createContext({});
vm.runInContext(source.slice(source.indexOf('function crownDetails('),source.indexOf('function instMesh(')),ctx);
test('district crown geometry stays supported on narrow and offset upper tiers',()=>{
 const silhouettes=new Set();
 for(const style of [1,3,4]){
  for(const [w,d] of [[2.2,3],[3,2.2],[16,16]]){
   const tier={x:-32,z:74,w,d,y1:37};
   const parts=ctx.crownDetails(tier,style);
   assert.ok(parts.length<=9,'detail budget per roof');
   for(const p of parts){
    for(const key of ['x','y','z','sx','sy','sz'])assert.ok(Number.isFinite(p[key]));
    assert.ok(p.sx>0&&p.sy>0&&p.sz>0);
    assert.ok(Math.abs(p.x-tier.x)+p.sx/2<=w/2+1e-8);
    assert.ok(Math.abs(p.z-tier.z)+p.sz/2<=d/2+1e-8);
    assert.ok(p.y-p.sy/2>=tier.y1-1e-8);
   }
   if(w===16)silhouettes.add(JSON.stringify(parts));
  }
 }
 assert.equal(silhouettes.size,3);
});
test('chimneys meet actual roof slopes instead of starting below the pitch',()=>{
 assert.equal(ctx.pitchedRoofHeight(4,8,0),4);
 assert.equal(ctx.pitchedRoofHeight(4,8,2),2);
 assert.equal(ctx.pitchedRoofHeight(4,8,-2),2);
 assert.equal(ctx.pitchedRoofHeight(4,8,4),0);
 assert.equal(ctx.pitchedRoofHeight(4,8,6),0);
});

test('roof slots use local surfaces while links clear the complete crown',async()=>{
 const THREE=await import('three');
 const c=vm.createContext({THREE,Math,NOTES:[{name:'Offset tower'}],B:[],hash01:()=>.3});
 vm.runInContext(source.slice(source.indexOf('function rooftopAnchor('),source.indexOf('function buildBridges(')),c);
 vm.runInContext(source.slice(source.indexOf('function roofSurfaceAt('),source.indexOf('function setAgents(')),c);
 for(const clearance of [22,24.14,26.6,34]){
  c.B[0]={h:22,cx:100,cz:100,fw:16,fd:16,roofClearance:clearance,tiers:[{x:96,z:99,w:3,d:5,y1:22}]};
  const link=c.topOf(0);assert.equal(link.x,96);assert.equal(link.z,99);assert.equal(link.y,clearance+.25);
  for(let slot=0;slot<8;slot++){
   const p=c.roofSlot({id:0},slot,8);
   assert.ok(Math.abs(p.x-96)<1.5&&Math.abs(p.z-99)<2.5);
   assert.equal(p.y,22,'a remote tall mast must not raise sentinel feet');
  }
 }
});
test('all instanced crown transforms preserve roof contact throughout growth',async()=>{
 const THREE=await import('three');
 const tier={x:9,z:-12,w:8,d:6,y1:25};
 for(const rise of [.1,.5,1]){
  const list=ctx.crownDetails(tier,3),mesh=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial(),list.length);
  const c=vm.createContext({THREE,roofAnim:list.map((p,i)=>({...p,id:0,mesh,i,ry:0})),growthOf:()=>rise});
  vm.runInContext(source.slice(source.indexOf('function writeRoofs('),source.indexOf('function writeMatrices(')),c);c.writeRoofs();
  const m=new THREE.Matrix4();list.forEach((p,i)=>{mesh.getMatrixAt(i,m);assert.ok(Math.abs(m.elements[13]-p.y*rise)<1e-5);assert.ok(Math.abs(m.elements[5]-p.sy*rise)<1e-5);assert.ok(m.elements[13]-m.elements[5]/2>=tier.y1*rise-1e-5)});
  mesh.geometry.dispose();mesh.material.dispose();
 }
});

 test('local support follows rotated pitches, crown solids, and uncovered landmark perimeter',async()=>{
 const THREE=await import('three'),c=vm.createContext({THREE,Math,NOTES:[{name:'Roof'}],B:[],hash01:()=>.3});
 vm.runInContext(source.slice(source.indexOf('function crownDetails('),source.indexOf('function instMesh(')),c);
 vm.runInContext(source.slice(source.indexOf('function rooftopAnchor('),source.indexOf('function buildBridges(')),c);
 vm.runInContext(source.slice(source.indexOf('function roofSurfaceAt('),source.indexOf('function setAgents(')),c);
 const t={x:5,z:-8,w:6,d:8,y1:20};
 const b={tiers:[t],roofClearance:99,roofSupports:[{x:5,z:-8,y:20,sx:8,sz:6,sy:3,ry:Math.PI/2,kind:'gable'}]};c.B[0]=b;
 assert.equal(c.roofSurfaceAt(b,5,-8),23);assert.equal(c.roofSurfaceAt(b,7,-8),21);
 for(const style of [1,3,4]){
 b.roofSupports=c.crownDetails(t,style).map(p=>({...p,kind:'box',top:p.y+p.sy/2}));
 for(let slot=0;slot<8;slot++){const p=c.roofSlot({id:0},slot,8);assert.equal(p.y,c.roofSurfaceAt(b,p.x,p.z));assert.ok(p.y<25)}
 }
 b.authoredRoof=true;b.roofSupports=[];
 for(let slot=0;slot<8;slot++){const p=c.roofSlot({id:0},slot,8);assert.equal(p.y,20);assert.ok(Math.abs(p.x-5)<=3&&Math.abs(p.z+8)<=4);assert.ok(Math.abs(p.x-5)>2.98||Math.abs(p.z+8)>3.98)}
 });

test('identity rebuild retains moving sentinel state and feet follow ridge crossings',async()=>{
 const THREE=await import('three');
 const home={id:0,h:20,tiers:[{x:0,z:0,w:8,d:8,y1:20}],roofSupports:[{kind:'gable',x:0,y:20,z:0,sx:8,sz:8,sy:4,ry:0}],door:{x:0,z:5}};
 const create=()=>({grp:new THREE.Group(),ring:new THREE.Object3D(),pos:new THREE.Vector3(),from:new THREE.Vector3(),noteId:-1,signature:'old'});
 const c=vm.createContext({THREE,Math,B:[home],NOTES:[{name:'Note'}],byName:new Map([['Note',{id:0,name:'Note'}]]),hash01:()=>0,AG:new Map(),levels:new Map(),agentGroup:new THREE.Group(),lastAgents:[],Identity:{form:x=>x,palette:x=>x},SentinelMesh:{create},disposeSentinel:()=>{},reduced:false,time:8,iMesh:null,dirty:false,growthOf:()=>1});
 vm.runInContext(source.slice(source.indexOf('function crownDetails('),source.indexOf('function instMesh(')),c);
 vm.runInContext(source.slice(source.indexOf('function rooftopAnchor('),source.indexOf('function buildBridges(')),c);
 vm.runInContext(source.slice(source.indexOf('function roofSurfaceAt('),source.indexOf('function gate(')),c);
 for(const phase of ['roof','street','lift']){
  const m=create();Object.assign(m,{noteId:0,home,roof:new THREE.Vector3(0,21,3),pathT:3.25,path:[[0,5]],leg:0,phaseName:phase,lift:{h:24}});c.AG.set('agent',m);
  c.setAgents([{id:'agent',note:'Note',level:3,palette:['#111111','#222222','#333333']}]);const rebuilt=c.AG.get('agent');
  assert.notEqual(rebuilt,m);assert.equal(rebuilt.home,home);assert.equal(rebuilt.pathT,3.25);assert.equal(rebuilt.phaseName,phase);assert.ok(rebuilt.roof);assert.equal(rebuilt.lift.h,24);assert.deepEqual(rebuilt.path,[[0,5]]);
  assert.doesNotThrow(()=>c.stepRoofSurface(rebuilt,.1));
 }
 const m=create();m.home=home;m.pos.set(0,21,-3);m.roof=new THREE.Vector3(0,21,3);let maxY=0;
 for(let i=0;i<12;i++){c.stepRoofSurface(m,.1);assert.equal(m.pos.y,c.roofSurfaceAt(home,m.pos.x,m.pos.z));maxY=Math.max(maxY,m.pos.y)}
 assert.ok(maxY>23.9,'crossing rises over ridge rather than passing through it');assert.equal(m.pos.y,21);
});
