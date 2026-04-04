-- Add role field to raw_app_meta_data for existing auth users
-- Run once against the target database after deploying the updated migrations.
-- This script populates roles for:
-- - Admin users (root, maintenance, renewal, housing_application) based on public.admins table
-- - Resident users (resident) based on public.residents table

-- Update admin users with their specific roles
UPDATE auth.users au
SET raw_app_meta_data = raw_app_meta_data || jsonb_build_object('role', a.role)
FROM public.admins a
WHERE au.id = a.user_id
  AND (au.raw_app_meta_data->>'role') IS NULL;

-- Update resident users with 'resident' role
UPDATE auth.users au
SET raw_app_meta_data = raw_app_meta_data || jsonb_build_object('role', 'resident')
FROM public.residents r
WHERE au.id = r.user_id
  AND (au.raw_app_meta_data->>'role') IS NULL;

-- For users not in admins or residents tables, set role to 'resident' by default
UPDATE auth.users au
SET raw_app_meta_data = raw_app_meta_data || jsonb_build_object('role', 'resident')
WHERE (au.raw_app_meta_data->>'role') IS NULL
  AND au.id NOT IN (SELECT user_id FROM public.admins)
  AND au.id NOT IN (SELECT user_id FROM public.residents);
