create table public.residents (
  id                  uuid primary key references auth.users (id) on delete cascade,
  first_name          text not null,
  last_name           text not null,
  email               text not null,
  phone_number        text not null,
  image_url           text not null,
  faculty_id          uuid not null references public.faculties (id),
  academic_session_id uuid not null references public.academic_sessions (id),
  lodgment_id         uuid references public.lodgments (id),
  gender              text not null check (gender in ('male', 'female')),
  origin              text not null check (origin in ('national', 'foreigner')),
  emergency_number    text not null,
  nic                 text not null,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  deleted_at          timestamptz
);

comment on table public.residents is 'Residents; one per user, linked to their lodgment and faculty.';
comment on column public.residents.email is 'Email address of the resident.';
comment on column public.residents.lodgment_id is 'Lodgment assignment; NULL when resident is not currently housed.';
comment on column public.residents.nic is 'National Identity Card number.';
comment on column public.residents.gender is 'male | female';
comment on column public.residents.origin is 'national | foreigner';

create index residents_faculty_id_idx on public.residents (faculty_id);
create index residents_lodgment_id_idx on public.residents (lodgment_id);
create index residents_academic_session_id_idx on public.residents (academic_session_id);
create index residents_deleted_at_idx on public.residents (deleted_at) where deleted_at is null;

alter table public.residents enable row level security;

create policy "Admins can view all residents"
  on public.residents for select
  to authenticated
  using ((select public.is_admin()));

create policy "Residents can view their own record"
  on public.residents for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Housing application admins can create residents"
  on public.residents for insert
  to authenticated
  with check ((select public.has_admin_role('housing_application')));

create policy "Renewal admins can view residents"
  on public.residents for select
  to authenticated
  using ((select public.has_admin_role('renewal')));

create policy "Renewal admins can update residents"
  on public.residents for update
  to authenticated
  using ((select public.has_admin_role('renewal')))
  with check ((select public.has_admin_role('renewal')));

create policy "Root admins can delete residents"
  on public.residents for delete
  to authenticated
  using ((select public.has_admin_role('root')));

create trigger update_residents_updated_at
  before update on public.residents
  for each row
  execute function public.handle_updated_at();
