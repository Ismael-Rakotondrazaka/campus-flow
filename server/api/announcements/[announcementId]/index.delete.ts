import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { destroyAnnouncementEventHandlerFn } from '#server/features/announcements/announcement.destroy.handler';
import {
  AnnouncementParamsSchema,
  type DestroyAnnouncementRequest,
} from '#shared/features/announcements';

export default defineEventHandler(
  new EventHandlerBuilder<DestroyAnnouncementRequest>()
    .params(AnnouncementParamsSchema)
    .handle(destroyAnnouncementEventHandlerFn)
);
