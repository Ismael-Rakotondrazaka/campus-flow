import type { FacultyQuery } from '#shared/features/faculties';
import type { H3Event$Fetch } from 'nitropack/types';

export const getFaculties = async (
  filters: FacultyQuery,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  return fetchFn('/api/faculties', {
    query: filters,
  });
};

export const getFacultiesCount = async (
  filters: Omit<FacultyQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'>,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { count } = await fetchFn('/api/faculties/count', {
    query: filters,
  });
  return count;
};

export const getFaculty = async (
  facultyId: string,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn(
    `/api/faculties/${facultyId}` as '/api/faculties/${facultyId}'
  );
  return data;
};
