-- Generated with Supabase CLI migration new. Timestamp advanced to follow existing 15:30 migrations.
-- Source metadata and curated classifications only: notes remain the single content truth.
create table public.vault_districts (
 id text primary key check(length(id) between 1 and 100),
 title text not null check(length(title) between 1 and 160),
 purpose text not null default '' check(length(purpose)<=1200),
 kind text not null check(kind in ('storage','thematic')),
 storage_folder text unique,
 priority integer not null default 0 check(priority between 0 and 1000),
 kit text[] not null default '{}',
 source_urls text[] not null default '{}',
 source_notes text[] not null default '{}',
 constraint district_kind_folder check((kind='storage' and storage_folder is not null) or (kind='thematic' and storage_folder is null)),
 constraint district_metadata_limits check(cardinality(kit)<=12 and cardinality(source_urls)<=20 and cardinality(source_notes)<=20)
);
insert into public.vault_districts(id,title,kind,storage_folder) select folder,title,'storage',folder from (values
 ('00 - MOCs','Atlas'),('01 - Divisions','Division council'),('02 - ZenFlow','Agent foundry'),('03 - Products','Product workshop'),('04 - People','Team commons'),('05 - Operations','Control room'),('06 - Finance','Finance chamber'),('07 - Brand','Brand atelier'),('08 - Research','Research observatory'),('09 - Projects','Delivery yard'),('10 - Archive','Archive stacks'),('11 - Physical AI','Physical systems lab'),('Daily','Daily log')) as d(folder,title);
create table public.district_note_links (
 district_id text not null references public.vault_districts(id) on delete cascade,
 note_name text not null references public.notes(name) on update cascade on delete cascade,
 primary key(district_id,note_name)
);
create index district_note_links_note_idx on public.district_note_links(note_name);
create table public.vault_source_collections (
 id text primary key check(length(id) between 1 and 160),
 title text not null check(length(title) between 1 and 300),
 url text not null check(url ~ '^https://(drive|docs)[.]google[.]com/'),
 last_scanned_at timestamptz,
 scan_complete boolean not null default false,
 constraint complete_scan_has_date check(not scan_complete or last_scanned_at is not null)
);
create table public.vault_source_documents (
 id text primary key check(length(id) between 1 and 160),
 collection_id text not null references public.vault_source_collections(id),
 title text not null check(length(title) between 1 and 500),
 url text not null check(url ~ '^https://(drive|docs)[.]google[.]com/'),
 mime_type text check(length(mime_type)<=160),
 review_state text not null default 'inventoried' check(review_state in ('inventoried','reviewed','imported','blocked')),
 source_modified_at timestamptz,
 reviewed_at timestamptz,
 constraint reviewed_source_has_date check(review_state not in ('reviewed','imported') or reviewed_at is not null)
);
create index vault_source_documents_collection_idx on public.vault_source_documents(collection_id);
create table public.note_source_links (
 note_name text not null references public.notes(name) on update cascade on delete cascade,
 source_id text not null references public.vault_source_documents(id),
 note_version integer not null check(note_version>0),
 recorded_at timestamptz not null default now(),
 primary key(note_name,source_id)
);
create index note_source_links_source_idx on public.note_source_links(source_id);
alter table public.vault_districts enable row level security;
alter table public.district_note_links enable row level security;
alter table public.vault_source_collections enable row level security;
alter table public.vault_source_documents enable row level security;
alter table public.note_source_links enable row level security;
create policy team_catalog_read on public.vault_districts for select to authenticated using(public.is_team());
create policy team_catalog_read on public.district_note_links for select to authenticated using(public.is_team());
create policy team_catalog_read on public.vault_source_collections for select to authenticated using(public.is_team());
create policy team_catalog_read on public.vault_source_documents for select to authenticated using(public.is_team());
create policy team_catalog_read on public.note_source_links for select to authenticated using(public.is_team());
revoke all on public.vault_districts,public.district_note_links,public.vault_source_collections,public.vault_source_documents,public.note_source_links from public,anon,authenticated;
grant select on public.vault_districts,public.district_note_links,public.vault_source_collections,public.vault_source_documents,public.note_source_links to authenticated;
grant all on public.vault_districts,public.district_note_links,public.vault_source_collections,public.vault_source_documents,public.note_source_links to service_role;

create view public.district_definitions with(security_invoker=true) as
 select d.*,coalesce((select jsonb_agg(l.note_name order by l.note_name) from public.district_note_links l where l.district_id=d.id),'[]'::jsonb) as note_names
 from public.vault_districts d;

