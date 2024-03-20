import { z } from "#imports";

/* -------------------------------------------------------------------------- */
/*                            DestroyStudent param                            */
/* -------------------------------------------------------------------------- */

export type DestroyStudentParam = {
  id: number;
};

export const DestroyStudentParamSchema: z.ZodType<DestroyStudentParam> =
  z.object({
    id: IdentifierSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             DestroyStudent data                             */
/* -------------------------------------------------------------------------- */

export type DestroyStudentData = void;

/* -------------------------------------------------------------------------- */
/*                             DestroyStudent error                            */
/* -------------------------------------------------------------------------- */

export type DestroyStudentBodyPEM = RequestErrorMessage<Record<string, never>>;

export type DestroyStudentError = RequestError<DestroyStudentBodyPEM>;

export type DestroyStudentResponse = RequestResponse<
  DestroyStudentData,
  Record<string, never>
>;
