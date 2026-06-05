import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { UpdateResidentRequest } from '#shared/features/residents';

import { UpdateResidentAbility } from '#shared/features/residents/resident.ability';

export const updateResidentEventHandlerFn: EventHandlerFn<
  UpdateResidentRequest
> = async ({ ability, body, params }) => {
  await ability.authorize(UpdateResidentAbility);

  const existing = await getResident(params.residentId);

  if (existing === null) {
    throw Exception.notFound({ data: {} });
  }

  const resident = await updateResident(params.residentId, body);

  if (
    existing.lodgmentId !== null &&
    existing.lodgmentId !== resident.lodgmentId
  ) {
    await updateLodgmentOccupancy(existing.lodgmentId);
  }

  if (resident.lodgmentId !== null) {
    await updateLodgmentOccupancy(resident.lodgmentId);
  }

  return { data: resident };
};
