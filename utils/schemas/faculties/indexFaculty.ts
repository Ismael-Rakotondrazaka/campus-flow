import { z, prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import {
  FacultyOrderByWithRelationInputSchema,
  FacultySchema,
  FacultyWhereInputSchema,
} from "~/prisma/generated/zod";

/* -------------------------------------------------------------------------- */
/*                             IndexFaculty query                             */
/* -------------------------------------------------------------------------- */

export type IndexFacultyQuery = Simplify<
  {
    where?: prismaCtx.Prisma.FacultyWhereInput;
    orderBy?: prismaCtx.Prisma.FacultyOrderByWithRelationInput;
  } & PaginationQuery
>;

// ! we this type on client-side
export type IndexFacultyQueryInput = Partial<IndexFacultyQuery>;

export const IndexFacultyQuerySchema: z.ZodType<
  IndexFacultyQuery,
  z.ZodTypeDef,
  IndexFacultyQueryInput
> = z
  .object({
    where: FacultyWhereInputSchema,
    orderBy: FacultyOrderByWithRelationInputSchema,
  })
  .partial()
  .and(makePaginationQuery(facultyConfig.PAGE_SIZE_DEFAULT_VALUE));

/* -------------------------------------------------------------------------- */
/*                             IndexFaculty data                             */
/* -------------------------------------------------------------------------- */

export type IndexFacultyData = Simplify<
  {
    faculties: prismaCtx.Faculty[];
  } & Pagination
>;

export const IndexFacultyDataSchema: z.ZodType<IndexFacultyData> = z
  .object({
    faculties: z.array(FacultySchema),
  })
  .and(PaginationSchema);

/* -------------------------------------------------------------------------- */
/*                             IndexFaculty error                            */
/* -------------------------------------------------------------------------- */

export type IndexFacultyQueryPEM = RequestErrorMessage<IndexFacultyQuery>;

export type IndexFacultyError = RequestError<IndexFacultyQueryPEM>;

export type IndexFacultyResponse = RequestResponse<
  IndexFacultyData,
  IndexFacultyQuery
>;
