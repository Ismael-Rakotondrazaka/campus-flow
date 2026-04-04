create table public.faculties (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

comment on table public.faculties is 'University faculties residents belong to.';

create index faculties_deleted_at_idx on public.faculties (deleted_at) where deleted_at is null;

alter table public.faculties enable row level security;

create policy "Anyone can view active faculties"
  on public.faculties for select
  to authenticated, anon
  using (deleted_at is null);

create policy "Root admins can manage faculties"
  on public.faculties for all
  to authenticated
  using (public.has_admin_role('root'))
  with check (public.has_admin_role('root'));

create trigger update_faculties_updated_at
  before update on public.faculties
  for each row
  execute function public.handle_updated_at();
