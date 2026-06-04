import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { AcademicSession } from '#shared/features/academic-sessions';
import type { Request } from '#shared/utils/request';

import { IndexAcademicSessionAbility } from '#shared/features/academic-sessions/academic-session.ability';

export type ActiveRenewalSessionRequest = Request<{
  data: AcademicSession | null;
}>;

export const activeRenewalSessionEventHandlerFn: EventHandlerFn<
  ActiveRenewalSessionRequest
> = async ({ ability }) => {
  await ability.authorize(IndexAcademicSessionAbility);

  const data = await getActiveRenewalSession();

  return { data };
};
