import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { ShowAnnouncementRequest } from '#shared/features/announcements';

import { ShowAnnouncementAbility } from '#shared/features/announcements/announcement.ability';

export const showAnnouncementEventHandlerFn: EventHandlerFn<
  ShowAnnouncementRequest
> = async ({ ability, params }) => {
  await ability.authorize(ShowAnnouncementAbility);

  const announcement = await getAnnouncement(params.announcementId);

  if (announcement === null) {
    throw Exception.notFound({ data: {} });
  }

  return { data: announcement };
};
