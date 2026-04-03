import type { SortOrder } from '#imports';

export type User = Tables<'users'>;

export interface UserFilters {
  limit?: number;
  orderBy?: UserOrderBy;
  page?: number;
  search?: string;
  sortOrder?: SortOrder;
}

export type UserInsert = TablesInsert<'users'>;
export type UserOrderBy = 'created_at' | 'first_name' | 'last_name';
export type UserUpdate = TablesUpdate<'users'>;
