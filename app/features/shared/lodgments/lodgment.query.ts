import type { LodgmentQuery } from '#shared/features/lodgments';

import { defineQueryOptions } from '@pinia/colada';
import { useRequestFetch } from '#app';

import {
  getLodgment,
  getLodgments,
  getLodgmentsCount,
} from './lodgment.service';

export const LODGMENT_QUERY_KEYS = {
  byId: (id: string) => [...LODGMENT_QUERY_KEYS.root, id] as const,

  count: (
    filters: Omit<
      LodgmentQuery,
      'limit' | 'orderBy' | 'page' | 'sortOrder'
    > = {}
  ) => [...LODGMENT_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: LodgmentQuery = {}) =>
    [...LODGMENT_QUERY_KEYS.root, 'list', filters] as const,

  root: ['lodgments'] as const,
};

export const lodgmentListQuery = defineQueryOptions(
  (filters: LodgmentQuery = {}) => {
    const fetchFn = useRequestFetch();
    return {
      key: LODGMENT_QUERY_KEYS.list(filters),
      placeholderData: previousData => previousData,
      query: () => getLodgments(filters, fetchFn),
    };
  }
);

export const lodgmentByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => {
    const fetchFn = useRequestFetch();
    return {
      key: LODGMENT_QUERY_KEYS.byId(id),
      query: () => getLodgment(id, fetchFn),
    };
  }
);

export const lodgmentCountQuery = defineQueryOptions(
  (
    filters: Omit<
      LodgmentQuery,
      'limit' | 'orderBy' | 'page' | 'sortOrder'
    > = {}
  ) => {
    const fetchFn = useRequestFetch();
    return {
      key: LODGMENT_QUERY_KEYS.count(filters),
      query: () => getLodgmentsCount(filters, fetchFn),
    };
  }
);
