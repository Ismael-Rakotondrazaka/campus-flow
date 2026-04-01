import { z } from 'zod';

import { AnnouncementStatus } from './announcement.model';

export const AnnouncementStatusSchema = z.nativeEnum(AnnouncementStatus);

export const CreateAnnouncementSchema = z.object({
  content: z.string().min(1),
  end_at: z.string().datetime().nullish(),
  illustration_url: z.string().url().nullish(),
  start_at: z.string().datetime().nullish(),
  status: AnnouncementStatusSchema.default('draft'),
  title: z.string().min(1),
});

export type CreateAnnouncement = z.infer<typeof CreateAnnouncementSchema>;

export const UpdateAnnouncementSchema = CreateAnnouncementSchema.partial();

export type UpdateAnnouncement = z.infer<typeof UpdateAnnouncementSchema>;
