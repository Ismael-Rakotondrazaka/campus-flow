create table public.maintainers (
  id           uuid primary key default gen_random_uuid(),
  first_name   text not null,
  last_name    text not null,
  phone_number text not null,
  image_url  text not null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  deleted_at   timestamptz
);

comment on table public.maintainers is 'External maintenance workers assignable to maintenance requests.';

create index maintainers_deleted_at_idx on public.maintainers (deleted_at) where deleted_at is null;

alter table public.maintainers enable row level security;

create policy "Maintenance admins can view active maintainers"
  on public.maintainers for select
  to authenticated
  using ((select public.has_admin_role('maintenance')) and deleted_at is null);

create policy "Maintenance admins can create maintainers"
  on public.maintainers for insert
  to authenticated
  with check ((select public.has_admin_role('maintenance')));

create policy "Maintenance admins can update maintainers"
  on public.maintainers for update
  to authenticated
  using ((select public.has_admin_role('maintenance')))
  with check ((select public.has_admin_role('maintenance')));

create policy "Maintenance admins can delete maintainers"
  on public.maintainers for delete
  to authenticated
  using ((select public.has_admin_role('maintenance')));

create trigger update_maintainers_updated_at
  before update on public.maintainers
  for each row
  execute function public.handle_updated_at();
