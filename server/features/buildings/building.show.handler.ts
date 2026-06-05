import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { ShowBuildingRequest } from '#shared/features/buildings';

import { ShowBuildingAbility } from '#shared/features/buildings/building.ability';

export const showBuildingEventHandlerFn: EventHandlerFn<
  ShowBuildingRequest
> = async ({ ability, params }) => {
  await ability.authorize(ShowBuildingAbility);

  const building = await getBuilding(params.buildingId);

  if (building === null) {
    throw Exception.notFound({ data: {} });
  }

  return { data: building };
};
