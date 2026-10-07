// Warden dialogue, behaviour and portrait chain, run against fixture NOTES and a Live snapshot in a sandbox (no WebGL).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const src=fs.readFileSync('web-src/c_npc.js','utf8');
const DAY=864e5;
function sandbox({notes=[],tasks=[],presence=[],acts=[],agents=[],districts,worldTopCount,route,renderer=null,purpose}={}){
  const counter={worldTop:0},dl=districts||[{top:'09 - Projects',name:'Projects',color:'#FB923C',x:0,z:0,w:100,d:100}];
  const ctx=vm.createContext({
    THREE:{Vector3:class{set(){return this}copy(){return this}}},matchMedia:()=>({matches:false}),setInterval:()=>0,clearInterval:()=>{},setTimeout:()=>0,
    performance:{now:()=>0},innerWidth:1200,
    Campus:{districts:()=>dl,buildings:()=>({}),renderer:()=>renderer,route:route||((ax,az,bx,bz)=>[[bx,bz]])},
    Districts:{worldTop:n=>{counter.worldTop++;return n.top},get:folder=>purpose&&folder==='09 - Projects'?{purpose}:null},
    NOTES:notes,byName:new Map(notes.map(n=>[n.name,n])),
    Live:{snapshot:()=>({tasks,agents,presence,acts,stats:[]})},
    Identity:{preview:()=>'<svg data-fallback="1"></svg>'},
    ago:ts=>'recently',
    esc:s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;')
  });
  vm.runInContext(src+';this.guides=Guides;',ctx);
  return {G:ctx.guides,T:ctx.guides._test,ctx,counter};
}
const mk=(name,o={})=>({id:o.id??name.length,name,top:'09 - Projects',folder:'09 - Projects/Build',fm:{type:'plan',...(o.fm||{})},body:o.body||'Body',tags:new Set(),out:o.out||new Set(),back:o.back||new Set(),updated_at:o.updated_at,updated_by:o.updated_by});

test('district index runs worldTop once per note per rebuild and reindexes when notes change',()=>{
  const notes=[mk('Build Plan',{id:1}),mk('Launch Review',{id:2}),{...mk('Other Note',{id:3}),top:'08 - Research'}];
  const {T,counter,ctx}=sandbox({notes});
  for(let i=0;i<25;i++){T.notesIn('09 - Projects');T.inDistrict('09 - Projects','Build Plan')}
  assert.equal(counter.worldTop,3,'one worldTop call per note');
  assert.equal(T.notesIn('09 - Projects').length,2);assert.ok(!T.inDistrict('09 - Projects','Other Note'));
  ctx.NOTES.push(mk('Fresh Note',{id:4}));
  assert.equal(T.notesIn('09 - Projects').length,3,'length change rebuilds the index');
  assert.equal(counter.worldTop,7);
});

test('overview, what changed and landmarks answer only from loaded data',()=>{
  const now=Date.now(),notes=[mk('Build Plan',{id:1,updated_at:new Date(now-60e3).toISOString(),updated_by:'codex'}),mk('Old Plan',{id:2,updated_at:new Date(now-30*DAY).toISOString()}),mk('Project Map',{id:3,fm:{type:'moc'},updated_at:new Date(now-3*DAY).toISOString()})];
  const {T}=sandbox({notes,purpose:'Track active project work'});
  const o=T.overviewR('09 - Projects',{});
  assert.match(o.text,/^Track active project work\. 3 notes in 1 block\./);assert.match(o.html,/Project Map/);
  const w=T.whatsNewR('09 - Projects');
  assert.match(w.text,/1 note changed today, 2 notes in the last 7 days/);
  assert.ok(w.html.indexOf('Build Plan')<w.html.indexOf('Project Map'),'newest first');assert.doesNotMatch(w.html,/Old Plan/);
  assert.match(T.landmarksR('09 - Projects',{}).text,/No buildings are placed/);
});

