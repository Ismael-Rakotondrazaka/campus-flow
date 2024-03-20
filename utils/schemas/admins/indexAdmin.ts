import { z, prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import {
  AdminOrderByWithRelationInputSchema,
  AdminWhereInputSchema,
} from "~/prisma/generated/zod";

/* -------------------------------------------------------------------------- */
/*                             IndexAdmin query                             */
/* -------------------------------------------------------------------------- */

export type IndexAdminQuery = Simplify<
  {
    where?: prismaCtx.Prisma.AdminWhereInput;
    orderBy?: prismaCtx.Prisma.AdminOrderByWithRelationInput;
  } & PaginationQuery
>;

// ! we this type on client-side
export type IndexAdminQueryInput = Partial<IndexAdminQuery>;

export const IndexAdminQuerySchema: z.ZodType<
  IndexAdminQuery,
  z.ZodTypeDef,
  IndexAdminQueryInput
> = z
  .object({
    where: AdminWhereInputSchema,
    orderBy: AdminOrderByWithRelationInputSchema,
  })
  .partial()
  .and(makePaginationQuery(adminConfig.PAGE_SIZE_DEFAULT_VALUE));

/* -------------------------------------------------------------------------- */
/*                             IndexAdmin data                             */
/* -------------------------------------------------------------------------- */

export type IndexAdminData = Simplify<
  {
    admins: AdminFull[];
  } & Pagination
>;

export const IndexAdminDataSchema: z.ZodType<IndexAdminData> = z
  .object({
    admins: z.array(AdminFullSchema),
  })
  .and(PaginationSchema);

/* -------------------------------------------------------------------------- */
/*                             IndexAdmin error                            */
/* -------------------------------------------------------------------------- */

export type IndexAdminQueryPEM = RequestErrorMessage<IndexAdminQuery>;

export type IndexAdminError = RequestError<IndexAdminQueryPEM>;

export type IndexAdminResponse = RequestResponse<
  IndexAdminData,
  IndexAdminQuery
>;
