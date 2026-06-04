import type {
  CreateRenewal,
  RenewalQuery,
  UpdateRenewal,
} from '#shared/features/renewals';

import {
  defineMutation,
  defineQueryOptions,
  useQueryCache,
} from '@pinia/colada';

import {
  createRenewal,
  getRenewal,
  getRenewals,
  getRenewalsCount,
  updateRenewal,
} from './renewal.service';

export const RENEWAL_QUERY_KEYS = {
  byId: (id: string) => [...RENEWAL_QUERY_KEYS.root, id] as const,

  count: (
    filters: Omit<RenewalQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'> = {}
  ) => [...RENEWAL_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: RenewalQuery = {}) =>
    [...RENEWAL_QUERY_KEYS.root, 'list', filters] as const,

  root: ['renewals'] as const,
};

export const renewalListQuery = defineQueryOptions(
  (filters: RenewalQuery = {}) => {
    const fetchFn = useRequestFetch();
    return {
      key: RENEWAL_QUERY_KEYS.list(filters),
      placeholderData: previousData => previousData,
      query: () => getRenewals(filters, fetchFn),
    };
  }
);

export const renewalByIdQuery = defineQueryOptions(({ id }: { id: string }) => {
  const fetchFn = useRequestFetch();
  return {
    key: RENEWAL_QUERY_KEYS.byId(id),
    query: () => getRenewal(id, fetchFn),
  };
});

export const renewalCountQuery = defineQueryOptions(
  (
    filters: Omit<RenewalQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'> = {}
  ) => {
    const fetchFn = useRequestFetch();
    return {
      key: RENEWAL_QUERY_KEYS.count(filters),
      query: () => getRenewalsCount(filters, fetchFn),
    };
  }
);

export const useCreateRenewal = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: (renewal: CreateRenewal) => createRenewal(renewal),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: RENEWAL_QUERY_KEYS.root });
    },
  };
});

export const useUpdateRenewal = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: ({ id, updates }: { id: string; updates: UpdateRenewal }) =>
      updateRenewal(id, updates),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: RENEWAL_QUERY_KEYS.root });
    },
  };
});
