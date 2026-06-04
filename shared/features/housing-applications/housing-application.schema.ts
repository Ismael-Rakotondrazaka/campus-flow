import { z } from 'zod';

import { SortOrderSchema } from '../../utils/enums';
import { GenderSchema, OriginSchema } from '../persons/person.schema';
import {
  HousingApplicationOrderBy,
  HousingApplicationStatus,
} from './housing-application.model';

export const HousingApplicationOrderBySchema = z.nativeEnum(
  HousingApplicationOrderBy
);

export const HousingApplicationParamsSchema = z.object({
  housingApplicationId: z.string().uuid(),
});

export type HousingApplicationParams = z.infer<
  typeof HousingApplicationParamsSchema
>;

export const HousingApplicationQuerySchema = z.object({
  academicSessionId: z.string().uuid().optional(),
  facultyId: z.string().uuid().optional(),
  gender: GenderSchema.optional(),
  includeDeleted: z.coerce.boolean().optional(),
  limit: z.coerce.number().int().positive().optional(),
  orderBy: HousingApplicationOrderBySchema.optional(),
  origin: OriginSchema.optional(),
  page: z.coerce.number().int().positive().optional(),
  search: z.string().optional(),
  sortOrder: SortOrderSchema.optional(),
  status: z.nativeEnum(HousingApplicationStatus).optional(),
});

export type HousingApplicationQuery = z.infer<
  typeof HousingApplicationQuerySchema
>;

export const HousingApplicationStatusSchema = z.nativeEnum(
  HousingApplicationStatus
);

export const CreateHousingApplicationSchema = z.object({
  academicSessionId: z.string().uuid(),
  email: z.string().email(),
  emergencyNumber: z.string().min(1),
  facultyId: z.string().uuid(),
  firstName: z.string().min(1),
  gender: z.string().min(1),
  id: z.string().uuid().optional(),
  imageUrl: z.string().min(1),
  lastName: z.string().min(1),
  nic: z.string().min(1),
  nicUrl: z.string().min(1),
  origin: z.string().min(1),
  phoneNumber: z.string().min(1),
  schoolCertificateUrl: z.string().min(1),
});

export type CreateHousingApplication = z.infer<
  typeof CreateHousingApplicationSchema
>;

export const UpdateHousingApplicationSchema = z.object({
  lodgmentId: z.string().uuid().nullish(),
  refusalReason: z.string().nullish(),
  status: HousingApplicationStatusSchema.optional(),
});

export type UpdateHousingApplication = z.infer<
  typeof UpdateHousingApplicationSchema
>;
