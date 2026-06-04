import type { AdminQuery, UpdateAdmin } from '#shared/features/admins';

import {
  defineMutation,
  defineQueryOptions,
  useQueryCache,
} from '@pinia/colada';

import {
  deleteAdmin,
  getAdmin,
  getAdmins,
  getAdminsCount,
  updateAdmin,
} from './admin.service';

export const ADMIN_QUERY_KEYS = {
  byId: (id: string) => [...ADMIN_QUERY_KEYS.root, id] as const,

  count: (
    filters: Omit<AdminQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'> = {}
  ) => [...ADMIN_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: AdminQuery = {}) =>
    [...ADMIN_QUERY_KEYS.root, 'list', filters] as const,

  root: ['admins'] as const,
};

export const adminListQuery = defineQueryOptions((filters: AdminQuery = {}) => {
  const fetchFn = useRequestFetch();
  return {
    key: ADMIN_QUERY_KEYS.list(filters),
    placeholderData: previousData => previousData,
    query: () => getAdmins(filters, fetchFn),
  };
});

export const adminByIdQuery = defineQueryOptions(({ id }: { id: string }) => {
  const fetchFn = useRequestFetch();
  return {
    key: ADMIN_QUERY_KEYS.byId(id),
    query: () => getAdmin(id, fetchFn),
  };
});

export const adminCountQuery = defineQueryOptions(
  (
    filters: Omit<AdminQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'> = {}
  ) => {
    const fetchFn = useRequestFetch();
    return {
      key: ADMIN_QUERY_KEYS.count(filters),
      query: () => getAdminsCount(filters, fetchFn),
    };
  }
);

export const useUpdateAdmin = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: ({ id, updates }: { id: string; updates: UpdateAdmin }) =>
      updateAdmin(id, updates),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: ADMIN_QUERY_KEYS.root });
    },
  };
});

export const useDeleteAdmin = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: (id: string) => deleteAdmin(id),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: ADMIN_QUERY_KEYS.root });
    },
  };
});
