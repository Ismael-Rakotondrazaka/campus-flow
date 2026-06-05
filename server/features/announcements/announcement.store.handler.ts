import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { StoreAnnouncementRequest } from '#shared/features/announcements';

import { StoreAnnouncementAbility } from '#shared/features/announcements/announcement.ability';

export const storeAnnouncementEventHandlerFn: EventHandlerFn<
  StoreAnnouncementRequest
> = async ({ ability, body }) => {
  await ability.authorize(StoreAnnouncementAbility);

  const announcement = await createAnnouncement(body);

  return { data: announcement };
};
