import type { PaginationResult } from '@/features/shared/paginations/pagination.model';

import type {
  Admin,
  AdminFilters,
  AdminInsert,
  AdminUpdate,
} from './admin.model';

import { AdminConfig } from './admin.config';

const ADMIN_SELECT = `*`;

export const getAdmins = async (
  filters: AdminFilters
): Promise<PaginationResult<Admin>> => {
  const client = useSupabaseClient();

  let query = client.from('admins').select(ADMIN_SELECT, { count: 'exact' });

  if (filters.role) {
    query = query.eq('role', filters.role);
  }

  const page = filters.page ?? AdminConfig.PAGE_DEFAULT;
  const limit = filters.limit ?? AdminConfig.PAGE_SIZE_DEFAULT;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query
    .order(filters.orderBy ?? 'created_at', {
      ascending: filters.sortOrder === SortOrder.asc,
    })
    .range(from, to);

  const { count, data, error } = await query;

  if (error) throw error;

  return {
    count: count ?? 0,
    data: (data ?? []) as unknown as Admin[],
  };
};

export const getAdminsCount = async (
  filters: Omit<AdminFilters, 'limit' | 'orderBy' | 'page' | 'sortOrder'>
): Promise<number> => {
  const client = useSupabaseClient();

  let query = client.from('admins').select('*', { count: 'exact', head: true });

  if (filters.role) {
    query = query.eq('role', filters.role);
  }

  const { count, error } = await query;

  if (error) throw error;

  return count ?? 0;
};

export const getAdmin = async (id: string): Promise<Admin | null> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('admins')
    .select(ADMIN_SELECT)
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;

  return data as unknown as Admin | null;
};

export const createAdmin = async (admin: AdminInsert): Promise<Admin> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('admins')
    .insert(admin)
    .select(ADMIN_SELECT)
    .single();

  if (error) throw error;

  return data as unknown as Admin;
};

export const updateAdmin = async (
  id: string,
  updates: AdminUpdate
): Promise<Admin> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('admins')
    .update(updates)
    .eq('id', id)
    .select(ADMIN_SELECT)
    .single();

  if (error) throw error;

  return data as unknown as Admin;
};

export const deleteAdmin = async (id: string): Promise<void> => {
  const client = useSupabaseClient();

  const { error } = await client
    .from('admins')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
};
