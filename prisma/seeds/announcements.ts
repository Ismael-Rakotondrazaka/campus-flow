import type { PrismaClient } from '../../prisma/generated/client/client.js';

export const seedAnnouncements = async (prisma: PrismaClient) => {
  await prisma.announcement.createMany({
    data: [
      // ==================== 2023 ====================
      {
        content:
          "L'équipe de l'Université Lumièrebourg vous souhaite une année exceptionnelle, pleine de réalisations et de moments mémorables.\n\nQue cette nouvelle année soit une période de croissance personnelle et académique, où vous atteindrez de nouveaux sommets et surmonterez les défis avec brio.\n\nBonne année !",
        createdAt: new Date('2023-01-05T09:00:00Z'),
        id: 'af000000-0000-0000-0000-000000000001',
        illustrationUrl:
          'https://images.unsplash.com/photo-1546074177-31bfa593f731?w=500&auto=format&fit=crop&q=60',
        status: 'published',
        title: 'Bonne année !',
      },
      {
        content:
          'Chers résidents,\n\nNous sommes heureux de vous informer que le dépôt de dossier pour les demandes de renouvellement de logement est maintenant ouvert !\n\nConnectez-vous à votre espace résident pour accéder au formulaire de demande. Dépêchez-vous, le temps presse !',
        createdAt: new Date('2023-01-25T09:00:00Z'),
        id: 'af000000-0000-0000-0000-000000000002',
        illustrationUrl:
          'https://images.unsplash.com/photo-1516409590654-e8d51fc2d25c?w=500&auto=format&fit=crop&q=60',
        status: 'published',
        title: 'Renouvelez votre logement sur le campus dès maintenant !',
      },
      {
        content:
          'Chers résidents actuels,\n\nNous sommes heureux de vous annoncer que la liste des renouvellements de logement acceptés est maintenant disponible.\n\nSi votre nom figure sur la liste, la prochaine étape consiste à valider votre dossier de logement. Vous avez reçu les instructions détaillées par e-mail.',
        createdAt: new Date('2023-03-15T09:00:00Z'),
        id: 'af000000-0000-0000-0000-000000000003',
        illustrationUrl:
          'https://images.unsplash.com/photo-1627518788331-b3b7fdaa382f?w=500&auto=format&fit=crop&q=60',
        status: 'published',
        title: 'Liste des renouvellements de logement acceptés affichée !',
      },
      {
        content:
          "Nous sommes heureux d'annoncer que le dépôt des dossiers pour les demandes de logement est désormais ouvert !\n\nVisitez notre site web pour obtenir les informations sur les critères d'admissibilité et les étapes à suivre. Les places sont limitées, dépêchez-vous !",
        createdAt: new Date('2023-03-25T09:00:00Z'),
        id: 'af000000-0000-0000-0000-000000000004',
        illustrationUrl:
          'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=500&auto=format&fit=crop&q=60',
        status: 'published',
        title: 'Ouverture du dépôt des dossiers de demande de logement !',
      },
      {
        content:
          'Chers étudiants,\n\nNous sommes heureux de vous informer que la liste des demandes de logement acceptées est désormais disponible.\n\nSi votre nom figure sur la liste, félicitations ! Veuillez suivre les instructions reçues par e-mail pour valider votre dossier.',
        createdAt: new Date('2023-05-15T09:00:00Z'),
        id: 'af000000-0000-0000-0000-000000000005',
        illustrationUrl:
          'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=500&auto=format&fit=crop&q=60',
        status: 'published',
        title: 'Liste des demandes de logement acceptées affichée !',
      },
      {
        content:
          "Chers résidents,\n\nVous êtes invités à assister à une conférence spéciale sur la lutte contre le réchauffement climatique à l'Université Lumièrebourg.\n\nEnsemble, nous pouvons faire une différence ! Ne manquez pas cette occasion de vous informer et d'agir pour un avenir plus durable.",
        createdAt: new Date('2023-09-01T09:00:00Z'),
        id: 'af000000-0000-0000-0000-000000000006',
        illustrationUrl:
          'https://images.unsplash.com/photo-1552799446-159ba9523315?w=500&auto=format&fit=crop&q=60',
        status: 'published',
        title:
          'Participez à la conférence sur la lutte contre le réchauffement climatique !',
      },
      {
        content:
          "Chers résidents,\n\nNous sommes ravis de vous inviter à célébrer la Journée Internationale de la Science lors d'une conférence spéciale à l'Université Lumièrebourg.\n\nQue vous soyez passionné de biologie, de physique ou d'informatique, cette conférence offre une occasion unique d'explorer les merveilles de la science.",
        createdAt: new Date('2023-11-01T09:00:00Z'),
        id: 'af000000-0000-0000-0000-000000000007',
        illustrationUrl:
          'https://images.unsplash.com/photo-1554475900-0a0350e3fc7b?w=500&auto=format&fit=crop&q=60',
        status: 'published',
        title: 'Célébrons la Journée Internationale de la Science ensemble !',
      },
      // ==================== 2024 ====================
      {
        content:
          "À l'aube de cette nouvelle année, nous tenons à vous exprimer nos meilleurs vœux pour une année remplie de joie, de santé et de prospérité.\n\nNous sommes reconnaissants de votre engagement envers l'excellence académique et nous sommes impatients de vous accompagner dans votre parcours.",
        createdAt: new Date('2024-01-05T09:00:00Z'),
        id: 'af000000-0000-0000-0000-000000000008',
        illustrationUrl:
          'https://images.unsplash.com/photo-1577046823799-58b2d217d508?w=500&auto=format&fit=crop&q=60',
        status: 'published',
        title: 'Meilleurs vœux pour la nouvelle année !',
      },
      {
        content:
          "Chers résidents,\n\nC'est le moment de renouveler votre logement pour l'année universitaire à venir ! Le dépôt de dossier pour les demandes de renouvellement est désormais ouvert.\n\nConnectez-vous à votre espace résident pour accéder au formulaire. Nous avons hâte de vous accueillir à nouveau !",
        createdAt: new Date('2024-01-25T09:00:00Z'),
        id: 'af000000-0000-0000-0000-000000000009',
        illustrationUrl:
          'https://images.unsplash.com/photo-1590006137741-5f5892ce5635?w=500&auto=format&fit=crop&q=60',
        status: 'published',
        title:
          'Renouvelez votre séjour sur le campus pour une autre année mémorable !',
      },
      {
        content:
          'Chers résidents actuels,\n\nNous avons le plaisir de vous informer que la liste des renouvellements de logement acceptés est désormais disponible.\n\nAssurez-vous de suivre les instructions reçues par e-mail et de soumettre tous les documents requis dans les délais impartis.',
        createdAt: new Date('2024-03-15T09:00:00Z'),
        id: 'af000000-0000-0000-0000-000000000010',
        illustrationUrl:
          'https://images.unsplash.com/photo-1666018215790-867b14fe4822?w=500&auto=format&fit=crop&q=60',
        status: 'published',
        title:
          'Annonce importante : Validation des renouvellements de logement',
      },
      {
        content:
          "C'est le moment de planifier votre hébergement pour l'année universitaire ! Le dépôt des dossiers pour les demandes de logement est officiellement ouvert.\n\nProfitez des avantages de vivre sur le campus. Consultez notre site web dès aujourd'hui pour toutes les informations.",
        createdAt: new Date('2024-03-25T09:00:00Z'),
        id: 'af000000-0000-0000-0000-000000000011',
        illustrationUrl:
          'https://images.unsplash.com/flagged/photo-1558963675-94dc9c4a66a9?w=500&auto=format&fit=crop&q=60',
        status: 'published',
        title: 'Préparez-vous à vivre sur le campus !',
      },
      {
        content:
          'Chers résidents potentiels,\n\nNous sommes ravis de vous annoncer que la liste des demandes de logement acceptées est maintenant disponible.\n\nSi vous avez été sélectionné, félicitations ! Assurez-vous de valider votre dossier dans les délais impartis.',
        createdAt: new Date('2024-05-15T09:00:00Z'),
        id: 'af000000-0000-0000-0000-000000000012',
        illustrationUrl:
          'https://images.unsplash.com/photo-1666018215872-b98ffea7e6ab?w=500&auto=format&fit=crop&q=60',
        status: 'published',
        title: 'Annonce importante : Validation des dossiers de logement',
      },
      {
        content:
          'Chers résidents,\n\nJoignez-vous à nous pour une conférence inspirante sur le réchauffement climatique et les actions que nous pouvons entreprendre pour faire face à ce défi mondial.\n\nVenez écouter les témoignages inspirants de nos conférenciers invités et découvrez comment contribuer à un avenir durable.',
        createdAt: new Date('2024-09-01T09:00:00Z'),
        id: 'af000000-0000-0000-0000-000000000013',
        illustrationUrl:
          'https://images.unsplash.com/photo-1570358934836-6802981e481e?w=500&auto=format&fit=crop&q=60',
        status: 'published',
        title:
          'Conférence sur le réchauffement climatique : Soyons le changement !',
      },
      {
        content:
          "Chers résidents,\n\nVous êtes invités à assister à une conférence spéciale en l'honneur de la Journée Internationale de la Science.\n\nVenez écouter des conférenciers passionnés partager leurs recherches dans des domaines aussi variés que la biologie, l'astronomie et l'ingénierie.",
        createdAt: new Date('2024-11-01T09:00:00Z'),
        id: 'af000000-0000-0000-0000-000000000014',
        illustrationUrl:
          'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=500&auto=format&fit=crop&q=60',
        status: 'published',
        title:
          'Rejoignez-nous pour célébrer la Journée Internationale de la Science !',
      },
      // ==================== 2025 (current) ====================
      {
        content:
          "En cette période de renouveau et d'espoir, nous vous adressons nos vœux les plus sincères pour une année prospère et enrichissante.\n\nQue chaque jour soit une nouvelle occasion de grandir, d'apprendre et de s'épanouir. L'Université Lumièrebourg est fière de vous accompagner dans votre parcours.",
        createdAt: new Date('2025-01-05T09:00:00Z'),
        id: 'af000000-0000-0000-0000-000000000015',
        illustrationUrl:
          'https://images.unsplash.com/photo-1515995301990-280d37b2a8c9?w=500&auto=format&fit=crop&q=60',
        status: 'published',
        title: 'Joyeux Nouvel An !',
      },
      {
        content:
          "Chers résidents,\n\nL'heure est venue de renouveler votre logement pour l'année universitaire suivante ! Le dépôt de dossier est officiellement ouvert.\n\nN'attendez pas, renouvelez dès maintenant pour garantir votre place sur le campus pour une autre année d'expériences enrichissantes !",
        createdAt: new Date('2025-01-25T09:00:00Z'),
        id: 'af000000-0000-0000-0000-000000000016',
        illustrationUrl:
          'https://images.unsplash.com/photo-1619418602850-35ad20aa1700?w=500&auto=format&fit=crop&q=60',
        status: 'published',
        title:
          'Renouvelez dès maintenant pour assurer votre place sur le campus !',
      },
      {
        content:
          'Chers résidents actuels,\n\nNous sommes ravis de vous informer que la liste des renouvellements de logement acceptés sera bientôt publiée.\n\nVeuillez vous préparer à valider votre dossier dès la publication de la liste.',
        createdAt: new Date('2025-03-01T09:00:00Z'),
        id: 'af000000-0000-0000-0000-000000000017',
        illustrationUrl:
          'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&auto=format&fit=crop&q=60',
        status: 'draft',
        title:
          'Liste des renouvellements de logement acceptés : Instructions pour la validation',
      },
      {
        content:
          "Le dépôt des dossiers pour les demandes de logement sera bientôt ouvert à l'Université Lumièrebourg.\n\nDécouvrez notre processus de demande simple et transparent en visitant notre site web. Ne manquez pas cette occasion de faire partie d'une communauté dynamique.",
        createdAt: new Date('2025-03-20T09:00:00Z'),
        id: 'af000000-0000-0000-0000-000000000018',
        illustrationUrl:
          'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=500&auto=format&fit=crop&q=60',
        status: 'draft',
        title: 'Votre aventure sur le campus commence ici !',
      },
      {
        content:
          'Chers étudiants résidents potentiels,\n\nLa liste des demandes de logement acceptées sera publiée prochainement. Préparez-vous à valider votre dossier en suivant les instructions qui vous seront envoyées par e-mail.',
        createdAt: new Date('2025-05-01T09:00:00Z'),
        id: 'af000000-0000-0000-0000-000000000019',
        illustrationUrl:
          'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&auto=format&fit=crop&q=60',
        status: 'draft',
        title:
          'Liste des demandes de logement acceptées : Instructions pour la validation du dossier',
      },
      {
        content:
          'Chers résidents,\n\nNous sommes confrontés à une crise environnementale sans précédent, mais nous avons également le pouvoir de faire une différence.\n\nJoignez-vous à nous pour une conférence sur le réchauffement climatique. Votre engagement peut faire la différence !',
        createdAt: new Date('2025-09-01T09:00:00Z'),
        id: 'af000000-0000-0000-0000-000000000020',
        illustrationUrl:
          'https://images.unsplash.com/photo-1570095378004-ce65d6c2d5bb?w=500&auto=format&fit=crop&q=60',
        status: 'draft',
        title:
          'Agissez maintenant : Conférence sur le réchauffement climatique',
      },
      {
        content:
          "Chers résidents,\n\nVenez célébrer la Journée Internationale de la Science avec nous lors d'une conférence spéciale à l'Université Lumièrebourg.\n\nAssistez à des présentations fascinantes de chercheurs éminents et découvrez les dernières avancées scientifiques.",
        createdAt: new Date('2025-11-01T09:00:00Z'),
        id: 'af000000-0000-0000-0000-000000000021',
        illustrationUrl:
          'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=500&auto=format&fit=crop&q=60',
        status: 'draft',
        title:
          'Fêtons la Journée Internationale de la Science : Rejoignez-nous à la conférence !',
      },
    ],
  });
};
