import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { showAnnouncementEventHandlerFn } from '#server/features/announcements/announcement.show.handler';
import {
  AnnouncementParamsSchema,
  type ShowAnnouncementRequest,
} from '#shared/features/announcements';

export default defineEventHandler(
  new EventHandlerBuilder<ShowAnnouncementRequest>()
    .params(AnnouncementParamsSchema)
    .handle(showAnnouncementEventHandlerFn)
);
