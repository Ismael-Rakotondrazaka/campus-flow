export default defineEventHandler(
  async (): Promise<UpdateRefreshTokenResponse> => {
    try {
      const updateRefreshTokenSPR = await safeParseRequestBodyAs(
        UpdateRefreshTokenBodySchema,
      );
      if (!updateRefreshTokenSPR.success) {
        return createBadRequestError({
          errorMessage: formatValidationErrorMessage(
            updateRefreshTokenSPR.error,
          ),
        });
      }

      const authUser: UserFull | null = await userRepository.findFullOne({
        where: {
          refreshTokens: {
            some: {
              token: updateRefreshTokenSPR.data.refreshToken,
            },
          },
        },
      });

      // the refreshToken does not exist
      if (is.null(authUser)) {
        const refreshTokenData: RefreshTokenData | null = verifyRefreshToken(
          updateRefreshTokenSPR.data.refreshToken,
        );

        // ! this user is trying to use inexistant refreshToken
        if (is.null(refreshTokenData)) {
          return createUnauthorizedError();
        }

        const hackedUser: UserComputed | null = await userRepository.findOne({
          where: {
            id: refreshTokenData.id,
          },
        });

        /*
          the token is valid but the user doesn't exist because :
          ! the refreshTokenSecret has been leaked
          or
          ! the user's account has been deleted
        */
        if (is.null(hackedUser)) {
          return createUnauthorizedError();
        }

        /*
          the refreshToken doesn't exist but still valid because
          ! - the user's account has been hacked (REFRESH_TOKEN REUSED)
          so we need to revoke all of his refreshTokens
         */
        await refreshTokenRepository.deleteMany({
          where: {
            userId: hackedUser.id,
          },
        });
        return createUnauthorizedError();
      } else {
        const refreshTokenData: RefreshTokenData | null = verifyRefreshToken(
          updateRefreshTokenSPR.data.refreshToken,
        );

        /*
          ! - the token is expired
          or
          ! - the refreshTokenSecret has been changed
        */
        if (is.null(refreshTokenData)) {
          return createUnauthorizedError();
        }

        /*
          refresh token is valid but it doesn't belong to the user because:
          ! - the refreshTokenSecret has been leaked
          so revoke all of refreshTokens of both to protect them
        */
        if (refreshTokenData.id !== authUser.id) {
          return createUnauthorizedError();
        }
        await refreshTokenRepository.deleteMany({
          where: {
            userId: {
              in: [refreshTokenData.id, authUser.id],
            },
          },
        });

        /* eslint-disable @typescript-eslint/indent, indent */
        const userSession: UserSession = isUserAdminFull(authUser)
          ? {
              email: authUser.email,
              firstName: authUser.firstName,
              fullName: authUser.fullName,
              name: authUser.name,
              id: authUser.id,
              role: authUser.admin.role,
            }
          : {
              email: authUser.email,
              firstName: authUser.firstName,
              fullName: authUser.fullName,
              name: authUser.name,
              id: authUser.id,
              NIC: authUser.student.NIC,
            };
        /* eslint-enable @typescript-eslint/indent, indent */

        // delete old refreshToken
        refreshTokenRepository.deleteMany({
          where: {
            token: updateRefreshTokenSPR.data.refreshToken,
          },
        });

        const newAccessToken: AccessToken = createAccessToken(userSession);

        const newRefreshToken: RefreshTokenFiltered = createRefreshToken({
          id: authUser.id,
        });
        // save new RefreshToken
        refreshTokenRepository.createOne({
          data: {
            token: newRefreshToken.token,
            expiresAt: newRefreshToken.expiresAt,
            userId: authUser.id,
            createdAt: new Date(),
          },
        });

        return {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        };
      }
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
