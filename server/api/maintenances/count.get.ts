import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { countMaintenanceEventHandlerFn } from '#server/features/maintenances/maintenance.count.handler';
import {
  type CountMaintenanceRequest,
  MaintenanceCountQuerySchema,
} from '#shared/features/maintenances';

export default defineEventHandler(
  new EventHandlerBuilder<CountMaintenanceRequest>()
    .query(MaintenanceCountQuerySchema)
    .handle(countMaintenanceEventHandlerFn)
);
