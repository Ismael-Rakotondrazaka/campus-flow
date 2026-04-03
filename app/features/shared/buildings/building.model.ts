import type { SortOrder } from '#imports';

export type Building = Tables<'buildings'>;

export interface BuildingFilters {
  limit?: number;
  orderBy?: BuildingOrderBy;
  page?: number;
  search?: string;
  sortOrder?: SortOrder;
}

export type BuildingInsert = TablesInsert<'buildings'>;
export type BuildingOrderBy = 'created_at' | 'name';
export type BuildingUpdate = TablesUpdate<'buildings'>;
