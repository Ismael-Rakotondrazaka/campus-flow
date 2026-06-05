import type {
  AcademicSessionQuery,
  CreateAcademicSession,
  UpdateAcademicSession,
} from '#shared/features/academic-sessions';

import {
  defineMutation,
  defineQueryOptions,
  useQueryCache,
} from '@pinia/colada';

import {
  createAcademicSession,
  deleteAcademicSession,
  getAcademicSession,
  getAcademicSessions,
  getAcademicSessionsCount,
  getActiveApplicationSession,
  getActiveRenewalSession,
  updateAcademicSession,
} from './academic-session.service';

export const ACADEMIC_SESSION_QUERY_KEYS = {
  byId: (id: string) => [...ACADEMIC_SESSION_QUERY_KEYS.root, id] as const,

  count: () => [...ACADEMIC_SESSION_QUERY_KEYS.root, 'count'] as const,

  list: (filters: AcademicSessionQuery = {}) =>
    [...ACADEMIC_SESSION_QUERY_KEYS.root, 'list', filters] as const,

  root: ['academic-sessions'] as const,
};

export const academicSessionListQuery = defineQueryOptions(
  (filters: AcademicSessionQuery = {}) => {
    const fetchFn = useRequestFetch();
    return {
      key: ACADEMIC_SESSION_QUERY_KEYS.list(filters),
      placeholderData: previousData => previousData,
      query: () => getAcademicSessions(filters, fetchFn),
    };
  }
);

export const academicSessionByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => {
    const fetchFn = useRequestFetch();
    return {
      key: ACADEMIC_SESSION_QUERY_KEYS.byId(id),
      query: () => getAcademicSession(id, fetchFn),
    };
  }
);

export const academicSessionCountQuery = defineQueryOptions(() => {
  const fetchFn = useRequestFetch();
  return {
    key: ACADEMIC_SESSION_QUERY_KEYS.count(),
    query: () => getAcademicSessionsCount(fetchFn),
  };
});

export const activeApplicationSessionQuery = defineQueryOptions(() => {
  const fetchFn = useRequestFetch();
  return {
    key: [...ACADEMIC_SESSION_QUERY_KEYS.root, 'active-application'] as const,
    query: () => getActiveApplicationSession(fetchFn),
  };
});

export const activeRenewalSessionQuery = defineQueryOptions(() => {
  const fetchFn = useRequestFetch();
  return {
    key: [...ACADEMIC_SESSION_QUERY_KEYS.root, 'active-renewal'] as const,
    query: () => getActiveRenewalSession(fetchFn),
  };
});

export const useCreateAcademicSession = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: (session: CreateAcademicSession) =>
      createAcademicSession(session),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: ACADEMIC_SESSION_QUERY_KEYS.root });
    },
  };
});

export const useUpdateAcademicSession = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: ({
      id,
      updates,
    }: {
      id: string;
      updates: UpdateAcademicSession;
    }) => updateAcademicSession(id, updates),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: ACADEMIC_SESSION_QUERY_KEYS.root });
    },
  };
});

export const useDeleteAcademicSession = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: (id: string) => deleteAcademicSession(id),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: ACADEMIC_SESSION_QUERY_KEYS.root });
    },
  };
});
