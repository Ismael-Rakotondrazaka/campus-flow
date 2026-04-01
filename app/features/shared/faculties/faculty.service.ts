import type { PaginationResult } from '@/features/shared/paginations/pagination.model';

import type {
  Faculty,
  FacultyFilters,
  FacultyInsert,
  FacultyUpdate,
} from './faculty.model';

import { FacultyConfig } from './faculty.config';

export const getFaculties = async (
  filters: FacultyFilters
): Promise<PaginationResult<Faculty>> => {
  const client = useSupabaseClient();

  let query = client
    .from('faculties')
    .select('*', { count: 'exact' })
    .is('deleted_at', null);

  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }

  const page = filters.page ?? FacultyConfig.PAGE_DEFAULT;
  const limit = filters.limit ?? FacultyConfig.PAGE_SIZE_DEFAULT;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query.order('name', { ascending: true }).range(from, to);

  const { count, data, error } = await query;

  if (error) throw error;

  return {
    count: count ?? 0,
    data: data ?? [],
  };
};

export const getFaculty = async (id: string): Promise<Faculty | null> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('faculties')
    .select('*')
    .eq('id', id)
    .is('deleted_at', null)
    .maybeSingle();

  if (error) throw error;

  return data;
};

export const createFaculty = async (
  faculty: FacultyInsert
): Promise<Faculty> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('faculties')
    .insert(faculty)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const updateFaculty = async (
  id: string,
  updates: FacultyUpdate
): Promise<Faculty> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('faculties')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const deleteFaculty = async (id: string): Promise<void> => {
  const client = useSupabaseClient();

  const { error } = await client
    .from('faculties')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
};
