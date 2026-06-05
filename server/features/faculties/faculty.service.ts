import type { Faculty, FacultyQuery } from '#shared/features/faculties';
import type { PaginationResult } from '#shared/features/paginations';

import { FacultyConfig } from '#shared/features/faculties';

export const getFaculties = async (
  filters: FacultyQuery
): Promise<PaginationResult<Faculty>> => {
  const page = filters.page ?? FacultyConfig.PAGE_DEFAULT;
  const limit = filters.limit ?? FacultyConfig.PAGE_SIZE_DEFAULT;
  const skip = (page - 1) * limit;

  const where = {
    deletedAt: null,
    ...(filters.search && {
      name: { contains: filters.search, mode: 'insensitive' as const },
    }),
  };

  const [rows, count] = await prisma.$transaction([
    prisma.faculty.findMany({
      orderBy: {
        [filters.orderBy ?? 'name']: filters.sortOrder ?? 'asc',
      },
      skip,
      take: limit,
      where,
    }),
    prisma.faculty.count({ where }),
  ]);

  return { count, data: rows as Faculty[] };
};

export const getFacultiesCount = async (
  filters: Omit<FacultyQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'>
): Promise<number> => {
  return prisma.faculty.count({
    where: {
      deletedAt: null,
      ...(filters.search && {
        name: { contains: filters.search, mode: 'insensitive' as const },
      }),
    },
  });
};

export const getFaculty = async (id: string): Promise<Faculty | null> => {
  return prisma.faculty.findUnique({
    where: { deletedAt: null, id },
  }) as Promise<Faculty | null>;
};
