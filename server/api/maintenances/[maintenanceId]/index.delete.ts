import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { destroyMaintenanceEventHandlerFn } from '#server/features/maintenances/maintenance.destroy.handler';
import {
  type DestroyMaintenanceRequest,
  MaintenanceParamsSchema,
} from '#shared/features/maintenances';

export default defineEventHandler(
  new EventHandlerBuilder<DestroyMaintenanceRequest>()
    .params(MaintenanceParamsSchema)
    .handle(destroyMaintenanceEventHandlerFn)
);
