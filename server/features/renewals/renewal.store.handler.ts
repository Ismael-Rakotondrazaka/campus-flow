import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { StoreRenewalRequest } from '#shared/features/renewals';

import { StoreRenewalAbility } from '#shared/features/renewals/renewal.ability';

import { Prisma } from '../../../prisma/generated/client/client';

export const storeRenewalEventHandlerFn: EventHandlerFn<
  StoreRenewalRequest
> = async ({ ability, body }) => {
  const academicSession = await getAcademicSession(body.academicSessionId);

  if (academicSession === null) {
    const key = 'errors.requests.renewals.academicSessionNotFound';
    throw Exception.notFound({
      data: { academicSessionId: errorIssue(key) },
      message: key,
    });
  }

  const session = await ability.authorizeAndReturnUserSession(
    StoreRenewalAbility,
    academicSession
  );

  try {
    const renewal = await createRenewal(body, session.user!.id);
    return { data: renewal };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      const key = 'errors.requests.renewals.alreadyExists';
      throw Exception.badRequest({
        data: { academicSessionId: errorIssue(key) },
        message: key,
      });
    }
    throw error;
  }
};
