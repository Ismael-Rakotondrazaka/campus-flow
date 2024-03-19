import { z, prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import {
  MaintainerOrderByWithRelationInputSchema,
  MaintainerWhereInputSchema,
} from "~/prisma/generated/zod";

/* -------------------------------------------------------------------------- */
/*                             IndexMaintainer query                             */
/* -------------------------------------------------------------------------- */

export type IndexMaintainerQuery = Simplify<
  {
    where?: prismaCtx.Prisma.MaintainerWhereInput;
    orderBy?: prismaCtx.Prisma.MaintainerOrderByWithRelationInput;
  } & PaginationQuery
>;

// ! we this type on client-side
export type IndexMaintainerQueryInput = Partial<IndexMaintainerQuery>;

export const IndexMaintainerQuerySchema: z.ZodType<
  IndexMaintainerQuery,
  z.ZodTypeDef,
  IndexMaintainerQueryInput
> = z
  .object({
    where: MaintainerWhereInputSchema,
    orderBy: MaintainerOrderByWithRelationInputSchema,
  })
  .partial()
  .and(makePaginationQuery(maintainerConfig.PAGE_SIZE_DEFAULT_VALUE));

/* -------------------------------------------------------------------------- */
/*                             IndexMaintainer data                             */
/* -------------------------------------------------------------------------- */

export type IndexMaintainerData = Simplify<
  {
    maintainers: MaintainerFull[];
  } & Pagination
>;

export const IndexMaintainerDataSchema: z.ZodType<IndexMaintainerData> = z
  .object({
    maintainers: z.array(MaintainerFullSchema),
  })
  .and(PaginationSchema);

/* -------------------------------------------------------------------------- */
/*                             IndexMaintainer error                            */
/* -------------------------------------------------------------------------- */

export type IndexMaintainerQueryPEM = RequestErrorMessage<IndexMaintainerQuery>;

export type IndexMaintainerError = RequestError<IndexMaintainerQueryPEM>;

export type IndexMaintainerResponse = RequestResponse<
  IndexMaintainerData,
  IndexMaintainerQuery
>;
