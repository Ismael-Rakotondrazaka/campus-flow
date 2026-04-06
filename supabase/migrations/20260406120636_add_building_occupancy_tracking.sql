-- Add occupancy tracking columns to buildings table
alter table public.buildings
add column lodgments_count integer not null default 0,
add column residents_count integer not null default 0,
add column total_capacity integer not null default 0,
add column capacity_remaining integer not null default 0;

-- Function to recalculate building occupancy
create or replace function public.update_building_occupancy(building_id_param uuid)
returns void as $$
declare
  lodgment_count integer;
  resident_count integer;
  total_cap integer;
  remaining_cap integer;
begin
  -- Count non-deleted lodgments
  select count(*) into lodgment_count
  from public.lodgments
  where building_id = building_id_param
    and deleted_at is null;

  -- Sum residents across all lodgments
  select coalesce(sum(residents_count), 0) into resident_count
  from public.lodgments
  where building_id = building_id_param
    and deleted_at is null;

  -- Sum total capacity
  select coalesce(sum(capacity), 0) into total_cap
  from public.lodgments
  where building_id = building_id_param
    and deleted_at is null;

  -- Calculate remaining capacity
  remaining_cap := total_cap - resident_count;

  -- Update the building
  update public.buildings
  set lodgments_count = lodgment_count,
      residents_count = resident_count,
      total_capacity = total_cap,
      capacity_remaining = remaining_cap
  where id = building_id_param;
end;
$$ language plpgsql;

-- Trigger function to update building occupancy when lodgments change
create or replace function public.on_lodgment_change_for_building()
returns trigger as $$
begin
  if TG_OP = 'INSERT' then
    if NEW.building_id is not null then
      perform public.update_building_occupancy(NEW.building_id);
    end if;
  elsif TG_OP = 'UPDATE' then
    -- Update old building if it changed
    if OLD.building_id is distinct from NEW.building_id then
      if OLD.building_id is not null then
        perform public.update_building_occupancy(OLD.building_id);
      end if;
    end if;
    -- Update new building
    if NEW.building_id is not null then
      perform public.update_building_occupancy(NEW.building_id);
    end if;
  elsif TG_OP = 'DELETE' then
    if OLD.building_id is not null then
      perform public.update_building_occupancy(OLD.building_id);
    end if;
  end if;

  return null;
end;
$$ language plpgsql;

-- Drop existing trigger if it exists
drop trigger if exists on_lodgment_change_for_building on public.lodgments;

-- Create trigger to track building occupancy when lodgments are added/removed/updated
create trigger on_lodgment_change_for_building
after insert or update or delete on public.lodgments
for each row
execute function public.on_lodgment_change_for_building();

-- Also need to update buildings when lodgment occupancy changes
create or replace function public.on_lodgment_occupancy_change()
returns trigger as $$
begin
  if NEW.building_id is not null then
    perform public.update_building_occupancy(NEW.building_id);
  end if;
  return null;
end;
$$ language plpgsql;

-- Drop existing trigger if it exists
drop trigger if exists on_lodgment_occupancy_change on public.lodgments;

-- Create trigger to update building when lodgment occupancy changes
create trigger on_lodgment_occupancy_change
after update on public.lodgments
for each row
when (OLD.residents_count is distinct from NEW.residents_count or
      OLD.capacity_remaining is distinct from NEW.capacity_remaining)
execute function public.on_lodgment_occupancy_change();

-- Initial sync: update all buildings with current occupancy
do $$
declare
  building_record record;
begin
  for building_record in
    select id from public.buildings where deleted_at is null
  loop
    perform public.update_building_occupancy(building_record.id);
  end loop;
end $$;
