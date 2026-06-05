import type { FacultyQuery } from '#shared/features/faculties';

import { defineQueryOptions } from '@pinia/colada';

import { getFaculties, getFacultiesCount, getFaculty } from './faculty.service';

export const FACULTY_QUERY_KEYS = {
  byId: (id: string) => [...FACULTY_QUERY_KEYS.root, id] as const,

  count: (
    filters: Omit<FacultyQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'> = {}
  ) => [...FACULTY_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: FacultyQuery = {}) =>
    [...FACULTY_QUERY_KEYS.root, 'list', filters] as const,

  root: ['faculties'] as const,
};

export const facultyListQuery = defineQueryOptions(
  (filters: FacultyQuery = {}) => {
    const fetchFn = useRequestFetch();
    return {
      key: FACULTY_QUERY_KEYS.list(filters),
      placeholderData: previousData => previousData,
      query: () => getFaculties(filters, fetchFn),
    };
  }
);

export const facultyByIdQuery = defineQueryOptions(({ id }: { id: string }) => {
  const fetchFn = useRequestFetch();
  return {
    key: FACULTY_QUERY_KEYS.byId(id),
    query: () => getFaculty(id, fetchFn),
  };
});

export const facultyCountQuery = defineQueryOptions(
  (
    filters: Omit<FacultyQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'> = {}
  ) => {
    const fetchFn = useRequestFetch();
    return {
      key: FACULTY_QUERY_KEYS.count(filters),
      query: () => getFacultiesCount(filters, fetchFn),
    };
  }
);
