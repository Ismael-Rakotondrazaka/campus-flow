import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { UpdateAcademicSessionRequest } from '#shared/features/academic-sessions';

import { UpdateAcademicSessionAbility } from '#shared/features/academic-sessions/academic-session.ability';

export const updateAcademicSessionEventHandlerFn: EventHandlerFn<
  UpdateAcademicSessionRequest
> = async ({ ability, body, params }) => {
  await ability.authorize(UpdateAcademicSessionAbility);

  const existing = await getAcademicSession(params.academicSessionId);

  if (existing === null) {
    throw Exception.notFound({ data: {} });
  }

  const academicSession = await updateAcademicSession(
    params.academicSessionId,
    body
  );

  return { data: academicSession };
};
