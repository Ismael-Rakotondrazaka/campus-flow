export const MaintainerFirstNameSchema = z
  .string()
  .min(maintainerConfig.FIRST_NAME_MIN_LENGTH)
  .max(maintainerConfig.FIRST_NAME_MAX_LENGTH);
