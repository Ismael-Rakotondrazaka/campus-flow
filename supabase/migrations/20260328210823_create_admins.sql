create table public.admins (
  user_id    uuid primary key references public.users (id) on delete cascade,
  role       text not null check (role in ('root', 'maintenance', 'renewal', 'housing_application')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.admins is 'Admin staff with one of four roles: root, maintenance, renewal, housing_application.';
comment on column public.admins.role is 'root | maintenance | renewal | housing_application';

create index admins_role_idx on public.admins (role);

alter table public.admins enable row level security;

create policy "Admins can view all admin records"
  on public.admins for select
  to authenticated
  using (public.is_admin());

create policy "Root admins can manage admins"
  on public.admins for all
  to authenticated
  using (public.has_admin_role('root'))
  with check (public.has_admin_role('root'));

create trigger update_admins_updated_at
  before update on public.admins
  for each row
  execute function public.handle_updated_at();
