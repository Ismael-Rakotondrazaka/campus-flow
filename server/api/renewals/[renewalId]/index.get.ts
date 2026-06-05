import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { showRenewalEventHandlerFn } from '#server/features/renewals/renewal.show.handler';
import {
  RenewalParamsSchema,
  type ShowRenewalRequest,
} from '#shared/features/renewals';

export default defineEventHandler(
  new EventHandlerBuilder<ShowRenewalRequest>()
    .params(RenewalParamsSchema)
    .handle(showRenewalEventHandlerFn)
);
