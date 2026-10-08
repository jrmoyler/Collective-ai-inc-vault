import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
const ctx=vm.createContext({THREE});
vm.runInContext(fs.readFileSync('web-src/b_buildings.js','utf8')+'\nthis.F=Facades;',ctx);
const F=ctx.F;
const NOW=Date.parse('2026-10-07T12:00:00Z');
const note=(o={})=>({name:'N',folder:'03 - Hybrid Living',top:'03 - Hybrid Living',fm:{},body:'# N',out:new Set(),back:new Set(),...o});
const byName=new Map([['Exists',{}]]);

test('signals read status, age, links, editor and task without touching the DOM',()=>{
 const arch=F.signal(note({fm:{status:'archived'}}),{now:NOW});assert.equal(arch.archived,true);assert.equal(arch.weather,1);
 assert.equal(F.signal(note({top:'10 - Archive'}),{now:NOW}).weather,1);
 assert.equal(F.signal(note({body:'> [!note] Superseded 2026-10-01'}),{now:NOW}).weather,.5);
 assert.equal(F.signal(note({fm:{status:'chartered'}}),{now:NOW}).tone,2);
 assert.equal(F.signal(note({fm:{status:'operating'}}),{now:NOW}).tone,1);
 assert.equal(F.signal(note({fm:{status:'pending'}}),{now:NOW}).tone,3);
 const stale=F.signal(note({fm:{updated:'2026-01-02'}}),{now:NOW});assert.equal(stale.stale,1);assert.equal(stale.recent,0);
 const fresh=F.signal(note({updated_by:'codex',updated_at:new Date(NOW-20*60e3).toISOString()}),{now:NOW});
 assert.equal(fresh.recent,1);assert.equal(fresh.scaffold,true);assert.match(fresh.ownerColor,/^#[0-9A-F]{6}$/);
 const synced=F.signal(note({updated_by:'repo-sync',updated_at:new Date(NOW-60e3).toISOString()}),{now:NOW});
 assert.equal(synced.scaffold,false,'a bulk repo sync is not an edit');assert.equal(synced.owner,'');
 const links=F.signal(note({body:'[[Exists]] [[Missing one]] [[Missing two|alias]] [[Missing one]]'}),{now:NOW,byName,task:'blocked'});
 assert.equal(links.unresolved,2);assert.equal(links.orphan,true);assert.equal(links.task,'blocked');
 assert.equal(F.signal(note(),{now:NOW,task:'nonsense'}).task,null);
});

test('facade code packs every combination exactly inside the mediump-safe range',()=>{
 const seen=new Set();
 for(let p=0;p<5;p++)for(let t=0;t<4;t++)for(const w of [0,.5,1])for(const s of [0,.5,1])for(const r of [0,.5,1]){
  const v=F.pack(p,{tone:t,weather:w,stale:s,recent:r});assert.ok(Number.isInteger(v)&&v>=0&&v<=F.contract.maxPack);
  // decode as the GLSL does: floor, mod, divide
  let k=Math.floor(v+.5);const pat=k%5;k=Math.floor(k/5);const tone=k%4;k=Math.floor(k/4);const wq=(k%3)*.5;k=Math.floor(k/3);const sq=(k%3)*.5,rq=Math.floor(k/3)*.5;
  assert.deepEqual([pat,tone,wq,sq,rq],[p,t,w,s,r]);assert.deepEqual({...F.unpack(v)},{pattern:p,tone:t,weather:w,stale:s,recent:r});seen.add(v);
 }
 assert.equal(seen.size,540);assert.equal(F.PATTERNS.length,5);
});

test('window light dims stale and archived notes and lifts fresh ones',()=>{
 const base=.5,s=(o)=>({tone:0,weather:0,stale:0,recent:0,...o});
 assert.ok(F.windowLight(s({stale:1}),base)<F.windowLight(s({}),base));
 assert.ok(F.windowLight(s({recent:1}),base)>F.windowLight(s({}),base));
 assert.ok(F.windowLight(s({weather:1}),base)<.15);
 assert.ok(F.windowLight(s({tone:3}),base)<F.windowLight(s({tone:1}),base));
});

test('hover sign text is plain vocabulary with no markup',()=>{
 const s=F.signal(note({fm:{status:'<img src=x>'},body:'[[Missing]]',updated_by:'codex',updated_at:new Date(NOW-30*60e3).toISOString()}),{now:NOW,byName,task:'review'});
 const c=F.caption(s);assert.match(c,/no links/);assert.match(c,/1 unresolved/);assert.match(c,/edited this hour/);assert.match(c,/task in review/);
 assert.doesNotMatch(c,/[<>&"]/);
 for(const word of ['delve','leverage','robust','seamless','transformative','empower','elevate','game-changing','cutting-edge','innovative','tapestry'])assert.ok(!c.includes(word));
});

const tier=(x,z,w,d,y0,y1)=>({x,z,w,d,y0,y1});
const building=(id,o={})=>({id,h:24,style:0,color:'#7FC8A9',tiers:[tier(0,0,8,6,0,10),tier(0,0,6,5,10,24)],door:{x:0,z:5},...o});
test('doors face their street cell and every facade part hugs its own building',()=>{
 for(const door of [{x:0,z:5},{x:0,z:-5},{x:7,z:1},{x:-7,z:-1}]){
  const b=building(1,{door}),s=F.signal(note({out:new Set([2])}),{now:NOW}),L=F.layout([{b,s}]);
  const d=L.parts[L.doors.get(1)];assert.equal(d.kind,'door');
  const t=b.tiers[0];
  // the door sits on the face nearest the door cell
  if(Math.abs(door.x)>Math.abs(door.z))assert.ok(Math.sign(d.x-t.x)===Math.sign(door.x)&&Math.abs(Math.abs(d.x-t.x)-t.w/2)<.3);
  else assert.ok(Math.sign(d.z-t.z)===Math.sign(door.z)&&Math.abs(Math.abs(d.z-t.z)-t.d/2)<.3);
  for(const p of L.parts){for(const k of ['x','y','z','sx','sy','sz'])assert.ok(Number.isFinite(p[k]),p.kind+' '+k);
   // nothing reaches further than 1.1 units (the street-grid pad) beyond the base footprint
   assert.ok(Math.abs(p.x-t.x)<=t.w/2+1.1+Math.max(p.sx,p.sz)/2&&Math.abs(p.z-t.z)<=t.d/2+1.1+Math.max(p.sx,p.sz)/2,p.kind)}
 }
});

test('data signals become dressing: scaffolds, frayed stubs, orphan stub, link mast, boarded archive doors',()=>{
 const items=[
  {b:building(0),s:F.signal(note({updated_by:'codex',updated_at:new Date(NOW-5*60e3).toISOString(),out:new Set([1])}),{now:NOW})},
  {b:building(1),s:F.signal(note({body:'[[A]] [[B]] [[C]] [[D]]'}),{now:NOW,byName})},
  {b:building(2),s:F.signal(note({out:new Set([...Array(16).keys()])}),{now:NOW})},
  {b:building(3),s:F.signal(note({fm:{status:'archived'},out:new Set([1])}),{now:NOW})}
 ];
 const L=F.layout(items),kinds=id=>L.parts.filter(p=>p.id===id).map(p=>p.kind);
 assert.ok(kinds(0).includes('scaffold')&&kinds(0).includes('beacon'));assert.equal(L.scaffolds,1);
 assert.ok(!kinds(1).includes('scaffold'));
 assert.equal(L.parts.filter(p=>p.id===1&&p.kind==='frayed'&&p.glow>0).length,3,'at most three frayed tips');
 assert.ok(kinds(1).includes('stub'),'orphan stub');assert.ok(kinds(2).includes('linkmast'));
 assert.ok(kinds(3).includes('board')&&!kinds(3).includes('awning'));assert.equal(L.doors.has(3),false,'boarded doors stay dark');
 assert.ok(kinds(0).includes('balcony'));
});

test('instance budget holds and the whole layer is one draw call with live door lights',()=>{
 const items=[];for(let i=0;i<900;i++)items.push({b:building(i,{tiers:[tier(i*20,0,8,6,0,10),tier(i*20,0,6,5,10,40)],door:{x:i*20,z:5}}),s:F.signal(note({updated_by:'codex',updated_at:new Date(NOW-60e3).toISOString(),body:'[[X]] [[Y]]'}),{now:NOW,byName})});
 for(const cap of [F.LIMIT.low,F.LIMIT.medium]){const L=F.layout(items,{cap});assert.ok(L.parts.length<=cap);assert.ok(L.scaffolds<=F.LIMIT.scaffoldBuildings)}
 const mesh=F.build(items.slice(0,40),{cap:F.LIMIT.medium});
 assert.ok(mesh.isInstancedMesh);assert.equal(F.contract.drawCalls,1);assert.ok(mesh.count>40);
 const glow=mesh.geometry.attributes.aGlow,i=mesh.userData.doors.get(3);
 assert.equal(F.setDoor(mesh,3,2),true);assert.ok(Math.abs(glow.array[i]-F.doorLight(2).glow)<1e-6);assert.equal(F.setDoor(mesh,3,2),false,'no-op when unchanged');
 assert.equal(glow.updateRange.offset,i);assert.equal(glow.updateRange.count,1);
 F.setDoor(mesh,7,1,'blocked');assert.equal(glow.updateRange.offset,i);assert.equal(glow.updateRange.count,mesh.userData.doors.get(7)-i+1,'ranges merge until the next upload');
 assert.equal(F.setDoor(mesh,99999,2),false);
 const m=new THREE.Matrix4();mesh.getMatrixAt(i,m);assert.ok(m.elements.every(Number.isFinite));
 F.dispose(mesh);
});

const campus=fs.readFileSync('web-src/c_campus.js','utf8');
test('narrow roofs get a parapet cap inside the footprint',()=>{
 const c=vm.createContext({});vm.runInContext(campus.slice(campus.indexOf('function crownDetails('),campus.indexOf('function instMesh(')),c);
 for(const [w,d] of [[1.4,2],[2.1,6],[.8,.8]]){const t={x:3,z:-4,w,d,y1:30},parts=c.capDetails(t);assert.equal(parts.length,5);
  for(const p of parts){assert.ok(p.sx>0&&p.sy>0&&p.sz>0);assert.ok(Math.abs(p.x-t.x)+p.sx/2<=w/2+1e-9);assert.ok(Math.abs(p.z-t.z)+p.sz/2<=d/2+1e-9);assert.ok(p.y-p.sy/2>=t.y1-1e-9)}}
});

test('hover updates only the touched buildings and merge into one pending range',()=>{
 const c=vm.createContext({Math,Infinity,sel:-1,hov:-1,nbr:new Map(),busyIds:new Set(),pulses:new Map(),stRange:null,dirty:false,AG:new Map(),LIVE_ST:[]});
 vm.runInContext(campus.slice(campus.indexOf('function stateRange('),campus.indexOf('// ---------- sky, light, mode')),c);
 const inst=[],bRange=[];for(let id=0;id<50;id++){bRange[id]=[inst.length,3];for(let k=0;k<3;k++)inst.push({b:{id}})}
 const attr=new THREE.InstancedBufferAttribute(new Float32Array(inst.length*4),4);
 Object.assign(c,{inst,bRange,iMesh:{geometry:{attributes:{aState:attr}}}});
 c.hov=10;c.applyState([-1,10]);assert.equal(attr.updateRange.offset,30*4);assert.equal(attr.updateRange.count,3*4);assert.ok(Math.abs(attr.array[30*4+1]-.4)<1e-6);
 c.hov=12;c.applyState([10,12]);assert.equal(attr.array[30*4+1],0);assert.equal(attr.updateRange.offset,30*4);assert.equal(attr.updateRange.count,9*4);
 c.stRange=null;c.sel=4;c.applyState();assert.equal(attr.updateRange.offset,0);assert.equal(attr.updateRange.count,inst.length*4);assert.equal(attr.array[0*4+3],.5);
});

test('architectural trim respects door orientation and terraces stay on exposed setbacks',()=>{
 for(const door of [{x:7,z:1},{x:-7,z:-1},{x:2,z:5},{x:-2,z:-5}]){
  const b=building(12,{door,tiers:[tier(0,0,10,10,0,8),tier(0,0,6,5,8,24)]}),s=F.signal(note({out:new Set([1])}),{now:NOW});
  const L=F.layout([{b,s}]);
  const piers=L.parts.filter(p=>p.kind==='pier');assert.equal(piers.length,2);
  const mid={x:(piers[0].x+piers[1].x)/2,z:(piers[0].z+piers[1].z)/2};
  assert.ok(Math.abs(door.x)>Math.abs(door.z)?Math.abs(mid.z)<1e-8:Math.abs(mid.x)<1e-8,'piers center on facade, independently of offset doorway');
  for(const p of L.parts.filter(p=>['planter','soil','plant','seat','seat-leg'].includes(p.kind))){
   assert.ok(p.y-p.sy/2>=8-1e-8,'terrace rests on lower tier');
   assert.ok(Math.abs(p.x)+p.sx/2<=5&&Math.abs(p.z)+p.sz/2<=5,'furnishings remain inside lower footprint');
   assert.ok(p.z-p.sz/2>2.5,'furnishings do not intersect upper tier');
  }
 }
 const b=building(13),s=F.signal(note(),{now:NOW});const mesh=F.build([{b,s}]);
 const finishes=mesh.geometry.attributes.aFinish.array;assert.ok([...finishes].every(v=>v>=.2&&v<=.9));
 assert.ok(new Set(finishes).size>=3,'glass, metal and masonry have separate physical finishes');F.dispose(mesh);
});
