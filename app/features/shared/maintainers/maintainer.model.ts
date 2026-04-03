import type { SortOrder } from '#imports';

export type Maintainer = Tables<'maintainers'>;

export interface MaintainerFilters {
  limit?: number;
  orderBy?: MaintainerOrderBy;
  page?: number;
  search?: string;
  sortOrder?: SortOrder;
}

export type MaintainerInsert = TablesInsert<'maintainers'>;
export type MaintainerOrderBy = 'created_at' | 'first_name' | 'last_name';
export type MaintainerUpdate = TablesUpdate<'maintainers'>;
