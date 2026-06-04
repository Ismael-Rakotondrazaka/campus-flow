import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { MaintenanceParamsSchema } from '#shared/features/maintenances';
import type { Request } from '#shared/utils/request';

import { MaintenanceStatus } from '#shared/features/maintenances';
import { AssignMaintainerAbility } from '#shared/features/maintenances/maintenance.ability';
import { z } from 'zod';

export const AssignMaintainerBodySchema = z.object({
  maintainerId: z.string().uuid(),
});

export type AssignMaintainerRequest = Request<
  { success: true },
  z.infer<typeof AssignMaintainerBodySchema>,
  z.infer<typeof MaintenanceParamsSchema>
>;

const ASSIGNABLE_STATUSES: MaintenanceStatus[] = [
  MaintenanceStatus.pending,
  MaintenanceStatus.accepted,
];

export const assignMaintainerEventHandlerFn: EventHandlerFn<
  AssignMaintainerRequest
> = async ({ ability, body, params }) => {
  await ability.authorize(AssignMaintainerAbility);

  const existing = await getMaintenance(params.maintenanceId);

  if (existing === null) {
    throw Exception.notFound({ data: {} });
  }

  if (!ASSIGNABLE_STATUSES.includes(existing.status)) {
    const key = 'errors.requests.maintenances.cannotAssignMaintainer';
    throw Exception.badRequest({
      data: {},
      message: key,
    });
  }

  await assignMaintainer(params.maintenanceId, body.maintainerId);

  return { success: true };
};
