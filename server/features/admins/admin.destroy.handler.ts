import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { DestroyAdminRequest } from '#shared/features/admins';

import { DestroyAdminAbility } from '#shared/features/admins/admin.ability';

export const destroyAdminEventHandlerFn: EventHandlerFn<
  DestroyAdminRequest
> = async ({ ability, params }) => {
  await ability.authorize(DestroyAdminAbility);

  const admin = await getAdmin(params.adminId);

  if (admin === null) {
    throw Exception.notFound({ data: {} });
  }

  await deleteAdmin(params.adminId);

  return { data: admin };
};
