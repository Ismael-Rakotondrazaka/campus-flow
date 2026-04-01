import { z } from 'zod';

export const CreateMaintenanceSchema = z.object({
  description: z.string().min(1).nullish(),
  lodgment_id: z.string().uuid(),
  student_id: z.string().uuid(),
  type: z.enum(['electrical', 'equipment', 'hvac', 'other', 'plumbing']),
});

export type CreateMaintenance = z.infer<typeof CreateMaintenanceSchema>;

export const UpdateMaintenanceSchema = z.object({
  admin_id: z.string().uuid().nullish(),
  description: z.string().min(1).nullish(),
  end_at: z.string().datetime().nullish(),
  start_at: z.string().datetime().nullish(),
  status: z.enum(['pending', 'accepted', 'done', 'refused']).optional(),
  type: z
    .enum(['electrical', 'equipment', 'hvac', 'other', 'plumbing'])
    .optional(),
});

export type UpdateMaintenance = z.infer<typeof UpdateMaintenanceSchema>;
