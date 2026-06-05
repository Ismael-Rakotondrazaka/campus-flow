import { z } from 'zod';

import { SortOrderSchema } from '../../utils/enums';
import { BuildingOrderBy } from './building.model';

export const BuildingOrderBySchema = z.nativeEnum(BuildingOrderBy);

export const BuildingParamsSchema = z.object({
  buildingId: z.string().uuid(),
});

export type BuildingParams = z.infer<typeof BuildingParamsSchema>;

export const BuildingQuerySchema = z.object({
  limit: z.coerce.number().int().positive().optional(),
  orderBy: BuildingOrderBySchema.optional(),
  page: z.coerce.number().int().positive().optional(),
  search: z.string().optional(),
  sortOrder: SortOrderSchema.optional(),
});

export type BuildingQuery = z.infer<typeof BuildingQuerySchema>;
