import type { PaginationResult } from '@/features/shared/paginations/pagination.model';

import type {
  HousingApplication,
  HousingApplicationFilters,
  HousingApplicationInsert,
  HousingApplicationUpdate,
} from './housing-application.model';

import { HousingApplicationConfig } from './housing-application.config';

const HOUSING_APPLICATION_SELECT = `
  *,
  faculty:faculty_id(*),
  academic_session:academic_session_id(*),
  lodgment:lodgment_id(*)
`;

export const getHousingApplications = async (
  filters: HousingApplicationFilters
): Promise<PaginationResult<HousingApplication>> => {
  const client = useSupabaseClient();

  let query = client
    .from('housing_applications')
    .select(HOUSING_APPLICATION_SELECT, { count: 'exact' });

  if (!filters.include_deleted) {
    query = query.is('deleted_at', null);
  }

  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  if (filters.admin_id) {
    query = query.eq('admin_id', filters.admin_id);
  }

  if (filters.faculty_id) {
    query = query.eq('faculty_id', filters.faculty_id);
  }

  if (filters.academic_session_id) {
    query = query.eq('academic_session_id', filters.academic_session_id);
  }

  if (filters.gender) {
    query = query.eq('gender', filters.gender);
  }

  if (filters.origin) {
    query = query.eq('origin', filters.origin);
  }

  if (filters.search) {
    query = query.or(
      `first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`
    );
  }

  const page = filters.page ?? HousingApplicationConfig.PAGE_DEFAULT;
  const limit = filters.limit ?? HousingApplicationConfig.PAGE_SIZE_DEFAULT;
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
    data: (data ?? []) as unknown as HousingApplication[],
  };
};

export const getHousingApplication = async (
  id: string
): Promise<HousingApplication | null> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('housing_applications')
    .select(HOUSING_APPLICATION_SELECT)
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;

  return data as unknown as HousingApplication | null;
};

export const createHousingApplication = async (
  housingApplication: HousingApplicationInsert
): Promise<HousingApplication> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('housing_applications')
    .insert(housingApplication)
    .select(HOUSING_APPLICATION_SELECT)
    .single();

  if (error) throw error;

  return data as unknown as HousingApplication;
};

export const updateHousingApplication = async (
  id: string,
  updates: HousingApplicationUpdate
): Promise<HousingApplication> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('housing_applications')
    .update(updates)
    .eq('id', id)
    .select(HOUSING_APPLICATION_SELECT)
    .single();

  if (error) throw error;

  return data as unknown as HousingApplication;
};

export const getHousingApplicationsCount = async (
  filters: Omit<
    HousingApplicationFilters,
    'limit' | 'orderBy' | 'page' | 'sortOrder'
  >
): Promise<number> => {
  const client = useSupabaseClient();

  let query = client
    .from('housing_applications')
    .select('*', { count: 'exact', head: true });

  if (!filters.include_deleted) {
    query = query.is('deleted_at', null);
  }

  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  if (filters.admin_id) {
    query = query.eq('admin_id', filters.admin_id);
  }

  if (filters.faculty_id) {
    query = query.eq('faculty_id', filters.faculty_id);
  }

  if (filters.academic_session_id) {
    query = query.eq('academic_session_id', filters.academic_session_id);
  }

  if (filters.gender) {
    query = query.eq('gender', filters.gender);
  }

  if (filters.origin) {
    query = query.eq('origin', filters.origin);
  }

  if (filters.search) {
    query = query.or(
      `first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`
    );
  }

  const { count, error } = await query;

  if (error) throw error;

  return count ?? 0;
};

export const deleteHousingApplication = async (id: string): Promise<void> => {
  const client = useSupabaseClient();

  const { error } = await client
    .from('housing_applications')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
};
