-- Seed: faculties (10), academic_sessions (3), buildings (3)

INSERT INTO public.faculties (id, name, created_at, updated_at) VALUES
  ('cc000000-0000-0000-0000-000000000001', 'Faculté des Sciences et de la Technologie',           '2022-08-01 08:00:00+00', '2022-08-01 08:00:00+00'),
  ('cc000000-0000-0000-0000-000000000002', 'Faculté des Lettres et des Sciences Humaines',        '2022-08-01 08:00:00+00', '2022-08-01 08:00:00+00'),
  ('cc000000-0000-0000-0000-000000000003', 'Faculté de Droit et des Sciences Politiques',         '2022-08-01 08:00:00+00', '2022-08-01 08:00:00+00'),
  ('cc000000-0000-0000-0000-000000000004', 'Faculté de Médecine et des Sciences de la Santé',     '2022-08-01 08:00:00+00', '2022-08-01 08:00:00+00'),
  ('cc000000-0000-0000-0000-000000000005', 'Faculté des Sciences Économiques et de Gestion',      '2022-08-01 08:00:00+00', '2022-08-01 08:00:00+00'),
  ('cc000000-0000-0000-0000-000000000006', 'Faculté des Arts et des Sciences Sociales',           '2022-08-01 08:00:00+00', '2022-08-01 08:00:00+00'),
  ('cc000000-0000-0000-0000-000000000007', 'Faculté d''Ingénierie et d''Informatique',            '2022-08-01 08:00:00+00', '2022-08-01 08:00:00+00'),
  ('cc000000-0000-0000-0000-000000000008', 'Faculté d''Éducation et de Pédagogie',                '2022-08-01 08:00:00+00', '2022-08-01 08:00:00+00'),
  ('cc000000-0000-0000-0000-000000000009', 'Faculté d''Agriculture et des Sciences de l''Environnement', '2022-08-01 08:00:00+00', '2022-08-01 08:00:00+00'),
  ('cc000000-0000-0000-0000-000000000010', 'Faculté de Langues et de Communication',              '2022-08-01 08:00:00+00', '2022-08-01 08:00:00+00');

-- Academic sessions: 2023-2024, 2024-2025, 2025-2026 (current) — French calendar (Sept 1 → Jun 30)
-- Application window: 1 month, ends 1 month before session start (July 1 - Aug 1)
-- Renewal window: 1 month, ends 2 weeks before application closes (June 18 - July 18)
INSERT INTO public.academic_sessions (id, start_at, end_at, application_open_at, application_close_at, renewal_open_at, renewal_close_at, created_at, updated_at) VALUES
  ('dd000000-0000-0000-0000-000000000001', '2023-09-01 00:00:00+00', '2024-06-30 00:00:00+00', '2023-07-01 00:00:00+00', '2023-08-01 00:00:00+00', '2023-06-18 00:00:00+00', '2023-07-18 00:00:00+00', '2023-06-01 08:00:00+00', '2023-06-01 08:00:00+00'),
  ('dd000000-0000-0000-0000-000000000002', '2024-09-01 00:00:00+00', '2025-06-30 00:00:00+00', '2024-07-01 00:00:00+00', '2024-08-01 00:00:00+00', '2024-06-18 00:00:00+00', '2024-07-18 00:00:00+00', '2024-06-01 08:00:00+00', '2024-06-01 08:00:00+00'),
  ('dd000000-0000-0000-0000-000000000003', '2025-09-01 00:00:00+00', '2026-06-30 00:00:00+00', '2025-07-01 00:00:00+00', '2025-08-01 00:00:00+00', '2025-06-18 00:00:00+00', '2025-07-18 00:00:00+00', '2025-06-01 08:00:00+00', '2025-06-01 08:00:00+00');

-- Buildings: A (2 floors), B (2 floors), C (1 floor)
INSERT INTO public.buildings (id, name, floors, illustration_url, created_at, updated_at) VALUES
  ('ee000000-0000-0000-0000-000000000001', 'A', 2, 'https://media.istockphoto.com/id/626961984/photo/modern-apartment-architecture-wroclaw-poland.webp?s=170667a&w=0&k=20&c=sfWZy2Cz9QFUPTRWxPSwcTngrpR8lbLHfL-mUP5Z3Sg=',           '2022-08-15 08:00:00+00', '2022-08-15 08:00:00+00'),
  ('ee000000-0000-0000-0000-000000000002', 'B', 2, 'https://media.istockphoto.com/id/1142977857/photo/fragment-of-a-facade-of-a-building-with-windows-and-balconies-modern-home-with-many-flats.webp?s=170667a&w=0&k=20&c=sSZl47ezBGdIRL0ID4QIJze28ou2P84eVrULsU4Guek=', '2022-08-15 08:00:00+00', '2022-08-15 08:00:00+00'),
  ('ee000000-0000-0000-0000-000000000003', 'C', 1, 'https://media.istockphoto.com/id/1316157141/photo/construction-of-new-building-with-windows-and-wrap-still-on-exterior.webp?s=170667a&w=0&k=20&c=9vfE1BfSWRoTFc3_5p_D0fhZ3TaPhV-3BRowW_M4y3A=',   '2022-08-15 08:00:00+00', '2022-08-15 08:00:00+00');
