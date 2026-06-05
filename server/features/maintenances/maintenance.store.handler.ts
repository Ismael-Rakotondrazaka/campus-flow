import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { StoreMaintenanceRequest } from '#shared/features/maintenances';

import { StoreMaintenanceAbility } from '#shared/features/maintenances/maintenance.ability';

export const storeMaintenanceEventHandlerFn: EventHandlerFn<
  StoreMaintenanceRequest
> = async ({ ability, body }) => {
  const session = await ability.authorizeAndReturnUserSession(
    StoreMaintenanceAbility
  );

  const maintenance = await createMaintenance(body, session.user!.id);

  return { data: maintenance };
};
