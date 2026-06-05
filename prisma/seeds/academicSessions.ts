import type { PrismaClient } from '../../prisma/generated/client/client.js';

export const seedAcademicSessions = async (prisma: PrismaClient) => {
  await prisma.academicSession.createMany({
    data: [
      {
        applicationCloseAt: new Date('2023-08-01T00:00:00Z'),
        applicationOpenAt: new Date('2023-07-01T00:00:00Z'),
        createdAt: new Date('2023-06-01T08:00:00Z'),
        endAt: new Date('2024-06-30T00:00:00Z'),
        id: 'dd000000-0000-0000-0000-000000000001',
        renewalCloseAt: new Date('2023-07-18T00:00:00Z'),
        renewalOpenAt: new Date('2023-06-18T00:00:00Z'),
        startAt: new Date('2023-09-01T00:00:00Z'),
      },
      {
        applicationCloseAt: new Date('2024-08-01T00:00:00Z'),
        applicationOpenAt: new Date('2024-07-01T00:00:00Z'),
        createdAt: new Date('2024-06-01T08:00:00Z'),
        endAt: new Date('2025-06-30T00:00:00Z'),
        id: 'dd000000-0000-0000-0000-000000000002',
        renewalCloseAt: new Date('2024-07-18T00:00:00Z'),
        renewalOpenAt: new Date('2024-06-18T00:00:00Z'),
        startAt: new Date('2024-09-01T00:00:00Z'),
      },
      {
        applicationCloseAt: new Date('2025-08-01T00:00:00Z'),
        applicationOpenAt: new Date('2025-07-01T00:00:00Z'),
        createdAt: new Date('2025-06-01T08:00:00Z'),
        endAt: new Date('2026-06-30T00:00:00Z'),
        id: 'dd000000-0000-0000-0000-000000000003',
        renewalCloseAt: new Date('2025-07-18T00:00:00Z'),
        renewalOpenAt: new Date('2025-06-18T00:00:00Z'),
        startAt: new Date('2025-09-01T00:00:00Z'),
      },
    ],
  });
};
