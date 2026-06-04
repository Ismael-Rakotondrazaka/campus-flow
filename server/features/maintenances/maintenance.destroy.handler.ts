import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { DestroyMaintenanceRequest } from '#shared/features/maintenances';

import { DestroyMaintenanceAbility } from '#shared/features/maintenances/maintenance.ability';

export const destroyMaintenanceEventHandlerFn: EventHandlerFn<
  DestroyMaintenanceRequest
> = async ({ ability, params }) => {
  await ability.authorize(DestroyMaintenanceAbility);

  const maintenance = await getMaintenance(params.maintenanceId);

  if (maintenance === null) {
    throw Exception.notFound({ data: {} });
  }

  await deleteMaintenance(params.maintenanceId);

  return { data: maintenance };
};
