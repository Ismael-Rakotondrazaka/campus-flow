import type { SortOrder } from '#imports';

export type AcademicSession = Tables<'academic_sessions'>;

export interface AcademicSessionFilters {
  limit?: number;
  orderBy?: AcademicSessionOrderBy;
  page?: number;
  sortOrder?: SortOrder;
}

export type AcademicSessionInsert = TablesInsert<'academic_sessions'>;
export type AcademicSessionOrderBy = 'created_at' | 'start_at';
export type AcademicSessionUpdate = TablesUpdate<'academic_sessions'>;
