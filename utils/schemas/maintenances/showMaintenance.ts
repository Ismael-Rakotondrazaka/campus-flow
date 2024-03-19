import { z } from "#imports";
import { MaintenanceFull } from "./maintenanceFull";

/* -------------------------------------------------------------------------- */
/*                            ShowMaintenance param                            */
/* -------------------------------------------------------------------------- */

export type ShowMaintenanceParam = {
  id: number;
};

export const ShowMaintenanceParamSchema: z.ZodType<ShowMaintenanceParam> =
  z.object({
    id: IdentifierSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             ShowMaintenance data                             */
/* -------------------------------------------------------------------------- */

export type ShowMaintenanceData = {
  maintenance: MaintenanceFull;
};

export const ShowMaintenanceDataSchema: z.ZodType<ShowMaintenanceData> =
  z.object({
    maintenance: MaintenanceFullSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             ShowMaintenance error                            */
/* -------------------------------------------------------------------------- */

export type ShowMaintenanceBodyPEM = RequestErrorMessage<Record<string, never>>;

export type ShowMaintenanceError = RequestError<ShowMaintenanceBodyPEM>;

export type ShowMaintenanceResponse = RequestResponse<
  ShowMaintenanceData,
  Record<string, never>
>;
