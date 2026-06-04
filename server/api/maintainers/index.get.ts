import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { indexMaintainerEventHandlerFn } from '#server/features/maintainers/maintainer.index.handler';
import {
  type IndexMaintainerRequest,
  MaintainerQuerySchema,
} from '#shared/features/maintainers';

export default defineEventHandler(
  new EventHandlerBuilder<IndexMaintainerRequest>()
    .query(MaintainerQuerySchema)
    .handle(indexMaintainerEventHandlerFn)
);
