import type { SortOrder } from '#imports';

export type Faculty = Tables<'faculties'>;

export interface FacultyFilters {
  limit?: number;
  orderBy?: FacultyOrderBy;
  page?: number;
  search?: string;
  sortOrder?: SortOrder;
}

export type FacultyInsert = TablesInsert<'faculties'>;
export type FacultyOrderBy = 'created_at' | 'name';
export type FacultyUpdate = TablesUpdate<'faculties'>;
