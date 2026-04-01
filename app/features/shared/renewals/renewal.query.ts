import { defineQueryOptions } from '@pinia/colada';

import type { RenewalFilters } from './renewal.model';

import { getRenewal, getRenewals } from './renewal.service';

export const RENEWAL_QUERY_KEYS = {
  byId: (id: string) => [...RENEWAL_QUERY_KEYS.root, id] as const,

  list: (filters: RenewalFilters = {}) =>
    [...RENEWAL_QUERY_KEYS.root, 'list', filters] as const,

  root: ['renewals'] as const,
};

export const renewalListQuery = defineQueryOptions(
  (filters: RenewalFilters = {}) => ({
    key: RENEWAL_QUERY_KEYS.list(filters),
    query: () => getRenewals(filters),
  })
);

export const renewalByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => ({
    key: RENEWAL_QUERY_KEYS.byId(id),
    query: () => getRenewal(id),
  })
);
