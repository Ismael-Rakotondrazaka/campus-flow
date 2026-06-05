import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { Request } from '#shared/utils/request';
import type { z } from 'zod';

import { AdminQuerySchema } from '#shared/features/admins';
import { IndexAdminAbility } from '#shared/features/admins/admin.ability';

export const AdminCountQuerySchema = AdminQuerySchema.omit({
  limit: true,
  orderBy: true,
  page: true,
  sortOrder: true,
});

export type AdminCountQuery = z.infer<typeof AdminCountQuerySchema>;

export type CountAdminRequest = Request<
  { count: number },
  Record<string, never>,
  Record<string, never>,
  AdminCountQuery
>;

export const countAdminEventHandlerFn: EventHandlerFn<
  CountAdminRequest
> = async ({ ability, query }) => {
  await ability.authorize(IndexAdminAbility);

  const count = await getAdminsCount(query);

  return { count };
};
