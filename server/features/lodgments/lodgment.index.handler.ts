import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { IndexLodgmentRequest } from '#shared/features/lodgments';

import { IndexLodgmentAbility } from '#shared/features/lodgments/lodgment.ability';

export const indexLodgmentEventHandlerFn: EventHandlerFn<
  IndexLodgmentRequest
> = async ({ ability, query }) => {
  await ability.authorize(IndexLodgmentAbility);

  return getLodgments(query);
};
