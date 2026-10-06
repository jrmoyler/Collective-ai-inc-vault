import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {PGlite} from '@electric-sql/pglite';

test('play migration awards XP through triggers only, keeps streaks and messages, and blocks client writes',async()=>{
 const db=new PGlite();
 try{
  await db.exec(`create role anon;create role authenticated;create schema auth;
   create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
   grant usage on schema auth to authenticated;grant usage on schema public to authenticated;
   create table public.team_members(user_id uuid primary key,display_name text,role text default 'member');
   create function public.is_team() returns boolean language sql stable security definer as $$select exists(select 1 from public.team_members where user_id=auth.uid())$$;
   create table public.activity(id bigint generated always as identity primary key,ts timestamptz not null default now(),actor text not null,actor_kind text not null default 'agent',kind text not null,text text,note text,task text);
   create table public.tasks(id text primary key,title text,note text,priority text default 'medium',status text default 'open',agent text,requested_by text,done_at timestamptz);
   create publication supabase_realtime;
   insert into public.team_members values('11111111-1111-4111-8111-111111111111','JR','owner');
   insert into public.activity(ts,actor,kind,note) values(now()-interval '1 day','codex','created','Alpha');
   insert into public.tasks values('CV-001','Old task','Alpha','high','done','codex','JR',now());`);
  await db.exec(fs.readFileSync('supabase/migrations/20261006090000_sentinel_play.sql','utf8'));
  // Backfill: created 30 + high bounty 120 for codex; JR commissioned it for 15.
  let rows=(await db.query(`select actor,xp,streak from agent_stats order by actor`)).rows;
  assert.deepEqual(rows,[{actor:'JR',xp:15,streak:1},{actor:'codex',xp:150,streak:2}],'yesterday\'s note and today\'s finished task make a two-day streak');
  // A message with a target pays the speaker, records the peer on both sides and counts as heard for the target.
  await db.exec(`insert into activity(actor,kind,text,target,note) values('codex','say','Alpha is ready for review','claude-code','Alpha')`);
  rows=(await db.query(`select actor,xp,streak,peers,counters->>'heard' as heard from agent_stats order by actor`)).rows;
  assert.equal(rows.find(r=>r.actor==='codex').xp,154);
  assert.equal(rows.find(r=>r.actor==='codex').streak,2,'a second message today does not extend the streak');
  assert.deepEqual(rows.find(r=>r.actor==='codex').peers,{'claude-code':1});
  assert.deepEqual(rows.find(r=>r.actor==='claude-code').peers,{codex:1});
  assert.equal(rows.find(r=>r.actor==='claude-code').heard,'1');
  // Finishing pays the bounty once, through the task trigger, and 'finished' itself pays nothing.
  await db.exec(`insert into tasks(id,title,priority,status,agent) values('CV-002','Next','low','claimed','codex');update tasks set status='done' where id='CV-002';insert into activity(actor,kind,task) values('codex','finished','CV-002')`);
  assert.equal((await db.query(`select xp,counters->>'done' as done from agent_stats where actor='codex'`)).rows[0].xp,204);
  assert.equal((await db.query(`select counters->>'done' as done from agent_stats where actor='codex'`)).rows[0].done,'2','CV-001 from the backfill and CV-002 now');
  // Team members read ranks and memory; they cannot write them or call award_xp.
  await db.exec(`set role authenticated;select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',false)`);
  assert.equal((await db.query(`select count(*)::int as n from agent_stats`)).rows[0].n,3);
  await assert.rejects(()=>db.exec(`update agent_stats set xp=99999 where actor='JR'`),/permission denied/);
  await assert.rejects(()=>db.exec(`insert into sentinel_memory(actor,key,value) values('JR','k','1')`),/permission denied/);
  await assert.rejects(()=>db.exec(`select award_xp('JR','human',1000,null,null,current_date)`),/permission denied/);
 }finally{await db.close()}
});
