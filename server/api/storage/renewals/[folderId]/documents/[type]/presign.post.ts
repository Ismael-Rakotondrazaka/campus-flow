import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { presignRenewalDocumentEventHandlerFn } from '#server/features/storage/renewal-document.presign.handler';
import {
  PresignDocumentBodySchema,
  type PresignRenewalDocumentRequest,
  RenewalDocumentParamsSchema,
} from '#shared/features/storage';

export default defineEventHandler(
  new EventHandlerBuilder<PresignRenewalDocumentRequest>()
    .params(RenewalDocumentParamsSchema)
    .body(PresignDocumentBodySchema)
    .handle(presignRenewalDocumentEventHandlerFn)
);
