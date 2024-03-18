import { z } from "#imports";

/* -------------------------------------------------------------------------- */
/*                            DestroyBuilding param                            */
/* -------------------------------------------------------------------------- */

export type DestroyBuildingParam = {
  id: number;
};

export const DestroyBuildingParamSchema: z.ZodType<DestroyBuildingParam> =
  z.object({
    id: IdentifierSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             DestroyBuilding data                             */
/* -------------------------------------------------------------------------- */

export type DestroyBuildingData = void;

/* -------------------------------------------------------------------------- */
/*                             DestroyBuilding error                            */
/* -------------------------------------------------------------------------- */

export type DestroyBuildingBodyPEM = RequestErrorMessage<Record<string, never>>;

export type DestroyBuildingError = RequestError<DestroyBuildingBodyPEM>;

export type DestroyBuildingResponse = RequestResponse<
  DestroyBuildingData,
  Record<string, never>
>;
