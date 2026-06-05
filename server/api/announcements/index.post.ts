import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { storeAnnouncementEventHandlerFn } from '#server/features/announcements/announcement.store.handler';
import {
  CreateAnnouncementSchema,
  type StoreAnnouncementRequest,
} from '#shared/features/announcements';

export default defineEventHandler(
  new EventHandlerBuilder<StoreAnnouncementRequest>()
    .body(CreateAnnouncementSchema)
    .handle(storeAnnouncementEventHandlerFn)
);
