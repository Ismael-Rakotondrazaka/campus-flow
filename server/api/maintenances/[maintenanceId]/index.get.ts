import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { showMaintenanceEventHandlerFn } from '#server/features/maintenances/maintenance.show.handler';
import {
  MaintenanceParamsSchema,
  type ShowMaintenanceRequest,
} from '#shared/features/maintenances';

export default defineEventHandler(
  new EventHandlerBuilder<ShowMaintenanceRequest>()
    .params(MaintenanceParamsSchema)
    .handle(showMaintenanceEventHandlerFn)
);
