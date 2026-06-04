import type {
  CreateMaintainer,
  MaintainerQuery,
  UpdateMaintainer,
} from '#shared/features/maintainers';

import {
  defineMutation,
  defineQueryOptions,
  useQueryCache,
} from '@pinia/colada';

import {
  createMaintainer,
  deleteMaintainer,
  getMaintainer,
  getMaintainers,
  getMaintainersCount,
  updateMaintainer,
} from './maintainer.service';

export const MAINTAINER_QUERY_KEYS = {
  byId: (id: string) => [...MAINTAINER_QUERY_KEYS.root, id] as const,

  count: (
    filters: Omit<
      MaintainerQuery,
      'limit' | 'orderBy' | 'page' | 'sortOrder'
    > = {}
  ) => [...MAINTAINER_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: MaintainerQuery = {}) =>
    [...MAINTAINER_QUERY_KEYS.root, 'list', filters] as const,

  root: ['maintainers'] as const,
};

export const maintainerListQuery = defineQueryOptions(
  (filters: MaintainerQuery = {}) => {
    const fetchFn = useRequestFetch();
    return {
      key: MAINTAINER_QUERY_KEYS.list(filters),
      placeholderData: previousData => previousData,
      query: () => getMaintainers(filters, fetchFn),
    };
  }
);

export const maintainerByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => {
    const fetchFn = useRequestFetch();
    return {
      key: MAINTAINER_QUERY_KEYS.byId(id),
      query: () => getMaintainer(id, fetchFn),
    };
  }
);

export const maintainerCountQuery = defineQueryOptions(
  (
    filters: Omit<
      MaintainerQuery,
      'limit' | 'orderBy' | 'page' | 'sortOrder'
    > = {}
  ) => {
    const fetchFn = useRequestFetch();
    return {
      key: MAINTAINER_QUERY_KEYS.count(filters),
      query: () => getMaintainersCount(filters, fetchFn),
    };
  }
);

export const useCreateMaintainer = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: (maintainer: CreateMaintainer) => createMaintainer(maintainer),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: MAINTAINER_QUERY_KEYS.root });
    },
  };
});

export const useUpdateMaintainer = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: ({ id, updates }: { id: string; updates: UpdateMaintainer }) =>
      updateMaintainer(id, updates),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: MAINTAINER_QUERY_KEYS.root });
    },
  };
});

export const useDeleteMaintainer = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: (id: string) => deleteMaintainer(id),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: MAINTAINER_QUERY_KEYS.root });
    },
  };
});
