create table public.admins (
  id           uuid primary key references auth.users (id) on delete cascade,
  first_name   text not null,
  last_name    text not null,
  phone_number text not null,
  image_url    text not null,
  role         text not null check (role in ('root', 'maintenance', 'renewal', 'housing_application')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  deleted_at   timestamptz
);

comment on table public.admins is 'Admin staff with one of four roles: root, maintenance, renewal, housing_application.';
comment on column public.admins.role is 'root | maintenance | renewal | housing_application';

create index admins_role_idx on public.admins (role);
create index admins_deleted_at_idx on public.admins (deleted_at) where deleted_at is null;

alter table public.admins enable row level security;

create policy "Admins can view all admin records"
  on public.admins for select
  to authenticated
  using ((select public.is_admin()));

create policy "Root admins can insert admins"
  on public.admins for insert
  to authenticated
  with check ((select public.has_admin_role('root')));

create policy "Root admins can update admins"
  on public.admins for update
  to authenticated
  using ((select public.has_admin_role('root')))
  with check ((select public.has_admin_role('root')));

create policy "Root admins can delete admins"
  on public.admins for delete
  to authenticated
  using ((select public.has_admin_role('root')));

create trigger update_admins_updated_at
  before update on public.admins
  for each row
  execute function public.handle_updated_at();
