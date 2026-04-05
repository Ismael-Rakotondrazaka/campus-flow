import { defineQueryOptions } from '@pinia/colada';

import type { LodgmentFilters } from './lodgment.model';

import {
  getLodgment,
  getLodgments,
  getLodgmentsCount,
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
