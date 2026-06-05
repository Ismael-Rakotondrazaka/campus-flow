import type { BuildingQuery } from '#shared/features/buildings';

import { defineQueryOptions } from '@pinia/colada';

import {
  getBuilding,
  getBuildings,
  getBuildingsCount,
} from './building.service';

export const BUILDING_QUERY_KEYS = {
  byId: (id: string) => [...BUILDING_QUERY_KEYS.root, id] as const,

  count: (
    filters: Omit<
      BuildingQuery,
      'limit' | 'orderBy' | 'page' | 'sortOrder'
    > = {}
  ) => [...BUILDING_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: BuildingQuery = {}) =>
    [...BUILDING_QUERY_KEYS.root, 'list', filters] as const,

  root: ['buildings'] as const,
};

export const buildingListQuery = defineQueryOptions(
  (filters: BuildingQuery = {}) => {
    const fetchFn = useRequestFetch();
    return {
      key: BUILDING_QUERY_KEYS.list(filters),
      placeholderData: previousData => previousData,
      query: () => getBuildings(filters, fetchFn),
    };
  }
);

export const buildingByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => {
    const fetchFn = useRequestFetch();
    return {
      key: BUILDING_QUERY_KEYS.byId(id),
      query: () => getBuilding(id, fetchFn),
    };
  }
);

export const buildingCountQuery = defineQueryOptions(
  (
    filters: Omit<
      BuildingQuery,
      'limit' | 'orderBy' | 'page' | 'sortOrder'
    > = {}
  ) => {
    const fetchFn = useRequestFetch();
    return {
      key: BUILDING_QUERY_KEYS.count(filters),
      query: () => getBuildingsCount(filters, fetchFn),
    };
  }
);
