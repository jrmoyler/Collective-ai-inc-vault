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
const fixtures={THREE,districts:[{x:-100,z:-100,w:200,d:200}],side:240,
 buildings:[{cx:0,cz:0,fw:12,fd:12}],
 trees:[{x:0,z:0,k:.2},{x:7,z:0,k:.3},{x:18,z:18,k:.4},{x:-18,z:18,k:.8},{x:NaN,z:1}]};

test('garden geometry preserves building access, finite transforms and six citywide batches',()=>{
 for(const high of [true,false]){
  const g=landscape.build({...fixtures,high});
  assert.equal(g.userData.landscape.counts.trees,2,'building pad and invalid anchors are excluded');
  assert.ok(g.children.length<=6);
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
