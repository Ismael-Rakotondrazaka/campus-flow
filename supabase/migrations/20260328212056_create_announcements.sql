create table public.announcements (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  content          text not null,
  illustration_url text,
  status           text not null default 'draft'
                     check (status in ('draft', 'published')),
  start_at         timestamptz,
  end_at           timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  deleted_at       timestamptz
);

comment on table public.announcements is 'Campus announcements; drafts are visible to admins only.';
comment on column public.announcements.status is 'draft | published';

create index announcements_status_idx on public.announcements (status) where deleted_at is null;
create index announcements_deleted_at_idx on public.announcements (deleted_at) where deleted_at is null;

alter table public.announcements enable row level security;

create policy "Authenticated users can view published announcements"
  on public.announcements for select
  to authenticated
  using (status = 'published' and deleted_at is null);

create policy "Admins can view all announcements"
  on public.announcements for select
  to authenticated
  using (public.is_admin());

create policy "Root admins can manage announcements"
  on public.announcements for all
  to authenticated
  using (public.has_admin_role('root'))
  with check (public.has_admin_role('root'));

create trigger update_announcements_updated_at
  before update on public.announcements
  for each row
  execute function public.handle_updated_at();
