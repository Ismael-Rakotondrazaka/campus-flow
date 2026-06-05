import type { Lodgment, LodgmentQuery } from '#shared/features/lodgments';
import type { PaginationResult } from '#shared/features/paginations';

import { updateBuildingOccupancy } from '#server/features/buildings/building.service';
import { LodgmentConfig, lodgmentInclude } from '#shared/features/lodgments';

export const getLodgments = async (
  filters: LodgmentQuery
): Promise<PaginationResult<Lodgment>> => {
  const page = filters.page ?? LodgmentConfig.PAGE_DEFAULT;
  const limit = filters.limit ?? LodgmentConfig.PAGE_SIZE_DEFAULT;
  const skip = (page - 1) * limit;

  const orderBy = filters.orderBy ?? 'floor';
  const sortOrder = filters.sortOrder ?? 'asc';

  const where = {
    deletedAt: null,
    ...(filters.buildingId && { buildingId: filters.buildingId }),
    ...(filters.floor !== undefined && { floor: filters.floor }),
  };

  const [rows, count] = await prisma.$transaction([
    prisma.lodgment.findMany({
      include: lodgmentInclude,
      orderBy:
        orderBy === 'floor'
          ? [{ floor: sortOrder }, { roomNumber: sortOrder }]
          : { [orderBy]: sortOrder },
      skip,
      take: limit,
      where,
    }),
    prisma.lodgment.count({ where }),
  ]);

  return { count, data: rows };
};

export const getLodgmentsCount = async (
  filters: Omit<LodgmentQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'>
): Promise<number> => {
  return prisma.lodgment.count({
    where: {
      deletedAt: null,
      ...(filters.buildingId && { buildingId: filters.buildingId }),
      ...(filters.floor !== undefined && { floor: filters.floor }),
    },
  });
};

export const getLodgment = async (id: string): Promise<Lodgment | null> => {
  return prisma.lodgment.findUnique({
    include: lodgmentInclude,
    where: { deletedAt: null, id },
  });
};

export const updateLodgmentOccupancy = async (
  lodgmentId: string
): Promise<void> => {
  const lodgment = await prisma.lodgment.findUnique({
    select: { buildingId: true, capacity: true },
    where: { id: lodgmentId },
  });

  if (lodgment === null) return;

  const residentsCount = await prisma.resident.count({
    where: { deletedAt: null, lodgmentId },
  });

  const capacityRemaining = lodgment.capacity - residentsCount;

  await prisma.lodgment.update({
    data: { capacityRemaining, residentsCount },
    where: { id: lodgmentId },
  });

  await updateBuildingOccupancy(lodgment.buildingId);
};
