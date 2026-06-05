import type { PrismaClient } from '../../prisma/generated/client/client.js';

import { hashSeedPassword } from './_hash';

// All users share the same password: "password"
export const seedUsers = async (prisma: PrismaClient) => {
  const password = await hashSeedPassword();

  const adminCreatedAt = new Date('2022-09-01T08:00:00Z');

  await prisma.user.createMany({
    data: [
      // --- Admins ---
      {
        createdAt: adminCreatedAt,
        email: 'root@campus.fr',
        id: 'aa000000-0000-0000-0000-000000000001',
        role: 'admin',
      },
      {
        createdAt: adminCreatedAt,
        email: 'maint1@campus.fr',
        id: 'aa000000-0000-0000-0000-000000000002',
        role: 'admin',
      },
      {
        createdAt: adminCreatedAt,
        email: 'maint2@campus.fr',
        id: 'aa000000-0000-0000-0000-000000000003',
        role: 'admin',
      },
      {
        createdAt: adminCreatedAt,
        email: 'renewal1@campus.fr',
        id: 'aa000000-0000-0000-0000-000000000004',
        role: 'admin',
      },
      {
        createdAt: adminCreatedAt,
        email: 'renewal2@campus.fr',
        id: 'aa000000-0000-0000-0000-000000000005',
        role: 'admin',
      },
      {
        createdAt: adminCreatedAt,
        email: 'housing_app1@campus.fr',
        id: 'aa000000-0000-0000-0000-000000000006',
        role: 'admin',
      },
      {
        createdAt: adminCreatedAt,
        email: 'housing_app2@campus.fr',
        id: 'aa000000-0000-0000-0000-000000000007',
        role: 'admin',
      },
      // --- Residents (session 2023) ---
      {
        createdAt: new Date('2023-01-15T08:00:00Z'),
        email: 'emma.lefebvre@email.com',
        id: 'bb000000-0000-0000-0000-000000000001',
        role: 'resident',
      },
      {
        createdAt: new Date('2023-01-15T08:00:00Z'),
        email: 'lucas.roux@email.com',
        id: 'bb000000-0000-0000-0000-000000000002',
        role: 'resident',
      },
      {
        createdAt: new Date('2023-01-15T08:00:00Z'),
        email: 'chloe.girard@email.com',
        id: 'bb000000-0000-0000-0000-000000000003',
        role: 'resident',
      },
      {
        createdAt: new Date('2023-01-15T08:00:00Z'),
        email: 'hugo.lambert@email.com',
        id: 'bb000000-0000-0000-0000-000000000004',
        role: 'resident',
      },
      {
        createdAt: new Date('2023-01-15T08:00:00Z'),
        email: 'lea.fontaine@email.com',
        id: 'bb000000-0000-0000-0000-000000000005',
        role: 'resident',
      },
      {
        createdAt: new Date('2023-01-15T08:00:00Z'),
        email: 'nathan.chevalier@email.com',
        id: 'bb000000-0000-0000-0000-000000000006',
        role: 'resident',
      },
      {
        createdAt: new Date('2023-01-15T08:00:00Z'),
        email: 'camille.bonnet@email.com',
        id: 'bb000000-0000-0000-0000-000000000007',
        role: 'resident',
      },
      {
        createdAt: new Date('2023-01-15T08:00:00Z'),
        email: 'antoine.mercier@email.com',
        id: 'bb000000-0000-0000-0000-000000000008',
        role: 'resident',
      },
      {
        createdAt: new Date('2023-01-15T08:00:00Z'),
        email: 'ines.faure@email.com',
        id: 'bb000000-0000-0000-0000-000000000009',
        role: 'resident',
      },
      {
        createdAt: new Date('2023-01-15T08:00:00Z'),
        email: 'maxime.garnier@email.com',
        id: 'bb000000-0000-0000-0000-000000000010',
        role: 'resident',
      },
      // --- Residents (session 2024) ---
      {
        createdAt: new Date('2024-01-15T08:00:00Z'),
        email: 'manon.blanc@email.com',
        id: 'bb000000-0000-0000-0000-000000000011',
        role: 'resident',
      },
      {
        createdAt: new Date('2024-01-15T08:00:00Z'),
        email: 'theo.guerin@email.com',
        id: 'bb000000-0000-0000-0000-000000000012',
        role: 'resident',
      },
      {
        createdAt: new Date('2024-01-15T08:00:00Z'),
        email: 'alice.morin@email.com',
        id: 'bb000000-0000-0000-0000-000000000013',
        role: 'resident',
      },
      {
        createdAt: new Date('2024-01-15T08:00:00Z'),
        email: 'quentin.rousseau@email.com',
        id: 'bb000000-0000-0000-0000-000000000014',
        role: 'resident',
      },
      {
        createdAt: new Date('2024-01-15T08:00:00Z'),
        email: 'pauline.renard@email.com',
        id: 'bb000000-0000-0000-0000-000000000015',
        role: 'resident',
      },
      {
        createdAt: new Date('2024-01-15T08:00:00Z'),
        email: 'romain.bourgeois@email.com',
        id: 'bb000000-0000-0000-0000-000000000016',
        role: 'resident',
      },
      {
        createdAt: new Date('2024-01-15T08:00:00Z'),
        email: 'laura.lemaire@email.com',
        id: 'bb000000-0000-0000-0000-000000000017',
        role: 'resident',
      },
      {
        createdAt: new Date('2024-01-15T08:00:00Z'),
        email: 'florian.colin@email.com',
        id: 'bb000000-0000-0000-0000-000000000018',
        role: 'resident',
      },
      {
        createdAt: new Date('2024-01-15T08:00:00Z'),
        email: 'jade.gauthier@email.com',
        id: 'bb000000-0000-0000-0000-000000000019',
        role: 'resident',
      },
      {
        createdAt: new Date('2024-01-15T08:00:00Z'),
        email: 'clement.henry@email.com',
        id: 'bb000000-0000-0000-0000-000000000020',
        role: 'resident',
      },
      // --- Residents (session 2025) ---
      {
        createdAt: new Date('2025-01-15T08:00:00Z'),
        email: 'oceane.perrin@email.com',
        id: 'bb000000-0000-0000-0000-000000000021',
        role: 'resident',
      },
      {
        createdAt: new Date('2025-01-15T08:00:00Z'),
        email: 'alexis.dumont@email.com',
        id: 'bb000000-0000-0000-0000-000000000022',
        role: 'resident',
      },
      {
        createdAt: new Date('2025-01-15T08:00:00Z'),
        email: 'elisa.picard@email.com',
        id: 'bb000000-0000-0000-0000-000000000023',
        role: 'resident',
      },
      {
        createdAt: new Date('2025-01-15T08:00:00Z'),
        email: 'baptiste.morel@email.com',
        id: 'bb000000-0000-0000-0000-000000000024',
        role: 'resident',
      },
      {
        createdAt: new Date('2025-01-15T08:00:00Z'),
        email: 'zoe.fournier@email.com',
        id: 'bb000000-0000-0000-0000-000000000025',
        role: 'resident',
      },
      {
        createdAt: new Date('2025-01-15T08:00:00Z'),
        email: 'victor.arnaud@email.com',
        id: 'bb000000-0000-0000-0000-000000000026',
        role: 'resident',
      },
      {
        createdAt: new Date('2025-01-15T08:00:00Z'),
        email: 'clara.giraud@email.com',
        id: 'bb000000-0000-0000-0000-000000000027',
        role: 'resident',
      },
      {
        createdAt: new Date('2025-01-15T08:00:00Z'),
        email: 'adrien.caron@email.com',
        id: 'bb000000-0000-0000-0000-000000000028',
        role: 'resident',
      },
      {
        createdAt: new Date('2025-01-15T08:00:00Z'),
        email: 'juliette.gilles@email.com',
        id: 'bb000000-0000-0000-0000-000000000029',
        role: 'resident',
      },
      {
        createdAt: new Date('2025-01-15T08:00:00Z'),
        email: 'kevin.muller@email.com',
        id: 'bb000000-0000-0000-0000-000000000030',
        role: 'resident',
      },
    ],
  });

  // All 37 users use email/password with provider_id = user_id
  const allIds = [
    'aa000000-0000-0000-0000-000000000001',
    'aa000000-0000-0000-0000-000000000002',
    'aa000000-0000-0000-0000-000000000003',
    'aa000000-0000-0000-0000-000000000004',
    'aa000000-0000-0000-0000-000000000005',
    'aa000000-0000-0000-0000-000000000006',
    'aa000000-0000-0000-0000-000000000007',
    'bb000000-0000-0000-0000-000000000001',
    'bb000000-0000-0000-0000-000000000002',
    'bb000000-0000-0000-0000-000000000003',
    'bb000000-0000-0000-0000-000000000004',
    'bb000000-0000-0000-0000-000000000005',
    'bb000000-0000-0000-0000-000000000006',
    'bb000000-0000-0000-0000-000000000007',
    'bb000000-0000-0000-0000-000000000008',
    'bb000000-0000-0000-0000-000000000009',
    'bb000000-0000-0000-0000-000000000010',
    'bb000000-0000-0000-0000-000000000011',
    'bb000000-0000-0000-0000-000000000012',
    'bb000000-0000-0000-0000-000000000013',
    'bb000000-0000-0000-0000-000000000014',
    'bb000000-0000-0000-0000-000000000015',
    'bb000000-0000-0000-0000-000000000016',
    'bb000000-0000-0000-0000-000000000017',
    'bb000000-0000-0000-0000-000000000018',
    'bb000000-0000-0000-0000-000000000019',
    'bb000000-0000-0000-0000-000000000020',
    'bb000000-0000-0000-0000-000000000021',
    'bb000000-0000-0000-0000-000000000022',
    'bb000000-0000-0000-0000-000000000023',
    'bb000000-0000-0000-0000-000000000024',
    'bb000000-0000-0000-0000-000000000025',
    'bb000000-0000-0000-0000-000000000026',
    'bb000000-0000-0000-0000-000000000027',
    'bb000000-0000-0000-0000-000000000028',
    'bb000000-0000-0000-0000-000000000029',
    'bb000000-0000-0000-0000-000000000030',
  ];

  await prisma.userIdentity.createMany({
    data: allIds.map(userId => ({
      password,
      provider: 'email',
      providerId: userId,
      userId,
    })),
  });
};
