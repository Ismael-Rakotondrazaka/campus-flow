import type { SortOrder } from '#imports';

export const AnnouncementStatuses = ['draft', 'published'] as const;

export const AnnouncementStatus = createEnumConstants(AnnouncementStatuses);

export type AnnouncementStatus =
  (typeof AnnouncementStatus)[keyof typeof AnnouncementStatus];

export const AnnouncementStatusLabel: Record<AnnouncementStatus, string> = {
  [AnnouncementStatus.draft]: 'Draft',
  [AnnouncementStatus.published]: 'Published',
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
