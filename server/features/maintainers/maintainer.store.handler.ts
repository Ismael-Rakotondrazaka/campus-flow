import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { StoreMaintainerRequest } from '#shared/features/maintainers';

import { StoreMaintainerAbility } from '#shared/features/maintainers/maintainer.ability';

export const storeMaintainerEventHandlerFn: EventHandlerFn<
  StoreMaintainerRequest
> = async ({ ability, body }) => {
  await ability.authorize(StoreMaintainerAbility);

  const maintainer = await createMaintainer(body);

  return { data: maintainer };
};
