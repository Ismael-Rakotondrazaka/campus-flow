import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import {
  AnnouncementCountQuerySchema,
  countAnnouncementEventHandlerFn,
  type CountAnnouncementRequest,
} from '#server/features/announcements/announcement.count.handler';

export default defineEventHandler(
  new EventHandlerBuilder<CountAnnouncementRequest>()
    .query(AnnouncementCountQuerySchema)
    .handle(countAnnouncementEventHandlerFn)
);
