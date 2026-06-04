import type {
  CreateMaintenance,
  Maintenance,
  MaintenanceQuery,
  UpdateMaintenance,
} from '#shared/features/maintenances';
import type { PaginationResult } from '#shared/features/paginations';

import {
  MaintenanceConfig,
  maintenanceInclude,
} from '#shared/features/maintenances';

export const getMaintenances = async (
  filters: MaintenanceQuery
): Promise<PaginationResult<Maintenance>> => {
  const page = filters.page ?? MaintenanceConfig.PAGE_DEFAULT;

  const limit = filters.limit ?? MaintenanceConfig.PAGE_SIZE_DEFAULT;

  const skip = (page - 1) * limit;

  const where = {
    deletedAt: filters.includeDeleted ? undefined : null,
    ...(filters.lodgmentId && { lodgmentId: filters.lodgmentId }),
    ...(filters.residentId && { residentId: filters.residentId }),
    ...(filters.status && { status: filters.status }),
    ...(filters.type && { type: filters.type }),
  };

  const [rows, count] = await prisma.$transaction([
    prisma.maintenance.findMany({
      include: maintenanceInclude,
      orderBy: {
        [filters.orderBy ?? 'createdAt']: filters.sortOrder ?? 'desc',
      },
      skip,
      take: limit,
      where,
    }),
    prisma.maintenance.count({ where }),
  ]);

  return { count, data: rows as Maintenance[] };
};

export const getMaintenancesCount = async (
  filters: Omit<MaintenanceQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'>
): Promise<number> => {
  return prisma.maintenance.count({
    where: {
      deletedAt: filters.includeDeleted ? undefined : null,
      ...(filters.lodgmentId && { lodgmentId: filters.lodgmentId }),
      ...(filters.residentId && { residentId: filters.residentId }),
      ...(filters.status && { status: filters.status }),
      ...(filters.type && { type: filters.type }),
    },
  });
};

export const getMaintenance = async (
  id: string
): Promise<Maintenance | null> => {
  return prisma.maintenance.findUnique({
    include: maintenanceInclude,
    where: { id },
  }) as Promise<Maintenance | null>;
};

export const createMaintenance = async (
  input: CreateMaintenance,
  residentId: string
): Promise<Maintenance> => {
  return prisma.maintenance.create({
    data: {
      description: input.description,
      lodgmentId: input.lodgmentId,
      residentId,
      type: input.type,
    },
    include: maintenanceInclude,
  }) as Promise<Maintenance>;
};

export const updateMaintenance = async (
  id: string,
  input: UpdateMaintenance
): Promise<Maintenance> => {
  return prisma.maintenance.update({
    data: {
      description: input.description,
      endAt: input.endAt ? new Date(input.endAt) : input.endAt,
      startAt: input.startAt ? new Date(input.startAt) : input.startAt,
      status: input.status,
      type: input.type,
    },
    include: maintenanceInclude,
    where: { id },
  }) as Promise<Maintenance>;
};

export const deleteMaintenance = async (id: string): Promise<void> => {
  await prisma.maintenance.update({
    data: { deletedAt: new Date() },
    where: { id },
  });
};

export const assignMaintainer = async (
  maintenanceId: string,
  maintainerId: string
): Promise<void> => {
  await prisma.maintenanceMaintainer.create({
    data: { maintainerId, maintenanceId },
  });
};

export const unassignMaintainer = async (
  maintenanceId: string,
  maintainerId: string
): Promise<void> => {
  await prisma.maintenanceMaintainer.delete({
    where: { maintenanceId_maintainerId: { maintainerId, maintenanceId } },
  });
};
