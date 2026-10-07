// World pass (c_campus.js): far shore, sea traffic, birds, contact shadows, sky glides, moon phase, star turn,
// eased camera flights, orbit-eye collision, photo mode and frame-total renderer counters.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
const src=fs.readFileSync('web-src/c_campus.js','utf8');
const between=(a,b)=>{const i=src.indexOf(a),j=src.indexOf(b,i+1);assert.ok(i>=0&&j>i,`missing block ${a}`);return src.slice(i,j)};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const hash01=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return((h>>>0)%100000)/100000};

test('moon phase follows the synodic month and occupancy dims windows after midnight',()=>{
 const c=vm.createContext({clamp,SOL:{hours:21},mode:'auto',Date,THREE});
 vm.runInContext(between('// share of windows still lit','// the star field turns')+'\nthis.moonPhase=moonPhase;this.occupancy=occupancy;',c);
 assert.ok(c.moonPhase(Date.UTC(2000,0,6,18,14))<1e-6);
 const full=c.moonPhase(Date.UTC(2000,0,21,4,40));assert.ok(Math.abs(full-.5)<.03,'Jan 21 2000 was a full moon: '+full);
 assert.ok(Math.abs(c.moonPhase(Date.UTC(2026,9,7))-c.moonPhase(Date.UTC(2026,9,7)+29.530588853*864e5))<1e-6);
 const at=h=>{c.SOL.hours=h;return c.occupancy()};
 assert.equal(at(21),1);assert.ok(at(3.5)<.4);assert.ok(at(2)>at(3));assert.ok(at(6)>at(4));assert.equal(at(12),1);
 c.mode='night';assert.equal(c.occupancy(),.8);
});

test('manual time changes glide: halfway is between the keys, the end lands exactly, lamps sweep through',()=>{
 const NUM_KEYS=['sunI','win','stars'],COL_KEYS=['top'];
 const CUR={sunI:0,win:0,stars:0,top:new THREE.Color(),ui:'dark'};
 const pushed=[];let now=0;
 const uniforms={sunDisc:{value:0},sunDir:{value:new THREE.Vector3()},moonDir:{value:new THREE.Vector3()}};
 const c=vm.createContext({THREE,clamp,NUM_KEYS,COL_KEYS,CUR,SOL:{dir:new THREE.Vector3(0,1,0),moon:new THREE.Vector3(0,1,0),elev:30},mode:'day',
  skyMat:{uniforms},SH:{uSunDir:{value:new THREE.Vector3()}},pushSky:(d,up,m)=>pushed.push({win:CUR.win,up,m,d:d.clone()}),performance:{now:()=>now},
  easeIO:x=>{x=clamp(x,0,1);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2}});
 vm.runInContext(between('const SKYB=','// share of windows still lit')+'\nthis.SKYB=SKYB;this.snapSky=snapSky;this.step=stepSkyBlend;this.lerpSnap=lerpSnap;',c);
 Object.assign(CUR,{sunI:2,win:.3,stars:0,ui:'light'});CUR.top.setRGB(.4,.6,.9);const day=c.snapSky(new THREE.Vector3(.3,.8,.3).normalize(),true,0);
 c.mode='night';Object.assign(CUR,{sunI:.3,win:2.1,stars:1,ui:'dark'});CUR.top.setRGB(0,0,.05);const night=c.snapSky(new THREE.Vector3(.5,.4,.5).normalize(),false,1);
 assert.equal(day.disc,1);assert.equal(night.disc,0);
 Object.assign(c.SKYB,{from:day,to:night,t0:0,on:true});
 now=c.SKYB.dur*500;c.step();const mid=pushed.at(-1);assert.ok(mid.win>.3&&mid.win<2.1,'halfway window glow '+mid.win);
 assert.ok(uniforms.sunDisc.value>0&&uniforms.sunDisc.value<1);assert.ok(Math.abs(mid.d.length()-1)<1e-9);
 now=c.SKYB.dur*1000+1;c.step();assert.equal(CUR.win,2.1);assert.equal(CUR.ui,'dark');assert.equal(c.SKYB.on,false);
 assert.equal(c.step(),false,'an idle glide does not keep the frame loop awake');
 const half=c.lerpSnap(day,night,.5);assert.ok(Math.abs(half.win-1.2)<1e-9);
 // the whole sweep passes every lamp threshold (DMAT halo/head aTh in .04-.59), so lamps come on one by one
 assert.ok(src.includes('applyMode(m,true)'),'the time button animates');
 assert.match(src,/if\(animate&&shown&&!reduced&&C\.ok\)/,'reduced motion keeps the instant cut');
});

