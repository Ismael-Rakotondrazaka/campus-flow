import { defineQueryOptions } from '@pinia/colada';

import type { MaintainerFilters } from './maintainer.model';

import { getMaintainer, getMaintainers } from './maintainer.service';

export const MAINTAINER_QUERY_KEYS = {
  byId: (id: string) => [...MAINTAINER_QUERY_KEYS.root, id] as const,

  list: (filters: MaintainerFilters = {}) =>
    [...MAINTAINER_QUERY_KEYS.root, 'list', filters] as const,

  root: ['maintainers'] as const,
};

export const maintainerListQuery = defineQueryOptions(
  (filters: MaintainerFilters = {}) => ({
    key: MAINTAINER_QUERY_KEYS.list(filters),
    query: () => getMaintainers(filters),
  })
);

export const maintainerByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => ({
    key: MAINTAINER_QUERY_KEYS.byId(id),
    query: () => getMaintainer(id),
  })
);
