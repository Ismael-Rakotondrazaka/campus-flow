import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { destroyRenewalEventHandlerFn } from '#server/features/renewals/renewal.destroy.handler';
import {
  type DestroyRenewalRequest,
  RenewalParamsSchema,
} from '#shared/features/renewals';

export default defineEventHandler(
  new EventHandlerBuilder<DestroyRenewalRequest>()
    .params(RenewalParamsSchema)
    .handle(destroyRenewalEventHandlerFn)
);
