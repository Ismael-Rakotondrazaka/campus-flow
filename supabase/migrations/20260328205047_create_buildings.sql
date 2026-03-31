create table public.buildings (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  floors           integer not null check (floors > 0),
  illustration_url text not null,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  deleted_at       timestamptz
);

comment on table public.buildings is 'Residential buildings on campus.';

create index buildings_deleted_at_idx on public.buildings (deleted_at) where deleted_at is null;

alter table public.buildings enable row level security;

create policy "Authenticated users can view active buildings"
  on public.buildings for select
  to authenticated
  using (deleted_at is null);

create policy "Reservation admins can manage buildings"
  on public.buildings for all
  to authenticated
  using (public.has_admin_role('reservation'))
  with check (public.has_admin_role('reservation'));

create trigger update_buildings_updated_at
  before update on public.buildings
  for each row
  execute function public.handle_updated_at();
