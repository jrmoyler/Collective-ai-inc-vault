-- Pure award helpers have a fixed namespace. Award triggers are invoked by PostgreSQL,
-- never exposed as client RPCs. Existing member-facing RPC privileges stay intact.
alter function public.xp_for(text) set search_path = public;
alter function public.task_bounty(text) set search_path = public;
revoke execute on function public.activity_award() from public, anon, authenticated;
revoke execute on function public.tasks_award() from public, anon, authenticated;
