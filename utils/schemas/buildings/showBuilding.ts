import { z } from "#imports";
import { BuildingFull } from "./buildingFull";

/* -------------------------------------------------------------------------- */
/*                            ShowBuilding param                            */
/* -------------------------------------------------------------------------- */

export type ShowBuildingParam = {
  id: number;
};

export const ShowBuildingParamSchema: z.ZodType<ShowBuildingParam> = z.object({
  id: IdentifierSchema,
});

/* -------------------------------------------------------------------------- */
/*                             ShowBuilding data                             */
/* -------------------------------------------------------------------------- */

export type ShowBuildingData = {
  building: BuildingFull;
};

export const ShowBuildingDataSchema: z.ZodType<ShowBuildingData> = z.object({
  building: BuildingFullSchema,
});

/* -------------------------------------------------------------------------- */
/*                             ShowBuilding error                            */
/* -------------------------------------------------------------------------- */

export type ShowBuildingBodyPEM = RequestErrorMessage<Record<string, never>>;

export type ShowBuildingError = RequestError<ShowBuildingBodyPEM>;

export type ShowBuildingResponse = RequestResponse<
  ShowBuildingData,
  Record<string, never>
>;