test('who is here: live presence, then the last recorded activity, then nothing',()=>{
  const notes=[mk('Build Plan',{id:1})],now=new Date().toISOString(),old=new Date(Date.now()-3600e3).toISOString();
  let {T}=sandbox({notes,presence:[{agent:'codex',status:'writing',note:'Build Plan',last_seen:now},{agent:'cursor',status:'reading',note:'Build Plan',last_seen:old}],agents:[{id:'codex',name:'Codex'}]});
  let r=T.whoHereR('09 - Projects');assert.match(r.text,/^1 agent is working here now/);assert.match(r.html,/Codex · writing/);assert.doesNotMatch(r.html,/cursor/);
  ({T}=sandbox({notes,acts:[{actor:'hermes',kind:'write',note:'Build Plan',ts:old,text:'Added risks'}]}));
  r=T.whoHereR('09 - Projects');assert.match(r.text,/Last activity: hermes, recently/);assert.match(r.html,/Added risks/);
  ({T}=sandbox({notes}));assert.equal(T.whoHereR('09 - Projects').text,'No agent is standing in this district right now.');
});

test('open tasks sort by bounty and never include done or other-district work',()=>{
  const notes=[mk('Build Plan',{id:1})];
  const {T}=sandbox({notes,tasks:[{id:'L',title:'Low',note:'Build Plan',priority:'low',status:'open'},{id:'H',title:'High',note:'Build Plan',priority:'high',status:'claimed',agent:'codex'},{id:'X',title:'Done',note:'Build Plan',priority:'high',status:'done'},{id:'O',title:'Elsewhere',note:'Nowhere',priority:'high',status:'open'}]});
  const r=T.openTasksR('09 - Projects');
  assert.match(r.text,/^2 tasks not done here, 1 open/);assert.ok(r.html.indexOf('High')<r.html.indexOf('Low'));
  assert.match(r.html,/\+120 XP/);assert.doesNotMatch(r.html,/Done|Elsewhere/);
});

test('link suggestions find unlinked mentions and skip linked or partial-word matches',()=>{
  const roadmap=mk('Roadmap Review',{id:10}),plan=mk('Build Plan',{id:11,body:'See the roadmap review before shipping.'}),
    linked=mk('Linked Plan',{id:12,body:'Roadmap Review is linked.',out:new Set([10])}),partial=mk('Partial Plan',{id:13,body:'xroadmap reviewing'});
  const {T}=sandbox({notes:[roadmap,plan,linked,partial]});
  const r=T.linksR('09 - Projects');
  assert.match(r.text,/^1 note here names a neighbour without linking it/);assert.match(r.html,/Build Plan/);assert.match(r.html,/names Roadmap Review/);
  assert.doesNotMatch(r.html,/Linked Plan|Partial Plan/);
  const none=sandbox({notes:[roadmap,linked]}).T.linksR('09 - Projects');assert.match(none.text,/already links/);
});

test('archetypes lead with different facts, open differently and choose their own gesture',()=>{
  const {T}=sandbox();
  const stats={notes:4,blocks:2,changed:3,today:1,fresh:'Build Plan',open:2,live:2,here:1,who:['Codex'],tall:{name:'Tower',h:40},topType:['plan',4]};
  const lines=a=>T.barkLines({arch:a,stats,name:'Projects'});
  assert.match(lines('vanguard')[0],/2 open tasks point here/);assert.match(lines('herald')[0],/changed here today\. Latest: Build Plan/);
  assert.match(lines('archivist')[0],/3 notes changed here this week/);assert.match(lines('keeper')[0],/4 notes stand in 2 blocks/);
  assert.match(lines('herald')[1],/Codex is working here now/);
  assert.match(T.gateLine({arch:'vanguard',name:'Projects',stats}),/^I stand watch over Projects\. 1 note changed here today\./);
  assert.equal(T.gestOf({arch:'herald'},'present'),'present');assert.equal(T.gestOf({arch:'vanguard'},'present'),'point');
  assert.equal(T.gestOf({arch:'archivist'},'present'),'tome');assert.equal(T.gestOf({arch:'keeper'},'nod'),'nod');
  const ms=Object.values(T.VOICE).map(v=>v.ms);assert.equal(new Set(ms).size,4,'each archetype types at its own cadence');
  assert.equal(lines('keeper').filter(l=>/undefined|NaN/.test(l)).length,0);
});

