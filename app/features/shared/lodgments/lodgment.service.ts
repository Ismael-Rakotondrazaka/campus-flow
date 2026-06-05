import type { LodgmentQuery } from '#shared/features/lodgments';
import type { H3Event$Fetch } from 'nitropack/types';

export const getLodgments = async (
  filters: LodgmentQuery,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  return fetchFn('/api/lodgments', {
    query: filters,
  });
};

export const getLodgmentsCount = async (
  filters: Omit<LodgmentQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'>,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { count } = await fetchFn('/api/lodgments/count', {
    query: filters,
  });
  return count;
};

export const getLodgment = async (
  lodgmentId: string,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn(
    `/api/lodgments/${lodgmentId}` as '/api/lodgments/${lodgmentId}'
  );
  return data;
};
