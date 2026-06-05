import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { DestroyAnnouncementRequest } from '#shared/features/announcements';

import { DestroyAnnouncementAbility } from '#shared/features/announcements/announcement.ability';

export const destroyAnnouncementEventHandlerFn: EventHandlerFn<
  DestroyAnnouncementRequest
> = async ({ ability, params }) => {
  await ability.authorize(DestroyAnnouncementAbility);

  const announcement = await getAnnouncement(params.announcementId);

  if (announcement === null) {
    throw Exception.notFound({ data: {} });
  }

  await deleteAnnouncement(params.announcementId);

  return { data: announcement };
};
