import { z } from 'zod';

export const makePaginatedSchema = (arg?: {
  defaultPage?: number;
  defaultPageSize?: number;
}) => {
  const { defaultPage = 1, defaultPageSize = 20 } = arg ?? {};

  return z.object({
    page: z.coerce.number().positive().int().optional().default(defaultPage),
    pageSize: z.coerce
      .number()
      .positive()
      .int()
      .optional()
      .default(defaultPageSize),
  });
};
