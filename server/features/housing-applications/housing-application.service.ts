import type {
  CreateHousingApplication,
  HousingApplication,
  HousingApplicationQuery,
  UpdateHousingApplication,
} from '#shared/features/housing-applications';
import type { PaginationResult } from '#shared/features/paginations';

import {
  HousingApplicationConfig,
  housingApplicationInclude,
} from '#shared/features/housing-applications';

export const getHousingApplications = async (
  filters: HousingApplicationQuery
): Promise<PaginationResult<HousingApplication>> => {
  const page = filters.page ?? HousingApplicationConfig.PAGE_DEFAULT;

  const limit = filters.limit ?? HousingApplicationConfig.PAGE_SIZE_DEFAULT;

  const skip = (page - 1) * limit;

  const where = {
    deletedAt: filters.includeDeleted ? undefined : null,
    ...(filters.academicSessionId && {
      academicSessionId: filters.academicSessionId,
    }),
    ...(filters.facultyId && { facultyId: filters.facultyId }),
    ...(filters.gender && { gender: filters.gender }),
    ...(filters.origin && { origin: filters.origin }),
    ...(filters.status && { status: filters.status }),
    ...(filters.search && {
      OR: [
        {
          email: { contains: filters.search, mode: 'insensitive' as const },
        },
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
    prisma.housingApplication.findMany({
      include: housingApplicationInclude,
      orderBy: { createdAt: filters.sortOrder ?? 'desc' },
      skip,
      take: limit,
      where,
    }),
    prisma.housingApplication.count({ where }),
  ]);

  return { count, data: rows as HousingApplication[] };
};

export const getHousingApplicationsCount = async (
  filters: Omit<HousingApplicationQuery, 'limit' | 'page' | 'sortOrder'>
): Promise<number> => {
  return prisma.housingApplication.count({
    where: {
      deletedAt: filters.includeDeleted ? undefined : null,
      ...(filters.academicSessionId && {
        academicSessionId: filters.academicSessionId,
      }),
      ...(filters.facultyId && { facultyId: filters.facultyId }),
      ...(filters.gender && { gender: filters.gender }),
      ...(filters.origin && { origin: filters.origin }),
      ...(filters.status && { status: filters.status }),
      ...(filters.search && {
        OR: [
          {
            email: { contains: filters.search, mode: 'insensitive' as const },
          },
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

export const getHousingApplication = async (
  id: string
): Promise<HousingApplication | null> => {
  return prisma.housingApplication.findUnique({
    include: housingApplicationInclude,
    where: { id },
  }) as Promise<HousingApplication | null>;
};

export const createHousingApplication = async (
  input: CreateHousingApplication
): Promise<HousingApplication> => {
  return prisma.housingApplication.create({
    data: {
      ...(input.id && { id: input.id }),
      academicSessionId: input.academicSessionId,
      email: input.email,
      emergencyNumber: input.emergencyNumber,
      facultyId: input.facultyId,
      firstName: input.firstName,
      gender: input.gender,
      imageUrl: input.imageUrl,
      lastName: input.lastName,
      nic: input.nic,
      nicUrl: input.nicUrl,
      origin: input.origin,
      phoneNumber: input.phoneNumber,
      schoolCertificateUrl: input.schoolCertificateUrl,
    },
    include: housingApplicationInclude,
  }) as Promise<HousingApplication>;
};

export const updateHousingApplication = async (
  id: string,
  input: UpdateHousingApplication
): Promise<HousingApplication> => {
  return prisma.housingApplication.update({
    data: {
      lodgmentId: input.lodgmentId,
      refusalReason: input.refusalReason,
      status: input.status,
    },
    include: housingApplicationInclude,
    where: { id },
  }) as Promise<HousingApplication>;
};

export const deleteHousingApplication = async (id: string): Promise<void> => {
  await prisma.housingApplication.update({
    data: { deletedAt: new Date() },
    where: { id },
  });
};
