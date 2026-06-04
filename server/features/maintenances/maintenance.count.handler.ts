import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { CountMaintenanceRequest } from '#shared/features/maintenances';

import { IndexMaintenanceAbility } from '#shared/features/maintenances/maintenance.ability';
import { UserTypeGuard } from '#shared/utils/userTypeGuard';

export const countMaintenanceEventHandlerFn: EventHandlerFn<
  CountMaintenanceRequest
> = async ({ ability, query }) => {
  const session = await ability.authorizeAndReturnUserSession(
    IndexMaintenanceAbility
  );
  const user = session.user!;

  const scopedQuery = UserTypeGuard.isResident(user)
    ? { ...query, residentId: user.id }
    : query;

  const count = await getMaintenancesCount(scopedQuery);

  return { count };
};
