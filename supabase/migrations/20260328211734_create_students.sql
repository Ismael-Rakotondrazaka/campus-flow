create table public.students (
  user_id             uuid primary key references public.users (id) on delete cascade,
  faculty_id          uuid not null references public.faculties (id),
  academic_session_id uuid not null references public.academic_sessions (id),
  lodgment_id         uuid not null references public.lodgments (id),
  gender              text not null check (gender in ('male', 'female')),
  origin              text not null check (origin in ('national', 'foreigner')),
  emergency_number    text not null,
  nic                 text not null,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

comment on table public.students is 'Resident students; one per user, linked to their lodgment and faculty.';
comment on column public.students.nic is 'National Identity Card number.';
comment on column public.students.gender is 'male | female';
comment on column public.students.origin is 'national | foreigner';

create index students_faculty_id_idx on public.students (faculty_id);
create index students_lodgment_id_idx on public.students (lodgment_id);
create index students_academic_session_id_idx on public.students (academic_session_id);

alter table public.students enable row level security;

create policy "Admins can view all students"
  on public.students for select
  to authenticated
  using (public.is_admin());

create policy "Students can view their own record"
  on public.students for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Reservation admins can create students"
  on public.students for insert
  to authenticated
  with check (public.has_admin_role('reservation'));

create policy "Root and renewal admins can update students"
  on public.students for update
  to authenticated
  using (public.has_admin_role('renewal'))
  with check (public.has_admin_role('renewal'));

create policy "Root admins can delete students"
  on public.students for delete
  to authenticated
  using (public.has_admin_role('root'));

create trigger update_students_updated_at
  before update on public.students
  for each row
  execute function public.handle_updated_at();
