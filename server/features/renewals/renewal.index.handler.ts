import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { IndexRenewalRequest } from '#shared/features/renewals';

import { IndexRenewalAbility } from '#shared/features/renewals/renewal.ability';
import { UserTypeGuard } from '#shared/utils/userTypeGuard';

export const indexRenewalEventHandlerFn: EventHandlerFn<
  IndexRenewalRequest
> = async ({ ability, query }) => {
  const session =
    await ability.authorizeAndReturnUserSession(IndexRenewalAbility);
  const user = session.user!;

  const scopedQuery = UserTypeGuard.isResident(user)
    ? { ...query, residentId: user.id }
    : query;

  return getRenewals(scopedQuery);
};
