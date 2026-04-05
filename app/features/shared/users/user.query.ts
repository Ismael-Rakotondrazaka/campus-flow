import { defineQueryOptions } from '@pinia/colada';

import type { UserFilters } from './user.model';

import { getUser, getUsers, getUsersCount } from './user.service';

export const USER_QUERY_KEYS = {
  byId: (id: string) => [...USER_QUERY_KEYS.root, id] as const,

  count: (filters: Omit<UserFilters, 'limit' | 'page'> = {}) =>
    [...USER_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: UserFilters = {}) =>
    [...USER_QUERY_KEYS.root, 'list', filters] as const,

  root: ['users'] as const,
};

export const userListQuery = defineQueryOptions(
  (filters: UserFilters = {}) => ({
    key: USER_QUERY_KEYS.list(filters),
    placeholderData: previousData => previousData,
    query: () => getUsers(filters),
  })
);

export const userByIdQuery = defineQueryOptions(({ id }: { id: string }) => ({
  key: USER_QUERY_KEYS.byId(id),
  query: () => getUser(id),
}));

export const userCountQuery = defineQueryOptions(
  (filters: Omit<UserFilters, 'limit' | 'page'> = {}) => ({
    key: USER_QUERY_KEYS.count(filters),
    query: () => getUsersCount(filters),
  })
);
