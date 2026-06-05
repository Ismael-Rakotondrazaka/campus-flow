import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { StoreHousingApplicationRequest } from '#shared/features/housing-applications';

import { StoreHousingApplicationAbility } from '#shared/features/housing-applications/housing-application.ability';

export const storeHousingApplicationEventHandlerFn: EventHandlerFn<
  StoreHousingApplicationRequest
> = async ({ ability, body }) => {
  const session = await getAcademicSession(body.academicSessionId);

  if (session === null) {
    const key = 'errors.requests.housingApplications.academicSessionNotFound';
    throw Exception.notFound({
      data: { academicSessionId: errorIssue(key) },
      message: key,
    });
  }

  await ability.authorize(StoreHousingApplicationAbility, session);

  const housingApplication = await createHousingApplication(body);

  return { data: housingApplication };
};
