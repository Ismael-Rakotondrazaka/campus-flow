import type { PaginationResult } from '@/features/shared/paginations/pagination.model';

import type {
  Maintainer,
  MaintainerFilters,
  MaintainerInsert,
  MaintainerUpdate,
} from './maintainer.model';

import { MaintainerConfig } from './maintainer.config';

export const getMaintainers = async (
  filters: MaintainerFilters
): Promise<PaginationResult<Maintainer>> => {
  const client = useSupabaseClient();

  let query = client
    .from('maintainers')
    .select('*', { count: 'exact' })
    .is('deleted_at', null);

  if (filters.search) {
    query = query.or(
      `first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%`
    );
  }

  const page = filters.page ?? MaintainerConfig.PAGE_DEFAULT;
  const limit = filters.limit ?? MaintainerConfig.PAGE_SIZE_DEFAULT;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query.order('created_at', { ascending: false }).range(from, to);

  const { count, data, error } = await query;

  if (error) throw error;

  return {
    count: count ?? 0,
    data: data ?? [],
  };
};

export const getMaintainersCount = async (
  filters: Omit<MaintainerFilters, 'limit' | 'page'>
): Promise<number> => {
  const client = useSupabaseClient();

  let query = client
    .from('maintainers')
    .select('*', { count: 'exact', head: true })
    .is('deleted_at', null);

  if (filters.search) {
    query = query.or(
      `first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%`
    );
  }

  const { count, error } = await query;

  if (error) throw error;

  return count ?? 0;
};

export const getMaintainer = async (id: string): Promise<Maintainer | null> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('maintainers')
    .select('*')
    .eq('id', id)
    .is('deleted_at', null)
    .maybeSingle();

  if (error) throw error;

  return data;
};

export const createMaintainer = async (
  maintainer: MaintainerInsert
): Promise<Maintainer> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('maintainers')
    .insert(maintainer)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const updateMaintainer = async (
  id: string,
  updates: MaintainerUpdate
): Promise<Maintainer> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('maintainers')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const deleteMaintainer = async (id: string): Promise<void> => {
  const client = useSupabaseClient();

  const { error } = await client
    .from('maintainers')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
};
