import { z } from 'zod';

import { SortOrderSchema } from '../../utils/enums';
import { AdminOrderBy, AdminRole } from './admin.model';

export const AdminOrderBySchema = z.nativeEnum(AdminOrderBy);

export const AdminParamsSchema = z.object({
  adminId: z.string().uuid(),
});

export type AdminParams = z.infer<typeof AdminParamsSchema>;

export const AdminQuerySchema = z.object({
  includeDeleted: z.coerce.boolean().optional(),
  limit: z.coerce.number().int().positive().optional(),
  orderBy: AdminOrderBySchema.optional(),
  page: z.coerce.number().int().positive().optional(),
  role: z.nativeEnum(AdminRole).optional(),
  sortOrder: SortOrderSchema.optional(),
});

export type AdminQuery = z.infer<typeof AdminQuerySchema>;

export const RoleSchema = z.nativeEnum(AdminRole);

export const UpdateAdminSchema = z.object({
  role: RoleSchema,
});

export type UpdateAdmin = z.infer<typeof UpdateAdminSchema>;
