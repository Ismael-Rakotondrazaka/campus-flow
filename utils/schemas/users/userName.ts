export const UserNameSchema = z
  .string()
  .trim()
  .min(userConfig.NAME_MIN_LENGTH)
  .max(userConfig.NAME_MAX_LENGTH);
