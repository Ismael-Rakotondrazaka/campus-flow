import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { indexMaintenanceEventHandlerFn } from '#server/features/maintenances/maintenance.index.handler';
import {
  type IndexMaintenanceRequest,
  MaintenanceQuerySchema,
} from '#shared/features/maintenances';

export default defineEventHandler(
  new EventHandlerBuilder<IndexMaintenanceRequest>()
    .query(MaintenanceQuerySchema)
    .handle(indexMaintenanceEventHandlerFn)
);
