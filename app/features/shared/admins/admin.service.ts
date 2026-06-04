import type { AdminQuery, UpdateAdmin } from '#shared/features/admins';
import type { H3Event$Fetch } from 'nitropack/types';

export const getAdmins = async (
  filters: AdminQuery,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  return fetchFn('/api/admins', { query: filters });
};

export const getAdminsCount = async (
  filters: Omit<AdminQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'>,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { count } = await fetchFn('/api/admins/count', {
    query: filters,
  });
  return count;
};

export const getAdmin = async (
  adminId: string,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn(
    `/api/admins/${adminId}` as '/api/admins/${adminId}'
  );
  return data;
};

export const updateAdmin = async (
  adminId: string,
  input: UpdateAdmin,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn(
    `/api/admins/${adminId}` as '/api/admins/${adminId}',
    {
      body: input,
      method: 'PUT',
    }
  );
  return data;
};

export const deleteAdmin = async (
  adminId: string,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  await fetchFn(`/api/admins/${adminId}` as '/api/admins/${adminId}', {
    method: 'DELETE',
  });
};
