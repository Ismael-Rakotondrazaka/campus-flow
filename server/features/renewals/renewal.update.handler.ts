import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { UpdateRenewalRequest } from '#shared/features/renewals';

import { RenewalStatus } from '#shared/features/renewals';
import { UpdateRenewalAbility } from '#shared/features/renewals/renewal.ability';
import { UserTypeGuard } from '#shared/utils/userTypeGuard';

import {
  computeAuditDiff,
  createAuditLog,
} from '../audit-logs/audit-log.service';
import {
  onRenewalAccepted,
  onRenewalRefused,
  onRenewalValidated,
} from './renewal.side-effects';

export const updateRenewalEventHandlerFn: EventHandlerFn<
  UpdateRenewalRequest
> = async ({ ability, body, params }) => {
  const existing = await getRenewal(params.renewalId);

  if (existing === null) {
    throw Exception.notFound({ data: {} });
  }

  const session = await ability.authorizeAndReturnUserSession(
    UpdateRenewalAbility,
    existing
  );

  // Status guards only apply when the body contains a status change
  if (body.status !== undefined) {
    // Guard 1 - terminal status: no updates once validated or refused
    if (
      existing.status === RenewalStatus.validated ||
      existing.status === RenewalStatus.refused
    ) {
      const key = 'errors.requests.renewals.cannotEditTerminal';
      throw Exception.badRequest({
        data: { status: errorIssue(key) },
        message: key,
      });
    }

    // Guard 2 - no-change: at least one field must differ
    if (body.status === existing.status) {
      const key = 'errors.requests.renewals.noChange';
      throw Exception.badRequest({
        data: { status: errorIssue(key) },
        message: key,
      });
    }

    // Guard 3 - transition: validated is only reachable from accepted
    if (
      body.status === RenewalStatus.validated &&
      existing.status !== RenewalStatus.accepted
    ) {
      const key = 'errors.requests.renewals.mustBeAcceptedBeforeValidated';
      throw Exception.badRequest({
        data: { status: errorIssue(key) },
        message: key,
      });
    }
  }

  // Guard 4 - clear refusalReason when not refusing
  const refusalReason =
    body.status === RenewalStatus.refused ? (body.refusalReason ?? null) : null;

  const renewal = await updateRenewal(params.renewalId, {
    ...body,
    refusalReason,
  });

  if (body.status) {
    await createAuditLog({
      action: `renewal.${body.status}`,
      actorId: UserTypeGuard.isAdmin(session.user!) ? session.user!.id : null,
      metadata: computeAuditDiff(
        existing as Record<string, unknown>,
        { ...body, refusalReason } as Record<string, unknown>
      ),
      targetId: params.renewalId,
      targetTable: 'renewals',
    });
  }

  if (body.status === RenewalStatus.accepted) {
    await onRenewalAccepted(renewal);
  } else if (body.status === RenewalStatus.refused) {
    onRenewalRefused(renewal);
  } else if (body.status === RenewalStatus.validated) {
    onRenewalValidated(renewal);
  }

  return { data: renewal };
};
