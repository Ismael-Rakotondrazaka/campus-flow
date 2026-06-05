import { z } from 'zod';

import { SortOrderSchema } from '../../utils/enums';
import { RefusalReasonSchema } from '../refusals/refusal.schema';
import { RenewalOrderBy, RenewalStatus } from './renewal.model';

export const RenewalOrderBySchema = z.nativeEnum(RenewalOrderBy);

export const RenewalParamsSchema = z.object({
  renewalId: z.string().uuid(),
});

export type RenewalParams = z.infer<typeof RenewalParamsSchema>;

export const RenewalQuerySchema = z.object({
  academicSessionId: z.string().uuid().optional(),
  facultyId: z.string().uuid().optional(),
  includeDeleted: z.coerce.boolean().optional(),
  limit: z.coerce.number().int().positive().optional(),
  orderBy: RenewalOrderBySchema.optional(),
  page: z.coerce.number().int().positive().optional(),
  residentId: z.string().uuid().optional(),
  sortOrder: SortOrderSchema.optional(),
  status: z.nativeEnum(RenewalStatus).optional(),
});

export type RenewalQuery = z.infer<typeof RenewalQuerySchema>;

export const RenewalStatusSchema = z.nativeEnum(RenewalStatus);

export const CreateRenewalSchema = z.object({
  academicSessionId: z.string().uuid(),
  emergencyNumber: z.string().min(1),
  facultyId: z.string().uuid(),
  imageUrl: z.string().url(),
  nicUrl: z.string().url(),
  phoneNumber: z.string().min(1),
  schoolCertificateUrl: z.string().url(),
});

export type CreateRenewal = z.infer<typeof CreateRenewalSchema>;

export const UpdateRenewalSchema = z.object({
  emergencyNumber: z.string().min(1).optional(),
  imageUrl: z.string().url().optional(),
  nicUrl: z.string().url().optional(),
  phoneNumber: z.string().min(1).optional(),
  refusalReason: RefusalReasonSchema.nullish(),
  schoolCertificateUrl: z.string().url().optional(),
  status: RenewalStatusSchema.optional(),
});

export type UpdateRenewal = z.infer<typeof UpdateRenewalSchema>;
