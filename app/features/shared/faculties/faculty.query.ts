import { defineQueryOptions } from '@pinia/colada';

import type { FacultyFilters } from './faculty.model';

import { getFaculties, getFaculty } from './faculty.service';

export const FACULTY_QUERY_KEYS = {
  byId: (id: string) => [...FACULTY_QUERY_KEYS.root, id] as const,

  list: (filters: FacultyFilters = {}) =>
    [...FACULTY_QUERY_KEYS.root, 'list', filters] as const,

  root: ['faculties'] as const,
};

export const facultyListQuery = defineQueryOptions(
  (filters: FacultyFilters = {}) => ({
    key: FACULTY_QUERY_KEYS.list(filters),
    query: () => getFaculties(filters),
  })
);

export const facultyByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => ({
    key: FACULTY_QUERY_KEYS.byId(id),
    query: () => getFaculty(id),
  })
);
