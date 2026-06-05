import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { DestroyRenewalRequest } from '#shared/features/renewals';

import { DestroyRenewalAbility } from '#shared/features/renewals/renewal.ability';

export const destroyRenewalEventHandlerFn: EventHandlerFn<
  DestroyRenewalRequest
> = async ({ ability, params }) => {
  await ability.authorize(DestroyRenewalAbility);

  const renewal = await getRenewal(params.renewalId);

  if (renewal === null) {
    throw Exception.notFound({ data: {} });
  }

  await deleteRenewal(params.renewalId);

  return { data: renewal };
};
