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
test('rigid-skinned figure stays within the draw budget, and tiers add trim and the aura',()=>{
 for(const form of ['jr','devon','ahmad','kenza','member','agent']){
  const lo=mesh.create({id:'t-'+form,form,level:0}),hi=mesh.create({id:'t2-'+form,form,level:20});
  assert.equal(lo.bones.length,15);assert.equal(lo.legs.length,2);assert.ok(lo.legs[0].isBone);
  const a=mesh.stats(lo),b=mesh.stats(hi);
  assert.ok(a.draws<=8&&b.draws<=8,'at most 8 draw calls before props');assert.ok(b.verts>a.verts,'higher tiers add plates');
  assert.equal(lo.aura.visible,false);assert.equal(hi.aura.visible,true);assert.equal(identity.blueprint(form,{level:20}).tier,4);
  mesh.dispose(lo.grp);mesh.dispose(hi.grp);
 }
 assert.deepEqual([0,2,3,5,6,9,10,19,20].map(identity.tier),[0,0,1,1,2,2,3,3,4]);
 assert.equal(mesh.textures().state,'skipped','no DOM: detail maps are skipped and shading stays code-only');
});
test('every status and emote produces a finite, grounded pose, and emotes end on their own',()=>{
 const m=mesh.create({id:'pose-check',form:'kenza',level:12});const finite=()=>m.bones.every(b=>[b.rotation.x,b.rotation.y,b.rotation.z,b.position.y].every(Number.isFinite));
 for(const s of mesh.STATUSES){for(let i=0;i<90;i++)mesh.pose(m,10+i/30,s,{speed:i>45?12:3});assert.ok(finite(),s);assert.ok(m.bones[0].position.y<=3.06&&m.bones[0].position.y>2.4,s+' keeps the pelvis over planted feet')}
 for(const [e,d] of Object.entries(mesh.EMOTES)){mesh.emote(m,e,100);let peak=0;for(let i=0;i<=Math.ceil(d*30)+3;i++){mesh.pose(m,100+i/30,'idle');peak=Math.max(peak,m.bones[0].position.y);assert.ok(finite(),e)}
  assert.equal(m.emote,null,e+' ends');if(e==='celebrate'||e==='levelup')assert.ok(peak>3.6,e+' leaves the ground')}
 mesh.emote(m,'greet',200);mesh.pose(m,199.9,'idle');assert.equal(m.emote,'greet','an emote scheduled in the future waits');
 mesh.dispose(m.grp);
});
test('reduced motion holds a still pose, and an immediate rebuild at a higher level does not replay the ceremony',()=>{
 mesh.reducedMotion(true);const m=mesh.create({id:'still',form:'member'});mesh.pose(m,1,'working');const a=m.bones.map(b=>b.rotation.x);mesh.pose(m,3.7,'working');
 assert.deepEqual(m.bones.map(b=>b.rotation.x),a);mesh.emote(m,'celebrate',4);mesh.pose(m,4.3,'working');assert.equal(m.emote,null);
 mesh.reducedMotion(null);mesh.dispose(m.grp);
 const x=mesh.create({id:'lvl',form:'agent',level:2}),y=mesh.create({id:'lvl',form:'agent',level:3});assert.equal(y.pendingEmote,null);mesh.dispose(x.grp);mesh.dispose(y.grp);
});
test('traveler cloaks clear the power core, bind the hem to the hips, and stay on the five-surface budget',()=>{
 const widths=[];
 for(const form of ['jr','devon','ahmad','kenza','member','agent']){
  const bp=identity.blueprint(form,{level:12});
  const cloth=bp.parts.filter(p=>p.k===5&&p.slot==='torso'&&p.z<0);
  assert.ok(cloth.length>=5,form+' cloak is layered');
  assert.ok(Math.min(...cloth.map(p=>p.y))<3.38,form+' hem binds to the hips');
  assert.ok(cloth.every(p=>p.z+p.d/2<-0.6),form+' cloth stays behind the power core');
  widths.push(Math.max(...cloth.map(p=>p.w)));
  const m=mesh.create({id:'cloak-'+form,form,level:12});
  assert.ok(mesh.stats(m).draws<=8,form);assert.equal(m.bones.length,15);
  const body=m.surfaces.body.geometry.attributes.cloth;
  assert.ok(body&&body.array.some(v=>v===1),'cloth is marked on the body surface');
  mesh.dispose(m.grp);
 }
 assert.equal(new Set(widths).size,6);
});
