import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import {
  AssignMaintainerBodySchema,
  assignMaintainerEventHandlerFn,
  type AssignMaintainerRequest,
} from '#server/features/maintenances/maintenance.assign-maintainer.handler';
import { MaintenanceParamsSchema } from '#shared/features/maintenances';

export default defineEventHandler(
  new EventHandlerBuilder<AssignMaintainerRequest>()
    .body(AssignMaintainerBodySchema)
    .params(MaintenanceParamsSchema)
    .handle(assignMaintainerEventHandlerFn)
);
