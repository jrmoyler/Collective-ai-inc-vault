import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';

// Sandbox the identity and mesh modules the way the other sentinel tests do. A stub VaultAudio records spatial tones.
const calls=[];
const context=vm.createContext({THREE,VaultAudio:{tone:(f,len,type,gain,o)=>{calls.push({f,o:{...o,position:o&&o.position?[...o.position]:null}});return {}},sfx:()=>null,names:()=>[]},
  document:{createElement:()=>({width:0,height:0,getContext:()=>({fillRect(){},fillText(){}})})}});
vm.runInContext(fs.readFileSync('web-src/b_identity.js','utf8')+fs.readFileSync('web-src/b_sentinel.js','utf8')+'\nthis.identity=Identity;this.mesh=SentinelMesh;this.crowd=SentinelCrowd;',context);
const {identity,mesh,crowd}=context;

function camera(x=0,y=12,z=40){const c=new THREE.PerspectiveCamera(48,1,2,5000);c.position.set(x,y,z);c.lookAt(0,3,0);c.updateMatrixWorld(true);return c}
function figure(id,x,z,phaseName='roof'){const m=mesh.create({id,form:'agent',level:7});m.pos.set(x,0,z);m.grp.position.copy(m.pos);m.phaseName=phaseName;m.info={id};const g=new THREE.Group();g.add(m.grp);return m}
// One city frame: reset positions from m.pos like the campus does, run the director around the poses.
function frame(AG,cam,t,status,dt=1/60){crowd.begin(AG,cam,t,{hi:true});AG.forEach(m=>{m.grp.position.copy(m.pos);mesh.pose(m,t,typeof status==='function'?status(m):status)});return crowd.end(AG,t,dt)}

test('distance LOD staggers far poses, skips figures outside the view and drops detail far away',()=>{
  const near=figure('near',0,0),far=figure('far',0,-400),behind=figure('behind',0,400);
  const AG=new Map([['near',near],['far',far],['behind',behind]]),cam=camera();
  frame(AG,cam,1,'working');for(const m of AG.values())m.lod.last=m.anim.t;
  let posed={near:0,far:0,behind:0};const count=()=>{for(const [k,m] of AG)posed[k]+=m.anim.t>=0&&m.lod.last!==m.anim.t?1:0;for(const m of AG.values())m.lod.last=m.anim.t};
  for(let i=1;i<=64;i++){frame(AG,cam,1+i/60,'walking');count()}
  assert.equal(near.lod.lvl,0);assert.ok(far.lod.lvl>=2);assert.equal(behind.lod.view,false,'figure behind the camera is out of the frustum');
  assert.ok(posed.near>=60,'near walker poses every frame');
  assert.ok(posed.far<=20&&posed.far>=4,'far walker poses at a fraction of the rate: '+posed.far);
  assert.equal(posed.behind,0,'out-of-view figure is not posed');
  assert.equal(far.plate.visible,false);assert.equal(near.plate.visible,true);
  // status props are dropped far away; the near figure keeps its slate
  for(let i=0;i<40;i++)frame(AG,cam,3+i/60,'working');
  assert.ok(near.props.slate&&near.props.slate.visible);assert.ok(!far.props.slate||!far.props.slate.visible);
  assert.ok(crowd.stats().culled>=1);
  for(const m of AG.values())mesh.dispose(m.grp);
});

test('calm figures ask for frames at most 30 times a second; walkers ask every frame',()=>{
  const m=figure('calm',0,0),AG=new Map([['calm',m]]),cam=camera();
  let asks=0;for(let i=0;i<120;i++)asks+=frame(AG,cam,10+i/120,'idle',1/120)?1:0;
  assert.ok(asks<=31&&asks>=25,'idle sentinels cap near 30 fps at a 120 Hz display: '+asks);
  m.phaseName='street';asks=0;for(let i=0;i<60;i++)asks+=frame(AG,cam,20+i/60,'walking')?1:0;
  assert.equal(asks,60);
  mesh.dispose(m.grp);
});

test('street walkers keep lanes apart and riders at one door take separate queue slots',()=>{
  const a=figure('lane-a',0,0,'street'),b=figure('lane-b',0,0,'street');a.path=b.path=[[0,-200]];a.leg=b.leg=0;
  const AG=new Map([['lane-a',a],['lane-b',b]]),cam=camera();
  for(let i=0;i<120;i++)frame(AG,cam,1+i/60,'walking');
  const gap=Math.hypot(a.grp.position.x-b.grp.position.x,a.grp.position.z-b.grp.position.z);
  assert.ok(gap>1.6,'two walkers on the same line separate: '+gap.toFixed(2));
  assert.equal(a.pos.x,0,'the travel position stays on the route; only the drawn figure is offset');
  for(const m of [a,b]){m.phaseName='lift';m.lift={x:10,z:10,h:30};m.home={cx:10,cz:0};m.pos.set(10,4,10)}
  for(let i=0;i<120;i++)frame(AG,cam,4+i/60,'lifting');
  const q=Math.hypot(a.grp.position.x-b.grp.position.x,a.grp.position.z-b.grp.position.z);
  assert.ok(q>1.5,'two lifts at the same door do not stack: '+q.toFixed(2));
  for(const m of AG.values())mesh.dispose(m.grp);
});

