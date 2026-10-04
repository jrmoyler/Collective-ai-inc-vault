-- Live layer for the Collective AI vault. Applied to project vczwabqqmiskrqxmiomi on Oct 4, 2026.
create extension if not exists pgcrypto;

create table public.team_members(
  user_id uuid primary key references auth.users on delete cascade,
  display_name text not null,
  role text not null default 'member' check (role in ('owner','member')),
  created_at timestamptz not null default now()
);
create table public.agents(
  id text primary key, name text not null, kind text, color text not null default '#E8A33D',
  token_hash text not null,            -- sha256 of the agent token; tokens are never stored
  active boolean not null default true, created_at timestamptz not null default now()
);
create table public.notes(
  name text primary key, folder text not null default '', fm jsonb not null default '{}'::jsonb, body text not null,
  version int not null default 1, updated_at timestamptz not null default now(), updated_by text
);
create table public.note_revisions(
  id bigint generated always as identity primary key, name text not null, folder text, fm jsonb, body text,
  version int, edited_by text, edited_at timestamptz not null default now()
);
create index on public.note_revisions(name, edited_at desc);
create table public.tasks(
  id text primary key, title text not null, detail text, note text, division text,
  priority text not null default 'medium' check (priority in ('high','medium','low')),
  status text not null default 'open' check (status in ('open','claimed','review','blocked','done')),
  agent text, requested_by text, result text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), claimed_at timestamptz, done_at timestamptz
);
create table public.activity(
  id bigint generated always as identity primary key, ts timestamptz not null default now(), actor text not null,
  actor_kind text not null default 'agent' check (actor_kind in ('agent','human','system')), kind text not null, text text, note text, task text
);
create index on public.activity(ts desc);
create table public.presence(
  agent text primary key references public.agents(id) on delete cascade, status text not null default 'idle',
  task text, note text, detail text, tool text, last_seen timestamptz not null default now()
);
create table public.settings(key text primary key, value text not null);  -- passcode hashes; service role only

create or replace function public.notes_before_update() returns trigger language plpgsql set search_path = public as $$
begin
  if new.body is distinct from old.body or new.fm is distinct from old.fm or new.folder is distinct from old.folder then
    insert into public.note_revisions(name, folder, fm, body, version, edited_by) values (old.name, old.folder, old.fm, old.body, old.version, new.updated_by);
    new.version := old.version + 1;
  end if;
  new.updated_at := now();
  return new;
end $$;
create trigger notes_before_update before update on public.notes for each row execute function public.notes_before_update();
create or replace function public.tasks_touch() returns trigger language plpgsql set search_path = public as $$ begin new.updated_at := now(); return new; end $$;
create trigger tasks_touch before update on public.tasks for each row execute function public.tasks_touch();

create or replace function public.is_team() returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.team_members where user_id = auth.uid());
$$;
revoke execute on function public.is_team() from anon, public;
grant execute on function public.is_team() to authenticated;

alter table public.team_members enable row level security;
alter table public.agents enable row level security;
alter table public.notes enable row level security;
alter table public.note_revisions enable row level security;
alter table public.tasks enable row level security;
alter table public.activity enable row level security;
alter table public.presence enable row level security;
alter table public.settings enable row level security;

create policy team_read on public.team_members for select to authenticated using (public.is_team());
create policy team_read on public.agents for select to authenticated using (public.is_team());
create policy team_read on public.notes for select to authenticated using (public.is_team());
create policy team_insert on public.notes for insert to authenticated with check (public.is_team());
create policy team_update on public.notes for update to authenticated using (public.is_team()) with check (public.is_team());
create policy team_read on public.note_revisions for select to authenticated using (public.is_team());
create policy team_read on public.tasks for select to authenticated using (public.is_team());
create policy team_insert on public.tasks for insert to authenticated with check (public.is_team());
create policy team_update on public.tasks for update to authenticated using (public.is_team()) with check (public.is_team());
create policy team_read on public.activity for select to authenticated using (public.is_team());
create policy team_insert on public.activity for insert to authenticated with check (public.is_team() and actor_kind = 'human');
create policy team_read on public.presence for select to authenticated using (public.is_team());
create policy no_client_access on public.settings for select to authenticated using (false);

revoke select on public.agents from anon, authenticated;
grant select (id, name, kind, color, active, created_at) on public.agents to authenticated;
revoke all on public.notes, public.note_revisions, public.tasks, public.activity, public.presence, public.team_members, public.settings from anon;

alter publication supabase_realtime add table public.notes, public.tasks, public.activity, public.presence;

-- Agents (token hashes are inserted out of band; see README "Rotate a token")
-- claude-code, codex, hermes, muse-spark, grokbot, chatgpt, cursor, repo-sync
