import { z } from "#imports";

/* -------------------------------------------------------------------------- */
/*                                 Login body                                 */
/* -------------------------------------------------------------------------- */

export type LoginBody = {
  email: string;
  password: string;
};

export const LoginBodySchema: z.ZodType<LoginBody> = z.object({
  email: emailSchema,
  password: passwordSchema,
});

/* -------------------------------------------------------------------------- */
/*                                 Login data                                 */
/* -------------------------------------------------------------------------- */

export type LoginData = {
  accessToken: AccessToken;
  refreshToken: RefreshTokenFiltered;
};

export const LoginDataSchema: z.ZodType<LoginData> = z.object({
  accessToken: AccessTokenSchema,
  refreshToken: RefreshTokenSchema,
});

/* -------------------------------------------------------------------------- */
/*                                 Login error                                */
/* -------------------------------------------------------------------------- */

// * PEM: Parse Error Message
export type LoginBodyPEM = RequestErrorMessage<LoginBody>;

export type LoginError = RequestError<LoginBodyPEM>;

export type LoginResponse = RequestResponse<LoginData, LoginBody>;
