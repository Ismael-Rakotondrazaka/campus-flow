-- Public buckets (URLs are publicly readable)
insert into storage.buckets (id, name, public)
values
  ('announcement-illustrations', 'announcement-illustrations', true),
  ('building-illustrations',     'building-illustrations',     true),
  ('user-profiles',              'user-profiles',              true),
  ('post-files',                 'post-files',                 true);

-- Private buckets (access controlled via RLS policies)
insert into storage.buckets (id, name, public)
values
  ('housing-application-documents', 'housing-application-documents', false),
  ('renewal-documents',              'renewal-documents',              false),
  ('maintainer-profiles',            'maintainer-profiles',            false);

create policy "Public read for announcement illustrations"
  on storage.objects for select
  using (bucket_id = 'announcement-illustrations');

create policy "Root admins can manage announcement illustrations"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'announcement-illustrations' and public.has_admin_role('root'))
  with check (bucket_id = 'announcement-illustrations' and public.has_admin_role('root'));

create policy "Public read for building illustrations"
  on storage.objects for select
  using (bucket_id = 'building-illustrations');

create policy "Root admins can manage building illustrations"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'building-illustrations' and public.has_admin_role('root'))
  with check (bucket_id = 'building-illustrations' and public.has_admin_role('root'));

create policy "Public read for user profiles"
  on storage.objects for select
  using (bucket_id = 'user-profiles');

create policy "Users can upload their own profile"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'user-profiles'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can update their own profile"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'user-profiles'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can delete their own profile"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'user-profiles'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Public read for post files"
  on storage.objects for select
  using (bucket_id = 'post-files');

create policy "Authenticated users can upload post files"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'post-files');

create policy "Users can delete their own post files"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'post-files'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Authenticated users can read photos from housing application documents"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'housing-application-documents'
    and storage.filename(name) like 'photo__%'
  );

create policy "Admins can read all housing application documents"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'housing-application-documents' and public.is_admin());

create policy "Anyone can upload housing application documents"
  on storage.objects for insert
  to public
  with check (
    bucket_id = 'housing-application-documents'
  );

create policy "Residents can delete their own housing application documents"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'housing-application-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Residents can read their own renewal documents"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'renewal-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Admins can read all renewal documents"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'renewal-documents' and public.is_admin());

create policy "Residents can upload their own renewal documents"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'renewal-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Residents can delete their own renewal documents"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'renewal-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Admins can read maintainer profiles"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'maintainer-profiles' and public.is_admin());

create policy "Maintainers can read their own profile"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'maintainer-profiles'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Root admins can manage maintainer profiles"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'maintainer-profiles' and public.has_admin_role('root'))
  with check (bucket_id = 'maintainer-profiles' and public.has_admin_role('root'));
