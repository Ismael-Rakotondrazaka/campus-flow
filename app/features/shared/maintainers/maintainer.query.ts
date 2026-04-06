import {
  defineMutation,
  defineQueryOptions,
  useQueryCache,
} from '@pinia/colada';

import type {
  MaintainerFilters,
  MaintainerInsert,
  MaintainerUpdate,
} from './maintainer.model';

import {
  createMaintainer,
  getMaintainer,
  getMaintainers,
  getMaintainersCount,
  updateMaintainer,
} from './maintainer.service';

export const MAINTAINER_QUERY_KEYS = {
  byId: (id: string) => [...MAINTAINER_QUERY_KEYS.root, id] as const,

  count: (filters: Omit<MaintainerFilters, 'limit' | 'page'> = {}) =>
    [...MAINTAINER_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: MaintainerFilters = {}) =>
    [...MAINTAINER_QUERY_KEYS.root, 'list', filters] as const,

  root: ['maintainers'] as const,
};

export const maintainerListQuery = defineQueryOptions(
  (filters: MaintainerFilters = {}) => ({
    key: MAINTAINER_QUERY_KEYS.list(filters),
    placeholderData: previousData => previousData,
    query: () => getMaintainers(filters),
  })
);

export const maintainerByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => ({
    key: MAINTAINER_QUERY_KEYS.byId(id),
    query: () => getMaintainer(id),
  })
);

export const maintainerCountQuery = defineQueryOptions(
  (filters: Omit<MaintainerFilters, 'limit' | 'page'> = {}) => ({
    key: MAINTAINER_QUERY_KEYS.count(filters),
    query: () => getMaintainersCount(filters),
  })
);

export const useCreateMaintainer = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: (maintainer: MaintainerInsert) => createMaintainer(maintainer),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: MAINTAINER_QUERY_KEYS.root });
    },
  };
});

export const useUpdateMaintainer = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: ({ id, updates }: { id: string; updates: MaintainerUpdate }) =>
      updateMaintainer(id, updates),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: MAINTAINER_QUERY_KEYS.root });
    },
  };
});
