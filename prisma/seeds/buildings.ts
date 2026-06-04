import type { PrismaClient } from '../../prisma/generated/client/client.js';

// Occupancy computed from seed residents:
// A (ee1): 12 lodgments, 12 residents (l01–l12), totalCapacity=45
// B (ee2): 12 lodgments, 12 residents (l13–l24), totalCapacity=45
// C (ee3):  6 lodgments,  6 residents (l25–l30), totalCapacity=22
export const seedBuildings = async (prisma: PrismaClient) => {
  await prisma.building.createMany({
    data: [
      {
        capacityRemaining: 33,
        createdAt: new Date('2022-08-15T08:00:00Z'),
        floors: 2,
        id: 'ee000000-0000-0000-0000-000000000001',
        illustrationUrl:
          'https://media.istockphoto.com/id/626961984/photo/modern-apartment-architecture-wroclaw-poland.webp?s=170667a&w=0&k=20&c=sfWZy2Cz9QFUPTRWxPSwcTngrpR8lbLHfL-mUP5Z3Sg=',
        lodgmentsCount: 12,
        name: 'A',
        residentsCount: 12,
        totalCapacity: 45,
      },
      {
        capacityRemaining: 33,
        createdAt: new Date('2022-08-15T08:00:00Z'),
        floors: 2,
        id: 'ee000000-0000-0000-0000-000000000002',
        illustrationUrl:
          'https://media.istockphoto.com/id/1142977857/photo/fragment-of-a-facade-of-a-building-with-windows-and-balconies-modern-home-with-many-flats.webp?s=170667a&w=0&k=20&c=sSZl47ezBGdIRL0ID4QIJze28ou2P84eVrULsU4Guek=',
        lodgmentsCount: 12,
        name: 'B',
        residentsCount: 12,
        totalCapacity: 45,
      },
      {
        capacityRemaining: 16,
        createdAt: new Date('2022-08-15T08:00:00Z'),
        floors: 1,
        id: 'ee000000-0000-0000-0000-000000000003',
        illustrationUrl:
          'https://media.istockphoto.com/id/1316157141/photo/construction-of-new-building-with-windows-and-wrap-still-on-exterior.webp?s=170667a&w=0&k=20&c=9vfE1BfSWRoTFc3_5p_D0fhZ3TaPhV-3BRowW_M4y3A=',
        lodgmentsCount: 6,
        name: 'C',
        residentsCount: 6,
        totalCapacity: 22,
      },
    ],
  });
};
