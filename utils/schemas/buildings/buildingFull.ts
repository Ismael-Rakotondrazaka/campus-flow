import { z } from "#imports";
import { Simplify } from "type-fest";
import { BuildingSchema } from "./building";
import { BuildingCountSchema } from "./buildingCount";

export const BuildingFullSchema = BuildingSchema.and(BuildingCountSchema);

export type BuildingFull = Simplify<z.infer<typeof BuildingFullSchema>>;
