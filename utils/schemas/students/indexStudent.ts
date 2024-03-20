import { z, prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import {
  StudentOrderByWithRelationInputSchema,
  StudentWhereInputSchema,
} from "~/prisma/generated/zod";

/* -------------------------------------------------------------------------- */
/*                             IndexStudent query                             */
/* -------------------------------------------------------------------------- */

export type IndexStudentQuery = Simplify<
  {
    where?: prismaCtx.Prisma.StudentWhereInput;
    orderBy?: prismaCtx.Prisma.StudentOrderByWithRelationInput;
  } & PaginationQuery
>;

// ! we this type on client-side
export type IndexStudentQueryInput = Partial<IndexStudentQuery>;

export const IndexStudentQuerySchema: z.ZodType<
  IndexStudentQuery,
  z.ZodTypeDef,
  IndexStudentQueryInput
> = z
  .object({
    where: StudentWhereInputSchema,
    orderBy: StudentOrderByWithRelationInputSchema,
  })
  .partial()
  .and(makePaginationQuery(studentConfig.PAGE_SIZE_DEFAULT_VALUE));

/* -------------------------------------------------------------------------- */
/*                             IndexStudent data                             */
/* -------------------------------------------------------------------------- */

export type IndexStudentData = Simplify<
  {
    students: StudentFull[];
  } & Pagination
>;

export const IndexStudentDataSchema: z.ZodType<IndexStudentData> = z
  .object({
    students: z.array(StudentFullSchema),
  })
  .and(PaginationSchema);

/* -------------------------------------------------------------------------- */
/*                             IndexStudent error                            */
/* -------------------------------------------------------------------------- */

export type IndexStudentQueryPEM = RequestErrorMessage<IndexStudentQuery>;

export type IndexStudentError = RequestError<IndexStudentQueryPEM>;

export type IndexStudentResponse = RequestResponse<
  IndexStudentData,
  IndexStudentQuery
>;
