import { z } from 'zod';

import { RefusalReason, RenewalStatus } from './renewal.model';

export const RenewalStatusSchema = z.nativeEnum(RenewalStatus);

export const RefusalReasonSchema = z.nativeEnum(RefusalReason);

export const CreateRenewalSchema = z.object({
  academic_session_id: z.string().uuid(),
  emergency_number: z.string().min(1),
  faculty_id: z.string().uuid(),
  image_url: z.string().url(),
  nic_url: z.string().url(),
  phone_number: z.string().min(1),
  resident_id: z.string().uuid(),
  school_certificate_url: z.string().url(),
});

export type CreateRenewal = z.infer<typeof CreateRenewalSchema>;

export const UpdateRenewalSchema = z.object({
  admin_id: z.string().uuid().nullish(),
  emergency_number: z.string().min(1).optional(),
  image_url: z.string().url().optional(),
  nic_url: z.string().url().optional(),
  phone_number: z.string().min(1).optional(),
  refusal_reason: RefusalReasonSchema.nullish(),
  school_certificate_url: z.string().url().optional(),
  status: RenewalStatusSchema.optional(),
});

export type UpdateRenewal = z.infer<typeof UpdateRenewalSchema>;
