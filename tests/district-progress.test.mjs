import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {PGlite} from '@electric-sql/pglite';

test('district journeys isolate members and require completed, linked team work without XP writes',async()=>{
 const db=new PGlite();
 try {
  await db.exec(`create role anon; create role authenticated; create schema auth;
   create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
   grant usage on schema auth to authenticated;
   create table team_members(user_id uuid primary key);
   create function is_team() returns boolean language sql security definer stable as $$select exists(select 1 from team_members where user_id=auth.uid())$$;
   create table notes(name text primary key,folder text);
   create table tasks(id text primary key,note text,status text,result text,done_at timestamptz);
   insert into team_members values('11111111-1111-4111-8111-111111111111'),('22222222-2222-4222-8222-222222222222');
   insert into notes values('Finance proof','06 - Finance/Revenue');
   insert into tasks values('done','Finance proof','done','Validated forecast',now()),('open','Finance proof','open',null,null),('empty','Finance proof','done','',now());`);
  await db.exec(fs.readFileSync('supabase/migrations/20261006150000_district_journeys.sql','utf8'));
  await db.exec(`set role authenticated;select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',false)`);
  await db.exec(`select record_district_progress('06 - Finance','visit');select record_district_progress('06 - Finance','shortlist',true);select record_district_progress('06 - Finance','evidence',false,'done');select record_district_progress('06 - Finance','evidence',false,'done')`);
  assert.equal((await db.query('select count(*)::int as n from district_work_evidence')).rows[0].n,1);
  const journey=(await db.query('select * from district_journeys')).rows[0];
  assert.equal(journey.shortlisted,true); assert.ok(journey.first_visit); assert.ok(journey.last_visit);
  for(const task of ['open','empty','missing']) await assert.rejects(()=>db.exec(`select record_district_progress('06 - Finance','evidence',false,'${task}')`),/Completed task/);
  await assert.rejects(()=>db.exec(`select record_district_progress('09 - Projects','evidence',false,'done')`),/Completed task/);
  await assert.rejects(()=>db.exec(`select record_district_progress('12 - Fake','visit')`),/Unknown district/);
  await assert.rejects(()=>db.exec(`select record_district_progress('Daily','award_xp')`),/Unknown action/);
  await assert.rejects(()=>db.exec(`insert into district_journeys(user_id,district) values(auth.uid(),'Daily')`),/permission denied/);
  await assert.rejects(()=>db.exec(`update district_work_evidence set task_id='open'`),/permission denied/);
  await db.exec(`select set_config('request.jwt.claim.sub','22222222-2222-4222-8222-222222222222',false)`);
  assert.equal((await db.query('select count(*)::int as n from district_journeys')).rows[0].n,0);
  assert.equal((await db.query('select count(*)::int as n from district_work_evidence')).rows[0].n,0);
  await db.exec(`select record_district_progress('Daily','visit')`);
  assert.equal((await db.query('select district from district_journeys')).rows[0].district,'Daily');
  await db.exec(`select set_config('request.jwt.claim.sub','33333333-3333-4333-8333-333333333333',false)`);
  await assert.rejects(()=>db.exec(`select record_district_progress('Daily','visit')`),/Vault member required/);
  await db.exec('set role anon');
  await assert.rejects(()=>db.exec(`select record_district_progress('Daily','visit')`),/permission denied/);
 }finally{await db.close()}
});
