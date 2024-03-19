import { z, prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import { BuildingSchema, LodgmentSchema } from "~/prisma/generated/zod";
import { LodgmentCount, LodgmentCountSchema } from "./lodgmentCount";

export type LodgmentFull = Simplify<
  prismaCtx.Lodgment &
    LodgmentCount & {
      building: prismaCtx.Building;
    }
>;

export const LodgmentFullSchema: z.ZodType<LodgmentFull> = LodgmentSchema.and(
  LodgmentCountSchema,
).and(
  z.object({
    building: BuildingSchema,
  }),
);
