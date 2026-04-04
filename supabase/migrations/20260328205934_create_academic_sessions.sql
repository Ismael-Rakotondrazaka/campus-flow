create table public.academic_sessions (
  id         uuid primary key default gen_random_uuid(),
  start_at   timestamptz not null,
  end_at     timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint academic_sessions_dates_check check (end_at > start_at)
);

comment on table public.academic_sessions is 'Academic years/sessions used for housing applications and renewals.';

create index academic_sessions_deleted_at_idx on public.academic_sessions (deleted_at) where deleted_at is null;

alter table public.academic_sessions enable row level security;

create policy "Anyone can view active academic sessions"
  on public.academic_sessions for select
  to authenticated, anon
  using (deleted_at is null);

create policy "Root admins can manage academic sessions"
  on public.academic_sessions for all
  to authenticated
  using (public.has_admin_role('root'))
  with check (public.has_admin_role('root'));

create trigger update_academic_sessions_updated_at
  before update on public.academic_sessions
  for each row
  execute function public.handle_updated_at();
