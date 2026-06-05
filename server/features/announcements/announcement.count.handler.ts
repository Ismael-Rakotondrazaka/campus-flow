import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { Request } from '#shared/utils/request';
import type { z } from 'zod';

import { AnnouncementQuerySchema } from '#shared/features/announcements';
import { IndexAnnouncementAbility } from '#shared/features/announcements/announcement.ability';

export const AnnouncementCountQuerySchema = AnnouncementQuerySchema.omit({
  limit: true,
  orderBy: true,
  page: true,
  sortOrder: true,
});

export type AnnouncementCountQuery = z.infer<
  typeof AnnouncementCountQuerySchema
>;

export type CountAnnouncementRequest = Request<
  { count: number },
  Record<string, never>,
  Record<string, never>,
  AnnouncementCountQuery
>;

export const countAnnouncementEventHandlerFn: EventHandlerFn<
  CountAnnouncementRequest
> = async ({ ability, query }) => {
  await ability.authorize(IndexAnnouncementAbility);

  const count = await getAnnouncementsCount(query);

  return { count };
};
