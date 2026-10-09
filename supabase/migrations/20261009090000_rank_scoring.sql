-- Ranking and scoring pass (Oct 9, 2026).
-- 1. Daily caps on the cheap, repeatable kinds, so reading, chatting or claim/unclaim churn cannot outscore real work.
--    A row past its cap still counts toward streaks and counters; it pays 0 XP.
--      opened 10 a day · claimed 5 · assigned 5 · say 10 · resumed 5 · read 20 · edited: the first 3 edits of each note a day
-- 2. agent_league reports the streak only while it is current (last active day today or yesterday, UTC), and last_day.
-- 3. agent_stats is rebuilt from the full timeline under the new rules. Notes, tasks and activity are not touched.

create index if not exists activity_actor_kind_ts_idx on public.activity(actor, kind, ts);

create or replace function public.xp_cap(kind text) returns integer language sql immutable set search_path = public as $$
  select case kind
    when 'opened' then 10 when 'claimed' then 5 when 'assigned' then 5
    when 'say' then 10 when 'resumed' then 5 when 'read' then 20
    else null end
$$;

-- Points this row earns: the kind's rate, or 0 once the actor is past the day's cap for it.
-- Counting ids up to and including this row keeps the result the same live and in a rebuild.
create or replace function public.activity_points(r public.activity) returns integer language plpgsql stable security definer set search_path = public as $$
declare pts integer := public.xp_for(r.kind); cap integer := public.xp_cap(r.kind); d date := (r.ts at time zone 'utc')::date; n integer;
begin
  if pts <= 0 then return 0; end if;
  if cap is not null then
    select count(*) into n from public.activity
      where actor = r.actor and kind = r.kind and id <= r.id
        and ts >= (d::timestamp at time zone 'utc') and ts < ((d + 1)::timestamp at time zone 'utc');
    if n > cap then return 0; end if;
  elsif r.kind = 'edited' and r.note is not null then
    select count(*) into n from public.activity
      where actor = r.actor and kind = 'edited' and note = r.note and id <= r.id
        and ts >= (d::timestamp at time zone 'utc') and ts < ((d + 1)::timestamp at time zone 'utc');
    if n > 3 then return 0; end if;
  end if;
  return pts;
end $$;
revoke execute on function public.activity_points(public.activity) from anon, public, authenticated;

-- Same shape as 20261006120000, with the capped points.
create or replace function public.apply_activity(r public.activity) returns void language plpgsql security definer set search_path = public as $$
declare tgt text := case when r.kind = 'say' and r.target is not null and r.target <> r.actor and public.is_actor(r.target) then r.target end;
begin
  perform public.award_xp(r.actor, r.actor_kind, public.activity_points(r), r.note, tgt, (r.ts at time zone 'utc')::date);
  update public.agent_stats set counters = counters || jsonb_build_object(r.kind, coalesce((counters->>r.kind)::int, 0) + 1) where actor = r.actor;
  if tgt is not null then
    insert into public.agent_stats(actor, actor_kind) values (tgt, case when exists(select 1 from public.agents where id = tgt) then 'agent' else 'human' end) on conflict (actor) do nothing;
    update public.agent_stats set peers = peers || jsonb_build_object(r.actor, 1), counters = counters || jsonb_build_object('heard', coalesce((counters->>'heard')::int, 0) + 1), updated_at = now() where actor = tgt;
  end if;
end $$;
revoke execute on function public.apply_activity(public.activity) from anon, public, authenticated;

-- The league as it should read today: weekly XP only in its own week, streak only while it is unbroken.
create or replace view public.agent_league with (security_invoker = true) as
  select actor, actor_kind, xp,
    case when last_day >= (now() at time zone 'utc')::date - 1 then streak else 0 end as streak,
    best_streak,
    case when week_start = date_trunc('week', (now() at time zone 'utc'))::date then week_xp else 0 end as week_xp,
    week_start, last_day
  from public.agent_stats;
grant select on public.agent_league to authenticated;

-- Rebuild under the new rules, one ordered timeline as in 20261006120000.
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
