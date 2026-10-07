import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';

// A recording 2D context: enough of the canvas API for paving and the name atlas.
function fakeContext(){
  const calls=[];let depth=0;
  const ctx=new Proxy({calls,get depth(){return depth}},{get(t,k){
    if(k in t)return t[k];
    if(k==='save')return ()=>{depth++;calls.push('save')};
    if(k==='restore')return ()=>{depth--;calls.push('restore')};
    if(k==='measureText')return s=>({width:String(s).length*9});
    return (...a)=>{calls.push(k)};
  },set(t,k,v){t[k]=v;return true}});
  return ctx;
}
const document={createElement:()=>({width:0,height:0,getContext:()=>fakeContext()})};
const context=vm.createContext({THREE,document,URL});
vm.runInContext(fs.readFileSync('web-src/b_districts.js','utf8')+'\n'+fs.readFileSync('web-src/b_world_assets.js','utf8')+'\nthis.D=Districts;this.L=DistrictLook;this.A=DistrictAssets;',context);
const {D,L,A}=context;
const defs=D.all;
const DIST=defs.map((d,i)=>({top:d.folder,name:d.title,x:(i%5)*70-175,z:Math.floor(i/5)*70-140,w:56,d:48,count:3,color:d.color||'#D4A843'}));
const NOTES=defs.map((d,id)=>({id,name:d.title+' note',folder:d.folder,top:d.folder,fm:{type:'moc'},out:new Set(),back:new Set(),updated_at:new Date().toISOString()}));
const B=defs.map((d,id)=>({id,worldTop:d.folder,tiers:[{x:DIST[id].x+28,z:DIST[id].z+24,w:14,d:12,y0:0,y1:10}]}));
L.bind(DIST,B,NOTES);

