import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { updateMaintainerEventHandlerFn } from '#server/features/maintainers/maintainer.update.handler';
import {
  MaintainerParamsSchema,
  type UpdateMaintainerRequest,
  UpdateMaintainerSchema,
} from '#shared/features/maintainers';

export default defineEventHandler(
  new EventHandlerBuilder<UpdateMaintainerRequest>()
    .body(UpdateMaintainerSchema)
    .params(MaintainerParamsSchema)
    .handle(updateMaintainerEventHandlerFn)
);
