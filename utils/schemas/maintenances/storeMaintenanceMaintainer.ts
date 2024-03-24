import { z } from "#imports";
import { Simplify } from "type-fest";

/* -------------------------------------------------------------------------- */
/*                      StoreMaintenanceMaintainer param                      */
/* -------------------------------------------------------------------------- */

export type StoreMaintenanceMaintainerParam = {
  /**
   * maintenance id
   */
  id: number;
};
export const StoreMaintenanceMaintainerParamSchema: z.ZodType<
  Simplify<StoreMaintenanceMaintainerParam>
> = z.object({
  id: IdentifierSchema,
});

/* -------------------------------------------------------------------------- */
/*                            StoreMaintenanceMaintainer body                            */
/* -------------------------------------------------------------------------- */

export type StoreMaintenanceMaintainerBody = {
  maintainerId: number;
};

export const StoreMaintenanceMaintainerBodySchema: z.ZodType<
  Simplify<StoreMaintenanceMaintainerBody>
> = z.object({
  maintainerId: IdentifierSchema,
});

/* -------------------------------------------------------------------------- */
/*                             StoreMaintenanceMaintainer data                             */
/* -------------------------------------------------------------------------- */

export type StoreMaintenanceMaintainerData = {
  maintainer: MaintainerFull;
};

export const StoreMaintenanceMaintainerDataSchema: z.ZodType<StoreMaintenanceMaintainerData> =
  z.object({
    maintainer: MaintainerFullSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             StoreMaintenanceMaintainer error                            */
/* -------------------------------------------------------------------------- */

export type StoreMaintenanceMaintainerBodyPEM = RequestErrorMessage<
  Record<string, never>
>;

export type StoreMaintenanceMaintainerError =
  RequestError<StoreMaintenanceMaintainerBodyPEM>;

export type StoreMaintenanceMaintainerResponse = RequestResponse<
  StoreMaintenanceMaintainerData,
  Record<string, never>
>;
