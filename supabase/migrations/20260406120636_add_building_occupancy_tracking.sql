-- Migration: add_building_occupancy_tracking
-- Purpose: Add occupancy tracking columns and triggers to maintain building occupancy stats
-- Affected tables: buildings, lodgments

-- ============================================================================
-- Function: update_building_occupancy
-- ============================================================================

create or replace function public.update_building_occupancy(building_id_param uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  lodgment_count integer;
  resident_count integer;
  total_cap integer;
  remaining_cap integer;
begin
  select count(*) into lodgment_count
  from public.lodgments
  where building_id = building_id_param and deleted_at is null;
  select coalesce(sum(residents_count), 0) into resident_count
  from public.lodgments
  where building_id = building_id_param and deleted_at is null;
  select coalesce(sum(capacity), 0) into total_cap
  from public.lodgments
  where building_id = building_id_param and deleted_at is null;
  remaining_cap := total_cap - resident_count;
  update public.buildings
  set lodgments_count = lodgment_count,
      residents_count = resident_count,
      total_capacity = total_cap,
      capacity_remaining = remaining_cap
  where id = building_id_param;
end;
$$;

comment on function public.update_building_occupancy(uuid) is 'Updates building occupancy stats (lodgments_count, residents_count, total_capacity, capacity_remaining)';

-- ============================================================================
-- Function: on_lodgment_change_for_building
-- ============================================================================

create or replace function public.on_lodgment_change_for_building()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    if new.building_id is not null then
      perform public.update_building_occupancy(new.building_id);
    end if;
  elsif tg_op = 'UPDATE' then
    if old.building_id is distinct from new.building_id then
      if old.building_id is not null then
        perform public.update_building_occupancy(old.building_id);
      end if;
    end if;
    if new.building_id is not null then
      perform public.update_building_occupancy(new.building_id);
    end if;
  elsif tg_op = 'DELETE' then
    if old.building_id is not null then
      perform public.update_building_occupancy(old.building_id);
    end if;
  end if;
  return null;
end;
$$;

comment on function public.on_lodgment_change_for_building() is 'Trigger function to update building occupancy when lodgments are added, moved, or deleted';

-- ============================================================================
-- Trigger: on_lodgment_change_for_building
-- ============================================================================

drop trigger if exists on_lodgment_change_for_building on public.lodgments;

create trigger on_lodgment_change_for_building
  after insert or update or delete on public.lodgments
  for each row
  execute function public.on_lodgment_change_for_building();

-- ============================================================================
-- Function: on_lodgment_occupancy_change
-- ============================================================================

create or replace function public.on_lodgment_occupancy_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.building_id is not null then
    perform public.update_building_occupancy(new.building_id);
  end if;
  return null;
end;
$$;

comment on function public.on_lodgment_occupancy_change() is 'Trigger function to update building occupancy when lodgment occupancy changes';

-- ============================================================================
-- Trigger: on_lodgment_occupancy_change
-- ============================================================================

drop trigger if exists on_lodgment_occupancy_change on public.lodgments;

create trigger on_lodgment_occupancy_change
  after update on public.lodgments
  for each row
  when (old.residents_count is distinct from new.residents_count
        or old.capacity_remaining is distinct from new.capacity_remaining)
  execute function public.on_lodgment_occupancy_change();

-- ============================================================================
-- Initial sync: update all buildings with current occupancy
-- ============================================================================

do $$
declare
  building_record record;
begin
  for building_record in
    select id from public.buildings where deleted_at is null
  loop
    perform public.update_building_occupancy(building_record.id);
  end loop;
end;
$$;
