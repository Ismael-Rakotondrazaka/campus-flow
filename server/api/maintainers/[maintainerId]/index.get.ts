import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { showMaintainerEventHandlerFn } from '#server/features/maintainers/maintainer.show.handler';
import {
  MaintainerParamsSchema,
  type ShowMaintainerRequest,
} from '#shared/features/maintainers';

export default defineEventHandler(
  new EventHandlerBuilder<ShowMaintainerRequest>()
    .params(MaintainerParamsSchema)
    .handle(showMaintainerEventHandlerFn)
);
