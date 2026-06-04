import type {
  CreateMaintenance,
  MaintenanceQuery,
  UpdateMaintenance,
} from '#shared/features/maintenances';
import type { H3Event$Fetch } from 'nitropack/types';

export const getMaintenances = async (
  filters: MaintenanceQuery,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  return fetchFn('/api/maintenances', {
    query: filters,
  });
};

export const getMaintenancesCount = async (
  filters: Omit<MaintenanceQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'>,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { count } = await fetchFn('/api/maintenances/count', {
    query: filters,
  });
  return count;
};

export const getMaintenance = async (
  maintenanceId: string,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn(
    `/api/maintenances/${maintenanceId}` as '/api/maintenances/${maintenanceId}'
  );
  return data;
};

export const createMaintenance = async (
  input: CreateMaintenance,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn('/api/maintenances', {
    body: input,
    method: 'POST',
  });
  return data;
};

export const updateMaintenance = async (
  maintenanceId: string,
  input: UpdateMaintenance,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn(
    `/api/maintenances/${maintenanceId}` as '/api/maintenances/${maintenanceId}',
    {
      body: input,
      method: 'PUT',
    }
  );
  return data;
};

export const deleteMaintenance = async (
  maintenanceId: string,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  await fetchFn(
    `/api/maintenances/${maintenanceId}` as '/api/maintenances/${maintenanceId}',
    {
      method: 'DELETE',
    }
  );
};

export const assignMaintainer = async (
  maintenanceId: string,
  maintainerId: string,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  await fetchFn(
    `/api/maintenances/${maintenanceId}/maintainers` as '/api/maintenances/${maintenanceId}/maintainers',
    {
      body: { maintainerId },
      method: 'POST',
    }
  );
};

export const unassignMaintainer = async (
  maintenanceId: string,
  maintainerId: string,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  await fetchFn(
    `/api/maintenances/${maintenanceId}/maintainers/${maintainerId}` as '/api/maintenances/${maintenanceId}/maintainers/${maintainerId}',
    { method: 'DELETE' }
  );
};
