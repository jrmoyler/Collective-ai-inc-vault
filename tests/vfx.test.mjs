import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';

// b_vfx.js runs in a sandbox with real three.js, a stub store and a stub matchMedia.
function load({quality='high',width=1440,reduce=false}={}){
 const mem=new Map([['vault.quality',quality]]);
 const c=vm.createContext({THREE,Math,Date,Map,WeakMap,Array,Float32Array,Object,console,innerWidth:width,
  store:{get:(k,d)=>mem.has(k)?mem.get(k):d,set:(k,v)=>mem.set(k,v)},matchMedia:()=>({matches:reduce})});
 vm.runInContext(fs.readFileSync('web-src/b_vfx.js','utf8')+'\nthis.VFX=VFX;',c);
 return {VFX:c.VFX,mem,ctx:c};
}
const shared=()=>({uTime:{value:0},uNight:{value:0},uSkyRef:{value:new THREE.Color()},uSunDir:{value:new THREE.Vector3(0,1,0)}});

test('quality tiers are read live and every pool is bounded',()=>{
 const {VFX,mem,ctx}=load({width:1440});
 assert.equal(VFX.tier(),'high');
 ctx.innerWidth=390;assert.equal(VFX.tier(),'medium','rotation or a narrow window drops to medium without a reload');
 mem.set('vault.quality','low');assert.equal(VFX.tier(),'low','title settings take effect on the next read');
 assert.equal(VFX.tierFor('high',761),'high');assert.equal(VFX.tierFor('high',760),'medium');
 const s=VFX.stats().pools;
 for(const t of ['high','medium','low']){const b=VFX.budget(t);assert.ok(b.atmos<=s.atmosphere);assert.ok(b.bp<=s.perBurst);assert.ok(b.ambientHz<=30)}
 assert.ok(VFX.budget('medium').atmos<VFX.budget('high').atmos);assert.equal(VFX.budget('low').atmos,0);
 assert.ok(s.atmosphere*s.bursts<=1e6&&s.rings<=16&&s.sparks<=512&&s.ink<=8,'fixed pool sizes');
});

test('weather is a deterministic function of the local day, with no network input',()=>{
 const {VFX}=load();
 const kinds=new Map();let wetAfter=0;
 for(let d=0;d<365;d++){
  const day=new Date(2026,0,1+d);
  const a=VFX.weatherFor(day,12),b=VFX.weatherFor(new Date(day.getTime()),12);
  assert.deepEqual(JSON.parse(JSON.stringify(a)),JSON.parse(JSON.stringify(b)));
  for(const k of ['rain','wet','mist','wind'])assert.ok(a[k]>=0&&a[k]<=1,k+' in range');
  kinds.set(a.kind,(kinds.get(a.kind)||0)+1);
  if(a.kind==='rain'||a.kind==='drizzle'){const after=VFX.weatherFor(day,a.window[1]+.5);if(after.rain===0&&after.wet>0)wetAfter++}
 }
 assert.ok(kinds.get('clear')>kinds.get('rain'),'clear days outnumber rain days');
 assert.ok(['mist','drizzle','rain'].every(k=>kinds.get(k)>0),'every weather appears across a year');
 assert.ok(wetAfter>0,'streets stay wet after a shower ends');
});

test('effects are pooled: repeated events never add meshes, geometry or materials',()=>{
 const {VFX}=load();const scene=new THREE.Scene();
 assert.equal(VFX.init(scene,shared(),null),true);
 const meshes=scene.children.length,geos=new Set(scene.children.map(m=>m.geometry)),mats=new Set(scene.children.map(m=>m.material));
 assert.ok(meshes<=4,'bursts, rings, sparks and curtain');
 let t=10;VFX.step(.016,t);
 const b={cx:4,cz:-6,fw:8,fd:6,h:30};
 for(let i=0;i<200;i++){
  t+=.05;VFX.step(.05,t);
  VFX.ink({...b,id:i%9},'#14B8A6');VFX.burst(1,30,2,'#F2B85B',{w:8,d:6});VFX.trail({k:i%3},0,i*.1,0,'#E8A33D');VFX.arrive(0,20,0,'#E8A33D');VFX.district({x:0,z:0,w:120,d:80,color:'#D4A843'});
 }
 assert.equal(scene.children.length,meshes);
 assert.deepEqual(new Set(scene.children.map(m=>m.geometry)),geos);assert.deepEqual(new Set(scene.children.map(m=>m.material)),mats);
 // the shader clock drives everything; the frame loop only needs to run while something is alive
 assert.equal(VFX.step(.016,t+.1),true);assert.equal(VFX.step(.016,t+10),false);
 VFX.dispose();assert.equal(scene.children.length,0);
});

