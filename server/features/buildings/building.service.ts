import type { Building, BuildingQuery } from '#shared/features/buildings';
import type { PaginationResult } from '#shared/features/paginations';

import { BuildingConfig } from '#shared/features/buildings';

export const getBuildings = async (
  filters: BuildingQuery
): Promise<PaginationResult<Building>> => {
  const page = filters.page ?? BuildingConfig.PAGE_DEFAULT;
  const limit = filters.limit ?? BuildingConfig.PAGE_SIZE_DEFAULT;
  const skip = (page - 1) * limit;

  const where = {
    deletedAt: null,
    ...(filters.search && {
      name: { contains: filters.search, mode: 'insensitive' as const },
    }),
  };

  const [rows, count] = await prisma.$transaction([
    prisma.building.findMany({
      orderBy: {
        [filters.orderBy ?? 'name']: filters.sortOrder ?? 'asc',
      },
      skip,
      take: limit,
      where,
    }),
    prisma.building.count({ where }),
  ]);

  return { count, data: rows as Building[] };
};

export const getBuildingsCount = async (
  filters: Omit<BuildingQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'>
): Promise<number> => {
  return prisma.building.count({
    where: {
      deletedAt: null,
      ...(filters.search && {
        name: { contains: filters.search, mode: 'insensitive' as const },
      }),
    },
  });
};

export const getBuilding = async (id: string): Promise<Building | null> => {
  return prisma.building.findUnique({
    where: { deletedAt: null, id },
  }) as Promise<Building | null>;
};

export const updateBuildingOccupancy = async (
  buildingId: string
): Promise<void> => {
  const lodgments = await prisma.lodgment.findMany({
    select: { capacity: true, residentsCount: true },
    where: { buildingId, deletedAt: null },
  });

  const lodgmentsCount = lodgments.length;

  const residentsCount = lodgments.reduce(
    (sum, l) => sum + l.residentsCount,
    0
  );

  const totalCapacity = lodgments.reduce((sum, l) => sum + l.capacity, 0);

  const capacityRemaining = totalCapacity - residentsCount;

  await prisma.building.update({
    data: { capacityRemaining, lodgmentsCount, residentsCount, totalCapacity },
    where: { id: buildingId },
  });
};
