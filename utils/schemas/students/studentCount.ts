import { z } from "#imports";

export type StudentCount = {
  _count: {
    renewals: number;
  };
};

export const StudentCountSchema: z.ZodType<StudentCount> = z.object({
  _count: z.object({
    renewals: z.number(),
  }),
});