test('a live write sweeps the right building once per cooldown and the ink slots recycle',()=>{
 const {VFX}=load();VFX.init(new THREE.Scene(),shared(),null);VFX.step(.016,5);
 const b={id:7,cx:12,cz:-3,fw:10,fd:6,h:40};
 assert.equal(VFX.ink(b,'#14B8A6'),true);
 const A=VFX.U.uInkA.value[0],B=VFX.U.uInkB.value[0];
 assert.deepEqual([A.x,A.y],[12,-3]);assert.ok(Math.abs(A.z-5.08)<1e-9&&Math.abs(A.w-3.08)<1e-9);assert.equal(B.x,5);assert.equal(B.y,40);
 assert.equal(VFX.ink(b),false,'the same building inside the cooldown does not stack');
 VFX.step(.016,8);assert.equal(VFX.ink(b),true,'after the cooldown it sweeps again');
 for(let i=0;i<20;i++)VFX.ink({...b,id:100+i});
 assert.equal(VFX.U.uInkA.value.length,6,'six slots, reused');
});

test('reduced motion keeps feedback but nothing travels',()=>{
 const {VFX}=load({reduce:true});const scene=new THREE.Scene();VFX.init(scene,shared(),null);VFX.step(.016,3);
 assert.equal(VFX.U.uVfxRM.value,1);
 const bursts=scene.children.find(m=>m.userData.vfx==='bursts'),rings=scene.children.find(m=>m.userData.vfx==='rings');
 assert.equal(VFX.burst(0,10,0,'#F2B85B'),true,'reduced motion still shows a still halo');
 assert.ok(bursts.material.uniforms.uB.value.every(v=>v.w===-99),'no particle burst was fired');
 assert.ok(rings.geometry.attributes.iA.getW(0)===3,'the halo ring was placed');
 assert.equal(VFX.trail({},0,0,0,'#fff'),false,'no lift sparks');
 assert.match(VFX.INK_GLSL,/uVfxRM/);
});

test('shader snippets declare what they use and loops stay WebGL1-legal',()=>{
 const {VFX}=load();
 for(const k of Object.keys(VFX.U))assert.match(VFX.DECL,new RegExp('uniform (float|vec4) '+k+'\\b'),k+' declared');
 assert.match(VFX.INK_GLSL,/for\(int i=0;i<6;i\+\+\)/);assert.doesNotMatch(VFX.INK_GLSL,/while|uInkA\[[a-z_]+[^i\]]/);
 // water snippet relies on the water shader's own locals; keep that contract visible
 for(const local of ['p','N','R','dE','fres','streak','up'])assert.match(VFX.WATER_GLSL,new RegExp('\\b'+local+'\\b'));
 const G={uniforms:{uRes:{value:new THREE.Vector2()}},fragmentShader:'uniform float uGrain;varying vec2 vUv;void main(){vec3 c=vec3(0.0);\n  gl_FragColor=vec4(c,1.0);\n}'};
 VFX.patchGrade(G);const once=G.fragmentShader;VFX.patchGrade(G);assert.equal(G.fragmentShader,once,'idempotent');
 assert.ok(G.uniforms.uVig&&G.uniforms.uGain&&G.uniforms.uLift);assert.match(once,/uVig/);
 const night=VFX.grade(1,-.2),day=VFX.grade(0,.8),gold=VFX.grade(0,.08);
 assert.ok(night.threshold<day.threshold&&night.radius>day.radius,'night blooms more');
 assert.ok(gold.gain[0]>day.gain[0]&&gold.gain[2]<day.gain[2],'low sun warms the grade');
 assert.ok([night,day,gold].every(g=>g.vig>0&&g.vig<.2),'the vignette stays subtle');
});

