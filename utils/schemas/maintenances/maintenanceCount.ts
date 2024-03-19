import { z } from "#imports";

export type MaintenanceCount = {
  _count: {
    maintainers: number;
  };
};

export const MaintenanceCountSchema: z.ZodType<MaintenanceCount> = z.object({
  _count: z.object({
    maintainers: z.number().nonnegative().int(),
  }),
});
