import { defineQueryOptions } from '@pinia/colada';

import type { MaintainerFilters } from './maintainer.model';

import {
  getMaintainer,
  getMaintainers,
  getMaintainersCount,
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
