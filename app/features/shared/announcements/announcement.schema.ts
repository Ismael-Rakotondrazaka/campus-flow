import { z } from 'zod';

import { AnnouncementStatus } from './announcement.model';

export const AnnouncementStatusSchema = z.nativeEnum(AnnouncementStatus);

export const CreateAnnouncementSchema = z.object({
  content: z.string().min(1),
  illustration_url: z.string().url().nullish(),
  status: AnnouncementStatusSchema.default('draft'),
  title: z.string().min(1),
});

export type CreateAnnouncement = z.infer<typeof CreateAnnouncementSchema>;

/** Form values (illustration is optional; file handled outside Zod). */
export const CreateAnnouncementFormSchema = z.object({
  content: z.string().min(1),
  illustration_url: z.any().optional(),
  title: z.string().min(1),
});

export type CreateAnnouncementForm = z.infer<
  typeof CreateAnnouncementFormSchema
>;

export const UpdateAnnouncementSchema = CreateAnnouncementSchema.partial();

export type UpdateAnnouncement = z.infer<typeof UpdateAnnouncementSchema>;
