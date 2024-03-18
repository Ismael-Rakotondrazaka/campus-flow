import { z } from "#imports";

/* -------------------------------------------------------------------------- */
/*                           UpdateRefreshToken body                          */
/* -------------------------------------------------------------------------- */

export type UpdateRefreshTokenBody = {
  refreshToken: string;
};

export const UpdateRefreshTokenBodySchema: z.ZodType<UpdateRefreshTokenBody> =
  z.object({
    refreshToken: z.string(),
  });

/* -------------------------------------------------------------------------- */
/*                           UpdateRefreshToken data                          */
/* -------------------------------------------------------------------------- */

export type UpdateRefreshTokenData = {
  accessToken: AccessToken;
  refreshToken: RefreshTokenObject;
};

/* -------------------------------------------------------------------------- */
/*                          UpdateRefreshToken error                          */
/* -------------------------------------------------------------------------- */

export type UpdateRefreshTokenBodyPEM =
  RequestErrorMessage<UpdateRefreshTokenBody>;

export type UpdateRefreshTokenError = RequestError<UpdateRefreshTokenBodyPEM>;

export type UpdateRefreshTokenResponse = RequestResponse<
  UpdateRefreshTokenData,
  UpdateRefreshTokenBody
>;
