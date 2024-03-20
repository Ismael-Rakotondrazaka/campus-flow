export const AnnouncementContentSchema = z
  .string()
  .trim()
  .min(announcementConfig.CONTENT_MIN_LENGTH)
  .max(announcementConfig.CONTENT_MAX_LENGTH);
