import {
  defineMutation,
  defineQueryOptions,
  useQueryCache,
} from '@pinia/colada';

import type {
  BuildingFilters,
  BuildingInsert,
  BuildingUpdate,
} from './building.model';

import {
  createBuilding,
  deleteBuilding,
  getBuilding,
  getBuildings,
  getBuildingsCount,
  updateBuilding,
} from './building.service';

/**
 * All building queries share a single root key `['buildings']`.
 * Pinia Colada uses prefix matching for cache invalidation, so calling
 * `invalidateQueries({ key: BUILDING_QUERY_KEYS.root })` invalidates both
 * list and item queries in one call — useful after any create/update/delete.
 * For surgical invalidation (e.g. after an update), use the specific key:
 * `invalidateQueries({ key: BUILDING_QUERY_KEYS.byId(id) })`.
 */
export const BUILDING_QUERY_KEYS = {
  byId: (id: string) => [...BUILDING_QUERY_KEYS.root, id] as const,

  count: (filters: Omit<BuildingFilters, 'limit' | 'page'> = {}) =>
    [...BUILDING_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: BuildingFilters = {}) =>
    [...BUILDING_QUERY_KEYS.root, 'list', filters] as const,

  root: ['buildings'] as const,
};

/**
 * Usage in a component:
 *
 *   const filters = ref<BuildingFilters>({ page: 1 })
 *   const { data } = useQuery(() => buildingListQuery(filters.value))
 */
export const buildingListQuery = defineQueryOptions(
  (filters: BuildingFilters = {}) => ({
    key: BUILDING_QUERY_KEYS.list(filters),
    placeholderData: previousData => previousData,
    query: () => getBuildings(filters),
  })
);

/**
 * Usage in a component:
 *
 *   const route = useRoute()
 *   const { data } = useQuery(() =>
 *     buildingByIdQuery({ id: route.params.id as string }),
 *   )
 */
export const buildingByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => ({
    key: BUILDING_QUERY_KEYS.byId(id),
    query: () => getBuilding(id),
  })
);

export const buildingCountQuery = defineQueryOptions(
  (filters: Omit<BuildingFilters, 'limit' | 'page'> = {}) => ({
    key: BUILDING_QUERY_KEYS.count(filters),
    query: () => getBuildingsCount(filters),
  })
);

export const useCreateBuilding = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: (building: BuildingInsert) => createBuilding(building),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: BUILDING_QUERY_KEYS.root });
    },
  };
});

export const useUpdateBuilding = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: ({ id, updates }: { id: string; updates: BuildingUpdate }) =>
      updateBuilding(id, updates),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: BUILDING_QUERY_KEYS.root });
    },
  };
});

export const useDeleteBuilding = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: (id: string) => deleteBuilding(id),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: BUILDING_QUERY_KEYS.root });
    },
  };
});
