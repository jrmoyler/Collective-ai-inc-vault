-- Sentinel play layer: messages between Sentinels and people, per-agent memory, XP and ranks.
-- Additive. Nothing here changes an existing table's existing columns or policies.

-- 1. Messages. A 'say' activity row can name who it is for. Null target means the whole floor.
alter table public.activity add column if not exists target text;
alter table public.activity add column if not exists meta jsonb;
create index if not exists activity_say_idx on public.activity(kind, ts desc) where kind = 'say';

-- 2. Memory. Each agent keeps small notes to itself across sessions. Written only through agent-api (service role).
create table if not exists public.sentinel_memory (
  actor text not null,
  key text not null check (length(key) between 1 and 80),
  value jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (actor, key)
);
alter table public.sentinel_memory enable row level security;
grant select on public.sentinel_memory to authenticated;
create policy team_read on public.sentinel_memory for select to authenticated using (public.is_team());

-- 3. Ranks. One row per actor (agent id or a person's display name). Only triggers write it.
create table if not exists public.agent_stats (
  actor text primary key,
  actor_kind text not null default 'agent',
  xp integer not null default 0,
  week_xp integer not null default 0,
  week_start date,
  streak integer not null default 0,
  best_streak integer not null default 0,
  last_day date,
  counters jsonb not null default '{}'::jsonb,   -- activity kind -> count, plus notes (distinct notes touched) and peers (distinct actors spoken to)
  touched jsonb not null default '{}'::jsonb,    -- note name -> 1
  peers jsonb not null default '{}'::jsonb,      -- actor -> 1
  updated_at timestamptz not null default now()
);
alter table public.agent_stats enable row level security;
grant select on public.agent_stats to authenticated;
create policy team_read on public.agent_stats for select to authenticated using (public.is_team());

-- XP per activity kind. Finishing a task pays through the task trigger below, not here, so it is not paid twice.
create or replace function public.xp_for(kind text) returns integer language sql immutable as $$
  select case kind
    when 'created' then 30 when 'edited' then 12 when 'added to' then 15
    when 'opened' then 8 when 'claimed' then 5 when 'assigned' then 5
    when 'sent to review' then 20 when 'say' then 4 when 'read' then 2
    when 'unblocked' then 5 when 'resumed' then 2
    else 0 end
$$;

create or replace function public.award_xp(p_actor text, p_kind text, p_points integer, p_note text, p_peer text, p_day date)
returns void language plpgsql security definer set search_path = public as $$
declare s public.agent_stats; wk date := date_trunc('week', p_day)::date;
begin
  if p_actor is null or p_actor = '' or p_actor = 'repo-sync' then return; end if;
  insert into public.agent_stats(actor, actor_kind) values (p_actor, p_kind) on conflict (actor) do nothing;
  select * into s from public.agent_stats where actor = p_actor for update;
  if s.week_start is distinct from wk then s.week_xp := 0; s.week_start := wk; end if;
  if s.last_day is null or s.last_day < p_day - 1 then s.streak := 1;
  elsif s.last_day = p_day - 1 then s.streak := s.streak + 1; end if;
  if s.last_day is null or s.last_day < p_day then s.last_day := p_day; end if;
  if s.streak > s.best_streak then s.best_streak := s.streak; end if;
  update public.agent_stats set
    xp = xp + greatest(0, p_points), week_xp = s.week_xp + greatest(0, p_points), week_start = s.week_start,
    streak = s.streak, best_streak = s.best_streak, last_day = s.last_day,
    touched = case when p_note is null then touched else touched || jsonb_build_object(p_note, 1) end,
    peers = case when p_peer is null or p_peer = p_actor then peers else peers || jsonb_build_object(p_peer, 1) end,
    updated_at = now()
  where actor = p_actor;
end $$;
revoke execute on function public.award_xp(text, text, integer, text, text, date) from anon, public, authenticated;

create or replace function public.activity_award() returns trigger language plpgsql security definer set search_path = public as $$
declare c integer;
begin
  perform public.award_xp(new.actor, new.actor_kind, public.xp_for(new.kind), new.note, new.target, (new.ts at time zone 'utc')::date);
  update public.agent_stats set counters = counters || jsonb_build_object(new.kind, coalesce((counters->>new.kind)::int, 0) + 1) where actor = new.actor;
  if new.kind = 'say' and new.target is not null and new.target <> new.actor then
    insert into public.agent_stats(actor, actor_kind) values (new.target, 'agent') on conflict (actor) do nothing;
    update public.agent_stats set peers = peers || jsonb_build_object(new.actor, 1), counters = counters || jsonb_build_object('heard', coalesce((counters->>'heard')::int, 0) + 1), updated_at = now() where actor = new.target;
  end if;
  return new;
end $$;
drop trigger if exists activity_award on public.activity;
create trigger activity_award after insert on public.activity for each row execute function public.activity_award();

-- A task paid on completion: the bounty goes to the agent on it, and a smaller share to whoever commissioned it.
create or replace function public.task_bounty(priority text) returns integer language sql immutable as $$
  select case priority when 'high' then 120 when 'low' then 50 else 80 end
$$;
create or replace function public.tasks_award() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.status = 'done' and old.status is distinct from 'done' then
    if new.agent is not null then
      perform public.award_xp(new.agent, 'agent', public.task_bounty(new.priority), new.note, null, current_date);
      update public.agent_stats set counters = counters || jsonb_build_object('done', coalesce((counters->>'done')::int, 0) + 1) where actor = new.agent;
    end if;
    if new.requested_by is not null and new.requested_by <> coalesce(new.agent, '') then
      perform public.award_xp(new.requested_by, 'human', 15, new.note, new.agent, current_date);
    end if;
  end if;
  return new;
end $$;
drop trigger if exists tasks_award on public.tasks;
create trigger tasks_award after update on public.tasks for each row execute function public.tasks_award();

-- Backfill from what already happened, oldest first so streaks come out right.
do $$ declare r record; begin
  for r in select * from public.activity order by ts loop
    perform public.award_xp(r.actor, r.actor_kind, public.xp_for(r.kind), r.note, r.target, (r.ts at time zone 'utc')::date);
    update public.agent_stats set counters = counters || jsonb_build_object(r.kind, coalesce((counters->>r.kind)::int, 0) + 1) where actor = r.actor;
  end loop;
  for r in select * from public.tasks where status = 'done' and agent is not null order by done_at nulls last loop
    perform public.award_xp(r.agent, 'agent', public.task_bounty(r.priority), r.note, null, coalesce(r.done_at::date, current_date));
    update public.agent_stats set counters = counters || jsonb_build_object('done', coalesce((counters->>'done')::int, 0) + 1) where actor = r.agent;
    if r.requested_by is not null and r.requested_by <> r.agent then
      perform public.award_xp(r.requested_by, 'human', 15, r.note, r.agent, coalesce(r.done_at::date, current_date));
    end if;
  end loop;
end $$;

alter publication supabase_realtime add table public.agent_stats;
