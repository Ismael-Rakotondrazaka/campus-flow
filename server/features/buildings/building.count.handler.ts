import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { Request } from '#shared/utils/request';
import type { z } from 'zod';

import { BuildingQuerySchema } from '#shared/features/buildings';
import { IndexBuildingAbility } from '#shared/features/buildings/building.ability';

export const BuildingCountQuerySchema = BuildingQuerySchema.omit({
  limit: true,
  orderBy: true,
  page: true,
  sortOrder: true,
});

export type BuildingCountQuery = z.infer<typeof BuildingCountQuerySchema>;

export type CountBuildingRequest = Request<
  { count: number },
  Record<string, never>,
  Record<string, never>,
  BuildingCountQuery
>;

export const countBuildingEventHandlerFn: EventHandlerFn<
  CountBuildingRequest
> = async ({ ability, query }) => {
  await ability.authorize(IndexBuildingAbility);

  const count = await getBuildingsCount(query);

  return { count };
};
