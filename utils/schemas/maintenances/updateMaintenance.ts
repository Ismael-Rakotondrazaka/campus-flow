import { prismaCtx, z } from "#imports";
import { MaintenanceFull } from "./maintenanceFull";
import { Simplify } from "type-fest";

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
  status: Exclude<prismaCtx.$Enums.MaintenanceStatus, "PENDING">;
};

export const UpdateMaintenanceBodySchema: z.ZodType<
  Simplify<UpdateMaintenanceBody>
> = z.object({
  status: z.enum(["ONGOING", "DONE", "REFUSED"]),
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
