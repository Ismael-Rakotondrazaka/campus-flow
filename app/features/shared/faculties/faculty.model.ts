export type Faculty = Tables<'faculties'>;

export interface FacultyFilters {
  limit?: number;
  page?: number;
  search?: string;
}

export type FacultyInsert = TablesInsert<'faculties'>;
export type FacultyUpdate = TablesUpdate<'faculties'>;
