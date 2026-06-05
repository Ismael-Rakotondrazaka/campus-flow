import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { IndexMaintainerRequest } from '#shared/features/maintainers';

import { IndexMaintainerAbility } from '#shared/features/maintainers/maintainer.ability';

export const indexMaintainerEventHandlerFn: EventHandlerFn<
  IndexMaintainerRequest
> = async ({ ability, query }) => {
  await ability.authorize(IndexMaintainerAbility);

  return getMaintainers(query);
};
