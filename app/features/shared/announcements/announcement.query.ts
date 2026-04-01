import { defineQueryOptions } from '@pinia/colada';

import type { AnnouncementFilters } from './announcement.model';

import { getAnnouncement, getAnnouncements } from './announcement.service';

export const ANNOUNCEMENT_QUERY_KEYS = {
  byId: (id: string) => [...ANNOUNCEMENT_QUERY_KEYS.root, id] as const,

  list: (filters: AnnouncementFilters = {}) =>
    [...ANNOUNCEMENT_QUERY_KEYS.root, 'list', filters] as const,

  root: ['announcements'] as const,
};

export const announcementListQuery = defineQueryOptions(
  (filters: AnnouncementFilters = {}) => ({
    key: ANNOUNCEMENT_QUERY_KEYS.list(filters),
    query: () => getAnnouncements(filters),
  })
);

export const announcementByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => ({
    key: ANNOUNCEMENT_QUERY_KEYS.byId(id),
    query: () => getAnnouncement(id),
  })
);
