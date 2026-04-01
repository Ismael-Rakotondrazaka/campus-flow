import { z } from 'zod';

export const CreateStudentSchema = z.object({
  academic_session_id: z.string().uuid(),
  emergency_number: z.string().min(1),
  faculty_id: z.string().uuid(),
  gender: z.enum(['male', 'female']),
  lodgment_id: z.string().uuid(),
  nic: z.string().min(1),
  origin: z.enum(['national', 'foreigner']),
  user_id: z.string().uuid(),
});

export type CreateStudent = z.infer<typeof CreateStudentSchema>;

export const UpdateStudentSchema = CreateStudentSchema.omit({
  user_id: true,
}).partial();

export type UpdateStudent = z.infer<typeof UpdateStudentSchema>;
