import { z } from "#imports";

export type BuildingCount = {
  _count: {
    lodgments: number;
    capacity: number;
    students: number;
    available: number;
  };
};

export const BuildingCountSchema: z.ZodType<BuildingCount> = z.object({
  _count: z.object({
    lodgments: z.number().nonnegative().int(),
    capacity: z.number().nonnegative().int(),
    students: z.number().nonnegative().int(),
    available: z.number().nonnegative().int(),
  }),
});
