import { z } from 'zod';

import { SortOrderSchema } from '../../utils/enums';
import { FacultyOrderBy } from './faculty.model';

export const FacultyOrderBySchema = z.nativeEnum(FacultyOrderBy);

export const FacultyParamsSchema = z.object({
  facultyId: z.string().uuid(),
});

export type FacultyParams = z.infer<typeof FacultyParamsSchema>;

export const FacultyQuerySchema = z.object({
  limit: z.coerce.number().int().positive().optional(),
  orderBy: FacultyOrderBySchema.optional(),
  page: z.coerce.number().int().positive().optional(),
  search: z.string().optional(),
  sortOrder: SortOrderSchema.optional(),
});

export type FacultyQuery = z.infer<typeof FacultyQuerySchema>;