test('every one of the nineteen districts has its own paving, tree, finish and gateway crest',()=>{
  assert.equal(defs.length,19);
  const themes=new Set(defs.map(d=>d.theme));assert.equal(themes.size,19);
  const paving=new Set(),trees=new Set();
  for(const d of defs){const look=L.lookOf(d.folder);assert.notEqual(look.paving,'none',d.folder);paving.add(look.paving);trees.add(look.tree.join());
    assert.match(look.lamp,/^#[0-9a-f]{6}$/i);assert.match(look.bench,/^#[0-9a-f]{6}$/i);assert.ok(['spire','pediment','twin','beam','pergola','fins','arch'].includes(look.crest))}
  assert.equal(paving.size,19,'distinct paving per district');assert.equal(trees.size,19,'distinct tree species per district');
  assert.equal(L.lookOf('not a district').paving,'none');
});

test('paving paints inside a clipped court and restores the canvas state',()=>{
  const X=x=>x+300;
  for(const d of DIST){const g=fakeContext();const ops=L.paintCourt(g,d,X,X,2);
    assert.ok(ops>=3,d.top+' paints pattern and medallion');assert.equal(g.depth,0,'save/restore balanced');
    assert.equal(g.calls[0],'save');assert.ok(g.calls.includes('clip'));assert.ok(g.calls.includes('arc'),'gateway medallion')}
});

test('street furniture finish follows the district under it and leaves the quay alone',()=>{
  const d=DIST[8],t=L.tree(d.x+10,d.z+10,.5);assert.ok(t&&t.h>=0&&t.h<1&&t.s<=1&&t.l<=.9);
  assert.equal(L.tree(5000,5000,.5),null);
  const council=DIST.find(x=>D.get(x.top).theme==='council'),ct=L.tree(council.x+3,council.z+3,.2);assert.ok(ct.sy>ct.sx,'columnar silhouette');
  const lamps=L.lampFinish([{x:d.x-1.5,z:d.z+5},{x:5000,z:5000}]);assert.equal(lamps.length,2);assert.ok(lamps.every(l=>l.c&&Number.isFinite(l.c.r)));
  assert.ok(Math.abs(lamps[1].c.r-1)<1e-6&&Math.abs(lamps[1].c.b-1)<1e-6,'outside a district the lamp keeps its base finish');
  assert.ok(L.bench(d).isColor);
});

test('beacons count unfinished tasks and recent writes per district only',()=>{
  const open=L.tasks([{note:NOTES[3].name,status:'open'},{note:NOTES[3].name,status:'blocked'},{note:NOTES[3].name,status:'done'},{note:'Missing',status:'open'}]);
  assert.equal(open.get(DIST[3].top),2);assert.equal(open.size,1);
  const a=L.activity(DIST[3].top),b=L.activity(DIST[4].top);assert.ok(a.height>b.height);assert.equal(b.open,0);
  L.tasks(Array.from({length:500},()=>({note:NOTES[2].name,status:'open'})));assert.equal(L.activity(DIST[2].top).height,64,'height is capped');
  assert.equal(L.write('nowhere'),false);const before=L.activity(DIST[5].top).recent;assert.equal(L.write(DIST[5].top),true);assert.equal(L.activity(DIST[5].top).recent,before+1);
  L.tasks([]);
});

test('gateways, banners, plates and beacons stay within five shared draws',()=>{
  const hooks=[];const g=L.build({okCell:()=>true,SH:{uLamp:{value:.4}},HI:false,reduced:false,onFrame:f=>hooks.push(f)});
  assert.equal(g.children.length,5);assert.equal(g.userData.stats.draws,5);assert.equal(hooks.length,1,'frame hook registers once');
  L.build({okCell:()=>true,onFrame:f=>hooks.push(f)});assert.equal(hooks.length,1);
  const plate=g.children.find(m=>m.name==='District name plates');assert.equal(plate.count,DIST.length*2);
  const rows=plate.geometry.attributes.aRow.array;assert.ok(Math.max(...rows)<24);
  for(const mesh of g.children){assert.ok(mesh.isInstancedMesh);assert.ok(mesh.count>0)}
  const frame=g.children.find(m=>m.name==='District gateways');const dist=frame.geometry.attributes.aDist.array;
  assert.equal(JSON.stringify([...new Set(dist)].sort((a,b)=>a-b)),JSON.stringify(DIST.map((_,i)=>i)));
  const shaft=g.children.find(m=>m.name==='District activity beacons');assert.equal(shaft.count,DIST.length);
  // shaders: frame material injects the gate highlight without breaking the standard chunks
  const sh={uniforms:{},vertexShader:THREE.ShaderLib.standard.vertexShader,fragmentShader:THREE.ShaderLib.standard.fragmentShader};
  frame.material.onBeforeCompile(sh);assert.ok(sh.vertexShader.includes('vGate=('));assert.ok(sh.fragmentShader.includes('vAcc.rgb'));assert.ok(sh.uniforms.uDistActive);
  g.traverse(o=>{if(o.geometry)o.geometry.dispose()});
});

test('the active district lights its gateway and ground, and reduced motion holds it still',()=>{
  const ground={uniforms:{},vertexShader:'#include <common>',fragmentShader:'#include <common>\n#include <emissivemap_fragment>'};
  L.patchGround(ground);assert.ok(ground.fragmentShader.includes('uDistRect'));assert.equal(ground.uniforms.uDistOn,L.uniforms.uDistOn);
  const gate={uniforms:{},vertexShader:'#include <common>\n#include <begin_vertex>',fragmentShader:'#include <common>\n#include <emissivemap_fragment>'};
  L.patchGate(gate);assert.ok(gate.vertexShader.includes('attribute float aDist'));assert.ok(gate.fragmentShader.includes('vGate'));
  const mesh=new THREE.InstancedMesh(new THREE.BoxGeometry(),new THREE.MeshStandardMaterial(),2);L.tagGates(mesh,[{top:DIST[1].top},{top:'unknown'}]);
  assert.deepEqual([...mesh.geometry.attributes.aDist.array],[1,-5]);
  assert.equal(L.enter('unknown'),false);
  L.tick(100,false);assert.equal(L.enter(DIST[4].top),true);assert.equal(L.uniforms.uDistActive.value,4);assert.equal(L.uniforms.uDistT0.value,100);
  assert.equal(L.uniforms.uDistRect.value.x,DIST[4].x);assert.equal(L.uniforms.uDistRect.value.w,DIST[4].d);
  assert.equal(L.tick(100.1,false),true,'fading in requests frames');for(let t=100.2;t<103;t+=.1)L.tick(t,false);assert.equal(L.uniforms.uDistOn.value,1);
  assert.equal(L.near(DIST[4].top),true);L.near(null);L.tick(103.1,false);assert.equal(L.stats().active,DIST[4].top,'brief gaps keep the highlight');
  L.tick(106,true);L.near(null);L.tick(106.1,true);assert.equal(L.uniforms.uDlMotion.value,0);assert.equal(L.uniforms.uDistOn.value,0,'reduced motion snaps without animation');
  assert.equal(L.uniforms.uDistActive.value,-1);
});

test('landmark motion is per-vertex, shares one uniform and keeps swings on the roof',()=>{
  const district=defs.map((d,i)=>({top:d.folder,color:d.color||'#D4A843',x:i*20-6,z:-5,w:12,d:10}));
  const buildings=defs.map((d,id)=>({id,tiers:[{x:id*20,z:0,w:12,d:10,y0:0,y1:12}]}));
  const notes=defs.map((d,id)=>({id,name:d.title+' source',top:d.folder,folder:d.folder,body:'fixture',fm:{type:'moc'},out:new Set(),back:new Set()}));
  const c=vm.createContext({THREE,Districts:{get:f=>defs.find(d=>d.folder===f),worldTop:n=>n.top,landmarks:f=>notes.filter(n=>n.top===f)}});
  vm.runInContext(fs.readFileSync('web-src/b_world_assets.js','utf8')+'\nthis.assets=DistrictAssets;',c);
  const assets=c.assets,group=assets.build(district,buildings,notes);
  assert.equal(group.children.length,3,'motion adds no draws');
  const moving=new Set();
  for(const mesh of group.children){const mot=mesh.geometry.attributes.aMot,piv=mesh.geometry.attributes.aPiv,pos=mesh.geometry.attributes.position;
    assert.equal(mot.count,pos.count);assert.equal(piv.count,pos.count);
    for(const range of mesh.userData.landmarkRanges){if(range.moving)moving.add(range.record.theme);
      const roof=buildings[range.record.noteId].tiers[0];
      for(let i=range.first*3;i<range.last*3;i++){const k=mot.getX(i),amp=mot.getY(i);if(k!==1&&k!==6)continue;
        for(const s of [-1,1]){let x=pos.getX(i),z=pos.getZ(i);
          if(k===1){const a=amp*s,dx=x-piv.getX(i),dz=z-piv.getZ(i);x=piv.getX(i)+Math.cos(a)*dx+Math.sin(a)*dz;z=piv.getZ(i)-Math.sin(a)*dx+Math.cos(a)*dz}else x+=amp*s;
          assert.ok(Math.abs(x-roof.x)<=roof.w/2+1e-4&&Math.abs(z-roof.z)<=roof.d/2+1e-4,range.record.theme+' swing stays on its roof')}}}
  }
  for(const theme of ['yard','observatory','chamber','foundry','log','workshop','governance','lab'])assert.ok(moving.has(theme),theme+' moves');
  const sh={uniforms:{},vertexShader:THREE.ShaderLib.standard.vertexShader,fragmentShader:THREE.ShaderLib.standard.fragmentShader};
  const accent=group.children.find(m=>m.name.endsWith('accent'));accent.material.onBeforeCompile(sh);
  assert.ok(sh.vertexShader.includes('lmRot(aMot)'));assert.ok(sh.fragmentShader.includes('vLmBlink'));assert.equal(sh.uniforms.uLmTime,assets.uniforms.uLmTime);
  assets.tick(12,true);assert.equal(assets.uniforms.uLmMotion.value,0);assets.tick(13,false);assert.equal(assets.uniforms.uLmMotion.value,1);
  assets.dispose(group);
});

test('every district, including source-curated 12 to 17, has a fixed Warden archetype',()=>{
  const src=fs.readFileSync('web-src/c_npc.js','utf8');const fixed=src.match(/const FIXED=\{([^}]*)\}/)[1];
  for(const d of defs)assert.ok(fixed.includes(JSON.stringify(d.folder)),d.folder);
});
