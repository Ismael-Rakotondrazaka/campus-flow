import { defineQueryOptions } from '@pinia/colada';

import type { FacultyFilters } from './faculty.model';

import { getFaculties, getFacultiesCount, getFaculty } from './faculty.service';

export const FACULTY_QUERY_KEYS = {
  byId: (id: string) => [...FACULTY_QUERY_KEYS.root, id] as const,

  count: (filters: Omit<FacultyFilters, 'limit' | 'page'> = {}) =>
    [...FACULTY_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: FacultyFilters = {}) =>
    [...FACULTY_QUERY_KEYS.root, 'list', filters] as const,

  root: ['faculties'] as const,
};

export const facultyListQuery = defineQueryOptions(
  (filters: FacultyFilters = {}) => ({
    key: FACULTY_QUERY_KEYS.list(filters),
    placeholderData: previousData => previousData,
    query: () => getFaculties(filters),
  })
);

export const facultyByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => ({
    key: FACULTY_QUERY_KEYS.byId(id),
    query: () => getFaculty(id),
  })
);

export const facultyCountQuery = defineQueryOptions(
  (filters: Omit<FacultyFilters, 'limit' | 'page'> = {}) => ({
    key: FACULTY_QUERY_KEYS.count(filters),
    query: () => getFacultiesCount(filters),
  })
);
