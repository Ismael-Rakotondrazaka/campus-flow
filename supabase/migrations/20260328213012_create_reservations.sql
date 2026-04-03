create table public.reservations (
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
  admin_id               uuid references public.admins (user_id) on delete set null,
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
  constraint reservations_email_session_unique unique (email, academic_session_id)
);

comment on table public.reservations is 'Housing reservation requests from prospective students (no account required).';
comment on column public.reservations.admin_id is 'Set when an admin processes the reservation.';
comment on column public.reservations.lodgment_id is 'Assigned when the reservation is accepted or validated.';
comment on column public.reservations.status is 'pending | accepted | refused | validated';
comment on column public.reservations.refusal_reason is 'capacity_limit_reached | incomplete_documents | falsified_documents | past_behavior | ineligibility | other';

create index reservations_faculty_id_idx on public.reservations (faculty_id);
create index reservations_academic_session_id_idx on public.reservations (academic_session_id);
create index reservations_status_idx on public.reservations (status);
create index reservations_email_idx on public.reservations (email);
create index reservations_created_at_idx on public.reservations (created_at desc);

alter table public.reservations enable row level security;

create policy "Anyone can submit a reservation"
  on public.reservations for insert
  to authenticated, anon
  with check (true);

create policy "Reservation admins can view all reservations"
  on public.reservations for select
  to authenticated
  using (public.has_admin_role('reservation'));

create policy "Reservation admins can update reservations"
  on public.reservations for update
  to authenticated
  using (public.has_admin_role('reservation'))
  with check (public.has_admin_role('reservation'));

create policy "Root admins can delete reservations"
  on public.reservations for delete
  to authenticated
  using (public.has_admin_role('root'));

create trigger update_reservations_updated_at
  before update on public.reservations
  for each row
  execute function public.handle_updated_at();
