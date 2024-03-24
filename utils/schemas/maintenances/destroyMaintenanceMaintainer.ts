import { z } from "#imports";
import { Simplify } from "type-fest";

/* -------------------------------------------------------------------------- */
/*                            DestroyMaintenanceMaintainer param                            */
/* -------------------------------------------------------------------------- */

export type DestroyMaintenanceMaintainerParam = {
  /**
   * maintenance id
   */
  id: number;
  maintainerId: number;
};

export const DestroyMaintenanceMaintainerParamSchema: z.ZodType<
  Simplify<DestroyMaintenanceMaintainerParam>
> = z.object({
  id: IdentifierSchema,
  maintainerId: IdentifierSchema,
});

/* -------------------------------------------------------------------------- */
/*                             DestroyMaintenanceMaintainer data                             */
/* -------------------------------------------------------------------------- */

export type DestroyMaintenanceMaintainerData = {
  maintainer: MaintainerFull;
};

export const DestroyMaintenanceMaintainerDataSchema: z.ZodType<DestroyMaintenanceMaintainerData> =
  z.object({
    maintainer: MaintainerFullSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             DestroyMaintenanceMaintainer error                            */
/* -------------------------------------------------------------------------- */

export type DestroyMaintenanceMaintainerBodyPEM = RequestErrorMessage<
  Record<string, never>
>;

export type DestroyMaintenanceMaintainerError =
  RequestError<DestroyMaintenanceMaintainerBodyPEM>;

export type DestroyMaintenanceMaintainerResponse = RequestResponse<
  DestroyMaintenanceMaintainerData,
  Record<string, never>
>;
