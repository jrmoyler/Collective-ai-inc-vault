import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {PGlite} from '@electric-sql/pglite';

test('award hardening blocks direct RPC access while actual activity and task triggers still pay once',async()=>{
 const db=new PGlite();
 try {
  await db.exec(`create role anon;create role authenticated;create schema auth;
   create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
   grant usage on schema auth to authenticated;
   create table team_members(user_id uuid primary key,display_name text);
   create table agents(id text primary key);
   create function is_team() returns boolean language sql stable security definer as $$select exists(select 1 from team_members where user_id=auth.uid())$$;
   create table activity(id bigint generated always as identity primary key,ts timestamptz default now(),actor text,actor_kind text default 'agent',kind text,text text,note text,task text);
   create table tasks(id text primary key,title text,note text,priority text default 'medium',status text default 'open',agent text,requested_by text,done_at timestamptz);
   create publication supabase_realtime;
   insert into team_members values('11111111-1111-4111-8111-111111111111','JR');
   insert into agents values('codex');`);
  for(const migration of ['20261006090000_sentinel_play.sql','20261006120000_sentinel_play_fixes.sql','20261006153000_award_function_hardening.sql']) await db.exec(fs.readFileSync('supabase/migrations/'+migration,'utf8'));
  const config=(await db.query(`select proname,proconfig from pg_proc where oid in ('public.xp_for(text)'::regprocedure,'public.task_bounty(text)'::regprocedure) order by proname`)).rows;
  assert.deepEqual(config,[{proname:'task_bounty',proconfig:['search_path=public']},{proname:'xp_for',proconfig:['search_path=public']}]);
  for(const role of ['anon','authenticated']) {
   const permissions=(await db.query(`select has_function_privilege($1,'public.activity_award()','execute') as activity,has_function_privilege($1,'public.tasks_award()','execute') as tasks`,[role])).rows[0];
   assert.deepEqual(permissions,{activity:false,tasks:false});
   await db.exec(`set role ${role}`);
   await assert.rejects(()=>db.exec('select public.activity_award()'),/permission denied/);
   await assert.rejects(()=>db.exec('select public.tasks_award()'),/permission denied/);
   await db.exec('reset role');
  }
  await db.exec(`grant insert on activity to authenticated;grant select,update on tasks to authenticated;
   insert into tasks(id,title,priority,status,agent) values('CV-proof','Work','high','claimed','codex');
   set role authenticated;select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',false);
   insert into activity(actor,actor_kind,kind,note) values('fake','human','created','Proof');
   update tasks set status='done',done_at=now() where id='CV-proof';
   update tasks set status='open',bounty_paid_at=null where id='CV-proof';
   update tasks set status='done' where id='CV-proof';
   reset role;`);
  const stats=(await db.query('select actor,xp from agent_stats order by actor')).rows;
  assert.deepEqual(stats,[{actor:'JR',xp:30},{actor:'codex',xp:120}]);
  assert.ok((await db.query(`select bounty_paid_at from tasks where id='CV-proof'`)).rows[0].bounty_paid_at);
 }finally{await db.close()}
});
