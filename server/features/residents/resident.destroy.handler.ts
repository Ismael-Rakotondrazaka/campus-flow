import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { DestroyResidentRequest } from '#shared/features/residents';

import { DestroyResidentAbility } from '#shared/features/residents/resident.ability';

export const destroyResidentEventHandlerFn: EventHandlerFn<
  DestroyResidentRequest
> = async ({ ability, params }) => {
  await ability.authorize(DestroyResidentAbility);

  const resident = await getResident(params.residentId);

  if (resident === null) {
    throw Exception.notFound({ data: {} });
  }

  await deleteResident(params.residentId);

  if (resident.lodgmentId !== null) {
    await updateLodgmentOccupancy(resident.lodgmentId);
  }

  return { data: resident };
};
