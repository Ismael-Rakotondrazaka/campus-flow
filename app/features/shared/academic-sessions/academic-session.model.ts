export type AcademicSession = Tables<'academic_sessions'>;

export interface AcademicSessionFilters {
  limit?: number;
  page?: number;
}

export type AcademicSessionInsert = TablesInsert<'academic_sessions'>;
export type AcademicSessionUpdate = TablesUpdate<'academic_sessions'>;
