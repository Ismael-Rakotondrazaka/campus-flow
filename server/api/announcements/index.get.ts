import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { indexAnnouncementEventHandlerFn } from '#server/features/announcements/announcement.index.handler';
import {
  AnnouncementQuerySchema,
  type IndexAnnouncementRequest,
} from '#shared/features/announcements';

export default defineEventHandler(
  new EventHandlerBuilder<IndexAnnouncementRequest>()
    .query(AnnouncementQuerySchema)
    .handle(indexAnnouncementEventHandlerFn)
);
