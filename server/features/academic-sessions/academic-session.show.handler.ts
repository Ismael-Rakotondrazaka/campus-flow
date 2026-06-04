import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { ShowAcademicSessionRequest } from '#shared/features/academic-sessions';

import { ShowAcademicSessionAbility } from '#shared/features/academic-sessions/academic-session.ability';

export const showAcademicSessionEventHandlerFn: EventHandlerFn<
  ShowAcademicSessionRequest
> = async ({ ability, params }) => {
  await ability.authorize(ShowAcademicSessionAbility);

  const academicSession = await getAcademicSession(params.academicSessionId);

  if (academicSession === null) {
    throw Exception.notFound({ data: {} });
  }

  return { data: academicSession };
};
