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
const rebuildCode=source.slice(source.indexOf('function rebuild('),source.indexOf('function boot()'));
function rebuildFixture(walking=false,blocked=false){
 const c=vm.createContext({C:{ok:true},sel:0,NOTES:[{id:0,name:'Selected source'}],cam:{tx:5,tz:8,yaw:.6,pitch:.4,dist:90},goal:{tx:6,tz:9,yaw:.7,pitch:.5,dist:95},walk:walking,auto:false,cur:null,byName:new Map([['Selected source',{id:0,name:'Selected source'}]]),nbr:new Map(),AG:new Map(),lastAgents:[],dirty:false,NAV:{ox:0,oz:0,cell:3},build(){c.cam.tx=100;c.goal.tx=100},select(){c.goal.yaw=9},setAgents(){},applyState(){},applyCamera(){c.applied=true},cellOf:()=>[1,1],free:(x,z)=>!blocked||x===2&&z===2,nearestFree:()=>[2,2],collide(){},exitWalk(){c.walk=false}});
 vm.runInContext(rebuildCode,c);return c;
}
test('catalog rebuild optionally preserves orbit view and walking heading',()=>{
 const c=rebuildFixture();c.rebuild(new Set(),{preserveCamera:true});assert.equal(c.cam.tx,5);assert.equal(c.goal.tx,6);assert.equal(c.goal.yaw,.7);assert.equal(c.auto,false);assert.equal(c.applied,true);
 const plain=rebuildFixture();plain.rebuild(new Set());assert.equal(plain.cam.tx,100);
 const walk=rebuildFixture(true,true);walk.rebuild(new Set(),{preserveCamera:true});assert.equal(walk.walk,true);assert.equal(walk.cam.tx,7.5);assert.equal(walk.goal.tz,7.5);assert.equal(walk.goal.yaw,.7);
});
test('three extreme visible frames reduce resolution, while isolated stalls and invalid samples do not',()=>{
 const src=fs.readFileSync('web-src/c_campus.js','utf8');const code=src.slice(src.indexOf('const renderBudget='),src.indexOf('function frame(t)'));
 const c=vm.createContext({resize:()=>c.resizes++,resizes:0});vm.runInContext(code+'\nthis.budget=renderBudget',c);
 c.sampleRenderBudget(800);assert.equal(c.budget.scale,1);assert.equal(c.budget.samples,0);
 c.sampleRenderBudget(16);assert.equal(c.budget.extreme,0);
 c.sampleRenderBudget(200);c.sampleRenderBudget(300);assert.equal(c.budget.scale,1);c.sampleRenderBudget(400);assert.equal(c.budget.scale,.85);assert.equal(c.resizes,1);
 c.sampleRenderBudget(300);c.sampleRenderBudget(300);c.sampleRenderBudget(NaN);assert.equal(c.budget.extreme,0);c.sampleRenderBudget(300);assert.equal(c.budget.scale,.85);
 for(let i=0;i<30;i++)c.sampleRenderBudget(1000);assert.equal(c.budget.scale,.6);assert.ok(c.resizes<=3);
 for(let i=0;i<450;i++)c.sampleRenderBudget(16);assert.equal(c.budget.scale,.7);
});
