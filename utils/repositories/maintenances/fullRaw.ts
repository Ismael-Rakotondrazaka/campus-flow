import { prismaCtx } from "#imports";
import { Simplify } from "type-fest";

export type MaintenanceFullRaw = Simplify<
  prismaCtx.Maintenance & {
    _count: {
      maintainers: number;
    };
    maintainers: MaintainerComputed[];
    admin: prismaCtx.Admin & {
      user: UserComputed;
    };
    student: prismaCtx.Student & {
      user: UserComputed;
    };
    lodgment: prismaCtx.Lodgment & {
      building: prismaCtx.Building;
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
    endAt: maintenance.endAt,
    startAt: maintenance.startAt,
    studentId: maintenance.studentId,
    _count: {
      maintainers: maintenance._count.maintainers,
    },
    maintainers: maintenance.maintainers,
    admin: {
      role: maintenance.admin.role,
      userId: maintenance.admin.userId,
      user: toUserFiltered(maintenance.admin.user),
    },
    student: toStudentFiltered(maintenance.student),
    lodgment: maintenance.lodgment,
  };

  return maintenanceFull;
};
