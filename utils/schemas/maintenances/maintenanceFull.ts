import { z, prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import {
  AdminSchema,
  MaintainerSchema,
  MaintenanceSchema,
} from "~/prisma/generated/zod";
import { MaintenanceCount, MaintenanceCountSchema } from "./maintenanceCount";

export type MaintenanceFull = Simplify<
  prismaCtx.Maintenance &
    MaintenanceCount & {
      maintainers: prismaCtx.Maintainer[];
      admin: AdminFiltered;
    }
>;

export const MaintenanceFullSchema: z.ZodType<MaintenanceFull> =
  MaintenanceSchema.and(MaintenanceCountSchema).and(
    z.object({
      maintainers: z.array(MaintainerSchema),
      admin: AdminSchema.merge(z.object({ user: UserSchema })),
    }),
  );
