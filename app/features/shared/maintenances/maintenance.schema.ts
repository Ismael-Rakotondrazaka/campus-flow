import { z } from 'zod';

import { MaintenanceStatus, MaintenanceType } from './maintenance.model';

export const MaintenanceTypeSchema = z.nativeEnum(MaintenanceType);

export const MaintenanceStatusSchema = z.nativeEnum(MaintenanceStatus);

export const CreateMaintenanceSchema = z.object({
  description: z.string().min(1).nullish(),
  lodgment_id: z.string().uuid(),
  resident_id: z.string().uuid(),
  type: MaintenanceTypeSchema,
});

export type CreateMaintenance = z.infer<typeof CreateMaintenanceSchema>;

export const UpdateMaintenanceSchema = z.object({
  admin_id: z.string().uuid().nullish(),
  description: z.string().min(1).nullish(),
  end_at: z.string().datetime().nullish(),
  start_at: z.string().datetime().nullish(),
  status: MaintenanceStatusSchema.optional(),
  type: MaintenanceTypeSchema.optional(),
});

export type UpdateMaintenance = z.infer<typeof UpdateMaintenanceSchema>;
