import { z } from 'zod';

export const UpdateUserSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  phone_number: z.string().min(1).nullish(),
  profile_url: z.string().url().nullish(),
});

export type UpdateUser = z.infer<typeof UpdateUserSchema>;
