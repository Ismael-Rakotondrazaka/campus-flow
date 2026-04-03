import { defineQueryOptions } from '@pinia/colada';

import type { NotificationFilters } from './notification.model';

import {
  getNotifications,
  getNotificationsCount,
} from './notification.service';

export const NOTIFICATION_QUERY_KEYS = {
  count: (filters: NotificationFilters = {}) =>
    [...NOTIFICATION_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: NotificationFilters = {}) =>
    [...NOTIFICATION_QUERY_KEYS.root, 'list', filters] as const,

  root: ['notifications'] as const,
};

export const notificationListQuery = defineQueryOptions(
  (filters: NotificationFilters = {}) => ({
    key: NOTIFICATION_QUERY_KEYS.list(filters),
    query: () => getNotifications(filters),
  })
);

export const notificationCountQuery = defineQueryOptions(
  (filters: NotificationFilters = {}) => ({
    key: NOTIFICATION_QUERY_KEYS.count(filters),
    query: () => getNotificationsCount(filters),
  })
);
