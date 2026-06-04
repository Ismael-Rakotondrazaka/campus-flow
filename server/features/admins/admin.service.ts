import type { Admin, AdminQuery, UpdateAdmin } from '#shared/features/admins';
import type { PaginationResult } from '#shared/features/paginations';

import { AdminConfig } from '#shared/features/admins';

export const getAdmins = async (
  filters: AdminQuery
): Promise<PaginationResult<Admin>> => {
  const page = filters.page ?? AdminConfig.PAGE_DEFAULT;

  const limit = filters.limit ?? AdminConfig.PAGE_SIZE_DEFAULT;

  const skip = (page - 1) * limit;

  const where = {
    deletedAt: filters.includeDeleted ? undefined : null,
    ...(filters.role && { role: filters.role }),
  };

  const [rows, count] = await prisma.$transaction([
    prisma.admin.findMany({
      orderBy: { [filters.orderBy ?? 'createdAt']: filters.sortOrder ?? 'asc' },
      skip,
      take: limit,
      where,
    }),
    prisma.admin.count({ where }),
  ]);

  return { count, data: rows as Admin[] };
};

export const getAdminsCount = async (
  filters: Omit<AdminQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'>
): Promise<number> => {
  return prisma.admin.count({
    where: {
      deletedAt: filters.includeDeleted ? undefined : null,
      ...(filters.role && { role: filters.role }),
    },
  });
};

export const getAdmin = async (id: string): Promise<Admin | null> => {
  return prisma.admin.findUnique({ where: { id } }) as Promise<Admin | null>;
};

export const updateAdmin = async (
  id: string,
  input: UpdateAdmin
): Promise<Admin> => {
  return prisma.admin.update({
    data: { role: input.role },
    where: { id },
  }) as Promise<Admin>;
};

export const deleteAdmin = async (id: string): Promise<void> => {
  await prisma.admin.update({
    data: { deletedAt: new Date() },
    where: { id },
  });
};
