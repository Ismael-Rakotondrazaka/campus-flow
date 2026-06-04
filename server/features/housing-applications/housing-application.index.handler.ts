import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { IndexHousingApplicationRequest } from '#shared/features/housing-applications';

import { IndexHousingApplicationAbility } from '#shared/features/housing-applications/housing-application.ability';

export const indexHousingApplicationEventHandlerFn: EventHandlerFn<
  IndexHousingApplicationRequest
> = async ({ ability, query }) => {
  await ability.authorize(IndexHousingApplicationAbility);

  return getHousingApplications(query);
};
