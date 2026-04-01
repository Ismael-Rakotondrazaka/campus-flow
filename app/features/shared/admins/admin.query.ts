import { defineQueryOptions } from '@pinia/colada';

import type { AdminFilters } from './admin.model';

import { getAdmin, getAdmins } from './admin.service';

export const ADMIN_QUERY_KEYS = {
  byUserId: (userId: string) => [...ADMIN_QUERY_KEYS.root, userId] as const,

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
