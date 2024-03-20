import { prismaCtx, z } from "#imports";
import { FacultySchema } from "~/prisma/generated/zod";
import { FacultyNameSchema } from "./facultyNameSchema";

/* -------------------------------------------------------------------------- */
/*                             StoreFaculty body                             */
/* -------------------------------------------------------------------------- */

export type StoreFacultyBody = {
  name: string;
};

export const StoreFacultyBodySchema: z.ZodType<StoreFacultyBody> = z.object({
  name: FacultyNameSchema,
});

/* -------------------------------------------------------------------------- */
/*                             StoreFaculty data                             */
/* -------------------------------------------------------------------------- */

export type StoreFacultyData = {
  faculty: prismaCtx.Faculty;
};
export const StoreFacultyDataSchema: z.ZodType<StoreFacultyData> = z.object({
  faculty: FacultySchema,
});
/* -------------------------------------------------------------------------- */
/*                             StoreFaculty error                            */
/* -------------------------------------------------------------------------- */

export type StoreFacultyBodyPEM = RequestErrorMessage<StoreFacultyBody>;

export type StoreFacultyError = RequestError<StoreFacultyBodyPEM>;

export type StoreFacultyResponse = RequestResponse<
  StoreFacultyData,
  StoreFacultyBody
>;
