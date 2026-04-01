export type User = Tables<'users'>;

export interface UserFilters {
  limit?: number;
  page?: number;
  search?: string;
}

export type UserInsert = TablesInsert<'users'>;
export type UserUpdate = TablesUpdate<'users'>;
