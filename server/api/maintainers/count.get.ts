import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import {
  countMaintainerEventHandlerFn,
  type CountMaintainerRequest,
  MaintainerCountQuerySchema,
} from '#server/features/maintainers/maintainer.count.handler';

export default defineEventHandler(
  new EventHandlerBuilder<CountMaintainerRequest>()
    .query(MaintainerCountQuerySchema)
    .handle(countMaintainerEventHandlerFn)
);
