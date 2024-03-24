import { prismaCtx, z } from "#imports";
import { FacultySchema } from "~/prisma/generated/zod";

/* -------------------------------------------------------------------------- */
/*                            DestroyFaculty param                            */
/* -------------------------------------------------------------------------- */

export type DestroyFacultyParam = {
  id: number;
};

export const DestroyFacultyParamSchema: z.ZodType<DestroyFacultyParam> =
  z.object({
    id: IdentifierSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             DestroyFaculty data                             */
/* -------------------------------------------------------------------------- */

export type DestroyFacultyData = {
  faculty: prismaCtx.Faculty;
};

export const DestroyFacultyDataSchema: z.ZodType<DestroyFacultyData> = z.object(
  {
    faculty: FacultySchema,
  },
);

/* -------------------------------------------------------------------------- */
/*                             DestroyFaculty error                            */
/* -------------------------------------------------------------------------- */

export type DestroyFacultyBodyPEM = RequestErrorMessage<Record<string, never>>;

export type DestroyFacultyError = RequestError<DestroyFacultyBodyPEM>;

export type DestroyFacultyResponse = RequestResponse<
  DestroyFacultyData,
  Record<string, never>
>;
