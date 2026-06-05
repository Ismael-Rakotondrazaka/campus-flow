import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { updateMaintenanceEventHandlerFn } from '#server/features/maintenances/maintenance.update.handler';
import {
  MaintenanceParamsSchema,
  type UpdateMaintenanceRequest,
  UpdateMaintenanceSchema,
} from '#shared/features/maintenances';

export default defineEventHandler(
  new EventHandlerBuilder<UpdateMaintenanceRequest>()
    .body(UpdateMaintenanceSchema)
    .params(MaintenanceParamsSchema)
    .handle(updateMaintenanceEventHandlerFn)
);