test('keyboard: 1–9 choose, typing skips, arrows move by column on wide screens, Home and End jump',()=>{
  const {T}=sandbox(),n=T.CHOICES.length;
  assert.equal(n,9);
  for(let k=1;k<=9;k++)assert.deepEqual({...T.keyAction(String(k),{sel:0,typing:false,wide:true})},{act:'choose',i:k-1,skip:false});
  assert.equal(T.keyAction('0',{sel:0,typing:false,wide:true}),null);
  assert.deepEqual({...T.keyAction('Enter',{sel:4,typing:true,wide:true})},{act:'skip'});
  assert.deepEqual({...T.keyAction(' ',{sel:4,typing:false,wide:true})},{act:'choose',i:4});
  assert.deepEqual({...T.keyAction('3',{sel:0,typing:true,wide:true})},{act:'choose',i:2,skip:true},'a number finishes the line and picks');
  assert.equal(T.keyAction('ArrowRight',{sel:0,typing:true,wide:true}),null,'columns wait for the line');
  assert.deepEqual({...T.keyAction('ArrowRight',{sel:1,typing:false,wide:true})},{act:'move',i:4});
  assert.equal(T.keyAction('ArrowRight',{sel:1,typing:false,wide:false}),null);
  assert.deepEqual({...T.keyAction('End',{sel:1,typing:false,wide:false})},{act:'move',i:n-1});
  assert.deepEqual({...T.keyAction('Home',{sel:5,typing:false,wide:false})},{act:'move',i:0});
  assert.ok(T.CHOICES.some(c=>c.id==='links'));
});

test('the conversation closes only when both viewer and camera are past LEAVE_R',()=>{
  const {T}=sandbox(),g={x:0,z:0},R=T.LEAVE_R;
  assert.equal(T.leaving(g,R+1,0,R+5,0),true);
  assert.equal(T.leaving(g,R+1,0,10,0),false,'camera still close');
  assert.equal(T.leaving(g,5,0,R+40,0),false,'viewer still close');
});

test('Wardens walk Campus.route legs, face travel and call onArrive once',()=>{
  const route=(ax,az,bx,bz)=>[[10,0],[10,10],[bx,bz]];
  const {T}=sandbox({route});
  const m={pos:{x:0,z:0},grp:{position:{x:0,z:0}}},g={x:0,z:0,m,lbl:{},blb:{},path:null};let arrived=0;
  T.walkTo(g,20,10,10,'escort',()=>arrived++);
  assert.equal(g.mode,'escort');assert.equal(g.path.length,3);
  T.stepWalk(g,.5);assert.deepEqual([g.x,g.z],[5,0]);assert.ok(Math.abs(g.face-Math.PI/2)<1e-9);
  for(let i=0;i<10;i++)T.stepWalk(g,.5);
  assert.deepEqual([g.x,g.z],[20,10]);assert.equal(arrived,1);assert.equal(g.path,null);
  assert.equal(m.grp.position.x,20);assert.equal(g.lbl.z,10);
});

