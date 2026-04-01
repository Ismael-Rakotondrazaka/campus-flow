import { z } from 'zod';

export const CreateReservationSchema = z.object({
  academic_session_id: z.string().uuid(),
  email: z.string().email(),
  emergency_number: z.string().min(1),
  faculty_id: z.string().uuid(),
  first_name: z.string().min(1),
  gender: z.enum(['male', 'female']),
  last_name: z.string().min(1),
  nic: z.string().min(1),
  nic_url: z.string().url(),
  origin: z.enum(['national', 'foreigner']),
  phone_number: z.string().min(1),
  profile_url: z.string().url(),
  school_certificate_url: z.string().url(),
});

export type CreateReservation = z.infer<typeof CreateReservationSchema>;

export const UpdateReservationSchema = z.object({
  admin_id: z.string().uuid().nullish(),
  lodgment_id: z.string().uuid().nullish(),
  refusal_reason: z
    .enum([
      'capacity_limit_reached',
      'falsified_documents',
      'incomplete_documents',
      'ineligibility',
      'other',
      'past_behavior',
    ])
    .nullish(),
  status: z.enum(['pending', 'accepted', 'refused', 'validated']).optional(),
});

export type UpdateReservation = z.infer<typeof UpdateReservationSchema>;
