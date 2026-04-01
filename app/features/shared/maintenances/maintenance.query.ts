import { defineQueryOptions } from '@pinia/colada';

import type { MaintenanceFilters } from './maintenance.model';

import { getMaintenance, getMaintenances } from './maintenance.service';

export const MAINTENANCE_QUERY_KEYS = {
  byId: (id: string) => [...MAINTENANCE_QUERY_KEYS.root, id] as const,

  list: (filters: MaintenanceFilters = {}) =>
    [...MAINTENANCE_QUERY_KEYS.root, 'list', filters] as const,

  root: ['maintenances'] as const,
};

export const maintenanceListQuery = defineQueryOptions(
  (filters: MaintenanceFilters = {}) => ({
    key: MAINTENANCE_QUERY_KEYS.list(filters),
    query: () => getMaintenances(filters),
  })
);

export const maintenanceByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => ({
    key: MAINTENANCE_QUERY_KEYS.byId(id),
    query: () => getMaintenance(id),
  })
);
