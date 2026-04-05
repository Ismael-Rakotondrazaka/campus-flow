import { defineQueryOptions } from '@pinia/colada';

import type { RenewalFilters } from './renewal.model';

import { getRenewal, getRenewals, getRenewalsCount } from './renewal.service';

export const RENEWAL_QUERY_KEYS = {
  byId: (id: string) => [...RENEWAL_QUERY_KEYS.root, id] as const,

  count: (filters: Omit<RenewalFilters, 'limit' | 'page'> = {}) =>
    [...RENEWAL_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: RenewalFilters = {}) =>
    [...RENEWAL_QUERY_KEYS.root, 'list', filters] as const,

  root: ['renewals'] as const,
};

export const renewalListQuery = defineQueryOptions(
  (filters: RenewalFilters = {}) => ({
    key: RENEWAL_QUERY_KEYS.list(filters),
    placeholderData: previousData => previousData,
    query: () => getRenewals(filters),
  })
);

export const renewalByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => ({
    key: RENEWAL_QUERY_KEYS.byId(id),
    query: () => getRenewal(id),
  })
);

export const renewalCountQuery = defineQueryOptions(
  (filters: Omit<RenewalFilters, 'limit' | 'page'> = {}) => ({
    key: RENEWAL_QUERY_KEYS.count(filters),
    query: () => getRenewalsCount(filters),
  })
);
