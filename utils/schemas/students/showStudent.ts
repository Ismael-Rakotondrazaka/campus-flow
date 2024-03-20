import { z } from "#imports";

/* -------------------------------------------------------------------------- */
/*                            ShowStudent param                            */
/* -------------------------------------------------------------------------- */

export type ShowStudentParam = {
  userId: number;
};

export const ShowStudentParamSchema: z.ZodType<ShowStudentParam> = z.object({
  userId: IdentifierSchema,
});

/* -------------------------------------------------------------------------- */
/*                             ShowStudent data                             */
/* -------------------------------------------------------------------------- */

export type ShowStudentData = {
  student: StudentFull;
};

export const ShowStudentDataSchema: z.ZodType<ShowStudentData> = z.object({
  student: StudentFullSchema,
});

/* -------------------------------------------------------------------------- */
/*                             ShowStudent error                            */
/* -------------------------------------------------------------------------- */

export type ShowStudentBodyPEM = RequestErrorMessage<Record<string, never>>;

export type ShowStudentError = RequestError<ShowStudentBodyPEM>;

export type ShowStudentResponse = RequestResponse<
  ShowStudentData,
  Record<string, never>
>;
