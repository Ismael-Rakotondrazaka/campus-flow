import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import {
  countLodgmentEventHandlerFn,
  type CountLodgmentRequest,
  LodgmentCountQuerySchema,
} from '#server/features/lodgments/lodgment.count.handler';

export default defineEventHandler(
  new EventHandlerBuilder<CountLodgmentRequest>()
    .query(LodgmentCountQuerySchema)
    .handle(countLodgmentEventHandlerFn)
);
