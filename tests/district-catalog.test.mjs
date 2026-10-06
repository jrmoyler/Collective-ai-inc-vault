import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {PGlite} from '@electric-sql/pglite';

test('live district catalog preserves storage, resolves thematic placement, tracks source revisions, and denies spoofed coverage',async()=>{
 const db=new PGlite();
 try {
  await db.exec(`create role anon;create role authenticated;create role service_role;
   create schema auth;create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
   grant usage on schema auth to authenticated;
   create table team_members(user_id uuid primary key);
   insert into team_members values('11111111-1111-4111-8111-111111111111'),('22222222-2222-4222-8222-222222222222');
   create function is_team() returns boolean language sql security definer stable as $$select exists(select 1 from team_members where user_id=auth.uid())$$;
   create table notes(name text primary key,folder text,fm jsonb default '{}',body text,version int default 1,updated_at timestamptz default now(),updated_by text);
   alter table notes enable row level security;create policy team_notes on notes for select to authenticated using(is_team());grant select on notes to authenticated;
   create table tasks(id text primary key,note text,status text,result text,done_at timestamptz);
   insert into notes(name,folder,fm,body) values('Interface','03 - Products/Tools','{"type":"spec","source":"legacy-only","tags":["api"]}','Original truth');
   insert into tasks values('work','Interface','done','Verified interface',now());`);
  for(const migration of ['20261006150000_district_journeys.sql','20261006160000_district_catalog_provenance.sql'])await db.exec(fs.readFileSync('supabase/migrations/'+migration,'utf8'));
  await db.exec(`insert into vault_districts(id,title,kind,priority) values('12 - Tools and Integrations','Tools','thematic',100),('17 - Synergy Nodes','Synergy','thematic',105);
   insert into district_note_links values('12 - Tools and Integrations','Interface'),('17 - Synergy Nodes','Interface');
   insert into vault_source_collections(id,title,url) values('folder','Sources','https://drive.google.com/drive/folders/folder');
   insert into vault_source_documents(id,collection_id,title,url) values('doc','folder','API source','https://docs.google.com/document/d/doc/edit');
   insert into note_source_links(note_name,source_id,note_version) values('Interface','doc',1);
   set role authenticated;select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',false);`);
  const rows=(await db.query('select district_id,world_district_id,folder from district_content_catalog order by district_id')).rows;
  assert.equal(rows.length,3);
  assert.ok(rows.every(r=>r.folder==='03 - Products/Tools'&&r.world_district_id==='17 - Synergy Nodes'));
  const coverage=async()=>(await db.query(`select note_count,linked_note_count,reviewed_current_note_count from district_source_coverage where district_id='12 - Tools and Integrations'`)).rows[0];
  assert.deepEqual(await coverage(),{note_count:1,linked_note_count:1,reviewed_current_note_count:0});
  assert.equal((await db.query(`select scan_complete from source_collection_coverage`)).rows[0].scan_complete,false);
  await assert.rejects(()=>db.exec(`update vault_source_documents set review_state='reviewed',reviewed_at=now()`),/permission denied/);
  await assert.rejects(()=>db.exec(`insert into vault_districts(id,title,kind) values('fake','Fake','thematic')`),/permission denied/);
  await db.exec(`select record_district_progress('12 - Tools and Integrations','evidence',false,'work')`);
  await assert.rejects(()=>db.exec(`select record_district_progress('Fake district','visit')`),/Unknown district/);
  await db.exec(`select set_config('request.jwt.claim.sub','22222222-2222-4222-8222-222222222222',false)`);
  assert.equal((await db.query('select count(*)::int as n from district_work_evidence')).rows[0].n,0);
  await db.exec(`reset role;update vault_source_documents set review_state='reviewed',reviewed_at=now();set role authenticated`);
  assert.equal((await coverage()).reviewed_current_note_count,1);
  await db.exec(`reset role;update notes set version=2,body='Updated truth';set role authenticated`);
  assert.equal((await coverage()).reviewed_current_note_count,0,'changed note revision must not retain current verified coverage');
  assert.equal((await db.query(`select version from district_content_catalog limit 1`)).rows[0].version,2,'view reads current note truth');
  assert.deepEqual((await db.query(`select note_names from district_definitions where id='12 - Tools and Integrations'`)).rows[0].note_names,['Interface']);
  await db.exec(`select set_config('request.jwt.claim.sub','33333333-3333-4333-8333-333333333333',false)`);
  assert.equal((await db.query('select count(*)::int as n from district_content_catalog')).rows[0].n,0);
  assert.equal((await db.query('select count(*)::int as n from source_collection_coverage')).rows[0].n,0);
  await db.exec('set role anon');
  await assert.rejects(()=>db.exec('select * from district_content_catalog'),/permission denied/);
  await db.exec('reset role');
  for(const view of ['district_definitions','district_content_catalog','district_source_coverage','source_collection_coverage']){
   const row=(await db.query('select reloptions from pg_class where relname=$1',[view])).rows[0];
   assert.deepEqual(row.reloptions,['security_invoker=true']);
  }
  await assert.rejects(()=>db.exec(`update vault_source_collections set scan_complete=true`),/complete_scan_has_date/);
  await assert.rejects(()=>db.exec(`update vault_source_documents set review_state='imported',reviewed_at=null`),/reviewed_source_has_date/);
  const seed=fs.readFileSync('supabase/source_catalog_seed.sql','utf8');
  await db.exec(seed);
  const count=async table=>(await db.query(`select count(*)::int as n from ${table}`)).rows[0].n;
  assert.equal(await count('vault_districts'),19,'complete registry seed includes all approved districts');
  assert.equal(await count('vault_source_documents'),426,'425 discovered documents plus isolated test fixture');
  await db.exec(seed);
  assert.equal(await count('vault_source_documents'),426,'metadata seed is idempotent');
  assert.equal((await db.query(`select count(*)::int n from note_source_links where note_name='Interface'`)).rows[0].n,1,'seed does not fabricate links for unmatched note bodies');
 }finally{await db.close()}
});
