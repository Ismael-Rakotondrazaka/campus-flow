import type {
  AcademicSessionQuery,
  CreateAcademicSession,
  UpdateAcademicSession,
} from '#shared/features/academic-sessions';
import type { H3Event$Fetch } from 'nitropack/types';

export const getAcademicSessions = async (
  filters: AcademicSessionQuery,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  return fetchFn('/api/academic-sessions', {
    query: filters,
  });
};

export const getAcademicSessionsCount = async (
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { count } = await fetchFn('/api/academic-sessions/count');
  return count;
};

export const getAcademicSession = async (
  academicSessionId: string,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn(
    `/api/academic-sessions/${academicSessionId}` as '/api/academic-sessions/${academicSessionId}'
  );
  return data;
};

export const createAcademicSession = async (
  input: CreateAcademicSession,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn('/api/academic-sessions', {
    body: input,
    method: 'POST',
  });
  return data;
};

export const updateAcademicSession = async (
  academicSessionId: string,
  input: UpdateAcademicSession,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn(
    `/api/academic-sessions/${academicSessionId}` as '/api/academic-sessions/${academicSessionId}',
    {
      body: input,
      method: 'PUT',
    }
  );
  return data;
};

export const deleteAcademicSession = async (
  academicSessionId: string,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  await fetchFn(
    `/api/academic-sessions/${academicSessionId}` as '/api/academic-sessions/${academicSessionId}',
    { method: 'DELETE' }
  );
};

export const getActiveApplicationSession = async (
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn('/api/academic-sessions/active');
  return data;
};

export const getActiveRenewalSession = async (
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn('/api/academic-sessions/active-renewal');
  return data;
};
