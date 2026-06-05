import { z } from 'zod';

import { SortOrderSchema } from '../../utils/enums';
import { GenderSchema, OriginSchema } from '../persons/person.schema';
import { ResidentOrderBy } from './resident.model';

export const ResidentOrderBySchema = z.nativeEnum(ResidentOrderBy);

export const ResidentParamsSchema = z.object({
  residentId: z.string().uuid(),
});

export type ResidentParams = z.infer<typeof ResidentParamsSchema>;

export const ResidentQuerySchema = z.object({
  academicSessionId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional(),
  facultyId: z.string().uuid().optional(),
  gender: GenderSchema.optional(),
  includeDeleted: z.coerce.boolean().optional(),
  limit: z.coerce.number().int().positive().optional(),
  lodgmentId: z.string().uuid().optional(),
  orderBy: ResidentOrderBySchema.optional(),
  origin: OriginSchema.optional(),
  page: z.coerce.number().int().positive().optional(),
  search: z.string().optional(),
  sortOrder: SortOrderSchema.optional(),
});

export type ResidentQuery = z.infer<typeof ResidentQuerySchema>;

export const UpdateResidentSchema = z
  .object({
    academicSessionId: z.string().uuid(),
    emergencyNumber: z.string().min(1),
    facultyId: z.string().uuid(),
    gender: GenderSchema,
    lodgmentId: z.string().uuid(),
    nic: z.string().min(1),
    origin: OriginSchema,
  })
  .partial();

export type UpdateResident = z.infer<typeof UpdateResidentSchema>;
