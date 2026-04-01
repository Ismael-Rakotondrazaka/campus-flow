import { z } from 'zod';

import {
  Gender,
  Origin,
  RefusalReason,
  ReservationStatus,
} from './reservation.model';

export const ReservationStatusSchema = z.nativeEnum(ReservationStatus);

export const RefusalReasonSchema = z.nativeEnum(RefusalReason);

export const GenderSchema = z.nativeEnum(Gender);

export const OriginSchema = z.nativeEnum(Origin);

export const CreateReservationSchema = z.object({
  academic_session_id: z.string().uuid(),
  email: z.string().email(),
  emergency_number: z.string().min(1),
  faculty_id: z.string().uuid(),
  first_name: z.string().min(1),
  gender: GenderSchema,
  last_name: z.string().min(1),
  nic: z.string().min(1),
  nic_url: z.string().url(),
  origin: OriginSchema,
  phone_number: z.string().min(1),
  profile_url: z.string().url(),
  school_certificate_url: z.string().url(),
});

export type CreateReservation = z.infer<typeof CreateReservationSchema>;

export const UpdateReservationSchema = z.object({
  admin_id: z.string().uuid().nullish(),
  lodgment_id: z.string().uuid().nullish(),
  refusal_reason: RefusalReasonSchema.nullish(),
  status: ReservationStatusSchema.optional(),
});

export type UpdateReservation = z.infer<typeof UpdateReservationSchema>;
