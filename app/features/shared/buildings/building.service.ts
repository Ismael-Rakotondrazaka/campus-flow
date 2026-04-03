import type { PaginationResult } from '@/features/shared/paginations/pagination.model';

import type {
  Building,
  BuildingFilters,
  BuildingInsert,
  BuildingUpdate,
} from './building.model';

import { BuildingConfig } from './building.config';

export const getBuildings = async (
  filters: BuildingFilters
): Promise<PaginationResult<Building>> => {
  const client = useSupabaseClient();

  let query = client
    .from('buildings')
    .select('*', { count: 'exact' })
    .is('deleted_at', null);

  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }

  const page = filters.page ?? BuildingConfig.PAGE_DEFAULT;
  const limit = filters.limit ?? BuildingConfig.PAGE_SIZE_DEFAULT;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query
    .order(filters.orderBy ?? 'name', {
      ascending:
        filters.sortOrder !== undefined
          ? filters.sortOrder === SortOrder.asc
          : true,
    })
    .range(from, to);

  const { count, data, error } = await query;

  if (error) throw error;

  return {
    count: count ?? 0,
    data: data ?? [],
  };
};

export const getBuildingsCount = async (
  filters: Omit<BuildingFilters, 'limit' | 'orderBy' | 'page' | 'sortOrder'>
): Promise<number> => {
  const client = useSupabaseClient();

  let query = client
    .from('buildings')
    .select('*', { count: 'exact', head: true })
    .is('deleted_at', null);

  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }

  const { count, error } = await query;

  if (error) throw error;

  return count ?? 0;
};

export const getBuilding = async (id: string): Promise<Building | null> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('buildings')
    .select('*')
    .eq('id', id)
    .is('deleted_at', null)
    .maybeSingle();

  if (error) throw error;

  return data;
};

export const createBuilding = async (
  building: BuildingInsert
): Promise<Building> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('buildings')
    .insert(building)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const updateBuilding = async (
  id: string,
  updates: BuildingUpdate
): Promise<Building> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('buildings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const deleteBuilding = async (id: string): Promise<void> => {
  const client = useSupabaseClient();

  const { error } = await client
    .from('buildings')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
};
