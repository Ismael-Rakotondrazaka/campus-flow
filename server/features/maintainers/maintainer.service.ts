import type {
  CreateMaintainer,
  Maintainer,
  MaintainerQuery,
  UpdateMaintainer,
} from '#shared/features/maintainers';
import type { PaginationResult } from '#shared/features/paginations';

import { MaintainerConfig } from '#shared/features/maintainers';

export const getMaintainers = async (
  filters: MaintainerQuery
): Promise<PaginationResult<Maintainer>> => {
  const page = filters.page ?? MaintainerConfig.PAGE_DEFAULT;

  const limit = filters.limit ?? MaintainerConfig.PAGE_SIZE_DEFAULT;

  const skip = (page - 1) * limit;

  const where = {
    deletedAt: null,
    ...(filters.excludeMaintenanceId && {
      maintenanceMaintainers: {
        none: { maintenanceId: filters.excludeMaintenanceId },
      },
    }),
    ...(filters.search && {
      OR: [
        {
          firstName: {
            contains: filters.search,
            mode: 'insensitive' as const,
          },
        },
        {
          lastName: {
            contains: filters.search,
            mode: 'insensitive' as const,
          },
        },
      ],
    }),
  };

  const [rows, count] = await prisma.$transaction([
    prisma.maintainer.findMany({
      orderBy: {
        [filters.orderBy ?? 'createdAt']: filters.sortOrder ?? 'desc',
      },
      skip,
      take: limit,
      where,
    }),
    prisma.maintainer.count({ where }),
  ]);

  return { count, data: rows as Maintainer[] };
};

export const getMaintainersCount = async (
  filters: Omit<MaintainerQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'>
): Promise<number> => {
  return prisma.maintainer.count({
    where: {
      deletedAt: null,
      ...(filters.search && {
        OR: [
          {
            firstName: {
              contains: filters.search,
              mode: 'insensitive' as const,
            },
          },
          {
            lastName: {
              contains: filters.search,
              mode: 'insensitive' as const,
            },
          },
        ],
      }),
    },
  });
};

export const getMaintainer = async (id: string): Promise<Maintainer | null> => {
  return prisma.maintainer.findUnique({
    where: { deletedAt: null, id },
  }) as Promise<Maintainer | null>;
};

export const createMaintainer = async (
  input: CreateMaintainer
): Promise<Maintainer> => {
  return prisma.maintainer.create({
    data: {
      firstName: input.firstName,
      imageUrl: input.imageUrl ?? '',
      lastName: input.lastName,
      phoneNumber: input.phoneNumber,
    },
  }) as Promise<Maintainer>;
};

export const updateMaintainer = async (
  id: string,
  input: UpdateMaintainer
): Promise<Maintainer> => {
  return prisma.maintainer.update({
    data: {
      firstName: input.firstName,
      imageUrl: input.imageUrl ?? undefined,
      lastName: input.lastName,
      phoneNumber: input.phoneNumber,
    },
    where: { id },
  }) as Promise<Maintainer>;
};

export const deleteMaintainer = async (id: string): Promise<void> => {
  await prisma.maintainer.update({
    data: { deletedAt: new Date() },
    where: { id },
  });
};
