import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { indexLodgmentEventHandlerFn } from '#server/features/lodgments/lodgment.index.handler';
import {
  type IndexLodgmentRequest,
  LodgmentQuerySchema,
} from '#shared/features/lodgments';

export default defineEventHandler(
  new EventHandlerBuilder<IndexLodgmentRequest>()
    .query(LodgmentQuerySchema)
    .handle(indexLodgmentEventHandlerFn)
);
