import { prismaCtx, z } from "#imports";
import { FacultySchema } from "~/prisma/generated/zod";

/* -------------------------------------------------------------------------- */
/*                            ShowFaculty param                            */
/* -------------------------------------------------------------------------- */

export type ShowFacultyParam = {
  id: number;
};

export const ShowFacultyParamSchema: z.ZodType<ShowFacultyParam> = z.object({
  id: IdentifierSchema,
});

/* -------------------------------------------------------------------------- */
/*                             ShowFaculty data                             */
/* -------------------------------------------------------------------------- */

export type ShowFacultyData = {
  faculty: prismaCtx.Faculty;
};

export const ShowFacultyDataSchema: z.ZodType<ShowFacultyData> = z.object({
  faculty: FacultySchema,
});

/* -------------------------------------------------------------------------- */
/*                             ShowFaculty error                            */
/* -------------------------------------------------------------------------- */

export type ShowFacultyBodyPEM = RequestErrorMessage<Record<string, never>>;

export type ShowFacultyError = RequestError<ShowFacultyBodyPEM>;

export type ShowFacultyResponse = RequestResponse<
  ShowFacultyData,
  Record<string, never>
>;
