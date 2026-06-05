import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { indexRenewalEventHandlerFn } from '#server/features/renewals/renewal.index.handler';
import {
  type IndexRenewalRequest,
  RenewalQuerySchema,
} from '#shared/features/renewals';

export default defineEventHandler(
  new EventHandlerBuilder<IndexRenewalRequest>()
    .query(RenewalQuerySchema)
    .handle(indexRenewalEventHandlerFn)
);
