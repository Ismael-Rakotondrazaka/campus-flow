-- Add occupancy tracking columns to lodgments table
alter table public.lodgments
add column residents_count integer not null default 0,
add column capacity_remaining integer not null default 0;

-- Function to recalculate lodgment occupancy
create or replace function public.update_lodgment_occupancy(lodgment_id_param uuid)
returns void as $$
declare
  resident_count integer;
  remaining_capacity integer;
  current_capacity integer;
begin
  -- Count non-deleted residents in the lodgment
  select count(*) into resident_count
  from public.residents
  where lodgment_id = lodgment_id_param
    and deleted_at is null;

  -- Get the current capacity
  select capacity into current_capacity
  from public.lodgments
  where id = lodgment_id_param;

  -- Calculate remaining capacity
  remaining_capacity := coalesce(current_capacity, 0) - coalesce(resident_count, 0);

  -- Update the lodgment
  update public.lodgments
  set residents_count = resident_count,
      capacity_remaining = remaining_capacity
  where id = lodgment_id_param;
end;
$$ language plpgsql;

-- Trigger function to update lodgment occupancy when residents change
create or replace function public.on_resident_lodgment_change()
returns trigger as $$
begin
  -- Handle insert or update
  if (TG_OP = 'INSERT' or TG_OP = 'UPDATE') then
    -- If lodgment_id changed or resident was soft-deleted
    if TG_OP = 'INSERT' then
      if NEW.lodgment_id is not null then
        perform public.update_lodgment_occupancy(NEW.lodgment_id);
      end if;
    elsif TG_OP = 'UPDATE' then
      -- Update old lodgment if it changed
      if OLD.lodgment_id is distinct from NEW.lodgment_id then
        if OLD.lodgment_id is not null then
          perform public.update_lodgment_occupancy(OLD.lodgment_id);
        end if;
      end if;
      -- Update new lodgment
      if NEW.lodgment_id is not null then
        perform public.update_lodgment_occupancy(NEW.lodgment_id);
      end if;
    end if;
  -- Handle delete (hard delete)
  elsif TG_OP = 'DELETE' then
    if OLD.lodgment_id is not null then
      perform public.update_lodgment_occupancy(OLD.lodgment_id);
    end if;
  end if;

  return null;
end;
$$ language plpgsql;

-- Drop existing trigger if it exists
drop trigger if exists on_resident_lodgment_change on public.residents;

-- Create trigger to track occupancy when residents are added/removed/moved
create trigger on_resident_lodgment_change
after insert or update or delete on public.residents
for each row
execute function public.on_resident_lodgment_change();

-- Initial sync: update all lodgments with current occupancy
do $$
declare
  lodgment_record record;
begin
  for lodgment_record in
    select id from public.lodgments where deleted_at is null
  loop
    perform public.update_lodgment_occupancy(lodgment_record.id);
  end loop;
end $$;
