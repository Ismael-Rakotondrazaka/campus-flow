-- Trigger function: auto-update updated_at on every row update
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

comment on function public.handle_updated_at() is 'Sets updated_at to now() before each row update.';

-- RLS helper: true if the current user has any admin record
-- Note: references public.admins which is created in a later migration;
-- plpgsql defers table resolution to runtime so this is safe.
create or replace function public.is_admin()
returns boolean
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  return exists (
    select 1 from public.admins
    where user_id = (select auth.uid())
  );
end;
$$;

comment on function public.is_admin() is 'Returns true if the current user has any admin record.';

-- RLS helper: true if the current user has the given role OR is root
create or replace function public.has_admin_role(p_role text)
returns boolean
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  return exists (
    select 1 from public.admins
    where user_id = (select auth.uid())
      and (role = p_role or role = 'root')
  );
end;
$$;

comment on function public.has_admin_role(text) is 'Returns true if the current user has the given admin role or the root role.';

-- RLS helper: true if the current user has a resident record
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
