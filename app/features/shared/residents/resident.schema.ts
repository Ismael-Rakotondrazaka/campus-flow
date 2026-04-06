import { z } from 'zod';

import { Gender, Origin } from './resident.model';

export const GenderSchema = z.nativeEnum(Gender);

export const OriginSchema = z.nativeEnum(Origin);

export const CreateResidentSchema = z.object({
  academic_session_id: z.string().uuid(),
  emergency_number: z.string().min(1),
  faculty_id: z.string().uuid(),
  gender: GenderSchema,
  id: z.string().uuid(),
  lodgment_id: z.string().uuid(),
  nic: z.string().min(1),
  origin: OriginSchema,
});

export type CreateResident = z.infer<typeof CreateResidentSchema>;

export const UpdateResidentSchema = CreateResidentSchema.omit({
  id: true,
}).partial();

export type UpdateResident = z.infer<typeof UpdateResidentSchema>;
