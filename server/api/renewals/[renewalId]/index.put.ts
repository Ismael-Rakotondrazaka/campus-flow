import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { updateRenewalEventHandlerFn } from '#server/features/renewals/renewal.update.handler';
import {
  RenewalParamsSchema,
  type UpdateRenewalRequest,
  UpdateRenewalSchema,
} from '#shared/features/renewals';

export default defineEventHandler(
  new EventHandlerBuilder<UpdateRenewalRequest>()
    .body(UpdateRenewalSchema)
    .params(RenewalParamsSchema)
    .handle(updateRenewalEventHandlerFn)
);
