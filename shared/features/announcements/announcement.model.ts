import type { AnnouncementModel } from '../../../prisma/generated/client/models';

import { createEnumConstants } from '../../utils/enums';

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
} & Omit<AnnouncementModel, 'status'>;

export const AnnouncementOrderBys = ['createdAt', 'title'] as const;
export const AnnouncementOrderBy = createEnumConstants(AnnouncementOrderBys);
export type AnnouncementOrderBy =
  (typeof AnnouncementOrderBy)[keyof typeof AnnouncementOrderBy];
