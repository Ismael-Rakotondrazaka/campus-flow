import { z } from "#imports";
import { BuildingFull } from "./buildingFull";
import { BuildingNameSchema } from "./buildingName";

/* -------------------------------------------------------------------------- */
/*                            UpdateBuilding param                            */
/* -------------------------------------------------------------------------- */
export const UpdateBuildingParamSchema = z.object({
  id: IdentifierSchema,
});

export type UpdateBuildingParam = z.infer<typeof UpdateBuildingParamSchema>;

/* -------------------------------------------------------------------------- */
/*                             UpdateBuilding body                             */
/* -------------------------------------------------------------------------- */

export const UpdateBuildingBodySchema = z
  .object({
    name: BuildingNameSchema,
    floors: z.coerce.number().int().nonnegative(),
    illustration: FileSchema,
  })
  .partial();

export type UpdateBuildingBody = z.infer<typeof UpdateBuildingBodySchema>;

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
