import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { destroyMaintainerEventHandlerFn } from '#server/features/maintainers/maintainer.destroy.handler';
import {
  type DestroyMaintainerRequest,
  MaintainerParamsSchema,
} from '#shared/features/maintainers';

export default defineEventHandler(
  new EventHandlerBuilder<DestroyMaintainerRequest>()
    .params(MaintainerParamsSchema)
    .handle(destroyMaintainerEventHandlerFn)
);
