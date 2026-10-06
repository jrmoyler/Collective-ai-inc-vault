-- Fixes to the Sentinel play layer (review of PR #2).
-- 1. A signed-in person's activity row is attributed to that person, whatever actor the client sent.
-- 2. 'say' targets must be a real agent or team member before they get a stats row.
-- 3. A task bounty pays once per task, even across reopen/done cycles.
-- 4. Weekly XP reads as 0 for anyone with no XP in the current week (agent_league view).
-- 5. agent_stats is rebuilt from one timeline of activity and completed tasks, so historical streaks are right.

-- 1. Bind human activity to the authenticated account. Service-role writes (agent-api) have no auth.uid() and keep their actor.
create or replace function public.activity_bind_actor() returns trigger language plpgsql security definer set search_path = public as $$
declare who text;
begin
  if auth.uid() is null then return new; end if;
  select display_name into who from public.team_members where user_id = auth.uid();
  if who is null then raise exception 'not a team member' using errcode = '42501'; end if;
  new.actor := who;
  new.actor_kind := 'human';
  return new;
end $$;
drop trigger if exists activity_bind_actor on public.activity;
create trigger activity_bind_actor before insert on public.activity for each row execute function public.activity_bind_actor();

create or replace function public.is_actor(p text) returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.agents where id = p) or exists(select 1 from public.team_members where display_name = p)
$$;

-- One code path for an activity row, used by the live trigger and by the rebuild below.
create or replace function public.apply_activity(r public.activity) returns void language plpgsql security definer set search_path = public as $$
declare tgt text := case when r.kind = 'say' and r.target is not null and r.target <> r.actor and public.is_actor(r.target) then r.target end;
begin
  perform public.award_xp(r.actor, r.actor_kind, public.xp_for(r.kind), r.note, tgt, (r.ts at time zone 'utc')::date);
  update public.agent_stats set counters = counters || jsonb_build_object(r.kind, coalesce((counters->>r.kind)::int, 0) + 1) where actor = r.actor;
  if tgt is not null then
    insert into public.agent_stats(actor, actor_kind) values (tgt, case when exists(select 1 from public.agents where id = tgt) then 'agent' else 'human' end) on conflict (actor) do nothing;
    update public.agent_stats set peers = peers || jsonb_build_object(r.actor, 1), counters = counters || jsonb_build_object('heard', coalesce((counters->>'heard')::int, 0) + 1), updated_at = now() where actor = tgt;
  end if;
end $$;
revoke execute on function public.apply_activity(public.activity) from anon, public, authenticated;

create or replace function public.activity_award() returns trigger language plpgsql security definer set search_path = public as $$
begin
  perform public.apply_activity(new);
  return new;
end $$;

-- 3. Pay a task once. bounty_paid_at marks the payment and survives reopen.
alter table public.tasks add column if not exists bounty_paid_at timestamptz;
update public.tasks set bounty_paid_at = coalesce(done_at, now()) where bounty_paid_at is null and (status = 'done' or done_at is not null);

create or replace function public.pay_task(t public.tasks, p_day date) returns void language plpgsql security definer set search_path = public as $$
begin
  if t.agent is not null then
    perform public.award_xp(t.agent, 'agent', public.task_bounty(t.priority), t.note, null, p_day);
    update public.agent_stats set counters = counters || jsonb_build_object('done', coalesce((counters->>'done')::int, 0) + 1) where actor = t.agent;
  end if;
  if t.requested_by is not null and t.requested_by <> coalesce(t.agent, '') then
    perform public.award_xp(t.requested_by, 'human', 15, t.note, t.agent, p_day);
  end if;
end $$;
revoke execute on function public.pay_task(public.tasks, date) from anon, public, authenticated;

create or replace function public.tasks_award() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.status = 'done' and old.status is distinct from 'done' and old.bounty_paid_at is null then
    perform public.pay_task(new, current_date);
    new.bounty_paid_at := now();
  else
    new.bounty_paid_at := old.bounty_paid_at;  -- clients cannot clear the marker to get paid again
  end if;
  return new;
end $$;
drop trigger if exists tasks_award on public.tasks;
create trigger tasks_award before update on public.tasks for each row execute function public.tasks_award();

-- 4. The league as everyone should read it: week_xp only counts in the week it was earned.
create or replace view public.agent_league with (security_invoker = true) as
  select actor, actor_kind, xp, streak, best_streak,
    case when week_start = date_trunc('week', (now() at time zone 'utc'))::date then week_xp else 0 end as week_xp,
    week_start
  from public.agent_stats;
grant select on public.agent_league to authenticated;

-- 5. Rebuild stats from one ordered timeline. Every task that was ever completed (bounty_paid_at set) pays once, on its done day.
do $$ declare e record; a public.activity; t public.tasks; begin
  delete from public.agent_stats;
  for e in
    select ts, 0 as ord, id::text as ref from public.activity
    union all
    select coalesce(done_at, bounty_paid_at), 1, id from public.tasks where bounty_paid_at is not null
    order by 1, 2, 3
  loop
    if e.ord = 0 then
      select * into a from public.activity where id = e.ref::bigint;
      perform public.apply_activity(a);
    else
      select * into t from public.tasks where id = e.ref;
      perform public.pay_task(t, (e.ts at time zone 'utc')::date);
    end if;
  end loop;
end $$;
