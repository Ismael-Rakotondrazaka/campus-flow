import { prismaCtx } from "#imports";
import { Simplify } from "type-fest";

export type MaintenanceFullRaw = Simplify<
  prismaCtx.Maintenance & {
    _count: {
      maintainers: number;
    };
    maintainers: prismaCtx.Maintainer[];
    admin: prismaCtx.Admin & {
      user: UserComputed;
    };
  }
>;

export const maintenanceFullRawToMaintenanceFull = (
  maintenance: MaintenanceFullRaw,
): MaintenanceFull => {
  const maintenanceFull: MaintenanceFull = {
    id: maintenance.id,
    type: maintenance.type,
    description: maintenance.description,
    adminId: maintenance.adminId,
    status: maintenance.status,
    createdAt: maintenance.createdAt,
    updatedAt: maintenance.updatedAt,
    lodgmentId: maintenance.lodgmentId,
    _count: {
      maintainers: maintenance._count.maintainers,
    },
    maintainers: maintenance.maintainers,
    admin: {
      role: maintenance.admin.role,
      userId: maintenance.admin.userId,
      user: toUserFiltered(maintenance.admin.user),
    },
  };

  return maintenanceFull;
};
