import { z } from 'zod';

import {
  Gender,
  HousingApplicationStatus,
  Origin,
  RefusalReason,
} from './housing-application.model';

export const HousingApplicationStatusSchema = z.nativeEnum(
  HousingApplicationStatus
);

export const RefusalReasonSchema = z.nativeEnum(RefusalReason);

export const GenderSchema = z.nativeEnum(Gender);

export const OriginSchema = z.nativeEnum(Origin);

export const CreateHousingApplicationSchema = z.object({
  academic_session_id: z.string().uuid(),
  email: z.string().email(),
  emergency_number: z.string().min(1),
  faculty_id: z.string().uuid(),
  first_name: z.string().min(1),
  gender: GenderSchema,
  image_url: z.string().url(),
  last_name: z.string().min(1),
  nic: z.string().min(1),
  nic_url: z.string().url(),
  origin: OriginSchema,
  phone_number: z.string().min(1),
  school_certificate_url: z.string().url(),
});

export type CreateHousingApplication = z.infer<
  typeof CreateHousingApplicationSchema
>;

export const UpdateHousingApplicationSchema = z.object({
  admin_id: z.string().uuid().nullish(),
  lodgment_id: z.string().uuid().nullish(),
  refusal_reason: RefusalReasonSchema.nullish(),
  status: HousingApplicationStatusSchema.optional(),
});

export type UpdateHousingApplication = z.infer<
  typeof UpdateHousingApplicationSchema
>;
