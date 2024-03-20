import { z } from "#imports";
import { Simplify } from "type-fest";
import { AdminCount, AdminCountSchema } from "./adminCount";
import { AdminFiltered } from "./adminFiltered";
import { AdminSchema } from "~/prisma/generated/zod";

export type AdminFull = Simplify<AdminFiltered & AdminCount>;

export const AdminFullSchema: z.ZodType<AdminFull> = AdminSchema.and(
  AdminCountSchema,
).and(
  z.object({
    user: UserSchema,
  }),
);
