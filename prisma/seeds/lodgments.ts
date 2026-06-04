import type { PrismaClient } from '../../prisma/generated/client/client.js';

// All 30 lodgments are occupied by exactly 1 resident each.
// residentsCount=1, capacityRemaining=capacity-1 for every lodgment.
const A = 'ee000000-0000-0000-0000-000000000001';
const B = 'ee000000-0000-0000-0000-000000000002';
const C = 'ee000000-0000-0000-0000-000000000003';

const id = (n: number) =>
  `ff000000-0000-0000-0000-${String(n).padStart(12, '0')}`;

const row = (
  n: number,
  buildingId: string,
  floor: number,
  roomNumber: number,
  capacity: number
) => ({
  buildingId,
  capacity,
  capacityRemaining: capacity - 1,
  createdAt: new Date('2022-08-20T08:00:00Z'),
  floor,
  id: id(n),
  residentsCount: 1,
  roomNumber,
});

export const seedLodgments = async (prisma: PrismaClient) => {
  await prisma.lodgment.createMany({
    data: [
      // Building A - floor 0
      row(1, A, 0, 1, 4),
      row(2, A, 0, 2, 4),
      row(3, A, 0, 3, 3),
      row(4, A, 0, 4, 4),
      // Building A - floor 1
      row(5, A, 1, 5, 4),
      row(6, A, 1, 6, 4),
      row(7, A, 1, 7, 3),
      row(8, A, 1, 8, 4),
      // Building A - floor 2
      row(9, A, 2, 9, 4),
      row(10, A, 2, 10, 4),
      row(11, A, 2, 11, 3),
      row(12, A, 2, 12, 4),
      // Building B - floor 0
      row(13, B, 0, 1, 4),
      row(14, B, 0, 2, 4),
      row(15, B, 0, 3, 3),
      row(16, B, 0, 4, 4),
      // Building B - floor 1
      row(17, B, 1, 5, 4),
      row(18, B, 1, 6, 4),
      row(19, B, 1, 7, 3),
      row(20, B, 1, 8, 4),
      // Building B - floor 2
      row(21, B, 2, 9, 4),
      row(22, B, 2, 10, 4),
      row(23, B, 2, 11, 3),
      row(24, B, 2, 12, 4),
      // Building C - floor 0
      row(25, C, 0, 1, 4),
      row(26, C, 0, 2, 4),
      row(27, C, 0, 3, 3),
      // Building C - floor 1
      row(28, C, 1, 4, 4),
      row(29, C, 1, 5, 4),
      row(30, C, 1, 6, 3),
    ],
  });
};
