import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
const registryContext=vm.createContext({});vm.runInContext(fs.readFileSync('web-src/b_districts.js','utf8')+'\nthis.registry=Districts;',registryContext);
const defs=registryContext.registry.all;
const notes=defs.map((d,id)=>({id,name:d.title+' source',top:d.folder,folder:d.folder,body:'fixture',fm:{type:'moc'},out:new Set(),back:new Set()}));
const buildings=defs.map((d,id)=>({id,tiers:[{x:id*20,z:0,w:12,d:10,y0:0,y1:12}]}));
const districts=defs.map((d,id)=>({top:d.folder,color:d.color||'#D4A843',x:id*20-6,z:-5,w:12,d:10}));
const c=vm.createContext({THREE,Districts:{get:folder=>defs.find(d=>d.folder===folder),worldTop:n=>n.top,landmarks:folder=>notes.filter(n=>n.top===folder)}});
vm.runInContext(fs.readFileSync('web-src/b_world_assets.js','utf8')+'\nthis.assets=DistrictAssets;',c);
const assets=c.assets;
test('all nineteen source-backed district purposes have distinct nonempty 3D assemblies',()=>{
 assert.equal(defs.length,19);const signatures=new Set();
 for(const d of defs){const p=assets.recipe(d.theme);assert.ok(p.length>=10,d.theme+' detail count');assert.ok(p.every(x=>x.name&&x.size.every(Number.isFinite)&&x.p.every(Number.isFinite)));signatures.add(JSON.stringify(p));}
 assert.equal(signatures.size,19);assert.equal(assets.recipe('unknown').length,0);
});
test('citywide landmark mesh batching preserves clickable part and source metadata',()=>{
 const group=assets.build(districts,buildings,notes);assert.equal(group.children.length,3);assert.equal(group.userData.records.length,19);
 for(const mesh of group.children){assert.ok(mesh.geometry.attributes.position.count>0);assert.equal(mesh.geometry.attributes.position.count,mesh.geometry.attributes.normal.count);assert.equal(mesh.geometry.attributes.position.count,mesh.geometry.attributes.color.count);
  for(const range of mesh.userData.landmarkRanges){assert.equal(assets.hit({object:mesh,faceIndex:range.first}),range.record);assert.ok(range.record.sourceNotes.length);assert.ok(range.last>range.first)}
 }
 assert.equal(assets.hit(null),null);assert.equal(assets.hit({object:group,faceIndex:0}),null);
 let disposed=0;group.children.forEach(mesh=>{mesh.geometry.addEventListener('dispose',()=>disposed++);mesh.material.addEventListener('dispose',()=>disposed++)});assets.dispose(group);assert.equal(disposed,6);
});
test('roof landmarks fit their note footprints and keep street navigation unchanged',()=>{
 const group=assets.build(districts,buildings,notes);
 for(const mesh of group.children){const a=mesh.geometry.attributes.position;
  for(const range of mesh.userData.landmarkRanges){const b=buildings[range.record.noteId].tiers[0];for(let i=range.first*3;i<range.last*3;i++){assert.ok(Math.abs(a.getX(i)-b.x)<=b.w/2+.0001,range.record.folder+' width');assert.ok(Math.abs(a.getZ(i)-b.z)<=b.d/2+.0001,range.record.folder+' depth');assert.ok(a.getY(i)>=b.y1-.0001)}}
 }
 assert.equal(assets.contract.streetObstacles,0);assets.dispose(group);
});


test('architectural settings fit compact and narrow roofs after rotated parts are transformed',()=>{
 const narrow=buildings.map((b,i)=>({...b,tiers:[{...b.tiers[0],w:i%2?2.1:18,d:i%2?14:2.4}]}));
 const group=assets.build(districts,narrow,notes);
 assert.equal(group.userData.records.length,19);
 assert.ok(group.children.length<=assets.contract.maxDrawCalls);
 for(const mesh of group.children){const a=mesh.geometry.attributes.position;
  for(const range of mesh.userData.landmarkRanges){const roof=narrow[range.record.noteId].tiers[0];
   for(let i=range.first*3;i<range.last*3;i++){
    assert.ok(Number.isFinite(a.getX(i))&&Number.isFinite(a.getY(i))&&Number.isFinite(a.getZ(i)));
    assert.ok(Math.abs(a.getX(i)-roof.x)<roof.w/2,range.record.theme+' narrow width');
    assert.ok(Math.abs(a.getZ(i)-roof.z)<roof.d/2,range.record.theme+' narrow depth');
    assert.ok(a.getY(i)>=roof.y1,range.record.theme+' above roof');
   }
  }
 }
 assets.dispose(group);
});
