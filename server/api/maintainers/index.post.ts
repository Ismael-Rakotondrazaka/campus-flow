import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { storeMaintainerEventHandlerFn } from '#server/features/maintainers/maintainer.store.handler';
import {
  CreateMaintainerSchema,
  type StoreMaintainerRequest,
} from '#shared/features/maintainers';

export default defineEventHandler(
  new EventHandlerBuilder<StoreMaintainerRequest>()
    .body(CreateMaintainerSchema)
    .handle(storeMaintainerEventHandlerFn)
);
