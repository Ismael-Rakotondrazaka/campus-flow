import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { UpdateHousingApplicationRequest } from '#shared/features/housing-applications';

import { HousingApplicationStatus } from '#shared/features/housing-applications';
import { UpdateHousingApplicationAbility } from '#shared/features/housing-applications/housing-application.ability';

import {
  computeAuditDiff,
  createAuditLog,
} from '../audit-logs/audit-log.service';
import {
  onHousingApplicationAccepted,
  onHousingApplicationRefused,
  onHousingApplicationValidated,
} from './housing-application.side-effects';

export const updateHousingApplicationEventHandlerFn: EventHandlerFn<
  UpdateHousingApplicationRequest
> = async ({ ability, body, params }) => {
  const session = await ability.authorizeAndReturnUserSession(
    UpdateHousingApplicationAbility
  );

  const existing = await getHousingApplication(params.housingApplicationId);

  if (existing === null) {
    throw Exception.notFound({ data: {} });
  }

  // Guard 1 - terminal status: no updates once validated or refused
  if (
    existing.status === HousingApplicationStatus.validated ||
    existing.status === HousingApplicationStatus.refused
  ) {
    const key = 'errors.requests.housingApplications.cannotEditTerminal';
    throw Exception.badRequest({
      data: { status: errorIssue(key) },
      message: key,
    });
  }

  // Guard 2 - no-change: at least one field must differ
  if (body.status === existing.status) {
    const key = 'errors.requests.housingApplications.noChange';
    throw Exception.badRequest({
      data: { status: errorIssue(key) },
      message: key,
    });
  }

  // Guard 3 - transition: validated is only reachable from accepted
  if (
    body.status === HousingApplicationStatus.validated &&
    existing.status !== HousingApplicationStatus.accepted
  ) {
    const key =
      'errors.requests.housingApplications.mustBeAcceptedBeforeValidated';
    throw Exception.badRequest({
      data: { status: errorIssue(key) },
      message: key,
    });
  }

  // Guard 4 - lodgment required for validated
  if (body.status === HousingApplicationStatus.validated && !body.lodgmentId) {
    const key =
      'errors.requests.housingApplications.lodgmentRequiredForValidation';
    throw Exception.badRequest({
      data: { lodgmentId: errorIssue(key) },
      message: key,
    });
  }

  // Guard 5 - clear lodgmentId when not validating
  const lodgmentId =
    body.status === HousingApplicationStatus.validated ? body.lodgmentId : null;

  // Guard 6 - clear refusalReason when not refusing
  const refusalReason =
    body.status === HousingApplicationStatus.refused
      ? (body.refusalReason ?? null)
      : null;

  const housingApplication = await updateHousingApplication(
    params.housingApplicationId,
    { ...body, lodgmentId, refusalReason }
  );

  if (body.status) {
    await createAuditLog({
      action: `housing_application.${body.status}`,
      actorId: session.user!.id,
      metadata: computeAuditDiff(
        existing as Record<string, unknown>,
        { ...body, lodgmentId, refusalReason } as Record<string, unknown>
      ),
      targetId: params.housingApplicationId,
      targetTable: 'housing_applications',
    });
  }

  if (body.status === HousingApplicationStatus.accepted) {
    onHousingApplicationAccepted(housingApplication);
  } else if (body.status === HousingApplicationStatus.refused) {
    onHousingApplicationRefused(housingApplication);
  } else if (body.status === HousingApplicationStatus.validated) {
    await onHousingApplicationValidated(housingApplication);
  }

  return { data: housingApplication };
};
