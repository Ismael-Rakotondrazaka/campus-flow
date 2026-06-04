import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { storeMaintenanceEventHandlerFn } from '#server/features/maintenances/maintenance.store.handler';
import {
  CreateMaintenanceSchema,
  type StoreMaintenanceRequest,
} from '#shared/features/maintenances';

export default defineEventHandler(
  new EventHandlerBuilder<StoreMaintenanceRequest>()
    .body(CreateMaintenanceSchema)
    .handle(storeMaintenanceEventHandlerFn)
);
