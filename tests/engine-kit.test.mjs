import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {Vector3} from '@babylonjs/core/Maths/math.vector.js';
import {Curve3} from '@babylonjs/core/Maths/math.path.js';
function fixture(reduced=false){let cancelled=0,animated=0;const c=vm.createContext({VaultLibraries:{Vector3,Curve3,animate(){animated++;return{cancel(){cancelled++}}}},matchMedia:()=>({matches:reduced})});vm.runInContext(fs.readFileSync('web-src/b_engine.js','utf8')+'\nthis.engine=VaultEngine',c);return{engine:c.engine,counts:()=>({cancelled,animated})}}
test('Babylon rails retain endpoints and sample continuous finite authored positions',()=>{
 const {engine}=fixture(),p=[[0,2,12],[1,3,8],[2,4,4],[3,5,0]];
 assert.deepEqual(Array.from(engine.sampleRoute(p,0)),p[0]);assert.deepEqual(Array.from(engine.sampleRoute(p,1)),p.at(-1));
 let prev=p[0];for(let i=1;i<=100;i++){const n=engine.sampleRoute(p,i/100);assert.ok(n.every(Number.isFinite));assert.ok(Math.hypot(...n.map((v,k)=>v-prev[k]))<.3);prev=n}
 assert.throws(()=>engine.sampleRoute([[0,0,0],[Infinity,1,2]],.2),/finite/);
});
test('reader transitions cancel previous animation and respect reduced motion',()=>{
 const f=fixture(),el={style:{}};f.engine.reveal(el);f.engine.reveal(el);assert.deepEqual(f.counts(),{cancelled:1,animated:2});
 const r=fixture(true);r.engine.reveal(el);assert.equal(el.style.opacity,'1');assert.equal(r.counts().animated,0);
});
test('native Catmull-Rom rail matches the Babylon spline it replaced, sample for sample',()=>{
 const c=vm.createContext({matchMedia:()=>({matches:false})});vm.runInContext(fs.readFileSync('web-src/b_engine.js','utf8')+'\nthis.engine=VaultEngine',c);
 const routes=[[[0,2,12],[1,3,8],[2,4,4],[3,5,0]],[[-4,1,0],[6,9,-2]],[[0,0,0],[10,5,3],[2,8,-7],[12,1,1],[5,5,5]]];
 for(const p of routes){
  const ref=Curve3.CreateCatmullRomSpline(p.map(v=>new Vector3(...v)),48,false).getPoints();
  for(let i=0;i<=200;i++){const t=i/200,at=t*(ref.length-1),k=Math.floor(at),a=ref[k],b=ref[Math.min(k+1,ref.length-1)],f=at-k;
   const want=t===0?p[0]:t===1?p.at(-1):[a.x+(b.x-a.x)*f,a.y+(b.y-a.y)*f,a.z+(b.z-a.z)*f];
   const got=c.engine.sampleRoute(p,t);want.forEach((v,j)=>assert.ok(Math.abs(v-got[j])<1e-9,`t=${t} axis ${j}: ${got[j]} vs ${v}`))}
 }
});
test('reveal falls back to the Web Animations API and the page no longer ships the library bundle',()=>{
 const c=vm.createContext({matchMedia:()=>({matches:false})});vm.runInContext(fs.readFileSync('web-src/b_engine.js','utf8')+'\nthis.engine=VaultEngine',c);
 let frames=null,cancelled=0;const el={style:{},animate(k,o){frames={k,o};return{cancel(){cancelled++}}}};
 c.engine.reveal(el);c.engine.reveal(el);assert.equal(frames.k.length,2);assert.equal(frames.o.duration,280);assert.equal(cancelled,1);
 const plain={style:{}};c.engine.reveal(plain);assert.equal(plain.style.opacity,'1');
 assert.equal(c.engine.easeInOut(0),0);assert.equal(c.engine.easeInOut(1),1);assert.ok(Math.abs(c.engine.easeInOut(.5)-.5)<1e-12);
 assert.doesNotMatch(fs.readFileSync('web-src/a_head.html','utf8'),/vault-libraries\.js/);
 assert.doesNotMatch(fs.readFileSync('scripts/build_vendor.mjs','utf8'),/outfile: 'web\/vendor\/vault-libraries/);
});
test('offline shell registers only on https (or localhost with ?sw=1) and versions the worker by build',()=>{
 const run=(loc)=>{const reg=[];const c=vm.createContext({matchMedia:()=>({matches:false}),navigator:{serviceWorker:{register:u=>{reg.push(u);return Promise.resolve()}}},location:loc,document:{readyState:'complete'},addEventListener(){},VAULT_BUILD:{version:'9.9.9'},console});
  vm.runInContext(fs.readFileSync('web-src/b_engine.js','utf8'),c);return reg};
 assert.deepEqual(run({protocol:'https:',hostname:'vault.example',search:''}),['sw.js?v=9.9.9']);
 assert.deepEqual(run({protocol:'http:',hostname:'vault.example',search:''}),[]);
 assert.deepEqual(run({protocol:'http:',hostname:'localhost',search:''}),[]);
 assert.deepEqual(run({protocol:'http:',hostname:'localhost',search:'?sw=1'}),['sw.js?v=9.9.9']);
 // review fix: a content hash, when the build bakes one, keys the cache so a deploy without a version bump still rotates it
 {const reg=[];const c=vm.createContext({matchMedia:()=>({matches:false}),navigator:{serviceWorker:{register:u=>{reg.push(u);return Promise.resolve()}}},location:{protocol:'https:',hostname:'vault.example',search:''},document:{readyState:'complete'},addEventListener(){},VAULT_BUILD:{version:'9.9.9',hash:'abc123def456'},console});
  vm.runInContext(fs.readFileSync('web-src/b_engine.js','utf8'),c);assert.ok(reg.includes('sw.js?v=abc123def456'),'registers with the content hash')}
 {const fresh=new Function(fs.readFileSync('web/sw.js','utf8').match(/const FRESH=(\/.*\/);/)[1].replace(/^/,'return '))();
  assert.ok(fresh.test('/assets/guides/manifest.json'),'portrait manifest is network-first');assert.ok(!fresh.test('/assets/guides/warden-x.webp'))}
 const sw=fs.readFileSync('web/sw.js','utf8');assert.match(sw,/network-first/i);assert.match(sw,/vendor\//);assert.match(sw,/config\.js/);
 assert.doesNotMatch(sw,/supabase\.co/);
});
