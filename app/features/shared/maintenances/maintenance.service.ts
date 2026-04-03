import type { PaginationResult } from '@/features/shared/paginations/pagination.model';

import type {
  Maintenance,
  MaintenanceFilters,
  MaintenanceInsert,
  MaintenanceUpdate,
} from './maintenance.model';

import { MaintenanceConfig } from './maintenance.config';

const MAINTENANCE_SELECT = `
  *,
  resident:resident_id(*),
  lodgment:lodgment_id(*),
  maintainers:maintenance_maintainers(maintainer:maintainer_id(*), assigned_at)
`;

export const getMaintenances = async (
  filters: MaintenanceFilters
): Promise<PaginationResult<Maintenance>> => {
  const client = useSupabaseClient();

  let query = client
    .from('maintenances')
    .select(MAINTENANCE_SELECT, { count: 'exact' });

  if (filters.resident_id) {
    query = query.eq('resident_id', filters.resident_id);
  }

  if (filters.admin_id) {
    query = query.eq('admin_id', filters.admin_id);
  }

  if (filters.lodgment_id) {
    query = query.eq('lodgment_id', filters.lodgment_id);
  }

  if (filters.type) {
    query = query.eq('type', filters.type);
  }

  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  const page = filters.page ?? MaintenanceConfig.PAGE_DEFAULT;
  const limit = filters.limit ?? MaintenanceConfig.PAGE_SIZE_DEFAULT;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query.order('created_at', { ascending: false }).range(from, to);

  const { count, data, error } = await query;

  if (error) throw error;

  return {
    count: count ?? 0,
    data: (data ?? []) as unknown as Maintenance[],
  };
};

export const getMaintenance = async (
  id: string
): Promise<Maintenance | null> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('maintenances')
    .select(MAINTENANCE_SELECT)
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;

  return data as unknown as Maintenance | null;
};

export const createMaintenance = async (
  maintenance: MaintenanceInsert
): Promise<Maintenance> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('maintenances')
    .insert(maintenance)
    .select(MAINTENANCE_SELECT)
    .single();

  if (error) throw error;

  return data as unknown as Maintenance;
};

export const updateMaintenance = async (
  id: string,
  updates: MaintenanceUpdate
): Promise<Maintenance> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('maintenances')
    .update(updates)
    .eq('id', id)
    .select(MAINTENANCE_SELECT)
    .single();

  if (error) throw error;

  return data as unknown as Maintenance;
};

export const deleteMaintenance = async (id: string): Promise<void> => {
  const client = useSupabaseClient();

  const { error } = await client.from('maintenances').delete().eq('id', id);

  if (error) throw error;
};

export const assignMaintainer = async (
  maintenanceId: string,
  maintainerId: string
): Promise<void> => {
  const client = useSupabaseClient();

  const { error } = await client.from('maintenance_maintainers').insert({
    maintainer_id: maintainerId,
    maintenance_id: maintenanceId,
  });

  if (error) throw error;
};

export const unassignMaintainer = async (
  maintenanceId: string,
  maintainerId: string
): Promise<void> => {
  const client = useSupabaseClient();

  const { error } = await client
    .from('maintenance_maintainers')
    .delete()
    .eq('maintenance_id', maintenanceId)
    .eq('maintainer_id', maintainerId);

  if (error) throw error;
};
