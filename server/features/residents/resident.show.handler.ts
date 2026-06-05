import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { ShowResidentRequest } from '#shared/features/residents';

import { ShowResidentAbility } from '#shared/features/residents/resident.ability';

export const showResidentEventHandlerFn: EventHandlerFn<
  ShowResidentRequest
> = async ({ ability, params }) => {
  const resident = await getResident(params.residentId);

  if (resident === null) {
    throw Exception.notFound({ data: {} });
  }

  await ability.authorize(ShowResidentAbility, resident);

  return { data: resident };
};
