import type { ResidentQuery, UpdateResident } from '#shared/features/residents';

import {
  defineMutation,
  defineQueryOptions,
  useQueryCache,
} from '@pinia/colada';

import {
  getResident,
  getResidents,
  getResidentsCount,
  updateResident,
} from './resident.service';

export const RESIDENT_QUERY_KEYS = {
  byId: (id: string) => [...RESIDENT_QUERY_KEYS.root, id] as const,

  count: (
    filters: Omit<
      ResidentQuery,
      'limit' | 'orderBy' | 'page' | 'sortOrder'
    > = {}
  ) => [...RESIDENT_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: ResidentQuery = {}) =>
    [...RESIDENT_QUERY_KEYS.root, 'list', filters] as const,

  root: ['residents'] as const,
};

export const residentListQuery = defineQueryOptions(
  (filters: ResidentQuery = {}) => {
    const fetchFn = useRequestFetch();
    return {
      key: RESIDENT_QUERY_KEYS.list(filters),
      placeholderData: previousData => previousData,
      query: () => getResidents(filters, fetchFn),
    };
  }
);

export const residentByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => {
    const fetchFn = useRequestFetch();
    return {
      key: RESIDENT_QUERY_KEYS.byId(id),
      query: () => getResident(id, fetchFn),
    };
  }
);

export const residentCountQuery = defineQueryOptions(
  (
    filters: Omit<
      ResidentQuery,
      'limit' | 'orderBy' | 'page' | 'sortOrder'
    > = {}
  ) => {
    const fetchFn = useRequestFetch();
    return {
      key: RESIDENT_QUERY_KEYS.count(filters),
      query: () => getResidentsCount(filters, fetchFn),
    };
  }
);

export const useUpdateResident = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: ({ id, updates }: { id: string; updates: UpdateResident }) =>
      updateResident(id, updates),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: RESIDENT_QUERY_KEYS.root });
    },
  };
});
