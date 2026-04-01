import type { PaginationResult } from '@/features/shared/paginations/pagination.model';

import type {
  Renewal,
  RenewalFilters,
  RenewalInsert,
  RenewalUpdate,
} from './renewal.model';

import { RenewalConfig } from './renewal.config';

const RENEWAL_SELECT = `
  *,
  student:student_id(*),
  faculty:faculty_id(*),
  academic_session:academic_session_id(*)
`;

export const getRenewals = async (
  filters: RenewalFilters
): Promise<PaginationResult<Renewal>> => {
  const client = useSupabaseClient();

  let query = client
    .from('renewals')
    .select(RENEWAL_SELECT, { count: 'exact' });

  if (filters.student_id) {
    query = query.eq('student_id', filters.student_id);
  }

  if (filters.academic_session_id) {
    query = query.eq('academic_session_id', filters.academic_session_id);
  }

  if (filters.faculty_id) {
    query = query.eq('faculty_id', filters.faculty_id);
  }

  if (filters.admin_id) {
    query = query.eq('admin_id', filters.admin_id);
  }

  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  const page = filters.page ?? RenewalConfig.PAGE_DEFAULT;
  const limit = filters.limit ?? RenewalConfig.PAGE_SIZE_DEFAULT;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query.order('created_at', { ascending: false }).range(from, to);

  const { count, data, error } = await query;

  if (error) throw error;

  return {
    count: count ?? 0,
    data: (data ?? []) as unknown as Renewal[],
  };
};

export const getRenewal = async (id: string): Promise<null | Renewal> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('renewals')
    .select(RENEWAL_SELECT)
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;

  return data as unknown as null | Renewal;
};

export const createRenewal = async (
  renewal: RenewalInsert
): Promise<Renewal> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('renewals')
    .insert(renewal)
    .select(RENEWAL_SELECT)
    .single();

  if (error) throw error;

  return data as unknown as Renewal;
};

export const updateRenewal = async (
  id: string,
  updates: RenewalUpdate
): Promise<Renewal> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('renewals')
    .update(updates)
    .eq('id', id)
    .select(RENEWAL_SELECT)
    .single();

  if (error) throw error;

  return data as unknown as Renewal;
};

export const deleteRenewal = async (id: string): Promise<void> => {
  const client = useSupabaseClient();

  const { error } = await client.from('renewals').delete().eq('id', id);

  if (error) throw error;
};
