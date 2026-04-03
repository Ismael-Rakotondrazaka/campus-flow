create table public.renewals (
  id                     uuid primary key default gen_random_uuid(),
  student_id             uuid not null references public.students (user_id) on delete cascade,
  academic_session_id    uuid not null references public.academic_sessions (id),
  faculty_id             uuid not null references public.faculties (id),
  admin_id               uuid references public.admins (user_id) on delete set null,
  phone_number           text not null,
  emergency_number       text not null,
  image_url            text not null,
  school_certificate_url text not null,
  nic_url                text not null,
  status                 text not null default 'pending'
                           check (status in ('pending', 'accepted', 'refused', 'validated')),
  refusal_reason         text
                           check (refusal_reason in (
                             'capacity_limit_reached', 'incomplete_documents',
                             'falsified_documents', 'past_behavior', 'ineligibility', 'other'
                           )),
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now(),
  constraint renewals_student_session_unique unique (student_id, academic_session_id)
);

comment on table public.renewals is 'Annual housing renewal requests submitted by existing students.';
comment on column public.renewals.admin_id is 'Set when an admin processes the renewal.';
comment on column public.renewals.faculty_id is 'Faculty at time of renewal (for historical record).';
comment on column public.renewals.status is 'pending | accepted | refused | validated';
comment on column public.renewals.refusal_reason is 'capacity_limit_reached | incomplete_documents | falsified_documents | past_behavior | ineligibility | other';

create index renewals_student_id_idx on public.renewals (student_id);
create index renewals_academic_session_id_idx on public.renewals (academic_session_id);
create index renewals_status_idx on public.renewals (status);
create index renewals_admin_id_idx on public.renewals (admin_id);
create index renewals_created_at_idx on public.renewals (created_at desc);

alter table public.renewals enable row level security;

create policy "Renewal admins can view all renewals"
  on public.renewals for select
  to authenticated
  using (public.has_admin_role('renewal'));

create policy "Students can view their own renewals"
  on public.renewals for select
  to authenticated
  using ((select auth.uid()) = student_id);

create policy "Students can submit their own renewals"
  on public.renewals for insert
  to authenticated
  with check ((select auth.uid()) = student_id);

create policy "Students can update their own pending renewals"
  on public.renewals for update
  to authenticated
  using ((select auth.uid()) = student_id and status = 'pending')
  with check ((select auth.uid()) = student_id);

create policy "Renewal admins can update renewals"
  on public.renewals for update
  to authenticated
  using (public.has_admin_role('renewal'))
  with check (public.has_admin_role('renewal'));

create policy "Root admins can delete renewals"
  on public.renewals for delete
  to authenticated
  using (public.has_admin_role('root'));

create trigger update_renewals_updated_at
  before update on public.renewals
  for each row
  execute function public.handle_updated_at();
