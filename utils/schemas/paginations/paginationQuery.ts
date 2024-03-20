import { z } from "#imports";

export type PaginationQuery = {
  page: number;
  pageSize: number;
};

export const a: z.ZodType<
  PaginationQuery,
  z.ZodTypeDef,
  Partial<PaginationQuery>
> = z.object({
  page: PageSchema,
  pageSize: makePageSizeSchema(20),
});

export const makePaginationQuery = (
  defaultPageSize: number,
): z.ZodType<PaginationQuery, z.ZodTypeDef, Partial<PaginationQuery>> => {
  return z.object({
    page: PageSchema,
    pageSize: makePageSizeSchema(defaultPageSize),
  });
};
