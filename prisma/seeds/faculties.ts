import type { PrismaClient } from '../../prisma/generated/client/client.js';

export const seedFaculties = async (prisma: PrismaClient) => {
  await prisma.faculty.createMany({
    data: [
      {
        createdAt: new Date('2022-08-01T08:00:00Z'),
        id: 'cc000000-0000-0000-0000-000000000001',
        name: 'Faculté des Sciences et de la Technologie',
      },
      {
        createdAt: new Date('2022-08-01T08:00:00Z'),
        id: 'cc000000-0000-0000-0000-000000000002',
        name: 'Faculté des Lettres et des Sciences Humaines',
      },
      {
        createdAt: new Date('2022-08-01T08:00:00Z'),
        id: 'cc000000-0000-0000-0000-000000000003',
        name: 'Faculté de Droit et des Sciences Politiques',
      },
      {
        createdAt: new Date('2022-08-01T08:00:00Z'),
        id: 'cc000000-0000-0000-0000-000000000004',
        name: 'Faculté de Médecine et des Sciences de la Santé',
      },
      {
        createdAt: new Date('2022-08-01T08:00:00Z'),
        id: 'cc000000-0000-0000-0000-000000000005',
        name: 'Faculté des Sciences Économiques et de Gestion',
      },
      {
        createdAt: new Date('2022-08-01T08:00:00Z'),
        id: 'cc000000-0000-0000-0000-000000000006',
        name: 'Faculté des Arts et des Sciences Sociales',
      },
      {
        createdAt: new Date('2022-08-01T08:00:00Z'),
        id: 'cc000000-0000-0000-0000-000000000007',
        name: "Faculté d'Ingénierie et d'Informatique",
      },
      {
        createdAt: new Date('2022-08-01T08:00:00Z'),
        id: 'cc000000-0000-0000-0000-000000000008',
        name: "Faculté d'Éducation et de Pédagogie",
      },
      {
        createdAt: new Date('2022-08-01T08:00:00Z'),
        id: 'cc000000-0000-0000-0000-000000000009',
        name: "Faculté d'Agriculture et des Sciences de l'Environnement",
      },
      {
        createdAt: new Date('2022-08-01T08:00:00Z'),
        id: 'cc000000-0000-0000-0000-000000000010',
        name: 'Faculté de Langues et de Communication',
      },
    ],
  });
};
