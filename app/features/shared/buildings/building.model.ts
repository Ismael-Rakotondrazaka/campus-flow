export type Building = Tables<'buildings'>;

export interface BuildingFilters {
  limit?: number;
  page?: number;
  search?: string;
}

export type BuildingInsert = TablesInsert<'buildings'>;
export type BuildingUpdate = TablesUpdate<'buildings'>;
