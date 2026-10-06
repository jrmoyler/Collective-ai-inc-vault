import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync('web-src/c_campus.js','utf8');
const massing=source.slice(source.indexOf('function districtStyle('),source.indexOf('function layout()'));
const ctx=vm.createContext({hash01:()=>.42});vm.runInContext(massing,ctx);
test('five district silhouettes are distinct and preserve walkable lot footprints',()=>{
 const silhouettes=new Set();
 for(let style=0;style<5;style++){
  const tiers=ctx.tiersFor(12,-8,14,10,45,.7,style);
  silhouettes.add(JSON.stringify(tiers));assert.equal(tiers[0].y0,0);assert.equal(tiers.at(-1).y1,45);
  tiers.forEach((t,i)=>{assert.ok(t.w>0&&t.d>0&&t.y1>t.y0);assert.ok(Math.abs(t.x-12)+t.w/2<=7+.00001);assert.ok(Math.abs(t.z+8)+t.d/2<=5+.00001);if(i)assert.equal(t.y0,tiers[i-1].y1)});
 }
 assert.equal(silhouettes.size,5);
});
test('district identity survives reordering and keeps compact buildings simple',()=>{
 assert.equal(ctx.districtStyle('03 - People'),3);assert.equal(ctx.districtStyle('13 - Examples'),3);
 assert.equal(ctx.tiersFor(0,0,8,8,9,.5,4).length,1);
});
const budget=source.slice(source.indexOf('const renderBudget='),source.indexOf('function frame(t)'));
test('render resolution backs off under sustained pressure and recovers with hysteresis',()=>{
 const c=vm.createContext({resize:()=>c.resizes++,resizes:0});vm.runInContext(budget+'\nthis.budget=renderBudget',c);
 for(let i=0;i<180;i++)c.sampleRenderBudget(35);assert.equal(c.budget.scale,.85);assert.equal(c.resizes,1);
 for(let i=0;i<360;i++)c.sampleRenderBudget(10);assert.equal(c.budget.scale,.85);
 for(let i=0;i<90;i++)c.sampleRenderBudget(10);assert.equal(c.budget.scale,.95);
 for(let i=0;i<2000;i++)c.sampleRenderBudget(80);assert.equal(c.budget.scale,.6);
 const before=c.budget.samples;c.sampleRenderBudget(Infinity);c.sampleRenderBudget(300);assert.equal(c.budget.samples,before);
});
