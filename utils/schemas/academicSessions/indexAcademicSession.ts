import { z, prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import {
  AcademicSessionOrderByWithRelationInputSchema,
  AcademicSessionSchema,
  AcademicSessionWhereInputSchema,
} from "~/prisma/generated/zod";

/* -------------------------------------------------------------------------- */
/*                             IndexAcademicSession query                             */
/* -------------------------------------------------------------------------- */

export type IndexAcademicSessionQuery = Simplify<
  {
    where?: prismaCtx.Prisma.AcademicSessionWhereInput;
    orderBy?: prismaCtx.Prisma.AcademicSessionOrderByWithRelationInput;
  } & PaginationQuery
>;

// ! we this type on client-side
export type IndexAcademicSessionQueryInput = Partial<IndexAcademicSessionQuery>;

export const IndexAcademicSessionQuerySchema: z.ZodType<
  IndexAcademicSessionQuery,
  z.ZodTypeDef,
  IndexAcademicSessionQueryInput
> = z
  .object({
    where: AcademicSessionWhereInputSchema,
    orderBy: AcademicSessionOrderByWithRelationInputSchema,
  })
  .partial()
  .and(makePaginationQuery(academicSessionConfig.PAGE_SIZE_DEFAULT_VALUE));

/* -------------------------------------------------------------------------- */
/*                             IndexAcademicSession data                             */
/* -------------------------------------------------------------------------- */

export type IndexAcademicSessionData = Simplify<
  {
    academicSessions: prismaCtx.AcademicSession[];
  } & Pagination
>;

export const IndexAcademicSessionDataSchema: z.ZodType<IndexAcademicSessionData> =
  z
    .object({
      academicSessions: z.array(AcademicSessionSchema),
    })
    .and(PaginationSchema);

/* -------------------------------------------------------------------------- */
/*                             IndexAcademicSession error                            */
/* -------------------------------------------------------------------------- */

export type IndexAcademicSessionQueryPEM =
  RequestErrorMessage<IndexAcademicSessionQuery>;

export type IndexAcademicSessionError =
  RequestError<IndexAcademicSessionQueryPEM>;

export type IndexAcademicSessionResponse = RequestResponse<
  IndexAcademicSessionData,
  IndexAcademicSessionQuery
>;
