import { z } from "#imports";

/* -------------------------------------------------------------------------- */
/*                                 Login body                                 */
/* -------------------------------------------------------------------------- */

export const LoginBodySchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginBody = z.infer<typeof LoginBodySchema>;

/* -------------------------------------------------------------------------- */
/*                                 Login data                                 */
/* -------------------------------------------------------------------------- */

export type LoginData = {
  accessToken: AccessToken;
  refreshToken: RefreshTokenObject;
};

/* -------------------------------------------------------------------------- */
/*                                 Login error                                */
/* -------------------------------------------------------------------------- */

// * PEM: Parse Error Message
export type LoginBodyPEM = RequestErrorMessage<LoginBody>;

export type LoginError = RequestError<LoginBodyPEM>;

export type LoginResponse = RequestResponse<LoginData, LoginBody>;
