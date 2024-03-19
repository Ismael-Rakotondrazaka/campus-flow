import { z, prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import { MaintainerSchema } from "~/prisma/generated/zod";
import { MaintainerCount, MaintainerCountSchema } from "./maintainerCount";

export type MaintainerFull = Simplify<prismaCtx.Maintainer & MaintainerCount>;

export const MaintainerFullSchema: z.ZodType<MaintainerFull> =
  MaintainerSchema.and(MaintainerCountSchema);
