import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { ShowAdminRequest } from '#shared/features/admins';

import { ShowAdminAbility } from '#shared/features/admins/admin.ability';

export const showAdminEventHandlerFn: EventHandlerFn<
  ShowAdminRequest
> = async ({ ability, params }) => {
  await ability.authorize(ShowAdminAbility);

  const admin = await getAdmin(params.adminId);

  if (admin === null) {
    throw Exception.notFound({ data: {} });
  }

  return { data: admin };
};
