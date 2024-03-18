import { z, prismaCtx } from "#imports";

export const BuildingSchema: z.ZodType<prismaCtx.Building> = z.object({
  id: z.number().int(),
  name: z.string(),
  floors: z.number().int(),
  illustrationUrl: z.string(),
});
