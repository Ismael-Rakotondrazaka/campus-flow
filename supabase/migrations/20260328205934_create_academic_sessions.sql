create table public.academic_sessions (
  id                      uuid primary key default gen_random_uuid(),
  start_at                timestamptz not null,
  end_at                  timestamptz not null,
  application_open_at     timestamptz not null,
  application_close_at    timestamptz not null,
  renewal_open_at         timestamptz not null,
  renewal_close_at        timestamptz not null,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),
  deleted_at              timestamptz,
  constraint academic_sessions_dates_check check (end_at > start_at),
  constraint application_window_check check (application_close_at > application_open_at),
  constraint renewal_window_check check (renewal_close_at > renewal_open_at),
  constraint renewal_before_application check (renewal_close_at < application_close_at)
);

comment on table public.academic_sessions is 'Academic years/sessions used for housing applications and renewals. Includes application and renewal submission windows.';
comment on column public.academic_sessions.application_open_at is 'Start of the application submission window for new housing applications.';
comment on column public.academic_sessions.application_close_at is 'End of the application submission window for new housing applications.';
comment on column public.academic_sessions.renewal_open_at is 'Start of the renewal submission window for existing residents.';
comment on column public.academic_sessions.renewal_close_at is 'End of the renewal submission window for existing residents.';

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
