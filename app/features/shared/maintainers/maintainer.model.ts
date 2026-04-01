export type Maintainer = Tables<'maintainers'>;

export interface MaintainerFilters {
  limit?: number;
  page?: number;
  search?: string;
}

export type MaintainerInsert = TablesInsert<'maintainers'>;
export type MaintainerUpdate = TablesUpdate<'maintainers'>;
