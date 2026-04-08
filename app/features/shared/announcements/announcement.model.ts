import type { SortOrder } from '#imports';

export const AnnouncementStatuses = ['draft', 'published'] as const;

export const AnnouncementStatus = createEnumConstants(AnnouncementStatuses);

export type AnnouncementStatus =
  (typeof AnnouncementStatus)[keyof typeof AnnouncementStatus];

export const AnnouncementStatusLabel: Record<AnnouncementStatus, string> = {
  [AnnouncementStatus.draft]: 'Brouillon',
  [AnnouncementStatus.published]: 'Publié',
};

export const AnnouncementStatusColor: Record<AnnouncementStatus, string> = {
  [AnnouncementStatus.draft]: 'bg-gray-500 text-white',
  [AnnouncementStatus.published]: 'bg-blue-500 text-white',
};

export type Announcement = {
  status: AnnouncementStatus;
} & Omit<Tables<'announcements'>, 'status'>;

export interface AnnouncementFilters {
  limit?: number;
  orderBy?: AnnouncementOrderBy;
  page?: number;
  search?: string;
  sortOrder?: SortOrder;
  status?: AnnouncementStatus;
}

export type AnnouncementInsert = TablesInsert<'announcements'>;
export type AnnouncementOrderBy = 'created_at' | 'title';
export type AnnouncementUpdate = TablesUpdate<'announcements'>;
