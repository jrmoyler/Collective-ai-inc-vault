-- Journeys record exploration and references to verified team work; they never award XP.
create table public.district_journeys (
 user_id uuid not null references public.team_members(user_id) on delete cascade,
 district text not null check(district in ('00 - MOCs','01 - Divisions','02 - ZenFlow','03 - Products','04 - People','05 - Operations','06 - Finance','07 - Brand','08 - Research','09 - Projects','10 - Archive','11 - Physical AI','Daily')),
 first_visit timestamptz,
 last_visit timestamptz,
 shortlisted boolean not null default false,
 primary key(user_id,district)
);
create table public.district_work_evidence (
 user_id uuid not null,
 district text not null,
 task_id text not null references public.tasks(id),
 recorded_at timestamptz not null default now(),
 primary key(user_id,district,task_id),
 foreign key(user_id,district) references public.district_journeys(user_id,district) on delete cascade
);
alter table public.district_journeys enable row level security;
alter table public.district_work_evidence enable row level security;
create policy own_journeys on public.district_journeys for select to authenticated using(user_id=auth.uid() and public.is_team());
create policy own_work_evidence on public.district_work_evidence for select to authenticated using(user_id=auth.uid() and public.is_team());
revoke all on public.district_journeys,public.district_work_evidence from public,anon,authenticated;
grant select on public.district_journeys,public.district_work_evidence to authenticated;

-- The caller's JWT owns every write. Completion references mean team evidence, not personal authorship.
create function public.record_district_progress(p_district text,p_action text,p_enabled boolean default false,p_task_id text default null)
returns jsonb language plpgsql security definer set search_path=public as $$
declare uid uuid:=auth.uid(); result jsonb;
begin
 if uid is null or not public.is_team() then raise exception 'Vault member required' using errcode='42501'; end if;
 if p_district is null or p_district not in ('00 - MOCs','01 - Divisions','02 - ZenFlow','03 - Products','04 - People','05 - Operations','06 - Finance','07 - Brand','08 - Research','09 - Projects','10 - Archive','11 - Physical AI','Daily') then raise exception 'Unknown district' using errcode='22023'; end if;
 if p_action is null or p_action not in ('visit','shortlist','evidence') then raise exception 'Unknown action' using errcode='22023'; end if;
 if p_action='evidence' and (p_task_id is null or length(p_task_id) not between 1 and 160 or not exists(
   select 1 from public.tasks t join public.notes n on n.name=t.note
   where t.id=p_task_id and t.status='done' and t.done_at is not null and length(trim(coalesce(t.result,'')))>0
   and split_part(n.folder,'/',1)=p_district
 )) then raise exception 'Completed task with result and district note required' using errcode='22023'; end if;
 insert into public.district_journeys(user_id,district) values(uid,p_district) on conflict do nothing;
 if p_action='visit' then
   update public.district_journeys set first_visit=coalesce(first_visit,now()),last_visit=now() where user_id=uid and district=p_district;
 elsif p_action='shortlist' then
   update public.district_journeys set shortlisted=coalesce(p_enabled,false) where user_id=uid and district=p_district;
 else
   insert into public.district_work_evidence(user_id,district,task_id) values(uid,p_district,p_task_id) on conflict do nothing;
 end if;
 select to_jsonb(j) into result from public.district_journeys j where user_id=uid and district=p_district;
 return result;
end $$;
revoke all on function public.record_district_progress(text,text,boolean,text) from public,anon;
grant execute on function public.record_district_progress(text,text,boolean,text) to authenticated;
