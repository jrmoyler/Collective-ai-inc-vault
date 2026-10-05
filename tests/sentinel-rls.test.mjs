import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {PGlite} from '@electric-sql/pglite';

test('Sentinel migration enforces account ownership and owner-only core assignment',async()=>{
 const db=new PGlite();
 try{
  // Reproduce the existing team/agent/auth contract in an isolated PostgreSQL engine.
  await db.exec(`create role anon;create role authenticated;create schema auth;
   create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
   grant usage on schema auth to authenticated;
   create table public.team_members(user_id uuid primary key,display_name text,role text default 'member');
   create table public.agents(id text primary key);
   create function public.is_team() returns boolean language sql stable security definer as $$select exists(select 1 from public.team_members where user_id=auth.uid())$$;
   create publication supabase_realtime;
   insert into public.team_members values('11111111-1111-4111-8111-111111111111','JR','owner'),('22222222-2222-4222-8222-222222222222','Devon','member');
   insert into public.agents values('claude');`);
  await db.exec(fs.readFileSync('supabase/migrations/20261005070000_sentinel_identity.sql','utf8'));
  await db.exec(`set role authenticated;select set_config('request.jwt.claim.sub','22222222-2222-4222-8222-222222222222',false)`);
  await db.exec(`insert into avatar_profiles(user_id) values(auth.uid())`);
  await assert.rejects(()=>db.exec(`insert into avatar_profiles(user_id) values('11111111-1111-4111-8111-111111111111')`),/row-level security/);
  await db.exec(`update avatar_profiles set palette=array['#123456','#ABCDEF','#00D9B5'] where user_id=auth.uid()`);
  await assert.rejects(()=>db.exec(`update avatar_profiles set form='jr' where user_id=auth.uid()`),/permission denied/);
  for(const palette of ["array[]::text[]","array['#123456',null,'#FFFFFF']","array['red','#000000','#FFFFFF']"]){
   await assert.rejects(()=>db.exec(`update avatar_profiles set palette=${palette} where user_id=auth.uid()`),/valid_palette/);
  }
  await db.exec(`insert into member_positions(user_id,session_id,x,z) values(auth.uid(),'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',1,2)`);
  await assert.rejects(()=>db.exec(`insert into member_positions(user_id,session_id,x,z) values('11111111-1111-4111-8111-111111111111','bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',1,2)`),/row-level security/);
  await assert.rejects(()=>db.exec(`insert into agent_sessions(user_id,session_id,agent) values(auth.uid(),'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','claude')`),/permission denied/);
  await assert.rejects(()=>db.exec(`select assign_core_sentinel(auth.uid(),'jr')`),/Owner required/);
  await db.exec(`select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',false)`);
  await db.exec(`select assign_core_sentinel(auth.uid(),'jr');select assign_core_sentinel('22222222-2222-4222-8222-222222222222','devon')`);
  assert.deepEqual((await db.query('select form from avatar_profiles order by form')).rows,[{form:'devon'},{form:'jr'}]);
 }finally{await db.close()}
});
