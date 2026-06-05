import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { showResidentEventHandlerFn } from '#server/features/residents/resident.show.handler';
import {
  ResidentParamsSchema,
  type ShowResidentRequest,
} from '#shared/features/residents';

export default defineEventHandler(
  new EventHandlerBuilder<ShowResidentRequest>()
    .params(ResidentParamsSchema)
    .handle(showResidentEventHandlerFn)
);
