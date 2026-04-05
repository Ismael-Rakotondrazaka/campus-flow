import { defineQueryOptions } from '@pinia/colada';

import type { AcademicSessionFilters } from './academic-session.model';

import {
  getAcademicSession,
  getAcademicSessions,
  getAcademicSessionsCount,
  getActiveApplicationSession,
} from './academic-session.service';

export const ACADEMIC_SESSION_QUERY_KEYS = {
  byId: (id: string) => [...ACADEMIC_SESSION_QUERY_KEYS.root, id] as const,

  count: () => [...ACADEMIC_SESSION_QUERY_KEYS.root, 'count'] as const,

  list: (filters: AcademicSessionFilters = {}) =>
    [...ACADEMIC_SESSION_QUERY_KEYS.root, 'list', filters] as const,

  root: ['academic-sessions'] as const,
};

export const academicSessionListQuery = defineQueryOptions(
  (filters: AcademicSessionFilters = {}) => ({
    key: ACADEMIC_SESSION_QUERY_KEYS.list(filters),
    query: () => getAcademicSessions(filters),
  })
);

export const academicSessionByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => ({
    key: ACADEMIC_SESSION_QUERY_KEYS.byId(id),
    query: () => getAcademicSession(id),
  })
);

export const academicSessionCountQuery = defineQueryOptions(() => ({
  key: ACADEMIC_SESSION_QUERY_KEYS.count(),
  query: () => getAcademicSessionsCount(),
}));

export const activeApplicationSessionQuery = defineQueryOptions(() => ({
  key: [...ACADEMIC_SESSION_QUERY_KEYS.root, 'active-application'] as const,
  query: () => getActiveApplicationSession(),
}));
