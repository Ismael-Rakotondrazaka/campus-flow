import { z } from "#imports";
import { BuildingFull } from "./buildingFull";
import { BuildingNameSchema } from "./buildingName";

/* -------------------------------------------------------------------------- */
/*                             StoreBuilding body                             */
/* -------------------------------------------------------------------------- */

export type StoreBuildingBody = {
  name: string;
  floors: number;
  illustration: File;
};

export const StoreBuildingBodySchema: z.ZodType<StoreBuildingBody> = z.object({
  name: BuildingNameSchema,
  floors: z.coerce.number().int().nonnegative(),
  illustration: FileSchema,
});

/* -------------------------------------------------------------------------- */
/*                             StoreBuilding data                             */
/* -------------------------------------------------------------------------- */

export type StoreBuildingData = {
  building: BuildingFull;
};

/* -------------------------------------------------------------------------- */
/*                             StoreBuilding error                            */
/* -------------------------------------------------------------------------- */

export type StoreBuildingBodyPEM = RequestErrorMessage<StoreBuildingBody>;

export type StoreBuildingError = RequestError<StoreBuildingBodyPEM>;

export type StoreBuildingResponse = RequestResponse<
  StoreBuildingData,
  StoreBuildingBody
>;
