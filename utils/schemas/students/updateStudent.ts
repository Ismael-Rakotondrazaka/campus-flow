import { prismaCtx, z } from "#imports";
import { RoleSchema } from "~/prisma/generated/zod";

/* -------------------------------------------------------------------------- */
/*                            UpdateStudent param                            */
/* -------------------------------------------------------------------------- */

export type UpdateStudentParam = {
  userId: number;
};

export const UpdateStudentParamSchema: z.ZodType<UpdateStudentParam> = z.object(
  {
    userId: IdentifierSchema,
  },
);

/* -------------------------------------------------------------------------- */
/*                             UpdateStudent body                             */
/* -------------------------------------------------------------------------- */

export type UpdateStudentBody = {
  name?: string | undefined;
  firstName?: string | undefined;
  phoneNumber?: string | undefined;
  profile?: File | undefined;
  role?: prismaCtx.$Enums.Role;
};

export const UpdateStudentBodySchema: z.ZodType<UpdateStudentBody> = z
  .object({
    name: UserNameSchema,
    firstName: UserFirstNameSchema,
    phoneNumber: PhoneNumberSchema,
    profile: FileSchema,
    role: RoleSchema,
  })
  .partial();

/* -------------------------------------------------------------------------- */
/*                             UpdateStudent data                             */
/* -------------------------------------------------------------------------- */

export type UpdateStudentData = {
  student: StudentFull;
};
export const UpdateStudentDataSchema: z.ZodType<UpdateStudentData> = z.object({
  student: StudentFullSchema,
});

/* -------------------------------------------------------------------------- */
/*                             UpdateStudent error                            */
/* -------------------------------------------------------------------------- */

export type UpdateStudentBodyPEM = RequestErrorMessage<UpdateStudentBody>;

export type UpdateStudentError = RequestError<UpdateStudentBodyPEM>;

export type UpdateStudentResponse = RequestResponse<
  UpdateStudentData,
  UpdateStudentBody
>;