test('weather adjusts the sky key without accumulating across calls',()=>{
 const {VFX}=load();VFX.init(new THREE.Scene(),shared(),null);VFX.setWeather('rain');
 const key=()=>({cloud:.3,csh:.16,sunI:1.8,bloom:.3,stars:1});
 const a=key(),b=key();VFX.adjustSky(a);VFX.adjustSky(b);
 assert.deepEqual(a,b);assert.ok(a.cloud>.3&&a.sunI<1.8&&a.stars<1);
 VFX.setWeather(null);
});

test('context loss is prevented, reported both ways, and the guard can be removed',()=>{
 const {VFX}=load();const ev=new Map();let prevented=0,lost=0,back=0;
 const canvas={addEventListener:(t,f)=>ev.set(t,f),removeEventListener:(t)=>ev.delete(t)};
 const off=VFX.guardContext(canvas,{onLost:()=>lost++,onRestored:()=>back++});
 ev.get('webglcontextlost')({preventDefault:()=>prevented++});ev.get('webglcontextrestored')({});
 assert.deepEqual([prevented,lost,back],[1,1,1]);off();assert.equal(ev.size,0);
});

test('campus and title wire the effects layer and the closed gaps stay closed',()=>{
 const campus=fs.readFileSync('web-src/c_campus.js','utf8'),title=fs.readFileSync('web-src/f_title.js','utf8'),boot=fs.readFileSync('web-src/e_boot.js','utf8'),build=fs.readFileSync('scripts/build_web.py','utf8');
 assert.ok(build.indexOf('"b_vfx.js"')>0&&build.indexOf('"b_vfx.js"')<build.indexOf('"c_campus.js"'),'b_vfx loads before the campus');
 const MODE=campus.match(/const MODE_ORDER=(\[[^\]]+\])/)[1];assert.ok(JSON.parse(MODE).includes('dawn'),'the time button reaches dawn');
 assert.doesNotMatch(campus,/if\(mode==="dawn"\)mode="auto"/);
 const agents=campus.slice(campus.indexOf('function stepAgents('),campus.indexOf('function pathLength('));
 assert.doesNotMatch(agents,/new THREE\./,'no per-frame allocation in the agent step');assert.doesNotMatch(agents,/setTimeout/,'no timers in the frame loop');
 assert.match(agents,/HUDDLES/);assert.doesNotMatch(campus,/const HUDDLE=/,'huddle state is per roof');
 const celebrate=campus.slice(campus.indexOf('function celebrate('),campus.indexOf('function ink('));
 assert.doesNotMatch(celebrate,/BufferGeometry|PointsMaterial|Math\.random/);assert.doesNotMatch(celebrate,/if\(!b\|\|reduced\)return/);
 const frame=campus.slice(campus.indexOf('function frame(t)'),campus.indexOf('// ---------- quality tier'));
 assert.doesNotMatch(frame,/roofProps\.visible=true/);assert.match(frame,/glLost/);assert.match(frame,/MID/);
 assert.doesNotMatch(campus,/\(introStart<0\?1:1\)/);
 assert.match(campus,/const QUALITY=|let QUALITY/);assert.doesNotMatch(campus,/const QUALITY=store/,'quality is not frozen at module load');
 assert.match(campus,/function readQuality\(/);assert.match(campus,/applyQuality\(\)/);
 assert.match(campus,/guardGL\(\)/);assert.match(campus,/function restoreGL\(/);assert.match(campus,/webglcontextlost|VFX\.guardContext/);
 assert.match(title,/VFX\.guardContext\(canvas/);assert.match(title,/if\(ctxLost\)return/);
 const hook=boot.slice(boot.indexOf('Campus.onFrame('),boot.indexOf('Campus.onFrame(')+200);assert.doesNotMatch(hook,/new THREE\.Vector3/,'audio listener reuses its vector');
 assert.match(campus,/function pulse\(name\)[^\n]*ink\(name\)/,'live note writes reach the world');
});
