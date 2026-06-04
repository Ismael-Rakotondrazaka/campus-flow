import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { Request } from '#shared/utils/request';
import type { z } from 'zod';

import { LodgmentQuerySchema } from '#shared/features/lodgments';
import { IndexLodgmentAbility } from '#shared/features/lodgments/lodgment.ability';

export const LodgmentCountQuerySchema = LodgmentQuerySchema.omit({
  limit: true,
  orderBy: true,
  page: true,
  sortOrder: true,
});

export type CountLodgmentRequest = Request<
  { count: number },
  Record<string, never>,
  Record<string, never>,
  LodgmentCountQuery
>;

export type LodgmentCountQuery = z.infer<typeof LodgmentCountQuerySchema>;

export const countLodgmentEventHandlerFn: EventHandlerFn<
  CountLodgmentRequest
> = async ({ ability, query }) => {
  await ability.authorize(IndexLodgmentAbility);

  const count = await getLodgmentsCount(query);

  return { count };
};
