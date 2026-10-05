-- Additive: existing agents, presence and notes remain intact.
create table public.avatar_profiles (
 user_id uuid primary key references public.team_members(user_id) on delete cascade,
 form text not null default 'member' check(form in ('member','jr','devon','ahmad','kenza')),
 palette text[] not null default array['#101B32','#3977C7','#E6E9F2'],
 constraint valid_palette check(cardinality(palette)=3 and array_ndims(palette)=1 and array_lower(palette,1)=1 and array_position(palette,null) is null and palette[1] ~ '^#[0-9A-Fa-f]{6}$' and palette[2] ~ '^#[0-9A-Fa-f]{6}$' and palette[3] ~ '^#[0-9A-Fa-f]{6}$')
);
alter table public.avatar_profiles enable row level security;
create policy team_read on public.avatar_profiles for select to authenticated using(public.is_team());
create policy self_insert on public.avatar_profiles for insert to authenticated with check(public.is_team() and user_id=auth.uid() and form='member');
create policy self_update on public.avatar_profiles for update to authenticated using(public.is_team() and user_id=auth.uid()) with check(user_id=auth.uid());
grant select,insert on public.avatar_profiles to authenticated;
revoke update on public.avatar_profiles from authenticated;
grant update(palette) on public.avatar_profiles to authenticated;
-- Only service role / owner provisioning can assign core forms. Never infer from names.
create table public.agent_sessions (
 user_id uuid not null references public.team_members(user_id) on delete cascade,
 session_id uuid not null,
 agent text not null references public.agents(id) on delete cascade,
 status text not null default 'working' check(status in ('working','thinking','reading','writing','reviewing','blocked','idle','offline')),
 note text, detail text, last_seen timestamptz not null default now(),
 primary key(user_id,session_id)
);
alter table public.agent_sessions enable row level security;
create policy team_read on public.agent_sessions for select to authenticated using(public.is_team());
revoke all on public.avatar_profiles,public.agent_sessions from anon;
grant select on public.agent_sessions to authenticated;
alter publication supabase_realtime add table public.avatar_profiles,public.agent_sessions;

create unique index one_account_per_core_form on public.avatar_profiles(form) where form <> 'member';
create or replace function public.assign_core_sentinel(target uuid, core_form text) returns void
language plpgsql security definer set search_path=public as $$
declare colors text[];
begin
 if not exists(select 1 from public.team_members where user_id=auth.uid() and role='owner') then raise exception 'Owner required'; end if;
 colors := case core_form when 'jr' then array['#050A18','#D4A843','#00D9B5'] when 'devon' then array['#0B1830','#00A994','#CED7E0'] when 'ahmad' then array['#191923','#75518D','#C9A84C'] when 'kenza' then array['#151B29','#A62C48','#E7BBA0'] else null end;
 if colors is null then raise exception 'Unknown core form'; end if;
 -- Free only the requested slot, then bind it to the selected existing member.
 update public.avatar_profiles set form='member' where form=core_form and user_id<>target;
 insert into public.avatar_profiles(user_id,form,palette) values(target,core_form,colors)
 on conflict(user_id) do update set form=excluded.form,palette=excluded.palette;
end $$;
revoke all on function public.assign_core_sentinel(uuid,text) from public,anon;
grant execute on function public.assign_core_sentinel(uuid,text) to authenticated;

-- Walking identities use authenticated rows, not client-chosen Realtime presence keys.
create table public.member_positions (
 user_id uuid not null references public.team_members(user_id) on delete cascade,
 session_id uuid not null,
 x double precision not null check(x between -100000 and 100000),
 z double precision not null check(z between -100000 and 100000),
 yaw double precision not null default 0 check(yaw between -100000 and 100000),
 walking boolean not null default false, note text, tool text references public.agents(id),
 last_seen timestamptz not null default now(), primary key(user_id,session_id)
);
create or replace function public.member_position_touch() returns trigger language plpgsql set search_path=public as $$ begin new.last_seen:=now();return new;end $$;
create trigger member_position_touch before insert or update on public.member_positions for each row execute function public.member_position_touch();
alter table public.member_positions enable row level security;
create policy team_read on public.member_positions for select to authenticated using(public.is_team());
create policy self_insert on public.member_positions for insert to authenticated with check(public.is_team() and user_id=auth.uid());
create policy self_update on public.member_positions for update to authenticated using(public.is_team() and user_id=auth.uid()) with check(user_id=auth.uid());
revoke all on public.member_positions from anon;
grant select,insert,update on public.member_positions to authenticated;
alter publication supabase_realtime add table public.member_positions;
