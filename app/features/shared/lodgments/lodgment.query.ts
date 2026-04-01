import { defineQueryOptions } from '@pinia/colada';

import type { LodgmentFilters } from './lodgment.model';

import { getLodgment, getLodgments } from './lodgment.service';

export const LODGMENT_QUERY_KEYS = {
  byId: (id: string) => [...LODGMENT_QUERY_KEYS.root, id] as const,

  list: (filters: LodgmentFilters = {}) =>
    [...LODGMENT_QUERY_KEYS.root, 'list', filters] as const,

  root: ['lodgments'] as const,
};

export const lodgmentListQuery = defineQueryOptions(
  (filters: LodgmentFilters = {}) => ({
    key: LODGMENT_QUERY_KEYS.list(filters),
    query: () => getLodgments(filters),
  })
);

export const lodgmentByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => ({
    key: LODGMENT_QUERY_KEYS.byId(id),
    query: () => getLodgment(id),
  })
);
