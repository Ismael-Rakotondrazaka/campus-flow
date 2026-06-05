import { z } from 'zod';

import { SortOrderSchema } from '../../utils/enums';
import {
  MaintenanceOrderBy,
  MaintenanceStatus,
  MaintenanceType,
} from './maintenance.model';

export const MaintenanceOrderBySchema = z.nativeEnum(MaintenanceOrderBy);

export const MaintenanceParamsSchema = z.object({
  maintenanceId: z.string().uuid(),
});

export type MaintenanceParams = z.infer<typeof MaintenanceParamsSchema>;

export const MaintenanceQuerySchema = z.object({
  includeDeleted: z.coerce.boolean().optional(),
  limit: z.coerce.number().int().positive().optional(),
  lodgmentId: z.string().uuid().optional(),
  orderBy: MaintenanceOrderBySchema.optional(),
  page: z.coerce.number().int().positive().optional(),
  residentId: z.string().uuid().optional(),
  sortOrder: SortOrderSchema.optional(),
  status: z.nativeEnum(MaintenanceStatus).optional(),
  type: z.nativeEnum(MaintenanceType).optional(),
});

export type MaintenanceQuery = z.infer<typeof MaintenanceQuerySchema>;

export const MaintenanceCountQuerySchema = MaintenanceQuerySchema.omit({
  limit: true,
  orderBy: true,
  page: true,
  sortOrder: true,
});

export type MaintenanceCountQuery = z.infer<typeof MaintenanceCountQuerySchema>;

export const MaintenanceTypeSchema = z.nativeEnum(MaintenanceType);

export const MaintenanceStatusSchema = z.nativeEnum(MaintenanceStatus);

export const CreateMaintenanceSchema = z.object({
  description: z.string().min(1).nullish(),
  lodgmentId: z.string().uuid(),
  type: MaintenanceTypeSchema,
});

export type CreateMaintenance = z.infer<typeof CreateMaintenanceSchema>;

export const UpdateMaintenanceSchema = z.object({
  description: z.string().min(1).nullish(),
  endAt: z.string().datetime().nullish(),
  startAt: z.string().datetime().nullish(),
  status: MaintenanceStatusSchema.optional(),
  type: MaintenanceTypeSchema.optional(),
});

export type UpdateMaintenance = z.infer<typeof UpdateMaintenanceSchema>;
