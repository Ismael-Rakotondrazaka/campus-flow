import type { PaginationResult } from '@/features/shared/paginations/pagination.model';

import type {
  Announcement,
  AnnouncementFilters,
  AnnouncementInsert,
  AnnouncementUpdate,
} from './announcement.model';

import { AnnouncementConfig } from './announcement.config';

export const getAnnouncements = async (
  filters: AnnouncementFilters
): Promise<PaginationResult<Announcement>> => {
  const client = useSupabaseClient();

  let query = client
    .from('announcements')
    .select('*', { count: 'exact' })
    .is('deleted_at', null);

  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  if (filters.search) {
    query = query.ilike('title', `%${filters.search}%`);
  }

  const page = filters.page ?? AnnouncementConfig.PAGE_DEFAULT;
  const limit = filters.limit ?? AnnouncementConfig.PAGE_SIZE_DEFAULT;
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
    data: (data ?? []) as unknown as Announcement[],
  };
};

export const getAnnouncementsCount = async (
  filters: Omit<AnnouncementFilters, 'limit' | 'orderBy' | 'page' | 'sortOrder'>
): Promise<number> => {
  const client = useSupabaseClient();

  let query = client
    .from('announcements')
    .select('*', { count: 'exact', head: true })
    .is('deleted_at', null);

  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  if (filters.search) {
    query = query.ilike('title', `%${filters.search}%`);
  }

  const { count, error } = await query;

  if (error) throw error;

  return count ?? 0;
};

export const getAnnouncement = async (
  id: string
): Promise<Announcement | null> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('announcements')
    .select('*')
    .eq('id', id)
    .is('deleted_at', null)
    .maybeSingle();

  if (error) throw error;

  return data as unknown as Announcement | null;
};

export const createAnnouncement = async (
  announcement: AnnouncementInsert
): Promise<Announcement> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('announcements')
    .insert(announcement)
    .select()
    .single();

  if (error) throw error;

  return data as unknown as Announcement;
};

export const updateAnnouncement = async (
  id: string,
  updates: AnnouncementUpdate
): Promise<Announcement> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('announcements')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data as unknown as Announcement;
};

export const deleteAnnouncement = async (id: string): Promise<void> => {
  const client = useSupabaseClient();

  const { error } = await client
    .from('announcements')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
};
