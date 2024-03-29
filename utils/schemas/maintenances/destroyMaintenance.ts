import { z } from "#imports";
import { Simplify } from "type-fest";

/* -------------------------------------------------------------------------- */
/*                            DestroyMaintenance param                            */
/* -------------------------------------------------------------------------- */

export type DestroyMaintenanceParam = {
  id: number;
};

export const DestroyMaintenanceParamSchema: z.ZodType<
  Simplify<DestroyMaintenanceParam>
> = z.object({
  id: IdentifierSchema,
});

/* -------------------------------------------------------------------------- */
/*                             DestroyMaintenance data                             */
/* -------------------------------------------------------------------------- */

export type DestroyMaintenanceData = void;

/* -------------------------------------------------------------------------- */
/*                             DestroyMaintenance error                            */
/* -------------------------------------------------------------------------- */

export type DestroyMaintenanceBodyPEM = RequestErrorMessage<
  Record<string, never>
>;

export type DestroyMaintenanceError = RequestError<DestroyMaintenanceBodyPEM>;

export type DestroyMaintenanceResponse = RequestResponse<
  DestroyMaintenanceData,
  Record<string, never>
>;
