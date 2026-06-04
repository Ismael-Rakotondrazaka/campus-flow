import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { DestroyMaintainerRequest } from '#shared/features/maintainers';

import { DestroyMaintainerAbility } from '#shared/features/maintainers/maintainer.ability';

export const destroyMaintainerEventHandlerFn: EventHandlerFn<
  DestroyMaintainerRequest
> = async ({ ability, params }) => {
  await ability.authorize(DestroyMaintainerAbility);

  const maintainer = await getMaintainer(params.maintainerId);

  if (maintainer === null) {
    throw Exception.notFound({ data: {} });
  }

  await deleteMaintainer(params.maintainerId);

  return { data: maintainer };
};
