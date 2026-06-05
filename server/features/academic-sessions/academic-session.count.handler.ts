import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { Request } from '#shared/utils/request';

import { IndexAcademicSessionAbility } from '#shared/features/academic-sessions/academic-session.ability';

export type CountAcademicSessionRequest = Request<{ count: number }>;

export const countAcademicSessionEventHandlerFn: EventHandlerFn<
  CountAcademicSessionRequest
> = async ({ ability }) => {
  await ability.authorize(IndexAcademicSessionAbility);

  const count = await getAcademicSessionsCount();

  return { count };
};
