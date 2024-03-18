import { z, prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import { BuildingSchema } from "~/prisma/generated/zod";
import { BuildingCount, BuildingCountSchema } from "./buildingCount";

export type BuildingFull = Simplify<prismaCtx.Building & BuildingCount>;

export const BuildingFullSchema: z.ZodType<BuildingFull> =
  BuildingSchema.and(BuildingCountSchema);
