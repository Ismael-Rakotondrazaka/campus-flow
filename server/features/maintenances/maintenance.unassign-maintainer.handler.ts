import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { Request } from '#shared/utils/request';

import { MaintenanceStatus } from '#shared/features/maintenances';
import { UnassignMaintainerAbility } from '#shared/features/maintenances/maintenance.ability';
import { z } from 'zod';

export const UnassignMaintainerParamsSchema = z.object({
  maintainerId: z.string().uuid(),
  maintenanceId: z.string().uuid(),
});

export type UnassignMaintainerRequest = Request<
  { success: true },
  Record<string, never>,
  z.infer<typeof UnassignMaintainerParamsSchema>
>;

const ASSIGNABLE_STATUSES: MaintenanceStatus[] = [
  MaintenanceStatus.pending,
  MaintenanceStatus.accepted,
];

export const unassignMaintainerEventHandlerFn: EventHandlerFn<
  UnassignMaintainerRequest
> = async ({ ability, params }) => {
  await ability.authorize(UnassignMaintainerAbility);

  const existing = await getMaintenance(params.maintenanceId);

  if (existing === null) {
    throw Exception.notFound({ data: {} });
  }

  if (!ASSIGNABLE_STATUSES.includes(existing.status)) {
    const key = 'errors.requests.maintenances.cannotUnassignMaintainer';
    throw Exception.badRequest({
      data: {},
      message: key,
    });
  }

  await unassignMaintainer(params.maintenanceId, params.maintainerId);

  return { success: true };
};
