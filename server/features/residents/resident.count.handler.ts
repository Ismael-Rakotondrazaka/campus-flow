import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { Request } from '#shared/utils/request';
import type { z } from 'zod';

import { ResidentQuerySchema } from '#shared/features/residents';
import { IndexResidentAbility } from '#shared/features/residents/resident.ability';

export const ResidentCountQuerySchema = ResidentQuerySchema.omit({
  limit: true,
  orderBy: true,
  page: true,
  sortOrder: true,
});

export type CountResidentRequest = Request<
  { count: number },
  Record<string, never>,
  Record<string, never>,
  ResidentCountQuery
>;

export type ResidentCountQuery = z.infer<typeof ResidentCountQuerySchema>;

export const countResidentEventHandlerFn: EventHandlerFn<
  CountResidentRequest
> = async ({ ability, query }) => {
  await ability.authorize(IndexResidentAbility);

  const count = await getResidentsCount(query);

  return { count };
};
