import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { IndexResidentRequest } from '#shared/features/residents';

import { IndexResidentAbility } from '#shared/features/residents/resident.ability';

export const indexResidentEventHandlerFn: EventHandlerFn<
  IndexResidentRequest
> = async ({ ability, query }) => {
  await ability.authorize(IndexResidentAbility);

  return getResidents(query);
};