test('an identity rebuild keeps the pose, the emote and conversations, and plays the forge sweep',()=>{
  const old=mesh.create({id:'rebuild',form:'kenza',level:5}),AG=new Map([['rebuild',old]]),cam=camera();old.info={id:'rebuild'};new THREE.Group().add(old.grp);
  const partner=figure('partner',6,0);AG.set('partner',partner);
  for(let i=0;i<30;i++)frame(AG,cam,2+i/60,'working');
  assert.equal(crowd.converse(['rebuild'],['partner']),true);mesh.emote(old,'greet',2.5);
  const before=Array.from(old.anim.S);
  const next=mesh.create({id:'rebuild',form:'kenza',level:6});next.info={id:'rebuild'};mesh.carry(old,next,2.52);mesh.dispose(old.grp);old.grp.parent.remove(old.grp);new THREE.Group().add(next.grp);AG.set('rebuild',next);
  assert.deepEqual(Array.from(next.anim.S),before,'springs carry over');assert.equal(next.emote,'greet');assert.ok(next.anim.forgeT>=0&&next.anim.forgeAmp===1);
  frame(AG,cam,2.6,'working');
  assert.ok(next.uniforms.forge.value>0&&next.uniforms.forgeY.value>-1,'the forge band is lit and climbing');
  assert.ok(next.props.talk&&next.props.talk.visible,'the conversation beam moved to the rebuilt figure');
  for(let i=0;i<150;i++)frame(AG,cam,2.7+i/60,'working');
  assert.equal(next.uniforms.forge.value,0,'the sweep ends');
  const recolor=mesh.create({id:'rebuild',form:'kenza',level:6,palette:['#101010','#203040','#E0E0E0']});mesh.carry(next,recolor,6);assert.equal(recolor.anim.forgeAmp,.5,'a palette edit gets a lighter sweep');
  for(const m of [next,partner,recolor])mesh.dispose(m.grp);
});

test('a directed message turns speaker and listener toward each other, runs a beam, then clears',()=>{
  const a=figure('speaker',0,0),b=figure('listener',20,5),AG=new Map([['speaker',a],['listener',b]]),cam=camera(10,20,60);
  frame(AG,cam,1,'idle');
  assert.equal(crowd.converse(['nobody'],['listener']),false,'unknown ids do nothing');
  assert.equal(crowd.converse(['speaker'],['listener'],{ttl:3}),true);assert.equal(a.emote,'talk');assert.equal(b.emote,'nod');
  for(let i=0;i<60;i++)frame(AG,cam,1+i/60,'idle');
  assert.ok(a.lookAt&&b.lookAt);assert.ok(a.props.talk.visible);assert.ok(a.anim.lookW>.5,'the speaker turns its head toward the listener');
  const line=a.props.talk.children[0];assert.ok(Math.abs(line.scale.y-Math.hypot(20,5))<.5,'the beam spans chest to chest');
  for(let i=0;i<200;i++)frame(AG,cam,2+i/60,'idle');
  assert.equal(a.props.talk.visible,false);assert.equal(a.lookAt,null);assert.equal(b.lookAt,null);assert.equal(crowd.talks(),0);
  for(const m of AG.values())mesh.dispose(m.grp);
});

test('the nearest walkers make spatial footsteps, at most three figures, and lifts hum',()=>{
  calls.length=0;const AG=new Map(),cam=camera(0,10,30);
  for(let i=0;i<6;i++){const m=figure('step-'+i,(i-2.5)*6,0,'street');m.path=[[m.pos.x,-500]];m.leg=0;AG.set(m.info.id,m)}
  for(let i=0;i<240;i++)frame(AG,cam,1+i/60,'walking');
  assert.ok(calls.length>=6,'footsteps play: '+calls.length);
  const sources=new Set(calls.map(c=>c.o.position[0].toFixed(0)));assert.ok(sources.size<=3,'only the nearest three walkers step');
  assert.ok(calls.every(c=>c.o.position&&c.o.position.every(Number.isFinite)),'every step is positioned');
  calls.length=0;const r=figure('rider',0,0,'lift');r.lift={x:0,z:0,h:30};r.pos.y=10;AG.clear();AG.set('rider',r);
  for(let i=0;i<120;i++)frame(AG,cam,9+i/60,'lifting');
  assert.ok(calls.length>=2&&calls.length<=8,'lift hum repeats, rate limited: '+calls.length);
  for(const m of AG.values())mesh.dispose(m.grp);
});

