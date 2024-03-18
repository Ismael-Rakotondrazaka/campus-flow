import { z } from "#imports";

export type LodgmentCount = {
  _count: {
    students: number;
    available: number;
  };
};

export const LodgmentCountSchema: z.ZodType<LodgmentCount> = z.object({
  _count: z.object({
    students: z.number().nonnegative().int(),
    available: z.number().nonnegative().int(),
  }),
});
