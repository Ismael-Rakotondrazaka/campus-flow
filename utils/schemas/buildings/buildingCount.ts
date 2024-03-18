import { z } from "#imports";

export const BuildingCountSchema = z.object({
  _count: z.object({
    lodgments: z.number().nonnegative().int(),
    capacity: z.number().nonnegative().int(),
    students: z.number().nonnegative().int(),
    available: z.number().nonnegative().int(),
  }),
});

export type BuildingCount = z.infer<typeof BuildingCountSchema>;
