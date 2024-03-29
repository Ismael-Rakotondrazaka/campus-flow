import { z } from "#imports";
import { Simplify } from "type-fest";
import { MaintainerCount, MaintainerCountSchema } from "./maintainerCount";
import { MaintainerComputed } from "./maintainerComputed";

export type MaintainerFull = Simplify<MaintainerComputed & MaintainerCount>;

export const MaintainerFullSchema: z.ZodType<MaintainerFull> =
  MaintainerSchema.and(MaintainerCountSchema);
