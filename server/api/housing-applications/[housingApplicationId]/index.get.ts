import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { showHousingApplicationEventHandlerFn } from '#server/features/housing-applications/housing-application.show.handler';
import {
  HousingApplicationParamsSchema,
  type ShowHousingApplicationRequest,
} from '#shared/features/housing-applications';

export default defineEventHandler(
  new EventHandlerBuilder<ShowHousingApplicationRequest>()
    .params(HousingApplicationParamsSchema)
    .handle(showHousingApplicationEventHandlerFn)
);
