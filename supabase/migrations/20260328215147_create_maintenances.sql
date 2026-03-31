create table public.maintenances (
  id          uuid primary key default gen_random_uuid(),
  student_id  uuid not null references public.students (user_id) on delete cascade,
  admin_id    uuid references public.admins (user_id) on delete set null,
  lodgment_id uuid not null references public.lodgments (id),
  type        text not null
                check (type in ('electrical', 'plumbing', 'equipment', 'hvac', 'other')),
  description text,
  status      text not null default 'pending'
                check (status in ('pending', 'accepted', 'done', 'refused')),
  start_at    timestamptz,
  end_at      timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.maintenances is 'Maintenance requests submitted by students for their lodgment.';
comment on column public.maintenances.type is 'electrical | plumbing | equipment | hvac | other';
comment on column public.maintenances.status is 'pending | accepted | done | refused';
comment on column public.maintenances.admin_id is 'Set when an admin accepts the request.';

create index maintenances_student_id_idx on public.maintenances (student_id);
create index maintenances_lodgment_id_idx on public.maintenances (lodgment_id);
create index maintenances_status_idx on public.maintenances (status);
create index maintenances_created_at_idx on public.maintenances (created_at desc);

alter table public.maintenances enable row level security;

create policy "Maintenance admins can view all maintenance requests"
  on public.maintenances for select
  to authenticated
  using (public.has_admin_role('maintenance'));

create policy "Students can view their own maintenance requests"
  on public.maintenances for select
  to authenticated
  using ((select auth.uid()) = student_id);

create policy "Students can submit maintenance requests"
  on public.maintenances for insert
  to authenticated
  with check ((select auth.uid()) = student_id);

create policy "Maintenance admins can update maintenance requests"
  on public.maintenances for update
  to authenticated
  using (public.has_admin_role('maintenance'))
  with check (public.has_admin_role('maintenance'));

create policy "Root admins can delete maintenance requests"
  on public.maintenances for delete
  to authenticated
  using (public.has_admin_role('root'));

create trigger update_maintenances_updated_at
  before update on public.maintenances
  for each row
  execute function public.handle_updated_at();

-- Junction table: many-to-many between maintenances and maintainers
create table public.maintenance_maintainers (
  maintenance_id uuid not null references public.maintenances (id) on delete cascade,
  maintainer_id  uuid not null references public.maintainers (id) on delete cascade,
  assigned_at    timestamptz not null default now(),
  primary key (maintenance_id, maintainer_id)
);

comment on table public.maintenance_maintainers is 'Assigns external maintainers to maintenance requests.';

create index maintenance_maintainers_maintainer_id_idx
  on public.maintenance_maintainers (maintainer_id);

alter table public.maintenance_maintainers enable row level security;

create policy "Maintenance admins can manage maintenance assignments"
  on public.maintenance_maintainers for all
  to authenticated
  using (public.has_admin_role('maintenance'))
  with check (public.has_admin_role('maintenance'));
