import type { PaginationResult } from '@/features/shared/paginations/pagination.model';

import type {
  AcademicSession,
  AcademicSessionFilters,
  AcademicSessionInsert,
  AcademicSessionUpdate,
} from './academic-session.model';

import { AcademicSessionConfig } from './academic-session.config';

export const getAcademicSessions = async (
  filters: AcademicSessionFilters
): Promise<PaginationResult<AcademicSession>> => {
  const client = useSupabaseClient();

  const query = client
    .from('academic_sessions')
    .select('*', { count: 'exact' })
    .is('deleted_at', null);

  const page = filters.page ?? AcademicSessionConfig.PAGE_DEFAULT;
  const limit = filters.limit ?? AcademicSessionConfig.PAGE_SIZE_DEFAULT;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { count, data, error } = await query
    .order('start_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    count: count ?? 0,
    data: data ?? [],
  };
};

export const getAcademicSessionsCount = async (): Promise<number> => {
  const client = useSupabaseClient();

  const { count, error } = await client
    .from('academic_sessions')
    .select('*', { count: 'exact', head: true })
    .is('deleted_at', null);

  if (error) throw error;

  return count ?? 0;
};

export const getAcademicSession = async (
  id: string
): Promise<AcademicSession | null> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('academic_sessions')
    .select('*')
    .eq('id', id)
    .is('deleted_at', null)
    .maybeSingle();

  if (error) throw error;

  return data;
};

export const createAcademicSession = async (
  session: AcademicSessionInsert
): Promise<AcademicSession> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('academic_sessions')
    .insert(session)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const updateAcademicSession = async (
  id: string,
  updates: AcademicSessionUpdate
): Promise<AcademicSession> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('academic_sessions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const deleteAcademicSession = async (id: string): Promise<void> => {
  const client = useSupabaseClient();

  const { error } = await client
    .from('academic_sessions')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
};
