import { z } from 'zod';

export const CreateAcademicSessionSchema = z.object({
  end_at: z.string().datetime(),
  start_at: z.string().datetime(),
});

export type CreateAcademicSession = z.infer<typeof CreateAcademicSessionSchema>;

export const UpdateAcademicSessionSchema =
  CreateAcademicSessionSchema.partial();

export type UpdateAcademicSession = z.infer<typeof UpdateAcademicSessionSchema>;
