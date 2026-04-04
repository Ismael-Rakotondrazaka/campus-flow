-- Renames profile_url → image_url on all affected tables.
-- Run once against the target database after deploying the updated migrations.

ALTER TABLE public.users                    RENAME COLUMN profile_url TO image_url;
ALTER TABLE public.maintainers              RENAME COLUMN profile_url TO image_url;
ALTER TABLE public.renewals                 RENAME COLUMN profile_url TO image_url;
ALTER TABLE public.housing_applications     RENAME COLUMN profile_url TO image_url;
