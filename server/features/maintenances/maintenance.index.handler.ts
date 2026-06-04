import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { IndexMaintenanceRequest } from '#shared/features/maintenances';

import { IndexMaintenanceAbility } from '#shared/features/maintenances/maintenance.ability';
import { UserTypeGuard } from '#shared/utils/userTypeGuard';

export const indexMaintenanceEventHandlerFn: EventHandlerFn<
  IndexMaintenanceRequest
> = async ({ ability, query }) => {
  const session = await ability.authorizeAndReturnUserSession(
    IndexMaintenanceAbility
  );
  const user = session.user!;

  const scopedQuery = UserTypeGuard.isResident(user)
    ? { ...query, residentId: user.id }
    : query;

  return getMaintenances(scopedQuery);
};
