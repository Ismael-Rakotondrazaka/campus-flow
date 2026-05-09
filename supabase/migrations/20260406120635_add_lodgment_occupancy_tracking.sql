-- Migration: add_lodgment_occupancy_tracking
-- Purpose: Add occupancy tracking columns and triggers to maintain lodgment resident counts
-- Affected tables: lodgments, residents

-- ============================================================================
-- Add occupancy columns to lodgments
-- ============================================================================

alter table public.lodgments
  add column if not exists residents_count   integer not null default 0,
  add column if not exists capacity_remaining integer not null default 0;

-- ============================================================================
-- Function: update_lodgment_occupancy
-- ============================================================================

create or replace function public.update_lodgment_occupancy(lodgment_id_param uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  resident_count integer;
  remaining_capacity integer;
  current_capacity integer;
begin
  select count(*) into resident_count
  from public.residents
  where lodgment_id = lodgment_id_param and deleted_at is null;
  select capacity into current_capacity
  from public.lodgments
  where id = lodgment_id_param;
  remaining_capacity := coalesce(current_capacity, 0) - coalesce(resident_count, 0);
  update public.lodgments
  set residents_count = resident_count,
      capacity_remaining = remaining_capacity
  where id = lodgment_id_param;
end;
$$;

comment on function public.update_lodgment_occupancy(uuid) is 'Updates resident count and capacity_remaining for a lodgment based on current residents';

-- ============================================================================
-- Function: on_resident_lodgment_change
-- ============================================================================

create or replace function public.on_resident_lodgment_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (tg_op = 'INSERT' or tg_op = 'UPDATE') then
    if tg_op = 'INSERT' then
      if new.lodgment_id is not null then
        perform public.update_lodgment_occupancy(new.lodgment_id);
      end if;
    elsif tg_op = 'UPDATE' then
      if old.lodgment_id is distinct from new.lodgment_id then
        if old.lodgment_id is not null then
          perform public.update_lodgment_occupancy(old.lodgment_id);
        end if;
      end if;
      if new.lodgment_id is not null then
        perform public.update_lodgment_occupancy(new.lodgment_id);
      end if;
    end if;
  elsif tg_op = 'DELETE' then
    if old.lodgment_id is not null then
      perform public.update_lodgment_occupancy(old.lodgment_id);
    end if;
  end if;
  return null;
end;
$$;

comment on function public.on_resident_lodgment_change() is 'Trigger function to update lodgment occupancy when residents are added, moved, or deleted';

-- ============================================================================
-- Trigger: on_resident_lodgment_change
-- ============================================================================

drop trigger if exists on_resident_lodgment_change on public.residents;

create trigger on_resident_lodgment_change
  after insert or update or delete on public.residents
  for each row
  execute function public.on_resident_lodgment_change();

-- ============================================================================
-- Initial sync: update all lodgments with current occupancy
-- ============================================================================

do $$
declare
  lodgment_record record;
begin
  for lodgment_record in
    select id from public.lodgments where deleted_at is null
  loop
    perform public.update_lodgment_occupancy(lodgment_record.id);
  end loop;
end;
$$;
