import { prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import { AdminFull } from "./adminFull";

export type AdminFullRaw = Simplify<
  prismaCtx.Admin & {
    _count: {
      maintenances: number;
      renewals: number;
      reservations: number;
    };
  } & { user: UserComputed }
>;

export const adminFullRawToAdminFull = (admin: AdminFullRaw): AdminFull => {
  const adminFull: AdminFull = {
    userId: admin.userId,
    role: admin.role,
    _count: admin._count,
    user: toUserFiltered(admin.user),
  };

  return adminFull;
};
