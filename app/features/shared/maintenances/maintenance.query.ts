import { defineQueryOptions } from '@pinia/colada';

import type { MaintenanceFilters } from './maintenance.model';

import {
  getMaintenance,
  getMaintenances,
  getMaintenancesCount,
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
