import type { PrismaClient } from '../../prisma/generated/client/client.js';

export const seedMaintainers = async (prisma: PrismaClient) => {
  await prisma.maintainer.createMany({
    data: [
      {
        createdAt: new Date('2022-10-01T08:00:00Z'),
        firstName: 'Rachid',
        id: 'ab000000-0000-0000-0000-000000000001',
        imageUrl: 'https://randomuser.me/api/portraits/men/19.jpg',
        lastName: 'Benomari',
        phoneNumber: '+33 6 50 60 70 80',
      },
      {
        createdAt: new Date('2022-10-01T08:00:00Z'),
        firstName: 'Kamel',
        id: 'ab000000-0000-0000-0000-000000000002',
        imageUrl: 'https://randomuser.me/api/portraits/men/20.jpg',
        lastName: 'Zeroual',
        phoneNumber: '+33 6 51 61 71 81',
      },
      {
        createdAt: new Date('2022-10-01T08:00:00Z'),
        firstName: 'Djamel',
        id: 'ab000000-0000-0000-0000-000000000003',
        imageUrl: 'https://randomuser.me/api/portraits/men/21.jpg',
        lastName: 'Ferdjani',
        phoneNumber: '+33 6 52 62 72 82',
      },
      {
        createdAt: new Date('2022-10-01T08:00:00Z'),
        firstName: 'Moussa',
        id: 'ab000000-0000-0000-0000-000000000004',
        imageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
        lastName: 'Benbrahim',
        phoneNumber: '+33 6 53 63 73 83',
      },
    ],
  });
};
