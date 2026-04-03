import type { PaginationResult } from '@/features/shared/paginations/pagination.model';

import type {
  Resident,
  ResidentFilters,
  ResidentInsert,
  ResidentUpdate,
} from './resident.model';

import { ResidentConfig } from './resident.config';

const RESIDENT_SELECT = `
  *,
  user:user_id(*),
  faculty:faculty_id(*),
  academic_session:academic_session_id(*),
  lodgment:lodgment_id(*)
`;

export const getResidents = async (
  filters: ResidentFilters
): Promise<PaginationResult<Resident>> => {
  const client = useSupabaseClient();

  let query = client
    .from('residents')
    .select(RESIDENT_SELECT, { count: 'exact' });

  if (filters.faculty_id) {
    query = query.eq('faculty_id', filters.faculty_id);
  }

  if (filters.academic_session_id) {
    query = query.eq('academic_session_id', filters.academic_session_id);
  }

  if (filters.lodgment_id) {
    query = query.eq('lodgment_id', filters.lodgment_id);
  }

  if (filters.gender) {
    query = query.eq('gender', filters.gender);
  }

  if (filters.origin) {
    query = query.eq('origin', filters.origin);
  }

  const page = filters.page ?? ResidentConfig.PAGE_DEFAULT;
  const limit = filters.limit ?? ResidentConfig.PAGE_SIZE_DEFAULT;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query.order('created_at', { ascending: false }).range(from, to);

  const { count, data, error } = await query;

  if (error) throw error;

  return {
    count: count ?? 0,
    data: (data ?? []) as unknown as Resident[],
  };
};

export const getResidentsCount = async (
  filters: Omit<ResidentFilters, 'limit' | 'page'>
): Promise<number> => {
  const client = useSupabaseClient();

  let query = client
    .from('residents')
    .select('*', { count: 'exact', head: true });

  if (filters.faculty_id) {
    query = query.eq('faculty_id', filters.faculty_id);
  }

  if (filters.academic_session_id) {
    query = query.eq('academic_session_id', filters.academic_session_id);
  }

  if (filters.lodgment_id) {
    query = query.eq('lodgment_id', filters.lodgment_id);
  }

  if (filters.gender) {
    query = query.eq('gender', filters.gender);
  }

  if (filters.origin) {
    query = query.eq('origin', filters.origin);
  }

  const { count, error } = await query;

  if (error) throw error;

  return count ?? 0;
};

export const getResident = async (userId: string): Promise<null | Resident> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('residents')
    .select(RESIDENT_SELECT)
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;

  return data as unknown as null | Resident;
};

export const createResident = async (
  resident: ResidentInsert
): Promise<Resident> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('residents')
    .insert(resident)
    .select(RESIDENT_SELECT)
    .single();

  if (error) throw error;

  return data as unknown as Resident;
};

export const updateResident = async (
  userId: string,
  updates: ResidentUpdate
): Promise<Resident> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('residents')
    .update(updates)
    .eq('user_id', userId)
    .select(RESIDENT_SELECT)
    .single();

  if (error) throw error;

  return data as unknown as Resident;
};

export const deleteResident = async (userId: string): Promise<void> => {
  const client = useSupabaseClient();

  const { error } = await client
    .from('residents')
    .delete()
    .eq('user_id', userId);

  if (error) throw error;
};
