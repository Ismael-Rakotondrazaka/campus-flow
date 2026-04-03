import { defineQueryOptions } from '@pinia/colada';

import type { ResidentFilters } from './resident.model';

import { getResident, getResidents } from './resident.service';

export const RESIDENT_QUERY_KEYS = {
  byUserId: (userId: string) => [...RESIDENT_QUERY_KEYS.root, userId] as const,

  list: (filters: ResidentFilters = {}) =>
    [...RESIDENT_QUERY_KEYS.root, 'list', filters] as const,

  root: ['residents'] as const,
};

export const residentListQuery = defineQueryOptions(
  (filters: ResidentFilters = {}) => ({
    key: RESIDENT_QUERY_KEYS.list(filters),
    query: () => getResidents(filters),
  })
);

export const residentByUserIdQuery = defineQueryOptions(
  ({ userId }: { userId: string }) => ({
    key: RESIDENT_QUERY_KEYS.byUserId(userId),
    query: () => getResident(userId),
  })
);
