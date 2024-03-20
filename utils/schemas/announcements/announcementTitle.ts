export const AnnouncementTitleSchema = z
  .string()
  .trim()
  .min(announcementConfig.TITLE_MIN_LENGTH)
  .max(announcementConfig.TITLE_MAX_LENGTH);
