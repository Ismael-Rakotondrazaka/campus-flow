import { prismaCtx, z } from "#imports";
import { Simplify } from "type-fest";
import { AdminCount, AdminCountSchema } from "./adminCount";
import { UserFiltered } from "~/utils/schemas";
import { AdminSchema } from "~/prisma/generated/zod";

export type AdminFull = Simplify<
  prismaCtx.Admin &
    AdminCount & {
      user: UserFiltered;
    }
>;

export const AdminFullSchema: z.ZodType<AdminFull> = AdminSchema.and(
  AdminCountSchema,
).and(
  z.object({
    user: UserSchema,
  }),
);
