import type {
  AnnouncementQuery,
  CreateAnnouncement,
  UpdateAnnouncement,
} from '#shared/features/announcements';

import {
  defineMutation,
  defineQueryOptions,
  useQueryCache,
} from '@pinia/colada';

import {
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncement,
  getAnnouncements,
  getAnnouncementsCount,
  updateAnnouncement,
} from './announcement.service';

export const ANNOUNCEMENT_QUERY_KEYS = {
  byId: (id: string) => [...ANNOUNCEMENT_QUERY_KEYS.root, id] as const,

  count: (
    filters: Omit<
      AnnouncementQuery,
      'limit' | 'orderBy' | 'page' | 'sortOrder'
    > = {}
  ) => [...ANNOUNCEMENT_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: AnnouncementQuery = {}) =>
    [...ANNOUNCEMENT_QUERY_KEYS.root, 'list', filters] as const,

  root: ['announcements'] as const,
};

export const announcementListQuery = defineQueryOptions(
  (filters: AnnouncementQuery = {}) => {
    const fetchFn = useRequestFetch();
    return {
      key: ANNOUNCEMENT_QUERY_KEYS.list(filters),
      placeholderData: previousData => previousData,
      query: () => getAnnouncements(filters, fetchFn),
    };
  }
);

export const announcementByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => {
    const fetchFn = useRequestFetch();
    return {
      key: ANNOUNCEMENT_QUERY_KEYS.byId(id),
      query: () => getAnnouncement(id, fetchFn),
    };
  }
);

export const announcementCountQuery = defineQueryOptions(
  (
    filters: Omit<
      AnnouncementQuery,
      'limit' | 'orderBy' | 'page' | 'sortOrder'
    > = {}
  ) => {
    const fetchFn = useRequestFetch();
    return {
      key: ANNOUNCEMENT_QUERY_KEYS.count(filters),
      query: () => getAnnouncementsCount(filters, fetchFn),
    };
  }
);

export const useCreateAnnouncement = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: (announcement: CreateAnnouncement) =>
      createAnnouncement(announcement),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: ANNOUNCEMENT_QUERY_KEYS.root });
    },
  };
});

export const useUpdateAnnouncement = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: ({ id, updates }: { id: string; updates: UpdateAnnouncement }) =>
      updateAnnouncement(id, updates),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: ANNOUNCEMENT_QUERY_KEYS.root });
    },
  };
});

export const useDeleteAnnouncement = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: (id: string) => deleteAnnouncement(id),
    onSuccess: () => {
      queryCache.invalidateQueries({ key: ANNOUNCEMENT_QUERY_KEYS.root });
    },
  };
});
