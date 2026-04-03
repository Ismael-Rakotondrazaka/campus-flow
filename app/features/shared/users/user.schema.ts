import { z } from 'zod';

export const UpdateUserSchema = z.object({
  first_name: z.string().min(1),
  image_url: z.string().url().nullish(),
  last_name: z.string().min(1),
  phone_number: z.string().min(1).nullish(),
});

export type UpdateUser = z.infer<typeof UpdateUserSchema>;
