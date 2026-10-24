create or replace function public.qml_is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'super_admin'), false);
$$;

revoke all on function public.enqueue_qml_welcome_email() from public, anon, authenticated;
