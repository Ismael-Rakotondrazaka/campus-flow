import { z, prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import {
  AdminSchema,
  BuildingSchema,
  LodgmentSchema,
  MaintenanceSchema,
  StudentSchema,
} from "~/prisma/generated/zod";
import { MaintenanceCount, MaintenanceCountSchema } from "./maintenanceCount";

export type MaintenanceFull = Simplify<
  prismaCtx.Maintenance &
    MaintenanceCount & {
      maintainers: MaintainerComputed[];
      admin: AdminFiltered;
      student: StudentFiltered;
      lodgment: prismaCtx.Lodgment & {
        building: prismaCtx.Building;
      };
    }
>;

export const MaintenanceFullSchema: z.ZodType<MaintenanceFull> =
  MaintenanceSchema.and(MaintenanceCountSchema).and(
    z.object({
      maintainers: z.array(MaintainerSchema),
      admin: AdminSchema.merge(
        z.object({
          user: UserSchema,
        }),
      ),
      student: StudentSchema.merge(
        z.object({
          user: UserSchema,
        }),
      ),
      lodgment: LodgmentSchema.merge(
        z.object({
          building: BuildingSchema,
        }),
      ),
    }),
  );
