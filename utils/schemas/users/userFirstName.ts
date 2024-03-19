export const UserFirstNameSchema = z
  .string()
  .trim()
  .min(userConfig.FIRST_NAME_MIN_LENGTH)
  .max(userConfig.FIRST_NAME_MAX_LENGTH);
