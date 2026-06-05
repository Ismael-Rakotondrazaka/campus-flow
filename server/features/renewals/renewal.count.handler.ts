import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { Request } from '#shared/utils/request';
import type { z } from 'zod';

import { RenewalQuerySchema } from '#shared/features/renewals';
import { IndexRenewalAbility } from '#shared/features/renewals/renewal.ability';
import { UserTypeGuard } from '#shared/utils/userTypeGuard';

export const RenewalCountQuerySchema = RenewalQuerySchema.omit({
  limit: true,
  orderBy: true,
  page: true,
  sortOrder: true,
});

export type CountRenewalRequest = Request<
  { count: number },
  Record<string, never>,
  Record<string, never>,
  RenewalCountQuery
>;

export type RenewalCountQuery = z.infer<typeof RenewalCountQuerySchema>;

export const countRenewalEventHandlerFn: EventHandlerFn<
  CountRenewalRequest
> = async ({ ability, query }) => {
  const session =
    await ability.authorizeAndReturnUserSession(IndexRenewalAbility);
  const user = session.user!;

  const scopedQuery = UserTypeGuard.isResident(user)
    ? { ...query, residentId: user.id }
    : query;

  const count = await getRenewalsCount(scopedQuery);

  return { count };
};
