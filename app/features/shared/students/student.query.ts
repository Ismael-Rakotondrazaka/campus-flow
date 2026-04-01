import { defineQueryOptions } from '@pinia/colada';

import type { StudentFilters } from './student.model';

import { getStudent, getStudents } from './student.service';

export const STUDENT_QUERY_KEYS = {
  byUserId: (userId: string) => [...STUDENT_QUERY_KEYS.root, userId] as const,

  list: (filters: StudentFilters = {}) =>
    [...STUDENT_QUERY_KEYS.root, 'list', filters] as const,

  root: ['students'] as const,
};

export const studentListQuery = defineQueryOptions(
  (filters: StudentFilters = {}) => ({
    key: STUDENT_QUERY_KEYS.list(filters),
    query: () => getStudents(filters),
  })
);

export const studentByUserIdQuery = defineQueryOptions(
  ({ userId }: { userId: string }) => ({
    key: STUDENT_QUERY_KEYS.byUserId(userId),
    query: () => getStudent(userId),
  })
);
