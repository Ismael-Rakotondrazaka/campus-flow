import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { updateAnnouncementEventHandlerFn } from '#server/features/announcements/announcement.update.handler';
import {
  AnnouncementParamsSchema,
  type UpdateAnnouncementRequest,
  UpdateAnnouncementSchema,
} from '#shared/features/announcements';

export default defineEventHandler(
  new EventHandlerBuilder<UpdateAnnouncementRequest>()
    .body(UpdateAnnouncementSchema)
    .params(AnnouncementParamsSchema)
    .handle(updateAnnouncementEventHandlerFn)
);
