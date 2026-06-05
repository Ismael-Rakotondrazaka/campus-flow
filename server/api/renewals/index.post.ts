import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { storeRenewalEventHandlerFn } from '#server/features/renewals/renewal.store.handler';
import {
  CreateRenewalSchema,
  type StoreRenewalRequest,
} from '#shared/features/renewals';

export default defineEventHandler(
  new EventHandlerBuilder<StoreRenewalRequest>()
    .body(CreateRenewalSchema)
    .handle(storeRenewalEventHandlerFn)
);
