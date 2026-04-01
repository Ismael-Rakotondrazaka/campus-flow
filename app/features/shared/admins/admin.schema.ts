import { z } from 'zod';

export const CreateAdminSchema = z.object({
  role: z.enum(['root', 'maintenance', 'renewal', 'reservation']),
  user_id: z.string().uuid(),
});

export type CreateAdmin = z.infer<typeof CreateAdminSchema>;

export const UpdateAdminSchema = z.object({
  role: z.enum(['root', 'maintenance', 'renewal', 'reservation']),
});

export type UpdateAdmin = z.infer<typeof UpdateAdminSchema>;
