import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { showLodgmentEventHandlerFn } from '#server/features/lodgments/lodgment.show.handler';
import {
  LodgmentParamsSchema,
  type ShowLodgmentRequest,
} from '#shared/features/lodgments';

export default defineEventHandler(
  new EventHandlerBuilder<ShowLodgmentRequest>()
    .params(LodgmentParamsSchema)
    .handle(showLodgmentEventHandlerFn)
);
