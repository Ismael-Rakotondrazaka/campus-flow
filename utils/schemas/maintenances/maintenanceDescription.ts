import { z } from "zod";

export const MaintenanceDescriptionSchema = z.union([
  z.string().trim().max(maintenanceConfig.DESCRIPTION_MAX_LENGTH),
  CustomNullSchema,
]);
