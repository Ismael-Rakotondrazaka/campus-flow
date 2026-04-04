-- ============================================================
-- Rename: students → residents
-- ============================================================

-- 1. Rename the table
alter table public.students rename to residents;

-- 2. Rename indexes
alter index students_faculty_id_idx rename to residents_faculty_id_idx;
alter index students_lodgment_id_idx rename to residents_lodgment_id_idx;
alter index students_academic_session_id_idx rename to residents_academic_session_id_idx;

-- 3. Rename trigger
alter trigger update_students_updated_at on public.residents rename to update_residents_updated_at;

-- 4. Rename RLS policies on residents
alter policy "Admins can view all students"               on public.residents rename to "Admins can view all residents";
alter policy "Students can view their own record"         on public.residents rename to "Residents can view their own record";
alter policy "Housing application admins can create students"     on public.residents rename to "Housing application admins can create residents";
alter policy "Root and renewal admins can update students" on public.residents rename to "Root and renewal admins can update residents";
alter policy "Root admins can delete students"            on public.residents rename to "Root admins can delete residents";

-- ============================================================
-- Rename: renewals.student_id → resident_id
-- ============================================================

-- 5. Rename column (PostgreSQL updates policy expressions automatically)
alter table public.renewals rename column student_id to resident_id;

-- 6. Rename index and constraint
alter index renewals_student_id_idx rename to renewals_resident_id_idx;
alter table public.renewals rename constraint renewals_student_session_unique to renewals_resident_session_unique;

-- 7. Rename RLS policies on renewals
alter policy "Students can view their own renewals"              on public.renewals rename to "Residents can view their own renewals";
alter policy "Students can submit their own renewals"            on public.renewals rename to "Residents can submit their own renewals";
alter policy "Students can update their own pending renewals"    on public.renewals rename to "Residents can update their own pending renewals";

-- ============================================================
-- Rename: maintenances.student_id → resident_id
-- ============================================================

-- 8. Rename column
alter table public.maintenances rename column student_id to resident_id;

-- 9. Rename index
alter index maintenances_student_id_idx rename to maintenances_resident_id_idx;

-- 10. Rename RLS policies on maintenances
alter policy "Students can view their own maintenance requests"  on public.maintenances rename to "Residents can view their own maintenance requests";
alter policy "Students can submit maintenance requests"          on public.maintenances rename to "Residents can submit maintenance requests";

-- ============================================================
-- Rename: is_student() → is_resident()
-- ============================================================

-- 11. Create the new function
create or replace function public.is_resident()
returns boolean
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  return exists (
    select 1 from public.residents
    where user_id = (select auth.uid())
  );
end;
$$;

comment on function public.is_resident() is 'Returns true if the current user has a resident record.';

-- 12. Drop the old function
drop function if exists public.is_student();
