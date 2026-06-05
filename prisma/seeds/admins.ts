import type { PrismaClient } from '../../prisma/generated/client/client.js';

export const seedAdmins = async (prisma: PrismaClient) => {
  await prisma.admin.createMany({
    data: [
      {
        createdAt: new Date('2022-09-01T08:00:00Z'),
        firstName: 'Pierre',
        id: 'aa000000-0000-0000-0000-000000000001',
        imageUrl: 'https://randomuser.me/api/portraits/men/16.jpg',
        lastName: 'Dupont',
        phoneNumber: '+33 6 12 34 56 78',
        role: 'root',
      },
      {
        createdAt: new Date('2022-09-01T08:00:00Z'),
        firstName: 'Jean',
        id: 'aa000000-0000-0000-0000-000000000002',
        imageUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
        lastName: 'Martin',
        phoneNumber: '+33 6 23 45 67 89',
        role: 'maintenance',
      },
      {
        createdAt: new Date('2022-09-01T08:00:00Z'),
        firstName: 'Marie',
        id: 'aa000000-0000-0000-0000-000000000003',
        imageUrl: 'https://randomuser.me/api/portraits/women/16.jpg',
        lastName: 'Dubois',
        phoneNumber: '+33 6 34 56 78 90',
        role: 'maintenance',
      },
      {
        createdAt: new Date('2022-09-01T08:00:00Z'),
        firstName: 'Claire',
        id: 'aa000000-0000-0000-0000-000000000004',
        imageUrl: 'https://randomuser.me/api/portraits/women/17.jpg',
        lastName: 'Bernard',
        phoneNumber: '+33 6 45 67 89 01',
        role: 'renewal',
      },
      {
        createdAt: new Date('2022-09-01T08:00:00Z'),
        firstName: 'Sophie',
        id: 'aa000000-0000-0000-0000-000000000005',
        imageUrl: 'https://randomuser.me/api/portraits/women/18.jpg',
        lastName: 'Leroy',
        phoneNumber: '+33 6 56 78 90 12',
        role: 'renewal',
      },
      {
        createdAt: new Date('2022-09-01T08:00:00Z'),
        firstName: 'Thomas',
        id: 'aa000000-0000-0000-0000-000000000006',
        imageUrl: 'https://randomuser.me/api/portraits/men/18.jpg',
        lastName: 'Moreau',
        phoneNumber: '+33 6 67 89 01 23',
        role: 'housing_application',
      },
      {
        createdAt: new Date('2022-09-01T08:00:00Z'),
        firstName: 'Lucie',
        id: 'aa000000-0000-0000-0000-000000000007',
        imageUrl: 'https://randomuser.me/api/portraits/women/19.jpg',
        lastName: 'Simon',
        phoneNumber: '+33 6 78 90 12 34',
        role: 'housing_application',
      },
    ],
  });
};
