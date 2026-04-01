import { z } from 'zod';

export const CreateMaintainerSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  phone_number: z.string().min(1),
  profile_url: z.string().url().nullish(),
});

export type CreateMaintainer = z.infer<typeof CreateMaintainerSchema>;

export const UpdateMaintainerSchema = CreateMaintainerSchema.partial();

export type UpdateMaintainer = z.infer<typeof UpdateMaintainerSchema>;
