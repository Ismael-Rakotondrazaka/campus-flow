import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import {
  countHousingApplicationEventHandlerFn,
  type CountHousingApplicationRequest,
  HousingApplicationCountQuerySchema,
} from '#server/features/housing-applications/housing-application.count.handler';

export default defineEventHandler(
  new EventHandlerBuilder<CountHousingApplicationRequest>()
    .query(HousingApplicationCountQuerySchema)
    .handle(countHousingApplicationEventHandlerFn)
);
