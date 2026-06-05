import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { IndexAcademicSessionRequest } from '#shared/features/academic-sessions';

import { IndexAcademicSessionAbility } from '#shared/features/academic-sessions/academic-session.ability';

export const indexAcademicSessionEventHandlerFn: EventHandlerFn<
  IndexAcademicSessionRequest
> = async ({ ability, query }) => {
  await ability.authorize(IndexAcademicSessionAbility);

  return getAcademicSessions(query);
};
