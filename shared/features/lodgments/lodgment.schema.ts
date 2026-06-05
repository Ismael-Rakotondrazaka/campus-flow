import { z } from 'zod';

import { SortOrderSchema } from '../../utils/enums';
import { LodgmentOrderBy } from './lodgment.model';

export const LodgmentOrderBySchema = z.nativeEnum(LodgmentOrderBy);

export const LodgmentParamsSchema = z.object({
  lodgmentId: z.string().uuid(),
});

export type LodgmentParams = z.infer<typeof LodgmentParamsSchema>;

export const LodgmentQuerySchema = z.object({
  buildingId: z.string().uuid().optional(),
  floor: z.coerce.number().int().min(0).optional(),
  limit: z.coerce.number().int().positive().optional(),
  orderBy: LodgmentOrderBySchema.optional(),
  page: z.coerce.number().int().positive().optional(),
  sortOrder: SortOrderSchema.optional(),
});

export type LodgmentQuery = z.infer<typeof LodgmentQuerySchema>;
