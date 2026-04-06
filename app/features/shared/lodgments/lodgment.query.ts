import {
  defineMutation,
  defineQueryOptions,
  useQueryCache,
} from '@pinia/colada';

import type {
  LodgmentFilters,
  LodgmentInsert,
  LodgmentUpdate,
} from './lodgment.model';

import {
  createLodgment,
  getLodgment,
  getLodgments,
  getLodgmentsCount,
  updateLodgment,
} from './lodgment.service';

export const LODGMENT_QUERY_KEYS = {
  byId: (id: string) => [...LODGMENT_QUERY_KEYS.root, id] as const,

  count: (filters: Omit<LodgmentFilters, 'limit' | 'page'> = {}) =>
    [...LODGMENT_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: LodgmentFilters = {}) =>
    [...LODGMENT_QUERY_KEYS.root, 'list', filters] as const,

  root: ['lodgments'] as const,
};

export const lodgmentListQuery = defineQueryOptions(
  (filters: LodgmentFilters = {}) => ({
    key: LODGMENT_QUERY_KEYS.list(filters),
    placeholderData: previousData => previousData,
    query: () => getLodgments(filters),
  })
);

export const lodgmentByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => ({
    key: LODGMENT_QUERY_KEYS.byId(id),
    query: () => getLodgment(id),
  })
);

export const lodgmentCountQuery = defineQueryOptions(
  (filters: Omit<LodgmentFilters, 'limit' | 'page'> = {}) => ({
    key: LODGMENT_QUERY_KEYS.count(filters),
    query: () => getLodgmentsCount(filters),
  })
);

export const useCreateLodgment = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: (lodgment: LodgmentInsert) => createLodgment(lodgment),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: LODGMENT_QUERY_KEYS.root });
    },
  };
});

export const useUpdateLodgment = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: ({ id, updates }: { id: string; updates: LodgmentUpdate }) =>
      updateLodgment(id, updates),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: LODGMENT_QUERY_KEYS.root });
    },
  };
});
