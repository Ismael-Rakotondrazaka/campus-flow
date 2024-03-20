import { z } from "zod";

export const MaintenanceDescriptionSchema /* : z.ZodType<string | null> */ =
  z.union([
    CustomNullSchema,
    z.string().trim().max(maintenanceConfig.DESCRIPTION_MAX_LENGTH),
  ]);
