import {
  defineMutation,
  defineQueryOptions,
  useQueryCache,
} from '@pinia/colada';

import type {
  MaintenanceFilters,
  MaintenanceInsert,
  MaintenanceUpdate,
} from './maintenance.model';

import {
  createMaintenance,
  getMaintenance,
  getMaintenances,
  getMaintenancesCount,
  updateMaintenance,
} from './maintenance.service';

export const MAINTENANCE_QUERY_KEYS = {
  byId: (id: string) => [...MAINTENANCE_QUERY_KEYS.root, id] as const,

  count: (filters: Omit<MaintenanceFilters, 'limit' | 'page'> = {}) =>
    [...MAINTENANCE_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: MaintenanceFilters = {}) =>
    [...MAINTENANCE_QUERY_KEYS.root, 'list', filters] as const,

  root: ['maintenances'] as const,
};

export const maintenanceListQuery = defineQueryOptions(
  (filters: MaintenanceFilters = {}) => ({
    key: MAINTENANCE_QUERY_KEYS.list(filters),
    placeholderData: previousData => previousData,
    query: () => getMaintenances(filters),
  })
);

export const maintenanceByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => ({
    key: MAINTENANCE_QUERY_KEYS.byId(id),
    query: () => getMaintenance(id),
  })
);

export const maintenanceCountQuery = defineQueryOptions(
  (filters: Omit<MaintenanceFilters, 'limit' | 'page'> = {}) => ({
    key: MAINTENANCE_QUERY_KEYS.count(filters),
    query: () => getMaintenancesCount(filters),
  })
);

export const useCreateMaintenance = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: (maintenance: MaintenanceInsert) =>
      createMaintenance(maintenance),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: MAINTENANCE_QUERY_KEYS.root });
    },
  };
});

export const useUpdateMaintenance = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: ({ id, updates }: { id: string; updates: MaintenanceUpdate }) =>
      updateMaintenance(id, updates),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: MAINTENANCE_QUERY_KEYS.root });
    },
  };
});
