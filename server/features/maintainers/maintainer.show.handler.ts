import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { ShowMaintainerRequest } from '#shared/features/maintainers';

import { ShowMaintainerAbility } from '#shared/features/maintainers/maintainer.ability';

export const showMaintainerEventHandlerFn: EventHandlerFn<
  ShowMaintainerRequest
> = async ({ ability, params }) => {
  await ability.authorize(ShowMaintainerAbility);

  const maintainer = await getMaintainer(params.maintainerId);

  if (maintainer === null) {
    throw Exception.notFound({ data: {} });
  }

  return { data: maintainer };
};
