import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { UpdateMaintainerRequest } from '#shared/features/maintainers';

import { UpdateMaintainerAbility } from '#shared/features/maintainers/maintainer.ability';

export const updateMaintainerEventHandlerFn: EventHandlerFn<
  UpdateMaintainerRequest
> = async ({ ability, body, params }) => {
  await ability.authorize(UpdateMaintainerAbility);

  const existing = await getMaintainer(params.maintainerId);

  if (existing === null) {
    throw Exception.notFound({ data: {} });
  }

  const maintainer = await updateMaintainer(params.maintainerId, body);

  return { data: maintainer };
};
