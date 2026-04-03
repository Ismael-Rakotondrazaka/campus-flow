create table public.users (
  id           uuid primary key references auth.users (id) on delete cascade,
  first_name   text not null,
  last_name    text not null,
  phone_number text not null,
  image_url  text not null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  deleted_at   timestamptz
);

comment on table public.users is 'Application user profiles; auth is handled by Supabase.';
comment on column public.users.image_url is 'URL to the user profile picture in storage.';

create index users_deleted_at_idx on public.users (deleted_at) where deleted_at is null;

alter table public.users enable row level security;

create policy "Authenticated users can view active profiles"
  on public.users for select
  to authenticated
  using (deleted_at is null);

create policy "Users can update their own profile"
  on public.users for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "Root admins can update any profile"
  on public.users for update
  to authenticated
  using (public.has_admin_role('root'))
  with check (public.has_admin_role('root'));

create policy "Root admins can delete profiles"
  on public.users for delete
  to authenticated
  using (public.has_admin_role('root'));

create trigger update_users_updated_at
  before update on public.users
  for each row
  execute function public.handle_updated_at();

-- Automatically create a public.users row when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.users (id, first_name, last_name, phone_number, image_url)
  values (
    new.id,
    coalesce(nullif(trim((new.raw_app_meta_data->>'first_name')::text),    ''), 'Unknown'),
    coalesce(nullif(trim((new.raw_app_meta_data->>'last_name')::text),     ''), 'Unknown'),
    coalesce(nullif(trim((new.raw_app_meta_data->>'phone_number')::text),  ''), ''),
    coalesce(nullif(trim((new.raw_app_meta_data->>'image_url')::text),   ''), '')
  );
  return new;
end;
$$;

comment on function public.handle_new_user() is 'Creates a public.users row when a new auth.users record is inserted (signup).';

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
