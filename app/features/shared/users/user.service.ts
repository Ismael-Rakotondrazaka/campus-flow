import type { PaginationResult } from '@/features/shared/paginations/pagination.model';

import type { User, UserFilters, UserUpdate } from './user.model';

import { UserConfig } from './user.config';

export const getUsers = async (
  filters: UserFilters
): Promise<PaginationResult<User>> => {
  const client = useSupabaseClient();

  let query = client
    .from('users')
    .select('*', { count: 'exact' })
    .is('deleted_at', null);

  if (filters.search) {
    query = query.or(
      `first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%`
    );
  }

  const page = filters.page ?? UserConfig.PAGE_DEFAULT;
  const limit = filters.limit ?? UserConfig.PAGE_SIZE_DEFAULT;
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

export const getUsersCount = async (
  filters: Omit<UserFilters, 'limit' | 'page'>
): Promise<number> => {
  const client = useSupabaseClient();

  let query = client
    .from('users')
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

export const getUser = async (id: string): Promise<null | User> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('users')
    .select('*')
    .eq('id', id)
    .is('deleted_at', null)
    .maybeSingle();

  if (error) throw error;

  return data;
};

export const updateUser = async (
  id: string,
  updates: UserUpdate
): Promise<User> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
};
