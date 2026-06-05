import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { IndexAdminRequest } from '#shared/features/admins';

import { IndexAdminAbility } from '#shared/features/admins/admin.ability';

export const indexAdminEventHandlerFn: EventHandlerFn<
  IndexAdminRequest
> = async ({ ability, query }) => {
  await ability.authorize(IndexAdminAbility);

  return getAdmins(query);
};
