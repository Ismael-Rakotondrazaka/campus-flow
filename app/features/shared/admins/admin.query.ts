import { defineQueryOptions } from '@pinia/colada';

import type { AdminFilters } from './admin.model';

import { getAdmin, getAdmins, getAdminsCount } from './admin.service';

export const ADMIN_QUERY_KEYS = {
  byUserId: (userId: string) => [...ADMIN_QUERY_KEYS.root, userId] as const,

  count: (filters: Omit<AdminFilters, 'limit' | 'page'> = {}) =>
    [...ADMIN_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: AdminFilters = {}) =>
    [...ADMIN_QUERY_KEYS.root, 'list', filters] as const,

  root: ['admins'] as const,
};

export const adminListQuery = defineQueryOptions(
  (filters: AdminFilters = {}) => ({
    key: ADMIN_QUERY_KEYS.list(filters),
    query: () => getAdmins(filters),
  })
);

export const adminByUserIdQuery = defineQueryOptions(
  ({ userId }: { userId: string }) => ({
    key: ADMIN_QUERY_KEYS.byUserId(userId),
    query: () => getAdmin(userId),
  })
);

export const adminCountQuery = defineQueryOptions(
  (filters: Omit<AdminFilters, 'limit' | 'page'> = {}) => ({
    key: ADMIN_QUERY_KEYS.count(filters),
    query: () => getAdminsCount(filters),
  })
);
