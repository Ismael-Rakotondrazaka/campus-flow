import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { Request } from '#shared/utils/request';
import type { z } from 'zod';

import { MaintainerQuerySchema } from '#shared/features/maintainers';
import { IndexMaintainerAbility } from '#shared/features/maintainers/maintainer.ability';

export const MaintainerCountQuerySchema = MaintainerQuerySchema.omit({
  limit: true,
  orderBy: true,
  page: true,
  sortOrder: true,
});

export type CountMaintainerRequest = Request<
  { count: number },
  Record<string, never>,
  Record<string, never>,
  MaintainerCountQuery
>;

export type MaintainerCountQuery = z.infer<typeof MaintainerCountQuerySchema>;

export const countMaintainerEventHandlerFn: EventHandlerFn<
  CountMaintainerRequest
> = async ({ ability, query }) => {
  await ability.authorize(IndexMaintainerAbility);

  const count = await getMaintainersCount(query);

  return { count };
};
