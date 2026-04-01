import { z } from 'zod';

import { LodgmentStatus } from './lodgment.model';

export const LodgmentStatusSchema = z.nativeEnum(LodgmentStatus);

export const CreateLodgmentSchema = z.object({
  building_id: z.string().uuid(),
  capacity: z.number().int().min(1),
  floor: z.number().int().min(0),
  room_number: z.number().int().min(1),
  status: LodgmentStatusSchema.default('available'),
});

export type CreateLodgment = z.infer<typeof CreateLodgmentSchema>;

export const UpdateLodgmentSchema = CreateLodgmentSchema.partial();

export type UpdateLodgment = z.infer<typeof UpdateLodgmentSchema>;
