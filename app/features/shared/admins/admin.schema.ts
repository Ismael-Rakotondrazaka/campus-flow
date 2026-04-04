import { z } from 'zod';

import { AdminRole } from './admin.model';

export const RoleSchema = z.nativeEnum(AdminRole);

export const CreateAdminSchema = z.object({
  role: RoleSchema,
  user_id: z.string().uuid(),
});

export type CreateAdmin = z.infer<typeof CreateAdminSchema>;

export const UpdateAdminSchema = z.object({
  role: RoleSchema,
});

export type UpdateAdmin = z.infer<typeof UpdateAdminSchema>;
