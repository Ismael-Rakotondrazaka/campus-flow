import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { ShowLodgmentRequest } from '#shared/features/lodgments';

import { ShowLodgmentAbility } from '#shared/features/lodgments/lodgment.ability';

export const showLodgmentEventHandlerFn: EventHandlerFn<
  ShowLodgmentRequest
> = async ({ ability, params }) => {
  await ability.authorize(ShowLodgmentAbility);

  const lodgment = await getLodgment(params.lodgmentId);

  if (lodgment === null) {
    throw Exception.notFound({ data: {} });
  }

  return { data: lodgment };
};
