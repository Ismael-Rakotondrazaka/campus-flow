import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { DestroyAcademicSessionRequest } from '#shared/features/academic-sessions';

import { DestroyAcademicSessionAbility } from '#shared/features/academic-sessions/academic-session.ability';

export const destroyAcademicSessionEventHandlerFn: EventHandlerFn<
  DestroyAcademicSessionRequest
> = async ({ ability, params }) => {
  await ability.authorize(DestroyAcademicSessionAbility);

  const academicSession = await getAcademicSession(params.academicSessionId);

  if (academicSession === null) {
    throw Exception.notFound({ data: {} });
  }

  await deleteAcademicSession(params.academicSessionId);

  return { data: academicSession };
};
