import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { ShowHousingApplicationRequest } from '#shared/features/housing-applications';

import { ShowHousingApplicationAbility } from '#shared/features/housing-applications/housing-application.ability';

export const showHousingApplicationEventHandlerFn: EventHandlerFn<
  ShowHousingApplicationRequest
> = async ({ ability, params }) => {
  await ability.authorize(ShowHousingApplicationAbility);

  const housingApplication = await getHousingApplication(
    params.housingApplicationId
  );

  if (housingApplication === null) {
    throw Exception.notFound({ data: {} });
  }

  return { data: housingApplication };
};
