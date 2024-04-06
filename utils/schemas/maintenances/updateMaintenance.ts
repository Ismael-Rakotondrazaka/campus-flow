import { prismaCtx, z } from "#imports";
import { MaintenanceTypeSchema } from "~/prisma/generated/zod";
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

export type UpdateMaintenanceBody = UpdateMaintenanceBodyAdmin &
  UpdateMaintenanceBodyStudent;

/** ADMIN */
export type UpdateMaintenanceBodyAdmin = {
  status?: Exclude<prismaCtx.$Enums.MaintenanceStatus, "PENDING">;
  startAt?: Date | null;
  endAt?: Date | null;
};

/** STUDENT */
export type UpdateMaintenanceBodyStudent = {
  description?: string | null;
  type?: prismaCtx.$Enums.MaintenanceType;
};

export type UpdateMaintenanceBodyInput = {
  /* ADMIN */
  status?: Exclude<prismaCtx.$Enums.MaintenanceStatus, "PENDING"> | string;
  startAt?: Date | null | string;
  endAt?: Date | null | string;
  /* STUDENT */
  description?: string | null;
  type?: prismaCtx.$Enums.MaintenanceType | string;
};

export const UpdateMaintenanceBodySchema: z.ZodType<
  Simplify<UpdateMaintenanceBody>,
  z.ZodTypeDef,
  UpdateMaintenanceBodyInput
> = z.object({
  /* ADMIN */
  status: z.union([
    z.enum(["ACCEPTED", "DONE", "REFUSED"]),
    CustomUndefinedSchema,
  ]),
  startAt: z.union([CustomNullSchema, CustomUndefinedSchema, z.coerce.date()]),
  endAt: z.union([CustomNullSchema, CustomUndefinedSchema, z.coerce.date()]),
  /* STUDENT */
  description: z.union([MaintenanceDescriptionSchema, CustomUndefinedSchema]),
  type: z.union([MaintenanceTypeSchema, CustomUndefinedSchema]),
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
