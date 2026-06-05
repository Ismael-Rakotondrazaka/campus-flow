import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { ShowMaintenanceRequest } from '#shared/features/maintenances';

import { ShowMaintenanceAbility } from '#shared/features/maintenances/maintenance.ability';

export const showMaintenanceEventHandlerFn: EventHandlerFn<
  ShowMaintenanceRequest
> = async ({ ability, params }) => {
  const maintenance = await getMaintenance(params.maintenanceId);

  if (maintenance === null) {
    throw Exception.notFound({ data: {} });
  }

  await ability.authorize(ShowMaintenanceAbility, maintenance);

  return { data: maintenance };
};