test('new emotes stay finite, and the shader adds panel lines, edge wear and the forge band without assets',()=>{
  const m=mesh.create({id:'emotes',form:'jr',level:20});
  for(const e of ['talk','alert']){mesh.emote(m,e,50);for(let i=0;i<=mesh.EMOTES[e]*30+3;i++){mesh.pose(m,50+i/30,'idle');assert.ok(m.bones.every(b=>[b.rotation.x,b.rotation.y,b.rotation.z,b.position.y].every(Number.isFinite)),e)}assert.equal(m.emote,null)}
  for(const s of ['working','writing']){for(let i=0;i<40;i++)mesh.pose(m,60+i/30,s);assert.ok(m.props.spark.visible,s+' shows the hand light')}
  mesh.pose(m,70,'idle');for(let i=0;i<40;i++)mesh.pose(m,70+i/30,'idle');assert.equal(m.props.spark.visible,false);
  const wear=m.surfaces.armor.geometry.attributes.wear;assert.ok(wear&&wear.array.some(v=>v===1)&&wear.array.some(v=>v===0),'chamfer faces are marked for wear');
  const shader={uniforms:{},vertexShader:'#include <begin_vertex>',fragmentShader:'#include <color_fragment>\n#include <roughnessmap_fragment>\n#include <emissivemap_fragment>'};
  m.surfaces.armor.material.onBeforeCompile(shader);
  assert.match(shader.fragmentShader,/float sNoise\(/);assert.match(shader.fragmentShader,/sWear=vWear\*/);assert.match(shader.fragmentShader,/uForge/);assert.match(shader.vertexShader,/vWear=wear/);
  assert.ok(shader.uniforms.uForge&&shader.uniforms.uForgeY);
  const visor={uniforms:{},vertexShader:'#include <begin_vertex>',fragmentShader:'#include <color_fragment>\n#include <roughnessmap_fragment>\n#include <emissivemap_fragment>'};
  m.surfaces.visor.material.onBeforeCompile(visor);assert.match(visor.fragmentShader,/float sWear=0\.0/);assert.doesNotMatch(visor.fragmentShader,/vec3 pp=vLocal/);
  assert.match(m.surfaces.armor.material.customProgramCacheKey(),/v6/);
  mesh.dispose(m.grp);
});

test('rank chevrons sit proud of both pauldrons so they read',()=>{
  const plates=identity.blueprint('agent',{level:5}).parts.filter(p=>p.k===2&&Math.abs(p.h-.034)<1e-6&&p.slot==='torso');
  assert.equal(plates.length,10,'five chevrons a side');
  assert.ok(plates.every(p=>p.z-p.d/2>.3),'in front of the pauldron face');
  assert.equal(identity.blueprint('agent',{level:0}).parts.filter(p=>p.k===2&&Math.abs(p.h-.034)<1e-6).length,0);
});

test('the city loop and live feed are wired to the crowd director',()=>{
  const campus=fs.readFileSync('web-src/c_campus.js','utf8'),live=fs.readFileSync('web-src/d_live.js','utf8');
  const agents=campus.slice(campus.indexOf('function stepAgents('),campus.indexOf('function pathLength('));
  assert.match(agents,/SentinelCrowd\.begin\(AG,camera,time/);assert.match(agents,/live=SentinelCrowd\.end\(AG,time,dt\)/);
  assert.match(campus,/SentinelMesh\.carry\(prevM,m,time\)/);
  assert.match(live,/SentinelCrowd\.converse\(ids,to\)/);assert.match(live,/Campus\.emote\(id,'alert'\)/);
});

test('GPU reset: refreshEnvironment releases the whole PMREM target and repoints materials outside the scene',()=>{
  // a stub PMREM generator: each call returns a fresh render target whose dispose we can count
  let made=0;const targets=[];
  class FakePM{constructor(){}fromScene(){const rt={texture:new THREE.Texture(),disposed:0,dispose(){this.disposed++}};rt.texture.name='env'+(made++);targets.push(rt);return rt}dispose(){}}
  const ctx=vm.createContext({THREE:{...THREE,PMREMGenerator:FakePM},VaultAudio:{tone:()=>({}),sfx:()=>null,names:()=>[]},document:{createElement:()=>({width:0,height:0,getContext:()=>({fillRect(){},fillText(){}})})}});
  vm.runInContext(fs.readFileSync('web-src/b_identity.js','utf8')+fs.readFileSync('web-src/b_sentinel.js','utf8')+'\nthis.mesh=SentinelMesh;',ctx);
  const m=ctx.mesh,renderer={};const first=m.environment(renderer);assert.ok(first);
  // a material that is NOT in the scene (a portrait or reference render) still gets the new map
  const loose=new THREE.MeshStandardMaterial({envMap:first});m.useEnvironment(loose);assert.equal(m.envUsers(),1);
  const next=m.refreshEnvironment(renderer,new THREE.Scene());
  assert.notEqual(next,first);assert.equal(loose.envMap,next,'material outside the scene is repointed');
  assert.equal(targets[0].disposed,1,'the old render target (framebuffer and depth) is released, not only its texture');
  loose.dispose();assert.equal(m.envUsers(),0,'disposed materials leave the registry');
});
