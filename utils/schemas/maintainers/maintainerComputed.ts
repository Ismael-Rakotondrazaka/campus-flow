import { prismaCtx, z } from "#imports";
import { Simplify } from "type-fest";
import { MaintainerSchema as GeneratedMaintainerSchema } from "~/prisma/generated/zod";

/**
 * Added virtual fields:
 * - fullName @type string
 */
export type MaintainerComputed = Simplify<
  prismaCtx.Maintainer & {
    fullName: string;
  }
>;

export const MaintainerSchema: z.ZodType<MaintainerComputed> =
  GeneratedMaintainerSchema.merge(
    z.object({
      fullName: z.string(),
    }),
  );
