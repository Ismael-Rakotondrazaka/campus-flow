import { z } from "#imports";
import { Simplify } from "type-fest";

/* -------------------------------------------------------------------------- */
/*                             ResetPassword body                             */
/* -------------------------------------------------------------------------- */

export type ResetPasswordBody = {
  token: string;
  password: string;
};

export const ResetPasswordBodySchema: z.ZodType<Simplify<ResetPasswordBody>> =
  z.object({
    token: z.string(),
    password: passwordSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             ResetPassword data                             */
/* -------------------------------------------------------------------------- */

export type ResetPasswordData = {
  message: string;
};

/* -------------------------------------------------------------------------- */
/*                             ResetPassword error                            */
/* -------------------------------------------------------------------------- */

export type ResetPasswordBodyPEM = RequestErrorMessage<ResetPasswordBody>;

export type ResetPasswordError = RequestError<ResetPasswordBodyPEM>;

export type ResetPasswordResponse = RequestResponse<
  ResetPasswordData,
  ResetPasswordBody
>;
