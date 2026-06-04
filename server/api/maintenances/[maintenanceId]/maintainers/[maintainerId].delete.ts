import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import {
  unassignMaintainerEventHandlerFn,
  UnassignMaintainerParamsSchema,
  type UnassignMaintainerRequest,
} from '#server/features/maintenances/maintenance.unassign-maintainer.handler';

export default defineEventHandler(
  new EventHandlerBuilder<UnassignMaintainerRequest>()
    .params(UnassignMaintainerParamsSchema)
    .handle(unassignMaintainerEventHandlerFn)
);
