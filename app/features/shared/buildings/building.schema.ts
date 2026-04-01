import { z } from 'zod';

export const CreateBuildingSchema = z.object({
  floors: z.number().int().min(1),
  illustration_url: z.string().url().nullish(),
  name: z.string().min(1),
});

export type CreateBuilding = z.infer<typeof CreateBuildingSchema>;

export const UpdateBuildingSchema = CreateBuildingSchema.partial();

export type UpdateBuilding = z.infer<typeof UpdateBuildingSchema>;
