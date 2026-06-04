import type { BuildingQuery } from '#shared/features/buildings';
import type { H3Event$Fetch } from 'nitropack/types';

export const getBuildings = async (
  filters: BuildingQuery,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  return fetchFn('/api/buildings', {
    query: filters,
  });
};

export const getBuildingsCount = async (
  filters: Omit<BuildingQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'>,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { count } = await fetchFn('/api/buildings/count', {
    query: filters,
  });
  return count;
};

export const getBuilding = async (
  buildingId: string,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn(
    `/api/buildings/${buildingId}` as '/api/buildings/${buildingId}'
  );
  return data;
};