create view public.district_content_catalog with(security_invoker=true) as
 select d.id as district_id,n.name,n.folder,n.version,n.updated_at,n.updated_by,
 coalesce((select vd.id from public.vault_districts vd join public.district_note_links dl on dl.district_id=vd.id and dl.note_name=n.name where vd.kind='thematic' order by vd.priority desc,vd.id limit 1),split_part(n.folder,'/',1)) as world_district_id,
 n.fm->>'type' as type,n.fm->>'status' as status,
 case when jsonb_typeof(n.fm->'tags')='array' then n.fm->'tags' else '[]'::jsonb end as tags,
 n.fm->'source' as legacy_source,n.fm->>'source_status' as legacy_source_status,
 coalesce((select jsonb_agg(jsonb_build_object('id',s.id,'title',s.title,'url',s.url,'collection_id',s.collection_id,'review_state',s.review_state,'reviewed_at',s.reviewed_at,'note_version',l.note_version,'current_version',n.version,'version_matches',l.note_version=n.version) order by s.id)
 from public.note_source_links l join public.vault_source_documents s on s.id=l.source_id where l.note_name=n.name),'[]'::jsonb) as source_refs
 from public.vault_districts d join public.notes n on
 (d.kind='storage' and split_part(n.folder,'/',1)=d.storage_folder)
 or exists(select 1 from public.district_note_links dl where dl.district_id=d.id and dl.note_name=n.name);
create view public.district_source_coverage with(security_invoker=true) as
 select d.id as district_id,count(c.name)::integer as note_count,
 count(c.name) filter(where jsonb_array_length(c.source_refs)>0)::integer as linked_note_count,
 count(c.name) filter(where exists(select 1 from jsonb_array_elements(c.source_refs) s where s->>'review_state' in ('reviewed','imported') and (s->>'version_matches')::boolean))::integer as reviewed_current_note_count,
 max(c.updated_at) as latest_note_update
 from public.vault_districts d left join public.district_content_catalog c on c.district_id=d.id group by d.id;
create view public.source_collection_coverage with(security_invoker=true) as
 select c.id,c.title,c.url,c.last_scanned_at,c.scan_complete,
 count(s.id)::integer as inventoried_count,
 count(s.id) filter(where s.review_state in ('reviewed','imported'))::integer as reviewed_count,
 count(s.id) filter(where s.review_state='imported')::integer as imported_count,
 count(s.id) filter(where s.review_state='blocked')::integer as blocked_count
 from public.vault_source_collections c left join public.vault_source_documents s on s.collection_id=c.id group by c.id;
revoke all on public.district_definitions,public.district_content_catalog,public.district_source_coverage,public.source_collection_coverage from public,anon,authenticated;
grant select on public.district_definitions,public.district_content_catalog,public.district_source_coverage,public.source_collection_coverage to authenticated,service_role;

-- Approved district registry, rather than a hard-coded thirteen-folder limit.
alter table public.district_journeys drop constraint district_journeys_district_check;
alter table public.district_journeys add constraint district_journeys_district_fk foreign key(district) references public.vault_districts(id);
create or replace function public.record_district_progress(p_district text,p_action text,p_enabled boolean default false,p_task_id text default null)
returns jsonb language plpgsql security definer set search_path=public as $$
declare uid uuid:=auth.uid(); result jsonb;
begin
 if uid is null or not public.is_team() then raise exception 'Vault member required' using errcode='42501'; end if;
 if p_district is null or not exists(select 1 from public.vault_districts where id=p_district) then raise exception 'Unknown district' using errcode='22023'; end if;
 if p_action is null or p_action not in ('visit','shortlist','evidence') then raise exception 'Unknown action' using errcode='22023'; end if;
 if p_action='evidence' and (p_task_id is null or length(p_task_id) not between 1 and 160 or not exists(
 select 1 from public.tasks t join public.district_content_catalog n on n.name=t.note and n.district_id=p_district
 where t.id=p_task_id and t.status='done' and t.done_at is not null and length(trim(coalesce(t.result,'')))>0
 )) then raise exception 'Completed task with result and district note required' using errcode='22023'; end if;
 insert into public.district_journeys(user_id,district) values(uid,p_district) on conflict do nothing;
 if p_action='visit' then update public.district_journeys set first_visit=coalesce(first_visit,now()),last_visit=now() where user_id=uid and district=p_district;
 elsif p_action='shortlist' then update public.district_journeys set shortlisted=coalesce(p_enabled,false) where user_id=uid and district=p_district;
 else insert into public.district_work_evidence(user_id,district,task_id) values(uid,p_district,p_task_id) on conflict do nothing; end if;
 select to_jsonb(j) into result from public.district_journeys j where user_id=uid and district=p_district;
 return result;
end $$;
revoke all on function public.record_district_progress(text,text,boolean,text) from public,anon;
grant execute on function public.record_district_progress(text,text,boolean,text) to authenticated;
