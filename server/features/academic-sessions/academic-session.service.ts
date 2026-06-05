import type {
  AcademicSession,
  AcademicSessionQuery,
  CreateAcademicSession,
  UpdateAcademicSession,
} from '#shared/features/academic-sessions';
import type { PaginationResult } from '#shared/features/paginations';

import { AcademicSessionConfig } from '#shared/features/academic-sessions';

export const getAcademicSessions = async (
  filters: AcademicSessionQuery
): Promise<PaginationResult<AcademicSession>> => {
  const page = filters.page ?? AcademicSessionConfig.PAGE_DEFAULT;
  const limit = filters.limit ?? AcademicSessionConfig.PAGE_SIZE_DEFAULT;
  const skip = (page - 1) * limit;

  const where = { deletedAt: null };

  const [rows, count] = await prisma.$transaction([
    prisma.academicSession.findMany({
      orderBy: {
        [filters.orderBy ?? 'startAt']: filters.sortOrder ?? 'desc',
      },
      skip,
      take: limit,
      where,
    }),
    prisma.academicSession.count({ where }),
  ]);

  return { count, data: rows as AcademicSession[] };
};

export const getAcademicSessionsCount = async (): Promise<number> => {
  return prisma.academicSession.count({ where: { deletedAt: null } });
};

export const getAcademicSession = async (
  id: string
): Promise<AcademicSession | null> => {
  return prisma.academicSession.findUnique({
    where: { deletedAt: null, id },
  }) as Promise<AcademicSession | null>;
};

export const createAcademicSession = async (
  input: CreateAcademicSession
): Promise<AcademicSession> => {
  return prisma.academicSession.create({
    data: {
      applicationCloseAt: new Date(input.applicationCloseAt),
      applicationOpenAt: new Date(input.applicationOpenAt),
      endAt: new Date(input.endAt),
      renewalCloseAt: new Date(input.renewalCloseAt),
      renewalOpenAt: new Date(input.renewalOpenAt),
      startAt: new Date(input.startAt),
    },
  }) as Promise<AcademicSession>;
};

export const updateAcademicSession = async (
  id: string,
  input: UpdateAcademicSession
): Promise<AcademicSession> => {
  return prisma.academicSession.update({
    data: {
      applicationCloseAt: input.applicationCloseAt
        ? new Date(input.applicationCloseAt)
        : undefined,
      applicationOpenAt: input.applicationOpenAt
        ? new Date(input.applicationOpenAt)
        : undefined,
      endAt: input.endAt ? new Date(input.endAt) : undefined,
      renewalCloseAt: input.renewalCloseAt
        ? new Date(input.renewalCloseAt)
        : undefined,
      renewalOpenAt: input.renewalOpenAt
        ? new Date(input.renewalOpenAt)
        : undefined,
      startAt: input.startAt ? new Date(input.startAt) : undefined,
    },
    where: { id },
  }) as Promise<AcademicSession>;
};

export const deleteAcademicSession = async (id: string): Promise<void> => {
  await prisma.academicSession.update({
    data: { deletedAt: new Date() },
    where: { id },
  });
};

export const getActiveApplicationSession =
  async (): Promise<AcademicSession | null> => {
    const now = new Date();

    return prisma.academicSession.findFirst({
      where: {
        applicationCloseAt: { gte: now },
        applicationOpenAt: { lte: now },
        deletedAt: null,
      },
    }) as Promise<AcademicSession | null>;
  };

export const getActiveRenewalSession =
  async (): Promise<AcademicSession | null> => {
    const now = new Date();

    return prisma.academicSession.findFirst({
      where: {
        deletedAt: null,
        renewalCloseAt: { gte: now },
        renewalOpenAt: { lte: now },
      },
    }) as Promise<AcademicSession | null>;
  };
