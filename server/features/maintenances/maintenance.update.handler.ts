import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { UpdateMaintenanceRequest } from '#shared/features/maintenances';

import { MAINTENANCE_TRANSITIONS } from '#shared/features/maintenances';
import { UpdateMaintenanceAbility } from '#shared/features/maintenances/maintenance.ability';

import {
  computeAuditDiff,
  createAuditLog,
} from '../audit-logs/audit-log.service';

export const updateMaintenanceEventHandlerFn: EventHandlerFn<
  UpdateMaintenanceRequest
> = async ({ ability, body, params }) => {
  const session = await ability.authorizeAndReturnUserSession(
    UpdateMaintenanceAbility
  );

  const existing = await getMaintenance(params.maintenanceId);

  if (existing === null) {
    throw Exception.notFound({ data: {} });
  }

  if (
    body.status !== undefined &&
    !MAINTENANCE_TRANSITIONS[existing.status].includes(body.status)
  ) {
    const key = 'errors.requests.maintenances.invalidStatusTransition';
    throw Exception.badRequest({
      data: {
        status: errorIssue(key, {
          from: existing.status,
          to: body.status,
        }),
      },
      message: key,
    });
  }

  const maintenance = await updateMaintenance(params.maintenanceId, body);

  if (body.status) {
    await createAuditLog({
      action: `maintenance.${body.status}`,
      actorId: session.user!.id,
      metadata: computeAuditDiff(
        existing as Record<string, unknown>,
        body as Record<string, unknown>
      ),
      targetId: params.maintenanceId,
      targetTable: 'maintenances',
    });
  }

  return { data: maintenance };
};
