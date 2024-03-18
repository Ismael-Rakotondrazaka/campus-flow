import { z } from "#imports";
import { BuildingFull } from "./buildingFull";
import { BuildingNameSchema } from "./buildingName";

/* -------------------------------------------------------------------------- */
/*                            UpdateBuilding param                            */
/* -------------------------------------------------------------------------- */

export type UpdateBuildingParam = {
  id: number;
};

export const UpdateBuildingParamSchema: z.ZodType<UpdateBuildingParam> =
  z.object({
    id: IdentifierSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             UpdateBuilding body                             */
/* -------------------------------------------------------------------------- */

export type UpdateBuildingBody = {
  name?: string | undefined;
  floors?: number | undefined;
  illustration?: File | undefined;
};

export const UpdateBuildingBodySchema: z.ZodType<UpdateBuildingBody> = z
  .object({
    name: BuildingNameSchema,
    floors: z.coerce.number().int().nonnegative(),
    illustration: FileSchema,
  })
  .partial();

/* -------------------------------------------------------------------------- */
/*                             UpdateBuilding data                             */
/* -------------------------------------------------------------------------- */

export type UpdateBuildingData = {
  building: BuildingFull;
};

/* -------------------------------------------------------------------------- */
/*                             UpdateBuilding error                            */
/* -------------------------------------------------------------------------- */

export type UpdateBuildingBodyPEM = RequestErrorMessage<UpdateBuildingBody>;

export type UpdateBuildingError = RequestError<UpdateBuildingBodyPEM>;

export type UpdateBuildingResponse = RequestResponse<
  UpdateBuildingData,
  UpdateBuildingBody
>;
