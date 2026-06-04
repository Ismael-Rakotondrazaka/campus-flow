import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { presignHousingApplicationDocumentEventHandlerFn } from '#server/features/storage/housing-application-document.presign.handler';
import {
  HousingApplicationDocumentParamsSchema,
  PresignDocumentBodySchema,
  type PresignHousingApplicationDocumentRequest,
} from '#shared/features/storage';

export default defineEventHandler(
  new EventHandlerBuilder<PresignHousingApplicationDocumentRequest>()
    .params(HousingApplicationDocumentParamsSchema)
    .body(PresignDocumentBodySchema)
    .handle(presignHousingApplicationDocumentEventHandlerFn)
);
