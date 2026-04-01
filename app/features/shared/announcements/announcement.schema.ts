import { z } from 'zod';

export const CreateAnnouncementSchema = z.object({
  content: z.string().min(1),
  end_at: z.string().datetime().nullish(),
  illustration_url: z.string().url().nullish(),
  start_at: z.string().datetime().nullish(),
  status: z.enum(['draft', 'published']).default('draft'),
  title: z.string().min(1),
});

export type CreateAnnouncement = z.infer<typeof CreateAnnouncementSchema>;

export const UpdateAnnouncementSchema = CreateAnnouncementSchema.partial();

export type UpdateAnnouncement = z.infer<typeof UpdateAnnouncementSchema>;
