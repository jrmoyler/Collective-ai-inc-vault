-- Run as the administrative SQL connection. All exploration writes roll back.
-- Never returns team account identifiers or source document content.
begin;
do $$
declare member_uid text; obj text;
begin
 select user_id::text into member_uid from public.team_members order by user_id limit 1;
 if member_uid is null then raise exception 'Verification requires an existing team member'; end if;
 perform set_config('request.jwt.claim.sub',member_uid,true);
 foreach obj in array array['district_definitions','district_content_catalog','district_source_coverage','source_collection_coverage'] loop
  if has_table_privilege('anon','public.'||obj,'SELECT') then raise exception 'Anonymous catalog access: %',obj; end if;
  if not has_table_privilege('authenticated','public.'||obj,'SELECT') then raise exception 'Member catalog access missing: %',obj; end if;
 end loop;
 foreach obj in array array['vault_districts','district_note_links','vault_source_collections','vault_source_documents','note_source_links'] loop
  if has_table_privilege('authenticated','public.'||obj,'INSERT') or has_table_privilege('authenticated','public.'||obj,'UPDATE') or has_table_privilege('authenticated','public.'||obj,'DELETE') then raise exception 'Member may spoof metadata: %',obj; end if;
 end loop;
 if not exists(select 1 from public.vault_districts where id='12 - Tools and Integrations' and kind='thematic') then raise exception 'Approved thematic registry missing'; end if;
end $$;
set local role authenticated;
do $$
declare journey jsonb;
begin
 if not public.is_team() then raise exception 'Member authorization failed'; end if;
 journey:=public.record_district_progress('12 - Tools and Integrations','visit');
 if journey->>'user_id'<>auth.uid()::text or journey->>'district'<>'12 - Tools and Integrations' or journey->>'last_visit' is null then raise exception 'Thematic member progress failed'; end if;
 if exists(select 1 from public.district_journeys where user_id<>auth.uid()) then raise exception 'Cross-member journey access'; end if;
 if exists(select 1 from public.district_work_evidence where user_id<>auth.uid()) then raise exception 'Cross-member evidence access'; end if;
 if (select count(*) from public.district_definitions)<19 then raise exception 'Expanded registry not visible'; end if;
end $$;
reset role;
rollback;
select 'passed: member thematic progress, own-row isolation, metadata read-only permissions, anonymous catalog denial; writes rolled back' as verification;
