import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {PGlite} from '@electric-sql/pglite';

async function setup(){
 const db=new PGlite();
 await db.exec(`set timezone = 'UTC';create role anon;create role authenticated;create schema auth;
  create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
  grant usage on schema auth to authenticated;grant usage on schema public to authenticated;
  create table public.team_members(user_id uuid primary key,display_name text,role text default 'member');
  create table public.agents(id text primary key,name text);
  create function public.is_team() returns boolean language sql stable security definer as $$select exists(select 1 from public.team_members where user_id=auth.uid())$$;
  create table public.activity(id bigint generated always as identity primary key,ts timestamptz not null default now(),actor text not null,actor_kind text not null default 'agent',kind text not null,text text,note text,task text);
  create table public.tasks(id text primary key,title text,note text,priority text default 'medium',status text default 'open',agent text,requested_by text,done_at timestamptz);
  create publication supabase_realtime;
  insert into public.agents values('codex','Codex'),('hermes','Hermes');
  insert into public.activity(ts,actor,kind,note) values(now()-interval '6 days','hermes','created','Old'),(now()-interval '5 days','hermes','created','Older');`);
 for(const m of ['20261006090000_sentinel_play.sql','20261006120000_sentinel_play_fixes.sql','20261006153000_award_function_hardening.sql','20261009090000_rank_scoring.sql'])await db.exec(fs.readFileSync('supabase/migrations/'+m,'utf8'));
 return db;
}
const xp=async(db,a)=>(await db.query(`select xp from agent_stats where actor=$1`,[a])).rows[0]?.xp;

test('cheap kinds stop paying past their daily cap; real work keeps paying',async()=>{
 const db=await setup();
 try{
  await db.exec(`insert into activity(actor,kind) select 'codex','read' from generate_series(1,25)`);
  assert.equal(await xp(db,'codex'),40,'20 reads pay 2 each, the other 5 pay nothing');
  await db.exec(`insert into activity(actor,kind,text) select 'codex','say','hi' from generate_series(1,12)`);
  assert.equal(await xp(db,'codex'),80,'10 messages pay 4 each');
  await db.exec(`insert into activity(actor,kind,note) select 'codex','edited','Alpha' from generate_series(1,5)`);
  assert.equal(await xp(db,'codex'),116,'three edits of one note pay');
  await db.exec(`insert into activity(actor,kind,note) values('codex','edited','Beta'),('codex','created','Gamma')`);
  assert.equal(await xp(db,'codex'),158,'a different note and a new note still pay');
  const c=(await db.query(`select (counters->>'read')::int as r from agent_stats where actor='codex'`)).rows[0];
  assert.equal(c.r,25,'counters still count every row');
  // Yesterday's reads are a separate day: the cap resets.
  await db.exec(`insert into activity(ts,actor,kind) select now()-interval '1 day','codex','read' from generate_series(1,3)`);
  // Caps are per UTC day, so a full rebuild gives the same totals as the live trigger did.
  await db.exec(fs.readFileSync('supabase/migrations/20261009090000_rank_scoring.sql','utf8'));
  assert.equal(await xp(db,'codex'),164,'rebuild: 3 reads yesterday pay, the same totals today');
 }finally{await db.close()}
});

test('the league reads a lapsed streak as 0 and keeps a current one',async()=>{
 const db=await setup();
 try{
  await db.exec(`insert into activity(ts,actor,kind,note) values(now()-interval '1 day','codex','created','A'),(now(),'codex','created','B')`);
  const rows=(await db.query(`select actor,streak,best_streak from agent_league order by actor`)).rows;
  assert.deepEqual(rows,[{actor:'codex',streak:2,best_streak:2},{actor:'hermes',streak:0,best_streak:2}]);
  await db.exec(`set role authenticated`);
  await assert.rejects(()=>db.exec(`select public.activity_points(a) from activity a limit 1`),/permission denied/);
 }finally{await db.close()}
});

test('the Ranks tab ranks ties together, hides zero rows and lets old streaks lapse',async()=>{
  const src=fs.readFileSync('web-src/d_live.js','utf8');
  assert.match(src,/const liveStreak=r=>/);
  assert.match(src,/function standings\(rows,key\)/);
  assert.doesNotMatch(src,/x\.streak>1\?`🔥/,'league reads the live streak, not the stored one');
  // run the two helpers on their own
  const pick=name=>src.slice(src.indexOf(name)).split('\n')[0];
  const helpers=[pick('const utcDay='),pick('const liveStreak='),src.slice(src.indexOf('  function standings('),src.indexOf('\n  }\n',src.indexOf('  function standings('))+4)].join('\n');
  const f=new Function('agentName',helpers+';return {liveStreak,standings}');
  const {liveStreak,standings}=f(x=>x);
  const today=new Date().toISOString().slice(0,10);
  assert.equal(liveStreak({streak:6,last_day:'2020-01-01'}),0);
  assert.equal(liveStreak({streak:6,last_day:today}),6);
  const rows=standings([{actor:'b',week_xp:300,xp:10},{actor:'a',week_xp:300,xp:20},{actor:'c',week_xp:120,xp:900},{actor:'d',week_xp:0,xp:50}],'week_xp');
  assert.deepEqual(rows.map(r=>[r.actor,r.place,r.tied]),[['a',1,true],['b',1,true],['c',3,false]]);
});
