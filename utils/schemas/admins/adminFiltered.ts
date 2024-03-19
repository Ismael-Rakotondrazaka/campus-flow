import { prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import { AdminComputed } from "./adminComputed";

export type AdminFiltered = Simplify<
  prismaCtx.Admin & {
    user: UserFiltered;
  }
>;

export const toAdminFiltered = (admin: AdminComputed): AdminFiltered => {
  const adminFiltered: AdminFiltered = {
    ...admin,
    user: toUserFiltered(admin.user),
  };

  return adminFiltered;
};
