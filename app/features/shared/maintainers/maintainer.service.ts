import type {
  CreateMaintainer,
  MaintainerQuery,
  UpdateMaintainer,
} from '#shared/features/maintainers';
import type { H3Event$Fetch } from 'nitropack/types';

export const getMaintainers = async (
  filters: MaintainerQuery,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  return fetchFn('/api/maintainers', {
    query: filters,
  });
};

export const getMaintainersCount = async (
  filters: Omit<MaintainerQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'>,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { count } = await fetchFn('/api/maintainers/count', {
    query: filters,
  });
  return count;
};

export const getMaintainer = async (
  maintainerId: string,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn(
    `/api/maintainers/${maintainerId}` as '/api/maintainers/${maintainerId}'
  );
  return data;
};

export const createMaintainer = async (
  input: CreateMaintainer,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn('/api/maintainers', {
    body: input,
    method: 'POST',
  });
  return data;
};

export const updateMaintainer = async (
  maintainerId: string,
  input: UpdateMaintainer,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn(
    `/api/maintainers/${maintainerId}` as '/api/maintainers/${maintainerId}',
    {
      body: input,
      method: 'PUT',
    }
  );
  return data;
};

export const deleteMaintainer = async (
  maintainerId: string,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  await fetchFn(
    `/api/maintainers/${maintainerId}` as '/api/maintainers/${maintainerId}',
    {
      method: 'DELETE',
    }
  );
};
