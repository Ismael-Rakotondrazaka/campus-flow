import { z } from "#imports";

export const UserSchema: z.ZodType<UserFiltered> = z.object({
  id: z.number().int(),
  name: z.string(),
  firstName: z.string(),
  fullName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
});
