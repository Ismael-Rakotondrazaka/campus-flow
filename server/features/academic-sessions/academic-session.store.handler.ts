import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { StoreAcademicSessionRequest } from '#shared/features/academic-sessions';

import { StoreAcademicSessionAbility } from '#shared/features/academic-sessions/academic-session.ability';

export const storeAcademicSessionEventHandlerFn: EventHandlerFn<
  StoreAcademicSessionRequest
> = async ({ ability, body }) => {
  await ability.authorize(StoreAcademicSessionAbility);

  const academicSession = await createAcademicSession(body);

  return { data: academicSession };
};
