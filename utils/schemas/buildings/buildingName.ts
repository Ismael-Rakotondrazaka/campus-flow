export const BuildingNameSchema = z
  .string()
  .min(buildingConfig.NAME_MIN_LENGTH)
  .max(buildingConfig.NAME_MAX_LENGTH);
