import {
  defineMutation,
  defineQueryOptions,
  useQueryCache,
} from '@pinia/colada';

import type { AdminFilters, AdminInsert, AdminUpdate } from './admin.model';

import {
  createAdmin,
  getAdmin,
  getAdmins,
  getAdminsCount,
  updateAdmin,
} from './admin.service';

export const ADMIN_QUERY_KEYS = {
  byId: (id: string) => [...ADMIN_QUERY_KEYS.root, id] as const,

  count: (filters: Omit<AdminFilters, 'limit' | 'page'> = {}) =>
    [...ADMIN_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: AdminFilters = {}) =>
    [...ADMIN_QUERY_KEYS.root, 'list', filters] as const,

  root: ['admins'] as const,
};

export const adminListQuery = defineQueryOptions(
  (filters: AdminFilters = {}) => ({
    key: ADMIN_QUERY_KEYS.list(filters),
    placeholderData: previousData => previousData,
    query: () => getAdmins(filters),
  })
);

export const adminByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => ({
    key: ADMIN_QUERY_KEYS.byId(id),
    query: () => getAdmin(id),
  })
);

export const adminCountQuery = defineQueryOptions(
  (filters: Omit<AdminFilters, 'limit' | 'page'> = {}) => ({
    key: ADMIN_QUERY_KEYS.count(filters),
    query: () => getAdminsCount(filters),
  })
);

export const useCreateAdmin = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: (admin: AdminInsert) => createAdmin(admin),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: ADMIN_QUERY_KEYS.root });
    },
  };
});

export const useUpdateAdmin = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: ({ id, updates }: { id: string; updates: AdminUpdate }) =>
      updateAdmin(id, updates),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: ADMIN_QUERY_KEYS.root });
    },
  };
});
