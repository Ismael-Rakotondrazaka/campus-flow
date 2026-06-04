import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { UpdateAnnouncementRequest } from '#shared/features/announcements';

import { UpdateAnnouncementAbility } from '#shared/features/announcements/announcement.ability';

export const updateAnnouncementEventHandlerFn: EventHandlerFn<
  UpdateAnnouncementRequest
> = async ({ ability, body, params }) => {
  await ability.authorize(UpdateAnnouncementAbility);

  const existing = await getAnnouncement(params.announcementId);

  if (existing === null) {
    throw Exception.notFound({ data: {} });
  }

  const announcement = await updateAnnouncement(params.announcementId, body);

  return { data: announcement };
};
