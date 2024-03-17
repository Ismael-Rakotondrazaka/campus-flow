import { z } from "#imports";

export const UserBaseSessionSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  firstName: z.string(),
  fullName: z.string(),
});

export type UserBaseSession = z.infer<typeof UserBaseSessionSchema>;
