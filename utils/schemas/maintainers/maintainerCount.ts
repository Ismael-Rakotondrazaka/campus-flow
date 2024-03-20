import { z } from "#imports";

export type MaintainerCount = {
  _count: {
    maintenances: number;
  };
};

export const MaintainerCountSchema: z.ZodType<MaintainerCount> = z.object({
  _count: z.object({
    maintenances: z.number().nonnegative().int(),
  }),
});
