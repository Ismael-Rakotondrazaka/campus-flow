import { z, prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import {
  LodgmentOrderByWithRelationInputSchema,
  LodgmentWhereInputSchema,
} from "~/prisma/generated/zod";

/* -------------------------------------------------------------------------- */
/*                             IndexLodgment query                             */
/* -------------------------------------------------------------------------- */

export type IndexLodgmentQuery = Simplify<
  {
    where?: prismaCtx.Prisma.LodgmentWhereInput;
    orderBy?: prismaCtx.Prisma.LodgmentOrderByWithRelationInput;
  } & PaginationQuery
>;

// ! we this type on client-side
export type IndexLodgmentQueryInput = Partial<IndexLodgmentQuery>;

export const IndexLodgmentQuerySchema: z.ZodType<
  IndexLodgmentQuery,
  z.ZodTypeDef,
  IndexLodgmentQueryInput
> = z
  .object({
    where: LodgmentWhereInputSchema,
    orderBy: LodgmentOrderByWithRelationInputSchema,
  })
  .partial()
  .and(makePaginationQuery(lodgmentConfig.PAGE_SIZE_DEFAULT_VALUE));

/* -------------------------------------------------------------------------- */
/*                             IndexLodgment data                             */
/* -------------------------------------------------------------------------- */

export type IndexLodgmentData = Simplify<
  {
    lodgments: LodgmentFull[];
  } & Pagination
>;

export const IndexLodgmentDataSchema: z.ZodType<IndexLodgmentData> = z
  .object({
    lodgments: z.array(LodgmentFullSchema),
  })
  .and(PaginationSchema);

/* -------------------------------------------------------------------------- */
/*                             IndexLodgment error                            */
/* -------------------------------------------------------------------------- */

export type IndexLodgmentQueryPEM = RequestErrorMessage<IndexLodgmentQuery>;

export type IndexLodgmentError = RequestError<IndexLodgmentQueryPEM>;

export type IndexLodgmentResponse = RequestResponse<
  IndexLodgmentData,
  IndexLodgmentQuery
>;
