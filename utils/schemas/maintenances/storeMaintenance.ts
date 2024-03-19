import { prismaCtx, z } from "#imports";
import { MaintenanceTypeSchema } from "~/prisma/generated/zod";
import { MaintenanceFull } from "./maintenanceFull";
import { MaintenanceDescriptionSchema } from "./maintenanceDescription";

/* -------------------------------------------------------------------------- */
/*                             StoreMaintenance body                             */
/* -------------------------------------------------------------------------- */

export type StoreMaintenanceBody = {
  description?: string | null | undefined;
  type: prismaCtx.$Enums.MaintenanceType;
};

export const StoreMaintenanceBodySchema: z.ZodType<StoreMaintenanceBody> =
  z.object({
    description: MaintenanceDescriptionSchema.optional(),
    type: MaintenanceTypeSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             StoreMaintenance data                             */
/* -------------------------------------------------------------------------- */

export type StoreMaintenanceData = {
  maintenance: MaintenanceFull;
};
export const StoreMaintenanceDataSchema: z.ZodType<StoreMaintenanceData> =
  z.object({
    maintenance: MaintenanceFullSchema,
  });
/* -------------------------------------------------------------------------- */
/*                             StoreMaintenance error                            */
/* -------------------------------------------------------------------------- */

export type StoreMaintenanceBodyPEM = RequestErrorMessage<StoreMaintenanceBody>;

export type StoreMaintenanceError = RequestError<StoreMaintenanceBodyPEM>;

export type StoreMaintenanceResponse = RequestResponse<
  StoreMaintenanceData,
  StoreMaintenanceBody
>;
