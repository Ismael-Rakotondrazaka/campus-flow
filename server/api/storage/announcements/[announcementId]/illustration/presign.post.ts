import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { presignAnnouncementIllustrationEventHandlerFn } from '#server/features/storage/announcement-illustration.presign.handler';
import {
  AnnouncementIllustrationParamsSchema,
  type PresignAnnouncementIllustrationRequest,
  PresignBodySchema,
} from '#shared/features/storage';

export default defineEventHandler(
  new EventHandlerBuilder<PresignAnnouncementIllustrationRequest>()
    .params(AnnouncementIllustrationParamsSchema)
    .body(PresignBodySchema)
    .handle(presignAnnouncementIllustrationEventHandlerFn)
);
