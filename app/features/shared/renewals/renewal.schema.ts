import { z } from 'zod';

import { RefusalReason, RenewalStatus } from './renewal.model';

export const RenewalStatusSchema = z.nativeEnum(RenewalStatus);

export const RefusalReasonSchema = z.nativeEnum(RefusalReason);

export const CreateRenewalSchema = z.object({
  academic_session_id: z.string().uuid(),
  emergency_number: z.string().min(1),
  faculty_id: z.string().uuid(),
  nic_url: z.string().url(),
  phone_number: z.string().min(1),
  profile_url: z.string().url(),
  school_certificate_url: z.string().url(),
  student_id: z.string().uuid(),
});

export type CreateRenewal = z.infer<typeof CreateRenewalSchema>;

export const UpdateRenewalSchema = z.object({
  admin_id: z.string().uuid().nullish(),
  emergency_number: z.string().min(1).optional(),
  nic_url: z.string().url().optional(),
  phone_number: z.string().min(1).optional(),
  profile_url: z.string().url().optional(),
  refusal_reason: RefusalReasonSchema.nullish(),
  school_certificate_url: z.string().url().optional(),
  status: RenewalStatusSchema.optional(),
});

export type UpdateRenewal = z.infer<typeof UpdateRenewalSchema>;
