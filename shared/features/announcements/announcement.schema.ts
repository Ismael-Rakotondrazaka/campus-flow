import { z } from 'zod';

import { SortOrderSchema } from '../../utils/enums';
import { AnnouncementOrderBy, AnnouncementStatus } from './announcement.model';

export const AnnouncementOrderBySchema = z.nativeEnum(AnnouncementOrderBy);

export const AnnouncementParamsSchema = z.object({
  announcementId: z.string().uuid(),
});

export type AnnouncementParams = z.infer<typeof AnnouncementParamsSchema>;

export const AnnouncementQuerySchema = z.object({
  limit: z.coerce.number().int().positive().optional(),
  orderBy: AnnouncementOrderBySchema.optional(),
  page: z.coerce.number().int().positive().optional(),
  search: z.string().optional(),
  sortOrder: SortOrderSchema.optional(),
  status: z.nativeEnum(AnnouncementStatus).optional(),
});

export type AnnouncementQuery = z.infer<typeof AnnouncementQuerySchema>;

export const AnnouncementStatusSchema = z.nativeEnum(AnnouncementStatus);

export const CreateAnnouncementSchema = z.object({
  content: z.string().min(1),
  illustrationUrl: z.string().url().nullish(),
  status: AnnouncementStatusSchema.default('draft'),
  title: z.string().min(1),
});

export type CreateAnnouncement = z.infer<typeof CreateAnnouncementSchema>;

export const CreateAnnouncementFormSchema = z.object({
  content: z.string().min(1),
  illustrationUrl: z.any().optional(),
  title: z.string().min(1),
});

export type CreateAnnouncementForm = z.infer<
  typeof CreateAnnouncementFormSchema
>;

export const UpdateAnnouncementFormSchema = CreateAnnouncementFormSchema;

export type UpdateAnnouncementForm = CreateAnnouncementForm;

export const UpdateAnnouncementSchema = CreateAnnouncementSchema.partial();

export type UpdateAnnouncement = z.infer<typeof UpdateAnnouncementSchema>;
