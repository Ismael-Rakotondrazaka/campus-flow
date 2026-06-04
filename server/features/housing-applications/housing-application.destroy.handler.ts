import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { DestroyHousingApplicationRequest } from '#shared/features/housing-applications';

import { DestroyHousingApplicationAbility } from '#shared/features/housing-applications/housing-application.ability';

export const destroyHousingApplicationEventHandlerFn: EventHandlerFn<
  DestroyHousingApplicationRequest
> = async ({ ability, params }) => {
  await ability.authorize(DestroyHousingApplicationAbility);

  const housingApplication = await getHousingApplication(
    params.housingApplicationId
  );

  if (housingApplication === null) {
    throw Exception.notFound({ data: {} });
  }

  await deleteHousingApplication(params.housingApplicationId);

  return { data: housingApplication };
};
