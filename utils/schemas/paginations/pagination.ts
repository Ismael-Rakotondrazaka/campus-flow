import { z } from "#imports";
import { PaginationLinksSchema, PaginationLinks } from "./paginationLink";

export type Pagination = {
  count: number;
  totalCounts: number;
  page: number;
  pageSize: number;
  totalPages: number;
  links: PaginationLinks;
};

export const PaginationSchema: z.ZodType<Pagination> = z.object({
  count: z.coerce.number(),
  totalCounts: z.coerce.number(),
  page: z.coerce.number(),
  pageSize: z.coerce.number(),
  totalPages: z.coerce.number(),
  links: PaginationLinksSchema,
});
