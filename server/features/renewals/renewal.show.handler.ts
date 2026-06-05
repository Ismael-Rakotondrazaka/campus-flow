import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { ShowRenewalRequest } from '#shared/features/renewals';

import { ShowRenewalAbility } from '#shared/features/renewals/renewal.ability';

export const showRenewalEventHandlerFn: EventHandlerFn<
  ShowRenewalRequest
> = async ({ ability, params }) => {
  const renewal = await getRenewal(params.renewalId);

  if (renewal === null) {
    throw Exception.notFound({ data: {} });
  }

  await ability.authorize(ShowRenewalAbility, renewal);

  return { data: renewal };
};
