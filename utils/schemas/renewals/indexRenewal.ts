import { z, prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import {
  RenewalOrderByWithRelationInputSchema,
  RenewalWhereInputSchema,
} from "~/prisma/generated/zod";
import { RenewalFull, RenewalFullSchema } from "./renewalFull";

/* -------------------------------------------------------------------------- */
/*                             IndexRenewal query                             */
/* -------------------------------------------------------------------------- */

export type IndexRenewalQuery = Simplify<
  {
    where?: prismaCtx.Prisma.RenewalWhereInput;
    orderBy?: prismaCtx.Prisma.RenewalOrderByWithRelationInput;
  } & PaginationQuery
>;

// ! we this type on client-side
export type IndexRenewalQueryInput = Partial<IndexRenewalQuery>;

export const IndexRenewalQuerySchema: z.ZodType<
  IndexRenewalQuery,
  z.ZodTypeDef,
  IndexRenewalQueryInput
> = z
  .object({
    where: RenewalWhereInputSchema,
    orderBy: RenewalOrderByWithRelationInputSchema,
  })
  .partial()
  .and(makePaginationQuery(renewalConfig.PAGE_SIZE_DEFAULT_VALUE));

/* -------------------------------------------------------------------------- */
/*                             IndexRenewal data                             */
/* -------------------------------------------------------------------------- */

export type IndexRenewalData = Simplify<
  {
    renewals: RenewalFull[];
  } & Pagination
>;

export const IndexRenewalDataSchema: z.ZodType<IndexRenewalData> = z
  .object({
    renewals: z.array(RenewalFullSchema),
  })
  .and(PaginationSchema);

/* -------------------------------------------------------------------------- */
/*                             IndexRenewal error                            */
/* -------------------------------------------------------------------------- */

export type IndexRenewalQueryPEM = RequestErrorMessage<IndexRenewalQuery>;

export type IndexRenewalError = RequestError<IndexRenewalQueryPEM>;

export type IndexRenewalResponse = RequestResponse<
  IndexRenewalData,
  IndexRenewalQuery
>;
