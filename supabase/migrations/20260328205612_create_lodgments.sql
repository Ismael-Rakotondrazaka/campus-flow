create table public.lodgments (
  id          uuid primary key default gen_random_uuid(),
  building_id uuid not null references public.buildings (id) on delete cascade,
  floor       integer not null,
  room_number integer not null,
  capacity    integer not null check (capacity > 0),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz,
  constraint lodgments_room_unique unique (building_id, floor, room_number)
);

comment on table public.lodgments is 'Individual rooms within a building.';

create index lodgments_building_id_idx on public.lodgments (building_id);
create index lodgments_deleted_at_idx on public.lodgments (deleted_at) where deleted_at is null;

alter table public.lodgments enable row level security;

create policy "Authenticated users can view active lodgments"
  on public.lodgments for select
  to authenticated
  using (deleted_at is null);

create policy "Housing application admins can view lodgments"
  on public.lodgments for select
  to authenticated
  using ((select public.has_admin_role('housing_application')));

create policy "Housing application admins can create lodgments"
  on public.lodgments for insert
  to authenticated
  with check ((select public.has_admin_role('housing_application')));

create policy "Housing application admins can update lodgments"
  on public.lodgments for update
  to authenticated
  using ((select public.has_admin_role('housing_application')))
  with check ((select public.has_admin_role('housing_application')));

create policy "Housing application admins can delete lodgments"
  on public.lodgments for delete
  to authenticated
  using ((select public.has_admin_role('housing_application')));

create trigger update_lodgments_updated_at
  before update on public.lodgments
  for each row
  execute function public.handle_updated_at();
