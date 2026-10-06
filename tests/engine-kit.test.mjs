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
