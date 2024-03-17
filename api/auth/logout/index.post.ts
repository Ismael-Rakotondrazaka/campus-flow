import { prismaCtx } from "#imports";

export default defineEventHandler(async (event): Promise<LogoutResponse> => {
  try {
    const logoutBodySPR = await safeParseRequestBodyAs(LogoutBodySchema);
    if (!logoutBodySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(logoutBodySPR.error),
      });
    }

    const userSession: UserSession | null = getUserSession();
    if (is.null(userSession)) {
      return createUnauthorizedError();
    }

    const data: RefreshTokenData | null = verifyRefreshToken(
      logoutBodySPR.data.refreshToken,
      {
        ignoreExpiration: true,
      },
    );

    // ! this user is trying to use an invalid refreshToken
    if (is.null(data)) {
      return createUnauthorizedError();
    }

    const refreshToken: prismaCtx.RefreshToken | null =
      await refreshTokenRepository.findOne({
        where: {
          token: logoutBodySPR.data.refreshToken,
        },
      });
    // ! this user is trying to reuse a refreshToken (maybe a bug in the client or a hacker)
    if (is.null(refreshToken)) {
      return createUnauthorizedError();
    }

    await refreshTokenRepository.deleteOne({
      where: {
        id: refreshToken.id,
      },
    });

    setResponseStatus(event, httpStatusCodes.StatusCodes.NO_CONTENT);
  } catch (error) {
    return handleUnknownError(error);
  }
});
