import {
  defineMutation,
  defineQueryOptions,
  useQueryCache,
} from '@pinia/colada';

import type {
  ResidentFilters,
  ResidentInsert,
  ResidentUpdate,
} from './resident.model';

import {
  createResident,
  getResident,
  getResidents,
  getResidentsCount,
  updateResident,
} from './resident.service';

export const RESIDENT_QUERY_KEYS = {
  byId: (id: string) => [...RESIDENT_QUERY_KEYS.root, id] as const,

  count: (filters: Omit<ResidentFilters, 'limit' | 'page'> = {}) =>
    [...RESIDENT_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: ResidentFilters = {}) =>
    [...RESIDENT_QUERY_KEYS.root, 'list', filters] as const,

  root: ['residents'] as const,
};

export const residentListQuery = defineQueryOptions(
  (filters: ResidentFilters = {}) => ({
    key: RESIDENT_QUERY_KEYS.list(filters),
    placeholderData: previousData => previousData,
    query: () => getResidents(filters),
  })
);

export const residentByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => ({
    key: RESIDENT_QUERY_KEYS.byId(id),
    query: () => getResident(id),
  })
);

export const residentCountQuery = defineQueryOptions(
  (filters: Omit<ResidentFilters, 'limit' | 'page'> = {}) => ({
    key: RESIDENT_QUERY_KEYS.count(filters),
    query: () => getResidentsCount(filters),
  })
);

export const useCreateResident = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: (resident: ResidentInsert) => createResident(resident),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: RESIDENT_QUERY_KEYS.root });
    },
  };
});

export const useUpdateResident = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: ({ id, updates }: { id: string; updates: ResidentUpdate }) =>
      updateResident(id, updates),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: RESIDENT_QUERY_KEYS.root });
    },
  };
});
