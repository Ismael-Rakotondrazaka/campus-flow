export const MaintainerNameSchema = z
  .string()
  .min(maintainerConfig.NAME_MIN_LENGTH)
  .max(maintainerConfig.NAME_MAX_LENGTH);
