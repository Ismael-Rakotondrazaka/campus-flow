import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { Request } from '#shared/utils/request';
import type { z } from 'zod';

import { HousingApplicationQuerySchema } from '#shared/features/housing-applications';
import { IndexHousingApplicationAbility } from '#shared/features/housing-applications/housing-application.ability';

export const HousingApplicationCountQuerySchema =
  HousingApplicationQuerySchema.omit({
    limit: true,
    page: true,
    sortOrder: true,
  });

export type CountHousingApplicationRequest = Request<
  { count: number },
  Record<string, never>,
  Record<string, never>,
  HousingApplicationCountQuery
>;

export type HousingApplicationCountQuery = z.infer<
  typeof HousingApplicationCountQuerySchema
>;

export const countHousingApplicationEventHandlerFn: EventHandlerFn<
  CountHousingApplicationRequest
> = async ({ ability, query }) => {
  await ability.authorize(IndexHousingApplicationAbility);

  const count = await getHousingApplicationsCount(query);

  return { count };
};
