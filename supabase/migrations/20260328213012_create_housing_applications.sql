create table public.housing_applications (
  id                     uuid primary key default gen_random_uuid(),
  first_name             text not null,
  last_name              text not null,
  phone_number           text not null,
  image_url            text not null,
  email                  text not null,
  gender                 text not null check (gender in ('male', 'female')),
  origin                 text not null check (origin in ('national', 'foreigner')),
  emergency_number       text not null,
  nic                    text not null,
  nic_url                text not null,
  school_certificate_url text not null,
  faculty_id             uuid not null references public.faculties (id),
  academic_session_id    uuid not null references public.academic_sessions (id),
  admin_id               uuid references public.admins (id) on delete set null,
  lodgment_id            uuid references public.lodgments (id) on delete set null,
  status                 text not null default 'pending'
                           check (status in ('pending', 'accepted', 'refused', 'validated')),
  refusal_reason         text
                           check (refusal_reason in (
                             'capacity_limit_reached', 'incomplete_documents',
                             'falsified_documents', 'past_behavior', 'ineligibility', 'other'
                           )),
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now(),
  deleted_at             timestamptz,
  constraint housing_applications_email_session_unique unique (email, academic_session_id)
);

comment on table public.housing_applications is 'Housing applications from prospective residents (no account required).';
comment on column public.housing_applications.admin_id is 'Set when an admin processes the application.';
comment on column public.housing_applications.lodgment_id is 'Assigned when the application is accepted or validated.';
comment on column public.housing_applications.status is 'pending | accepted | refused | validated';
comment on column public.housing_applications.refusal_reason is 'capacity_limit_reached | incomplete_documents | falsified_documents | past_behavior | ineligibility | other';

create index housing_applications_faculty_id_idx on public.housing_applications (faculty_id);
create index housing_applications_academic_session_id_idx on public.housing_applications (academic_session_id);
create index housing_applications_status_idx on public.housing_applications (status);
create index housing_applications_email_idx on public.housing_applications (email);
create index housing_applications_created_at_idx on public.housing_applications (created_at desc);
create index housing_applications_deleted_at_idx on public.housing_applications (deleted_at) where deleted_at is null;

alter table public.housing_applications enable row level security;

create policy "Anyone can submit a housing application within window"
  on public.housing_applications for insert
  to authenticated, anon
  with check (
    exists (
      select 1 from public.academic_sessions s
      where s.id = academic_session_id
        and s.deleted_at is null
        and now() >= s.application_open_at
        and now() <= s.application_close_at
    )
  );

create policy "Housing application admins can view all applications"
  on public.housing_applications for select
  to authenticated
  using ((select public.has_admin_role('housing_application')));

create policy "Housing application admins can update applications"
  on public.housing_applications for update
  to authenticated
  using ((select public.has_admin_role('housing_application')))
  with check ((select public.has_admin_role('housing_application')));

create policy "Housing application admins can delete applications"
  on public.housing_applications for delete
  to authenticated
  using ((select public.has_admin_role('housing_application')));

create trigger update_housing_applications_updated_at
  before update on public.housing_applications
  for each row
  execute function public.handle_updated_at();
