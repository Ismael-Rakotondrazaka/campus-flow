import type { PaginationResult } from '#shared/features/paginations';
import type {
  Resident,
  ResidentQuery,
  UpdateResident,
} from '#shared/features/residents';

import { ResidentConfig, residentInclude } from '#shared/features/residents';

export const getResidents = async (
  filters: ResidentQuery
): Promise<PaginationResult<Resident>> => {
  const page = filters.page ?? ResidentConfig.PAGE_DEFAULT;

  const limit = filters.limit ?? ResidentConfig.PAGE_SIZE_DEFAULT;

  const skip = (page - 1) * limit;

  const where = {
    deletedAt: filters.includeDeleted ? undefined : null,
    ...(filters.academicSessionId && {
      academicSessionId: filters.academicSessionId,
    }),
    ...(filters.buildingId && {
      lodgment: { buildingId: filters.buildingId },
    }),
    ...(filters.facultyId && { facultyId: filters.facultyId }),
    ...(filters.gender && { gender: filters.gender }),
    ...(filters.lodgmentId && { lodgmentId: filters.lodgmentId }),
    ...(filters.origin && { origin: filters.origin }),
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
        {
          nic: { contains: filters.search, mode: 'insensitive' as const },
        },
        {
          phoneNumber: {
            contains: filters.search,
            mode: 'insensitive' as const,
          },
        },
      ],
    }),
  };

  const [rows, count] = await prisma.$transaction([
    prisma.resident.findMany({
      include: residentInclude,
      orderBy: {
        [filters.orderBy ?? 'createdAt']: filters.sortOrder ?? 'desc',
      },
      skip,
      take: limit,
      where,
    }),
    prisma.resident.count({ where }),
  ]);

  return { count, data: rows as Resident[] };
};

export const getResidentsCount = async (
  filters: Omit<ResidentQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'>
): Promise<number> => {
  return prisma.resident.count({
    where: {
      deletedAt: filters.includeDeleted ? undefined : null,
      ...(filters.academicSessionId && {
        academicSessionId: filters.academicSessionId,
      }),
      ...(filters.buildingId && {
        lodgment: { buildingId: filters.buildingId },
      }),
      ...(filters.facultyId && { facultyId: filters.facultyId }),
      ...(filters.gender && { gender: filters.gender }),
      ...(filters.lodgmentId && { lodgmentId: filters.lodgmentId }),
      ...(filters.origin && { origin: filters.origin }),
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
          {
            nic: { contains: filters.search, mode: 'insensitive' as const },
          },
          {
            phoneNumber: {
              contains: filters.search,
              mode: 'insensitive' as const,
            },
          },
        ],
      }),
    },
  });
};

export const getResident = async (id: string): Promise<null | Resident> => {
  return prisma.resident.findUnique({
    include: residentInclude,
    where: { id },
  }) as Promise<null | Resident>;
};

export const updateResident = async (
  id: string,
  input: UpdateResident
): Promise<Resident> => {
  return prisma.resident.update({
    data: {
      academicSessionId: input.academicSessionId,
      emergencyNumber: input.emergencyNumber,
      facultyId: input.facultyId,
      gender: input.gender,
      lodgmentId: input.lodgmentId,
      nic: input.nic,
      origin: input.origin,
    },
    include: residentInclude,
    where: { id },
  }) as Promise<Resident>;
};

export const deleteResident = async (id: string): Promise<void> => {
  await prisma.resident.update({
    data: { deletedAt: new Date() },
    where: { id },
  });
};
