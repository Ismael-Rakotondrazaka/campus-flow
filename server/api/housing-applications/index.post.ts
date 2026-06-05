import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { storeHousingApplicationEventHandlerFn } from '#server/features/housing-applications/housing-application.store.handler';
import {
  CreateHousingApplicationSchema,
  type StoreHousingApplicationRequest,
} from '#shared/features/housing-applications';

export default defineEventHandler(
  new EventHandlerBuilder<StoreHousingApplicationRequest>()
    .body(CreateHousingApplicationSchema)
    .handle(storeHousingApplicationEventHandlerFn)
);
