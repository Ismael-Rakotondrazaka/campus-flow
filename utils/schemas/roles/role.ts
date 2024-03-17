import { prismaCtx, z } from "#imports";

export const RoleSchema: z.ZodType<prismaCtx.Role> = z.enum([
  "ROOT",
  "MAINTENANCE",
  "RENEWAL",
  "RESERVATION",
]);
