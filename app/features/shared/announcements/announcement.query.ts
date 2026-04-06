import {
  defineMutation,
  defineQueryOptions,
  useQueryCache,
} from '@pinia/colada';

import type {
  AnnouncementFilters,
  AnnouncementInsert,
  AnnouncementUpdate,
} from './announcement.model';

import {
  createAnnouncement,
  getAnnouncement,
  getAnnouncements,
  getAnnouncementsCount,
  updateAnnouncement,
} from './announcement.service';

export const ANNOUNCEMENT_QUERY_KEYS = {
  byId: (id: string) => [...ANNOUNCEMENT_QUERY_KEYS.root, id] as const,

  count: (filters: Omit<AnnouncementFilters, 'limit' | 'page'> = {}) =>
    [...ANNOUNCEMENT_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: AnnouncementFilters = {}) =>
    [...ANNOUNCEMENT_QUERY_KEYS.root, 'list', filters] as const,

  root: ['announcements'] as const,
};

export const announcementListQuery = defineQueryOptions(
  (filters: AnnouncementFilters = {}) => ({
    key: ANNOUNCEMENT_QUERY_KEYS.list(filters),
    placeholderData: previousData => previousData,
    query: () => getAnnouncements(filters),
  })
);

export const announcementByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => ({
    key: ANNOUNCEMENT_QUERY_KEYS.byId(id),
    query: () => getAnnouncement(id),
  })
);

export const announcementCountQuery = defineQueryOptions(
  (filters: Omit<AnnouncementFilters, 'limit' | 'page'> = {}) => ({
    key: ANNOUNCEMENT_QUERY_KEYS.count(filters),
    query: () => getAnnouncementsCount(filters),
  })
);

export const useCreateAnnouncement = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: (announcement: AnnouncementInsert) =>
      createAnnouncement(announcement),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: ANNOUNCEMENT_QUERY_KEYS.root });
    },
  };
});

export const useUpdateAnnouncement = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: ({ id, updates }: { id: string; updates: AnnouncementUpdate }) =>
      updateAnnouncement(id, updates),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: ANNOUNCEMENT_QUERY_KEYS.root });
    },
  };
});
