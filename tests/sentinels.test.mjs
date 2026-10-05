import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
const context=vm.createContext({THREE,document:{createElement:()=>({width:0,height:0,getContext:()=>({fillRect(){},fillText(){}})})}});
vm.runInContext(fs.readFileSync('web-src/b_identity.js','utf8')+fs.readFileSync('web-src/b_sentinel.js','utf8')+'\nthis.identity=Identity;this.mesh=SentinelMesh;',context);
const {identity,mesh}=context;
test('invalid palettes and unrecognized forms fall back without accepting CSS injection',()=>{
 assert.equal(identity.form('owner'),'member');
 for(const p of [null,[],['red','#FFFFFF','#FFFFFF'],['#111111','#222222','url(evil)'],['#111111','#222222']])assert.deepEqual(Array.from(identity.palette(p)),Array.from(identity.FORMS.member.palette));
 assert.deepEqual(Array.from(identity.palette(['#abcdef','#123456','#ABCDEF'])),['#ABCDEF','#123456','#ABCDEF']);
});
test('four core silhouettes differ, and a valid member palette reaches the actual mesh',()=>{
 const geometries=new Set();
 for(const form of ['jr','devon','ahmad','kenza','member','agent']){
  const m=mesh.create({id:form,form,palette:identity.FORMS[form].palette});
  assert.equal(m.legs.length,2);const rigid=m.grp.children.filter(x=>x.isMesh&&x.geometry.attributes?.normal);
  geometries.add(JSON.stringify(rigid.map(x=>Array.from(x.geometry.attributes.position.array))));
  const materials=[];m.grp.traverse(o=>{if(o.isMesh)materials.push(o.material)});
  assert.ok(materials.some(x=>x.color.getHexString()===new THREE.Color(identity.FORMS[form].palette[1]).convertSRGBToLinear().getHexString()));
  assert.ok(materials.length<=12,'armor batching keeps draw calls bounded');
  mesh.dispose(m.grp);
 }
 assert.equal(geometries.size,6);
});
test('46 autonomous agents plus two same-tool owners retain unique meshes and badges',()=>{
 const specs=Array.from({length:46},(_,i)=>({id:'agent-'+i,form:'agent',color:'#C97B54'}));
 specs.push(...['JR-id','Devon-id'].map(id=>({id:'claude:'+id,form:'agent',ownerBadge:identity.badge(id),ownerColor:id==='JR-id'?'#00D9B5':'#A62C48'})));
 assert.notEqual(specs[46].ownerBadge,specs[47].ownerBadge);
 const models=specs.map(mesh.create);assert.equal(new Set(models.map(m=>m.grp.uuid)).size,48);
 let disposed=0;models.forEach(m=>{m.grp.traverse(o=>{o.material?.addEventListener('dispose',()=>disposed++)});mesh.dispose(m.grp)});assert.ok(disposed>=48*6);
});
