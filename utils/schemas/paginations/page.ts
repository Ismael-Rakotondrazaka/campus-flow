import { z } from "zod";

export type Page = number;
export type PageInput = number | undefined;

export const PageSchema: z.ZodType<Page, z.ZodTypeDef, PageInput> = z.coerce
  .number()
  .positive()
  .int()
  .optional()
  .default(1);
