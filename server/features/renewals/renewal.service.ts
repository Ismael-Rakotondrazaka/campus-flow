import type { PaginationResult } from '#shared/features/paginations';
import type {
  CreateRenewal,
  Renewal,
  RenewalQuery,
  UpdateRenewal,
} from '#shared/features/renewals';

import { RenewalConfig, renewalInclude } from '#shared/features/renewals';

export const getRenewals = async (
  filters: RenewalQuery
): Promise<PaginationResult<Renewal>> => {
  const page = filters.page ?? RenewalConfig.PAGE_DEFAULT;

  const limit = filters.limit ?? RenewalConfig.PAGE_SIZE_DEFAULT;

  const skip = (page - 1) * limit;

  const where = {
    deletedAt: filters.includeDeleted ? undefined : null,
    ...(filters.academicSessionId && {
      academicSessionId: filters.academicSessionId,
    }),
    ...(filters.facultyId && { facultyId: filters.facultyId }),
    ...(filters.residentId && { residentId: filters.residentId }),
    ...(filters.status && { status: filters.status }),
  };

  const [rows, count] = await prisma.$transaction([
    prisma.renewal.findMany({
      include: renewalInclude,
      orderBy: {
        [filters.orderBy ?? 'createdAt']: filters.sortOrder ?? 'desc',
      },
      skip,
      take: limit,
      where,
    }),
    prisma.renewal.count({ where }),
  ]);

  return { count, data: rows as Renewal[] };
};

export const getRenewalsCount = async (
  filters: Omit<RenewalQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'>
): Promise<number> => {
  return prisma.renewal.count({
    where: {
      deletedAt: filters.includeDeleted ? undefined : null,
      ...(filters.academicSessionId && {
        academicSessionId: filters.academicSessionId,
      }),
      ...(filters.facultyId && { facultyId: filters.facultyId }),
      ...(filters.residentId && { residentId: filters.residentId }),
      ...(filters.status && { status: filters.status }),
    },
  });
};

export const getRenewal = async (id: string): Promise<null | Renewal> => {
  return prisma.renewal.findUnique({
    include: renewalInclude,
    where: { id },
  }) as Promise<null | Renewal>;
};

export const createRenewal = async (
  input: CreateRenewal,
  residentId: string
): Promise<Renewal> => {
  return prisma.renewal.create({
    data: {
      academicSessionId: input.academicSessionId,
      emergencyNumber: input.emergencyNumber,
      facultyId: input.facultyId,
      imageUrl: input.imageUrl,
      nicUrl: input.nicUrl,
      phoneNumber: input.phoneNumber,
      residentId,
      schoolCertificateUrl: input.schoolCertificateUrl,
    },
    include: renewalInclude,
  }) as Promise<Renewal>;
};

export const updateRenewal = async (
  id: string,
  input: UpdateRenewal
): Promise<Renewal> => {
  return prisma.renewal.update({
    data: {
      emergencyNumber: input.emergencyNumber,
      imageUrl: input.imageUrl,
      nicUrl: input.nicUrl,
      phoneNumber: input.phoneNumber,
      refusalReason: input.refusalReason,
      schoolCertificateUrl: input.schoolCertificateUrl,
      status: input.status,
    },
    include: renewalInclude,
    where: { id },
  }) as Promise<Renewal>;
};

export const deleteRenewal = async (id: string): Promise<void> => {
  await prisma.renewal.update({
    data: { deletedAt: new Date() },
    where: { id },
  });
};
