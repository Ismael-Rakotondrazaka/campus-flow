import { prismaCtx, z } from "#imports";
import { FacultySchema } from "~/prisma/generated/zod";
import { FacultyNameSchema } from "./facultyNameSchema";

/* -------------------------------------------------------------------------- */
/*                            UpdateFaculty param                            */
/* -------------------------------------------------------------------------- */

export type UpdateFacultyParam = {
  id: number;
};

export const UpdateFacultyParamSchema: z.ZodType<UpdateFacultyParam> = z.object(
  {
    id: IdentifierSchema,
  },
);

/* -------------------------------------------------------------------------- */
/*                             UpdateFaculty body                             */
/* -------------------------------------------------------------------------- */

export type UpdateFacultyBody = {
  name?: string | undefined;
};

export const UpdateFacultyBodySchema: z.ZodType<UpdateFacultyBody> = z
  .object({
    name: FacultyNameSchema,
  })
  .partial();

/* -------------------------------------------------------------------------- */
/*                             UpdateFaculty data                             */
/* -------------------------------------------------------------------------- */

export type UpdateFacultyData = {
  faculty: prismaCtx.Faculty;
};
export const UpdateFacultyDataSchema: z.ZodType<UpdateFacultyData> = z.object({
  faculty: FacultySchema,
});

/* -------------------------------------------------------------------------- */
/*                             UpdateFaculty error                            */
/* -------------------------------------------------------------------------- */

export type UpdateFacultyBodyPEM = RequestErrorMessage<UpdateFacultyBody>;

export type UpdateFacultyError = RequestError<UpdateFacultyBodyPEM>;

export type UpdateFacultyResponse = RequestResponse<
  UpdateFacultyData,
  UpdateFacultyBody
>;
