import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { indexHousingApplicationEventHandlerFn } from '#server/features/housing-applications/housing-application.index.handler';
import {
  HousingApplicationQuerySchema,
  type IndexHousingApplicationRequest,
} from '#shared/features/housing-applications';

export default defineEventHandler(
  new EventHandlerBuilder<IndexHousingApplicationRequest>()
    .query(HousingApplicationQuerySchema)
    .handle(indexHousingApplicationEventHandlerFn)
);
