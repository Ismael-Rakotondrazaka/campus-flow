import type { PaginationResult } from '@/features/shared/paginations/pagination.model';

import type {
  Lodgment,
  LodgmentFilters,
  LodgmentInsert,
  LodgmentUpdate,
} from './lodgment.model';

import { LodgmentConfig } from './lodgment.config';

const LODGMENT_SELECT = `*, building:building_id(*)`;

export const getLodgments = async (
  filters: LodgmentFilters
): Promise<PaginationResult<Lodgment>> => {
  const client = useSupabaseClient();

  let query = client
    .from('lodgments')
    .select(LODGMENT_SELECT, { count: 'exact' })
    .is('deleted_at', null);

  if (filters.building_id) {
    query = query.eq('building_id', filters.building_id);
  }

  if (filters.floor !== undefined) {
    query = query.eq('floor', filters.floor);
  }

  const page = filters.page ?? LodgmentConfig.PAGE_DEFAULT;
  const limit = filters.limit ?? LodgmentConfig.PAGE_SIZE_DEFAULT;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const orderBy = filters.orderBy ?? 'floor';
  const ascending =
    filters.sortOrder !== undefined
      ? filters.sortOrder === SortOrder.asc
      : true;

  query = query.order(orderBy, { ascending });

  if (orderBy === 'floor') {
    query = query.order('room_number', { ascending });
  }

  query = query.range(from, to);

  const { count, data, error } = await query;

  if (error) throw error;

  return {
    count: count ?? 0,
    data: (data ?? []) as unknown as Lodgment[],
  };
};

export const getLodgmentsCount = async (
  filters: Omit<LodgmentFilters, 'limit' | 'orderBy' | 'page' | 'sortOrder'>
): Promise<number> => {
  const client = useSupabaseClient();

  let query = client
    .from('lodgments')
    .select('*', { count: 'exact', head: true })
    .is('deleted_at', null);

  if (filters.building_id) {
    query = query.eq('building_id', filters.building_id);
  }

  if (filters.floor !== undefined) {
    query = query.eq('floor', filters.floor);
  }

  const { count, error } = await query;

  if (error) throw error;

  return count ?? 0;
};

export const getLodgment = async (id: string): Promise<Lodgment | null> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('lodgments')
    .select(LODGMENT_SELECT)
    .eq('id', id)
    .is('deleted_at', null)
    .maybeSingle();

  if (error) throw error;

  return data as unknown as Lodgment | null;
};

export const createLodgment = async (
  lodgment: LodgmentInsert
): Promise<Lodgment> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('lodgments')
    .insert(lodgment)
    .select(LODGMENT_SELECT)
    .single();

  if (error) throw error;

  return data as unknown as Lodgment;
};

export const updateLodgment = async (
  id: string,
  updates: LodgmentUpdate
): Promise<Lodgment> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('lodgments')
    .update(updates)
    .eq('id', id)
    .select(LODGMENT_SELECT)
    .single();

  if (error) throw error;

  return data as unknown as Lodgment;
};

export const deleteLodgment = async (id: string): Promise<void> => {
  const client = useSupabaseClient();

  const { error } = await client
    .from('lodgments')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
};
