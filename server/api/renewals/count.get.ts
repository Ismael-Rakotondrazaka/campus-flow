import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import {
  countRenewalEventHandlerFn,
  type CountRenewalRequest,
  RenewalCountQuerySchema,
} from '#server/features/renewals/renewal.count.handler';

export default defineEventHandler(
  new EventHandlerBuilder<CountRenewalRequest>()
    .query(RenewalCountQuerySchema)
    .handle(countRenewalEventHandlerFn)
);
