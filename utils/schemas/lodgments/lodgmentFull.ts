import { z, prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import { LodgmentSchema } from "~/prisma/generated/zod";
import { LodgmentCount, LodgmentCountSchema } from "./lodgmentCount";

export type LodgmentFull = Simplify<prismaCtx.Lodgment & LodgmentCount>;

export const LodgmentFullSchema: z.ZodType<LodgmentFull> =
  LodgmentSchema.and(LodgmentCountSchema);
