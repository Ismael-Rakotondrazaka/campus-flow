export const passwordSchema = z
  .string()
  .min(passwordConfig.PASSWORD_MIN_LENGTH);
