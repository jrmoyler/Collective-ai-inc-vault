import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {PGlite} from '@electric-sql/pglite';

const JR='11111111-1111-4111-8111-111111111111',DEVON='22222222-2222-4222-8222-222222222222';
async function setup(seed){
 const db=new PGlite();
 await db.exec(`create role anon;create role authenticated;create schema auth;
  create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
  grant usage on schema auth to authenticated;grant usage on schema public to authenticated;
  create table public.team_members(user_id uuid primary key,display_name text,role text default 'member');
  create table public.agents(id text primary key,name text);
  create function public.is_team() returns boolean language sql stable security definer as $$select exists(select 1 from public.team_members where user_id=auth.uid())$$;
  create table public.activity(id bigint generated always as identity primary key,ts timestamptz not null default now(),actor text not null,actor_kind text not null default 'agent',kind text not null,text text,note text,task text);
  create table public.tasks(id text primary key,title text,note text,priority text default 'medium',status text default 'open',agent text,requested_by text,done_at timestamptz);
  create publication supabase_realtime;
  insert into public.team_members values('${JR}','JR','owner'),('${DEVON}','Devon','member');
  insert into public.agents values('codex','Codex'),('claude-code','Claude Code');
  ${seed||''}`);
 await db.exec(fs.readFileSync('supabase/migrations/20261006090000_sentinel_play.sql','utf8'));
 await db.exec(fs.readFileSync('supabase/migrations/20261006120000_sentinel_play_fixes.sql','utf8'));
 await db.exec(`grant insert,select on public.activity to authenticated;grant select,update on public.tasks to authenticated;grant select on public.agent_stats to authenticated`);
 return db;
}
const as=(db,uid)=>db.exec(`set role authenticated;select set_config('request.jwt.claim.sub','${uid}',false)`);
const svc=db=>db.exec(`reset role;select set_config('request.jwt.claim.sub','',false)`);
const stat=async(db,actor)=>(await db.query(`select * from agent_stats where actor=$1`,[actor])).rows[0];

test('a signed-in person cannot write activity, or XP, under another name',async()=>{
 const db=await setup();
 try{
  await as(db,DEVON);
  await db.exec(`insert into activity(actor,actor_kind,kind,note) values('JR','human','created','Alpha'),('codex','human','created','Beta')`);
  await svc(db);
  assert.deepEqual((await db.query(`select distinct actor from activity`)).rows,[{actor:'Devon'}]);
  assert.equal((await stat(db,'Devon')).xp,60);
  assert.equal(await stat(db,'JR'),undefined);
  assert.equal(await stat(db,'codex'),undefined);
  // Service-role writes (agent-api) keep the agent identity.
  await db.exec(`insert into activity(actor,kind,note) values('codex','created','Gamma')`);
  assert.equal((await stat(db,'codex')).xp,30);
 }finally{await db.close()}
});

test('say targets that are not a real agent or member do not get a stats row',async()=>{
 const db=await setup();
 try{
  await db.exec(`insert into activity(actor,kind,text,target) values('codex','say','hi','nobody-real'),('codex','say','hi','claude-code')`);
  assert.equal(await stat(db,'nobody-real'),undefined);
  assert.equal((await stat(db,'claude-code')).counters.heard,1);
  assert.deepEqual((await stat(db,'codex')).peers,{'claude-code':1});
 }finally{await db.close()}
});

test('a task bounty pays once across reopen and done cycles, and clients cannot reset the marker',async()=>{
 const db=await setup();
 try{
  await db.exec(`insert into tasks(id,title,priority,status,agent,requested_by) values('CV-9','x','high','claimed','codex','JR')`);
  await db.exec(`update tasks set status='done',done_at=now() where id='CV-9'`);
  assert.equal((await stat(db,'codex')).xp,120);
  await as(db,JR);
  await db.exec(`update tasks set status='open',agent=null,bounty_paid_at=null where id='CV-9'`);
  await db.exec(`update tasks set status='claimed',agent='codex' where id='CV-9'`);
  await db.exec(`update tasks set status='done' where id='CV-9'`);
  await svc(db);
  const s=await stat(db,'codex');
  assert.equal(s.xp,120);
  assert.equal(s.counters.done,1);
  assert.equal((await stat(db,'JR')).xp,15);
 }finally{await db.close()}
});

test('the league reads week_xp as 0 for anyone idle this week',async()=>{
 const db=await setup(`insert into public.activity(ts,actor,kind,note) values(now()-interval '15 days','codex','created','Old'),(now(),'claude-code','edited','New');`);
 try{
  const rows=(await db.query(`select actor,week_xp,xp from agent_league order by actor`)).rows;
  assert.deepEqual(rows,[{actor:'claude-code',week_xp:12,xp:12},{actor:'codex',week_xp:0,xp:30}]);
 }finally{await db.close()}
});

test('rebuild orders activity and completed tasks in one timeline, so streaks span both',async()=>{
 const db=await setup(`insert into public.activity(ts,actor,kind,note) values(now()-interval '2 days','codex','created','A'),(now(),'codex','edited','A');
  insert into public.tasks values('CV-1','t','A','low','done','codex',null,now()-interval '1 day');`);
 try{
  const s=await stat(db,'codex');
  assert.equal(s.xp,30+50+12);
  assert.equal(s.streak,3,'day 1 activity, day 2 task, day 3 activity');
  assert.equal(s.best_streak,3);
 }finally{await db.close()}
});
