import { z } from 'zod';

import { SortOrderSchema } from '../../utils/enums';
import { MaintainerOrderBy } from './maintainer.model';

export const MaintainerOrderBySchema = z.nativeEnum(MaintainerOrderBy);

export const MaintainerParamsSchema = z.object({
  maintainerId: z.string().uuid(),
});

export type MaintainerParams = z.infer<typeof MaintainerParamsSchema>;

export const MaintainerQuerySchema = z.object({
  excludeMaintenanceId: z.string().uuid().optional(),
  limit: z.coerce.number().int().positive().optional(),
  orderBy: MaintainerOrderBySchema.optional(),
  page: z.coerce.number().int().positive().optional(),
  search: z.string().optional(),
  sortOrder: SortOrderSchema.optional(),
});

export type MaintainerQuery = z.infer<typeof MaintainerQuerySchema>;

export const CreateMaintainerSchema = z.object({
  firstName: z.string().min(1),
  imageUrl: z.string().url().nullish(),
  lastName: z.string().min(1),
  phoneNumber: z.string().min(1),
});

export type CreateMaintainer = z.infer<typeof CreateMaintainerSchema>;

export const UpdateMaintainerSchema = CreateMaintainerSchema.partial();

export type UpdateMaintainer = z.infer<typeof UpdateMaintainerSchema>;
