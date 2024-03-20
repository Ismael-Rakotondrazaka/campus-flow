import { z } from "#imports";

export type AdminCount = {
  _count: {
    maintenances: number;
    renewals: number;
    reservations: number;
  };
};

export const AdminCountSchema: z.ZodType<AdminCount> = z.object({
  _count: z.object({
    maintenances: z.number(),
    renewals: z.number(),
    reservations: z.number(),
  }),
});
