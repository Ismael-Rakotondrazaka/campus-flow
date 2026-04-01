import { z } from 'zod';

export const CreateFacultySchema = z.object({
  name: z.string().min(1),
});

export type CreateFaculty = z.infer<typeof CreateFacultySchema>;

export const UpdateFacultySchema = CreateFacultySchema.partial();

export type UpdateFaculty = z.infer<typeof UpdateFacultySchema>;
