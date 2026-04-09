-- Seed: announcements (21 total)
-- 7 per academic year × 3 years
-- Past years (2023, 2024): all published
-- Current year (2025): NEW_YEAR + RENEWAL published, rest draft

INSERT INTO public.announcements (
  id, title, content, illustration_url, status, created_at, updated_at
) VALUES

  -- ===================== YEAR 2023 =====================

  -- NEW_YEAR 2023
  ('af000000-0000-0000-0000-000000000001',
   'Bonne année !',
   E'L''équipe de l''Université Lumièrebourg vous souhaite une année exceptionnelle, pleine de réalisations et de moments mémorables.\n\nQue cette nouvelle année soit une période de croissance personnelle et académique, où vous atteindrez de nouveaux sommets et surmonterez les défis avec brio.\n\nBonne année !',
   'https://images.unsplash.com/photo-1546074177-31bfa593f731?w=500&auto=format&fit=crop&q=60', 'published', '2023-01-05 09:00:00+00', '2023-01-05 09:00:00+00'),

  -- RENEWAL 2023
  ('af000000-0000-0000-0000-000000000002',
   'Renouvelez votre logement sur le campus dès maintenant !',
   E'Chers résidents,\n\nNous sommes heureux de vous informer que le dépôt de dossier pour les demandes de renouvellement de logement est maintenant ouvert !\n\nConnectez-vous à votre espace résident pour accéder au formulaire de demande. Dépêchez-vous, le temps presse !',
   'https://images.unsplash.com/photo-1516409590654-e8d51fc2d25c?w=500&auto=format&fit=crop&q=60', 'published', '2023-01-25 09:00:00+00', '2023-01-25 09:00:00+00'),

  -- RENEWAL_RESULT 2023
  ('af000000-0000-0000-0000-000000000003',
   'Liste des renouvellements de logement acceptés affichée !',
   E'Chers résidents actuels,\n\nNous sommes heureux de vous annoncer que la liste des renouvellements de logement acceptés est maintenant disponible.\n\nSi votre nom figure sur la liste, la prochaine étape consiste à valider votre dossier de logement. Vous avez reçu les instructions détaillées par e-mail.',
   'https://images.unsplash.com/photo-1627518788331-b3b7fdaa382f?w=500&auto=format&fit=crop&q=60', 'published', '2023-03-15 09:00:00+00', '2023-03-15 09:00:00+00'),

  -- HOUSING_APPLICATION 2023
  ('af000000-0000-0000-0000-000000000004',
   'Ouverture du dépôt des dossiers de demande de logement !',
   E'Nous sommes heureux d''annoncer que le dépôt des dossiers pour les demandes de logement est désormais ouvert !\n\nVisitez notre site web pour obtenir les informations sur les critères d''admissibilité et les étapes à suivre. Les places sont limitées, dépêchez-vous !',
   'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=500&auto=format&fit=crop&q=60', 'published', '2023-03-25 09:00:00+00', '2023-03-25 09:00:00+00'),

  -- HOUSING_APPLICATION_RESULT 2023
  ('af000000-0000-0000-0000-000000000005',
   'Liste des demandes de logement acceptées affichée !',
   E'Chers étudiants,\n\nNous sommes heureux de vous informer que la liste des demandes de logement acceptées est désormais disponible.\n\nSi votre nom figure sur la liste, félicitations ! Veuillez suivre les instructions reçues par e-mail pour valider votre dossier.',
   'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=500&auto=format&fit=crop&q=60', 'published', '2023-05-15 09:00:00+00', '2023-05-15 09:00:00+00'),

  -- CLIMATE_CHANGE 2023
  ('af000000-0000-0000-0000-000000000006',
   'Participez à la conférence sur la lutte contre le réchauffement climatique !',
   E'Chers résidents,\n\nVous êtes invités à assister à une conférence spéciale sur la lutte contre le réchauffement climatique à l''Université Lumièrebourg.\n\nEnsemble, nous pouvons faire une différence ! Ne manquez pas cette occasion de vous informer et d''agir pour un avenir plus durable.',
   'https://images.unsplash.com/photo-1552799446-159ba9523315?w=500&auto=format&fit=crop&q=60', 'published', '2023-09-01 09:00:00+00', '2023-09-01 09:00:00+00'),

  -- SCIENCE_DAY 2023
  ('af000000-0000-0000-0000-000000000007',
   'Célébrons la Journée Internationale de la Science ensemble !',
   E'Chers résidents,\n\nNous sommes ravis de vous inviter à célébrer la Journée Internationale de la Science lors d''une conférence spéciale à l''Université Lumièrebourg.\n\nQue vous soyez passionné de biologie, de physique ou d''informatique, cette conférence offre une occasion unique d''explorer les merveilles de la science.',
   'https://images.unsplash.com/photo-1554475900-0a0350e3fc7b?w=500&auto=format&fit=crop&q=60', 'published', '2023-11-01 09:00:00+00', '2023-11-01 09:00:00+00'),

  -- ===================== YEAR 2024 =====================

  -- NEW_YEAR 2024
  ('af000000-0000-0000-0000-000000000008',
   'Meilleurs vœux pour la nouvelle année !',
   E'À l''aube de cette nouvelle année, nous tenons à vous exprimer nos meilleurs vœux pour une année remplie de joie, de santé et de prospérité.\n\nNous sommes reconnaissants de votre engagement envers l''excellence académique et nous sommes impatients de vous accompagner dans votre parcours.',
   'https://images.unsplash.com/photo-1577046823799-58b2d217d508?w=500&auto=format&fit=crop&q=60', 'published', '2024-01-05 09:00:00+00', '2024-01-05 09:00:00+00'),

  -- RENEWAL 2024
  ('af000000-0000-0000-0000-000000000009',
   'Renouvelez votre séjour sur le campus pour une autre année mémorable !',
   E'Chers résidents,\n\nC''est le moment de renouveler votre logement pour l''année universitaire à venir ! Le dépôt de dossier pour les demandes de renouvellement est désormais ouvert.\n\nConnectez-vous à votre espace résident pour accéder au formulaire. Nous avons hâte de vous accueillir à nouveau !',
   'https://images.unsplash.com/photo-1590006137741-5f5892ce5635?w=500&auto=format&fit=crop&q=60', 'published', '2024-01-25 09:00:00+00', '2024-01-25 09:00:00+00'),

  -- RENEWAL_RESULT 2024
  ('af000000-0000-0000-0000-000000000010',
   'Annonce importante : Validation des renouvellements de logement',
   E'Chers résidents actuels,\n\nNous avons le plaisir de vous informer que la liste des renouvellements de logement acceptés est désormais disponible.\n\nAssurez-vous de suivre les instructions reçues par e-mail et de soumettre tous les documents requis dans les délais impartis.',
   'https://images.unsplash.com/photo-1666018215790-867b14fe4822?w=500&auto=format&fit=crop&q=60', 'published', '2024-03-15 09:00:00+00', '2024-03-15 09:00:00+00'),

  -- HOUSING_APPLICATION 2024
  ('af000000-0000-0000-0000-000000000011',
   'Préparez-vous à vivre sur le campus !',
   E'C''est le moment de planifier votre hébergement pour l''année universitaire ! Le dépôt des dossiers pour les demandes de logement est officiellement ouvert.\n\nProfitez des avantages de vivre sur le campus. Consultez notre site web dès aujourd''hui pour toutes les informations.',
   'https://images.unsplash.com/flagged/photo-1558963675-94dc9c4a66a9?w=500&auto=format&fit=crop&q=60', 'published', '2024-03-25 09:00:00+00', '2024-03-25 09:00:00+00'),

  -- HOUSING_APPLICATION_RESULT 2024
  ('af000000-0000-0000-0000-000000000012',
   'Annonce importante : Validation des dossiers de logement',
   E'Chers résidents potentiels,\n\nNous sommes ravis de vous annoncer que la liste des demandes de logement acceptées est maintenant disponible.\n\nSi vous avez été sélectionné, félicitations ! Assurez-vous de valider votre dossier dans les délais impartis.',
   'https://images.unsplash.com/photo-1666018215872-b98ffea7e6ab?w=500&auto=format&fit=crop&q=60', 'published', '2024-05-15 09:00:00+00', '2024-05-15 09:00:00+00'),

  -- CLIMATE_CHANGE 2024
  ('af000000-0000-0000-0000-000000000013',
   'Conférence sur le réchauffement climatique : Soyons le changement !',
   E'Chers résidents,\n\nJoignez-vous à nous pour une conférence inspirante sur le réchauffement climatique et les actions que nous pouvons entreprendre pour faire face à ce défi mondial.\n\nVenez écouter les témoignages inspirants de nos conférenciers invités et découvrez comment contribuer à un avenir durable.',
   'https://images.unsplash.com/photo-1570358934836-6802981e481e?w=500&auto=format&fit=crop&q=60', 'published', '2024-09-01 09:00:00+00', '2024-09-01 09:00:00+00'),

  -- SCIENCE_DAY 2024
  ('af000000-0000-0000-0000-000000000014',
   'Rejoignez-nous pour célébrer la Journée Internationale de la Science !',
   E'Chers résidents,\n\nVous êtes invités à assister à une conférence spéciale en l''honneur de la Journée Internationale de la Science.\n\nVenez écouter des conférenciers passionnés partager leurs recherches dans des domaines aussi variés que la biologie, l''astronomie et l''ingénierie.',
   'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=500&auto=format&fit=crop&q=60', 'published', '2024-11-01 09:00:00+00', '2024-11-01 09:00:00+00'),

  -- ===================== YEAR 2025 (current) =====================

  -- NEW_YEAR 2025 (published)
  ('af000000-0000-0000-0000-000000000015',
   'Joyeux Nouvel An !',
   E'En cette période de renouveau et d''espoir, nous vous adressons nos vœux les plus sincères pour une année prospère et enrichissante.\n\nQue chaque jour soit une nouvelle occasion de grandir, d''apprendre et de s''épanouir. L''Université Lumièrebourg est fière de vous accompagner dans votre parcours.',
   'https://images.unsplash.com/photo-1515995301990-280d37b2a8c9?w=500&auto=format&fit=crop&q=60', 'published', '2025-01-05 09:00:00+00', '2025-01-05 09:00:00+00'),

  -- RENEWAL 2025 (published)
  ('af000000-0000-0000-0000-000000000016',
   'Renouvelez dès maintenant pour assurer votre place sur le campus !',
   E'Chers résidents,\n\nL''heure est venue de renouveler votre logement pour l''année universitaire suivante ! Le dépôt de dossier est officiellement ouvert.\n\nN''attendez pas, renouvelez dès maintenant pour garantir votre place sur le campus pour une autre année d''expériences enrichissantes !',
   'https://images.unsplash.com/photo-1619418602850-35ad20aa1700?w=500&auto=format&fit=crop&q=60', 'published', '2025-01-25 09:00:00+00', '2025-01-25 09:00:00+00'),

  -- RENEWAL_RESULT 2025 (draft — not yet published)
  ('af000000-0000-0000-0000-000000000017',
   'Liste des renouvellements de logement acceptés : Instructions pour la validation',
   E'Chers résidents actuels,\n\nNous sommes ravis de vous informer que la liste des renouvellements de logement acceptés sera bientôt publiée.\n\nVeuillez vous préparer à valider votre dossier dès la publication de la liste.',
   'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&auto=format&fit=crop&q=60', 'draft', '2025-03-01 09:00:00+00', '2025-03-01 09:00:00+00'),

  -- HOUSING_APPLICATION 2025 (draft)
  ('af000000-0000-0000-0000-000000000018',
   'Votre aventure sur le campus commence ici !',
   E'Le dépôt des dossiers pour les demandes de logement sera bientôt ouvert à l''Université Lumièrebourg.\n\nDécouvrez notre processus de demande simple et transparent en visitant notre site web. Ne manquez pas cette occasion de faire partie d''une communauté dynamique.',
   'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=500&auto=format&fit=crop&q=60', 'draft', '2025-03-20 09:00:00+00', '2025-03-20 09:00:00+00'),

  -- HOUSING_APPLICATION_RESULT 2025 (draft)
  ('af000000-0000-0000-0000-000000000019',
   'Liste des demandes de logement acceptées : Instructions pour la validation du dossier',
   E'Chers étudiants résidents potentiels,\n\nLa liste des demandes de logement acceptées sera publiée prochainement. Préparez-vous à valider votre dossier en suivant les instructions qui vous seront envoyées par e-mail.',
   'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&auto=format&fit=crop&q=60', 'draft', '2025-05-01 09:00:00+00', '2025-05-01 09:00:00+00'),

  -- CLIMATE_CHANGE 2025 (draft)
  ('af000000-0000-0000-0000-000000000020',
   'Agissez maintenant : Conférence sur le réchauffement climatique',
   E'Chers résidents,\n\nNous sommes confrontés à une crise environnementale sans précédent, mais nous avons également le pouvoir de faire une différence.\n\nJoignez-vous à nous pour une conférence sur le réchauffement climatique. Votre engagement peut faire la différence !',
   'https://images.unsplash.com/photo-1570095378004-ce65d6c2d5bb?w=500&auto=format&fit=crop&q=60', 'draft', '2025-09-01 09:00:00+00', '2025-09-01 09:00:00+00'),

  -- SCIENCE_DAY 2025 (draft)
  ('af000000-0000-0000-0000-000000000021',
   'Fêtons la Journée Internationale de la Science : Rejoignez-nous à la conférence !',
   E'Chers résidents,\n\nVenez célébrer la Journée Internationale de la Science avec nous lors d''une conférence spéciale à l''Université Lumièrebourg.\n\nAssistez à des présentations fascinantes de chercheurs éminents et découvrez les dernières avancées scientifiques.',
   'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=500&auto=format&fit=crop&q=60', 'draft', '2025-11-01 09:00:00+00', '2025-11-01 09:00:00+00');