test('eased flights arc over the city, yield to direct camera placement, and land on the goal',()=>{
 const cam={tx:0,ty:0,tz:0,yaw:0,pitch:.6,dist:700},goal={...cam};
 const c=vm.createContext({clamp,cam,goal,time:0,reduced:false,walk:false,C:{ok:true},GSIDE:1000,Math});
 vm.runInContext(between('let flight=null;','// ---------- orbit camera collision')+'\nthis.fly=fly;this.step=stepFlight;this.f=()=>flight;',c);
 Object.assign(goal,{tx:300,tz:-200,dist:120,pitch:.5,yaw:1});c.fly();assert.ok(c.f(),'a long hop starts a flight');
 const dur=c.f().dur,arc=c.f().arc;assert.ok(dur>=1&&dur<=2.6);assert.ok(arc>0);
 c.time=dur/2;c.step();const linear=700+(120-700)*.5;assert.ok(cam.dist>linear,'mid-flight the camera lifts above the straight line');
 assert.ok(cam.tx>0&&cam.tx<300);
 c.time=dur+.01;c.step();assert.equal(cam.dist,120);assert.equal(cam.yaw,1);assert.equal(c.f(),null);
 Object.assign(goal,{tx:-300});c.fly();c.time+=.2;c.step();cam.tx=999;c.time+=.2;assert.equal(c.step(),false);assert.equal(c.f(),null,'a direct snap cancels the flight');
 goal.tx=cam.tx+2;c.fly();assert.equal(c.f(),null,'tiny moves stay on the damped follow');
 c.reduced=true;goal.tx=-500;c.fly();assert.equal(c.f(),null,'reduced motion never flies');
 assert.match(src,/function stopAuto\(\)\{auto=false;flight=null\}/);
});

test('the orbit eye stops short of a building between it and the target',()=>{
 const boxes=new Float32Array([40,0,-5,50,60,5]);
 const c=vm.createContext({cam:{tx:0,ty:10,tz:0},boxes,Math});
 vm.runInContext(between('let eyeDist=-1;','// ---------- perf:')+'\nthis.eye=eyeClear;',c);
 assert.ok(Math.abs(c.eye(1,0,0,100)-37.5)<1e-6,'stops 2.5 before the wall at x=40');
 assert.equal(c.eye(-1,0,0,100),100,'nothing behind');assert.equal(c.eye(1,0,0,500),500,'far views skip the test');
 c.cam.tx=45;assert.equal(c.eye(1,0,0,100),100,'a box holding the target is ignored');
});

test('far shore geometry: three hill rings, towns and a lighthouse, inside the sky dome and camera range',()=>{
 const c=vm.createContext({THREE,hash01,GSIDE:900,HI:true,Math});
 vm.runInContext(between('function horizonGeometry(){','function makeHorizon(){')+'\nthis.g=horizonGeometry();',c);
 const g=c.g,p=g.attributes.position.array,k=g.attributes.aKind.array;
 assert.equal(p.length/3,k.length);let maxR=0,minY=Infinity;
 for(let i=0;i<p.length;i+=3){maxR=Math.max(maxR,Math.hypot(p[i],p[i+2]));minY=Math.min(minY,p[i+1])}
 assert.ok(maxR<=2150+1e-6,'within the 2400 sky dome: '+maxR);assert.ok(minY<-.9,'skirts reach below the water line');
 const kinds=new Set(k);for(const want of [0,1,2,3])assert.ok(kinds.has(want),'kind '+want);
 assert.ok(p.length/9<4000,'bounded triangle count');assert.ok(Number.isFinite(g.userData.lamp[0]));
});

test('world pass is wired into the build, tiers, sky and frame loop with a bounded draw budget',()=>{
 assert.match(src,/uOcc:\{value:1\}/);assert.match(src,/uniform float uOcc;/);
 assert.match(src,/buildWorldEdge\(\); \/\/ world pass/);
 assert.match(src,/frameHooks\.push\(stepSkyBlend\)/);assert.match(src,/frameHooks\.push\(stepBlobs\)/);
 assert.match(src,/renderer\.info\.autoReset=false/);assert.match(src,/renderer\.info\.reset\(\)/);
 assert.match(src,/if\(AMB\|\|MID\)\{WORLDX\.boats=makeBoats/,'boats and birds only on tiers that run ambient frames');
 assert.match(src,/u\.uShoot\.value=\(AMB\|\|MID\)&&!reduced\?1:0/,'shooting stars need a running clock and motion');
 for(const u of ['uPhase','uBand','uStars','uShoot'])assert.ok(src.includes('uniform float '+u)||src.includes('uniform vec3 '+u),u);
 // contact shadows return false so a still crowd never keeps the loop awake
 assert.match(between('function stepBlobs(){','function buildWorldEdge(){'),/return false;/);
 // photo mode controls are reachable on touch (44 px) and the API is exported
 assert.match(src,/min-width:44px;min-height:44px/);assert.match(src,/photo:on=>on===undefined\?PHOTO\.on:setPhoto\(on\)/);
 assert.match(src,/perf:perfStats/);assert.match(src,/addShadowCaster:/);
 const names=[...src.matchAll(/mesh\.name="(horizon|boats|birds|contact-shadows)"|b\.name="birds"/g)];assert.ok(names.length>=3);
});