// Minimal 2D context and DOM stand-ins for the portrait chain.
function fakeCtx(){const calls=[];const grad={addColorStop(){}};return {calls,ctx:new Proxy({},{get:(t,k)=>k in t?t[k]:(k.startsWith('create')?()=>grad:(...a)=>{calls.push(k)}),set:(t,k,v)=>{t[k]=v;return true}})}}
function fakeEls(ctx){
  const cls=new Set(),img={classList:{add:c=>cls.add(c),remove:c=>cls.delete(c),has:c=>cls.has(c)},removeAttribute(){this.src=undefined},src:undefined,onload:null,onerror:null};
  const por={html:'',querySelector:()=>null,insertAdjacentHTML(_,h){this.html+=h}};
  return {img,cv:{style:{},getContext:()=>ctx},por,cls};
}
test('portrait chain: exact slug art, then live render, then painted bust, then SVG',()=>{
  const districts=[{top:'03 - Products',name:'Products',color:'#14B8A6'},{top:'13 - Learning and Curriculum',name:'Learning and Curriculum',color:'#14B8A6'}];
  const {T}=sandbox({districts});
  const g3={top:'03 - Products',name:'Products',color:'#14B8A6',arch:'herald',speakUntil:0},g13={top:'13 - Learning and Curriculum',name:'Learning and Curriculum',color:'#14B8A6',arch:'keeper',speakUntil:0};
  assert.equal(T.slug(g13.top),'13-learning-and-curriculum');
  T.setArt({kit:2,portraits:[{slug:'03-products',file:'warden-03-products.webp',arch:'herald',symbol:'PR',color:'#14B8A6'}]});
  assert.equal(T.artFor(g3),'assets/guides/warden-03-products.webp');
  assert.equal(T.artFor(g13),null,'a district sharing a colour never borrows another Warden');
  assert.equal(T.artFor({...g3,arch:'vanguard'}),null,'archetype drift drops the art');
  T.setArt({kit:1,portraits:[{slug:'03-products',arch:'herald',symbol:'PR',color:'#14B8A6'}]});assert.equal(T.artFor(g3),null,'stale kit revision');
  T.setArt({kit:2,portraits:[{slug:'03-products',file:'warden-03-products.webp',arch:'herald',symbol:'PR',color:'#14B8A6'}]});
  const {ctx,calls}=fakeCtx(),el=fakeEls(ctx);
  assert.equal(T.portraitSetup(g3,el),'art');assert.equal(el.img.src,'assets/guides/warden-03-products.webp');assert.ok(calls.length>0,'bust painted at once under the art');
  el.img.onload();assert.ok(el.cls.has('ok'));
  el.img.onerror();assert.equal(T.PT.stage,'live');assert.equal(el.img.src,undefined);assert.equal(T.artFor(g3),null,'failed file is not requested again');
  calls.length=0;T.portraitFrame(1);assert.equal(T.PT.stage,'paint','no renderer: painted bust');assert.ok(calls.includes('fillText')&&calls.includes('ellipse'));
  const none=fakeEls(null);assert.equal(T.portraitSetup(g13,none),'svg');assert.match(none.por.html,/data-fallback/);assert.equal(none.cv.style.display,'none');
});

test('shipped portrait manifest matches files on disk and the kit revision',()=>{
  const dir='web/assets/guides/',m=JSON.parse(fs.readFileSync(dir+'manifest.json','utf8'));
  assert.equal(m.kit,Number(src.match(/KIT_REV=(\d+)/)[1]));
  const slugs=new Set();
  for(const p of m.portraits){assert.ok(fs.existsSync(dir+p.file),p.file);assert.equal(p.file,`warden-${p.slug}.webp`);assert.ok(!slugs.has(p.slug));slugs.add(p.slug);assert.match(p.arch,/^(keeper|archivist|herald|vanguard)$/);assert.match(p.symbol,/^[A-Z]{2}$/)}
  for(const top of ['12 - Tools and Integrations','13 - Learning and Curriculum','14 - Governance and Decisions','15 - Clients and Delivery','16 - Facilities and Infrastructure','17 - Synergy Nodes'])assert.ok(m.portraits.some(p=>p.top===top),top);
  assert.equal(fs.readdirSync(dir).filter(f=>/^warden-[0-9a-f]{6}\.webp$/.test(f)).length,0,'no colour-keyed portraits remain');
  assert.ok(fs.existsSync('scripts/render_warden_portraits.mjs'));
});

test('next work never invents a priority: a task with none says so',()=>{
  const notes=[mk('Build Plan',{id:1})];
  const {T}=sandbox({notes,tasks:[{id:'N',title:'No priority yet',note:'Build Plan',status:'open'}]});
  const r=T.nextWorkR('09 - Projects');
  assert.match(r.text,/Its priority is not set\./);assert.doesNotMatch(r.text,/medium/);
  const j=fs.readFileSync('web-src/g_journey.js','utf8');assert.match(j,/t\.priority\|\|'priority not set'/);assert.doesNotMatch(j,/t\.priority\|\|'medium'/);
});
