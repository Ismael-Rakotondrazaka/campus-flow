import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { UpdateAdminRequest } from '#shared/features/admins';

import { UpdateAdminAbility } from '#shared/features/admins/admin.ability';

export const updateAdminEventHandlerFn: EventHandlerFn<
  UpdateAdminRequest
> = async ({ ability, body, params }) => {
  await ability.authorize(UpdateAdminAbility);

  const existing = await getAdmin(params.adminId);

  if (existing === null) {
    throw Exception.notFound({ data: {} });
  }

  const admin = await updateAdmin(params.adminId, body);

  return { data: admin };
};
