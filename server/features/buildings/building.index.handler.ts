import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { IndexBuildingRequest } from '#shared/features/buildings';

import { IndexBuildingAbility } from '#shared/features/buildings/building.ability';

export const indexBuildingEventHandlerFn: EventHandlerFn<
  IndexBuildingRequest
> = async ({ ability, query }) => {
  await ability.authorize(IndexBuildingAbility);

  return getBuildings(query);
};
