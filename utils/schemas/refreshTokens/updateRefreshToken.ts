import { z } from "#imports";

/* -------------------------------------------------------------------------- */
/*                           UpdateRefreshToken body                          */
/* -------------------------------------------------------------------------- */

export const UpdateRefreshTokenBodySchema = z.object({
  refreshToken: z.string(),
});

export type UpdateRefreshTokenBody = z.infer<
  typeof UpdateRefreshTokenBodySchema
>;

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
