import { z } from 'zod';

import { SortOrderSchema } from '../../utils/enums';
import { AcademicSessionOrderBy } from './academic-session.model';

export const AcademicSessionOrderBySchema = z.nativeEnum(
  AcademicSessionOrderBy
);

export const AcademicSessionParamsSchema = z.object({
  academicSessionId: z.string().uuid(),
});

export type AcademicSessionParams = z.infer<typeof AcademicSessionParamsSchema>;

export const AcademicSessionQuerySchema = z.object({
  limit: z.coerce.number().int().positive().optional(),
  orderBy: AcademicSessionOrderBySchema.optional(),
  page: z.coerce.number().int().positive().optional(),
  sortOrder: SortOrderSchema.optional(),
});

export type AcademicSessionQuery = z.infer<typeof AcademicSessionQuerySchema>;

export const CreateAcademicSessionSchema = z.object({
  applicationCloseAt: z.string().datetime({ offset: true }),
  applicationOpenAt: z.string().datetime({ offset: true }),
  endAt: z.string().datetime({ offset: true }),
  renewalCloseAt: z.string().datetime({ offset: true }),
  renewalOpenAt: z.string().datetime({ offset: true }),
  startAt: z.string().datetime({ offset: true }),
});

export type CreateAcademicSession = z.infer<typeof CreateAcademicSessionSchema>;

export const UpdateAcademicSessionSchema =
  CreateAcademicSessionSchema.partial();

export type UpdateAcademicSession = z.infer<typeof UpdateAcademicSessionSchema>;
