import type {
  CreateMaintenance,
  MaintenanceQuery,
  UpdateMaintenance,
} from '#shared/features/maintenances';

import {
  defineMutation,
  defineQueryOptions,
  useQueryCache,
} from '@pinia/colada';

import {
  assignMaintainer,
  createMaintenance,
  getMaintenance,
  getMaintenances,
  getMaintenancesCount,
  unassignMaintainer,
  updateMaintenance,
} from './maintenance.service';

export const MAINTENANCE_QUERY_KEYS = {
  byId: (id: string) => [...MAINTENANCE_QUERY_KEYS.root, id] as const,

  count: (
    filters: Omit<
      MaintenanceQuery,
      'limit' | 'orderBy' | 'page' | 'sortOrder'
    > = {}
  ) => [...MAINTENANCE_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: MaintenanceQuery = {}) =>
    [...MAINTENANCE_QUERY_KEYS.root, 'list', filters] as const,

  root: ['maintenances'] as const,
};

export const maintenanceListQuery = defineQueryOptions(
  (filters: MaintenanceQuery = {}) => {
    const fetchFn = useRequestFetch();
    return {
      key: MAINTENANCE_QUERY_KEYS.list(filters),
      placeholderData: previousData => previousData,
      query: () => getMaintenances(filters, fetchFn),
    };
  }
);

export const maintenanceByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => {
    const fetchFn = useRequestFetch();
    return {
      key: MAINTENANCE_QUERY_KEYS.byId(id),
      query: () => getMaintenance(id, fetchFn),
    };
  }
);

export const maintenanceCountQuery = defineQueryOptions(
  (
    filters: Omit<
      MaintenanceQuery,
      'limit' | 'orderBy' | 'page' | 'sortOrder'
    > = {}
  ) => {
    const fetchFn = useRequestFetch();
    return {
      key: MAINTENANCE_QUERY_KEYS.count(filters),
      query: () => getMaintenancesCount(filters, fetchFn),
    };
  }
);

export const useCreateMaintenance = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: (maintenance: CreateMaintenance) =>
      createMaintenance(maintenance),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: MAINTENANCE_QUERY_KEYS.root });
    },
  };
});

export const useUpdateMaintenance = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: ({ id, updates }: { id: string; updates: UpdateMaintenance }) =>
      updateMaintenance(id, updates),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: MAINTENANCE_QUERY_KEYS.root });
    },
  };
});

export const useAssignMaintainer = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: ({
      maintainerId,
      maintenanceId,
    }: {
      maintainerId: string;
      maintenanceId: string;
    }) => assignMaintainer(maintenanceId, maintainerId),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: MAINTENANCE_QUERY_KEYS.root });
    },
  };
});

export const useUnassignMaintainer = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: ({
      maintainerId,
      maintenanceId,
    }: {
      maintainerId: string;
      maintenanceId: string;
    }) => unassignMaintainer(maintenanceId, maintainerId),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: MAINTENANCE_QUERY_KEYS.root });
    },
  };
});
