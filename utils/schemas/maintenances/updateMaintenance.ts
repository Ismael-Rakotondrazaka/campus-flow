import { prismaCtx, z } from "#imports";
import { MaintenanceStatusSchema } from "~/prisma/generated/zod";
import { MaintenanceFull } from "./maintenanceFull";

/* -------------------------------------------------------------------------- */
/*                            UpdateMaintenance param                            */
/* -------------------------------------------------------------------------- */

export type UpdateMaintenanceParam = {
  id: number;
};

export const UpdateMaintenanceParamSchema: z.ZodType<UpdateMaintenanceParam> =
  z.object({
    id: IdentifierSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             UpdateMaintenance body                             */
/* -------------------------------------------------------------------------- */

export type UpdateMaintenanceBody = {
  status: prismaCtx.$Enums.MaintenanceStatus;
};

export const UpdateMaintenanceBodySchema: z.ZodType<UpdateMaintenanceBody> =
  z.object({
    status: MaintenanceStatusSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             UpdateMaintenance data                             */
/* -------------------------------------------------------------------------- */

export type UpdateMaintenanceData = {
  maintenance: MaintenanceFull;
};
export const UpdateMaintenanceDataSchema: z.ZodType<UpdateMaintenanceData> =
  z.object({
    maintenance: MaintenanceFullSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             UpdateMaintenance error                            */
/* -------------------------------------------------------------------------- */

export type UpdateMaintenanceBodyPEM =
  RequestErrorMessage<UpdateMaintenanceBody>;

export type UpdateMaintenanceError = RequestError<UpdateMaintenanceBodyPEM>;

export type UpdateMaintenanceResponse = RequestResponse<
  UpdateMaintenanceData,
  UpdateMaintenanceBody
>;
