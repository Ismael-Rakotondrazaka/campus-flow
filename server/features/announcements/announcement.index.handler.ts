import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { IndexAnnouncementRequest } from '#shared/features/announcements';

import { IndexAnnouncementAbility } from '#shared/features/announcements/announcement.ability';

export const indexAnnouncementEventHandlerFn: EventHandlerFn<
  IndexAnnouncementRequest
> = async ({ ability, query }) => {
  await ability.authorize(IndexAnnouncementAbility);

  return getAnnouncements(query);
};
