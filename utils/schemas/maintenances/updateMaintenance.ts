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
  startAt?: Date | null;
  endAt?: Date | null;
};

export type UpdateMaintenanceBodyInput = {
  status: Exclude<prismaCtx.$Enums.MaintenanceStatus, "PENDING">;
  startAt?: Date | null | string;
  endAt?: Date | null | string;
};

export const UpdateMaintenanceBodySchema: z.ZodType<
  Simplify<UpdateMaintenanceBody>,
  z.ZodTypeDef,
  UpdateMaintenanceBodyInput
> = z.object({
  status: z.enum(["ACCEPTED", "DONE", "REFUSED"]),
  startAt: z.union([CustomNullSchema, CustomUndefinedSchema, z.coerce.date()]),
  endAt: z.union([CustomNullSchema, CustomUndefinedSchema, z.coerce.date()]),
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
