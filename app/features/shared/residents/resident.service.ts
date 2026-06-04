import type { ResidentQuery, UpdateResident } from '#shared/features/residents';
import type { H3Event$Fetch } from 'nitropack/types';

export const getResidents = async (
  filters: ResidentQuery,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  return fetchFn('/api/residents', {
    query: filters,
  });
};

export const getResidentsCount = async (
  filters: Omit<ResidentQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'>,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { count } = await fetchFn('/api/residents/count', {
    query: filters,
  });
  return count;
};

export const getResident = async (
  residentId: string,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn(
    `/api/residents/${residentId}` as '/api/residents/${residentId}'
  );
  return data;
};

export const updateResident = async (
  residentId: string,
  input: UpdateResident,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn(
    `/api/residents/${residentId}` as '/api/residents/${residentId}',
    {
      body: input,
      method: 'PUT',
    }
  );
  return data;
};

export const deleteResident = async (
  residentId: string,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  await fetchFn(
    `/api/residents/${residentId}` as '/api/residents/${residentId}',
    {
      method: 'DELETE',
    }
  );
};
