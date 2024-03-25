export default defineEventHandler(
  async (): Promise<ResetRequestPasswordResponse> => {
    try {
      const resetRequestPasswordBodySPR = await safeParseRequestBodyAs(
        ResetRequestPasswordBodySchema,
      );
      if (!resetRequestPasswordBodySPR.success) {
        return createBadRequestError({
          errorMessage: formatValidationErrorMessage(
            resetRequestPasswordBodySPR.error,
          ),
        });
      }

      const user: UserComputed | null = await userRepository.findOne({
        where: {
          email: resetRequestPasswordBodySPR.data.email,
          deletedAt: null,
        },
      });
      // ! if the user doesn't exist, we just ignore it, we don't throw error
      if (is.null(user)) {
        return {
          message: "L'email de changement de mot de passe envoyé avec succès.",
        };
      }

      const resetPasswordToken: ResetPasswordToken = createResetPasswordToken({
        id: user.id,
      });

      sendResetRequestPasswordEmail({
        token: resetPasswordToken.token,
        email: user.email,
        expiresAt: resetPasswordToken.expiresAt,
        fullName: user.fullName,
      });

      const response: ResetRequestPasswordResponse = {
        message: "L'email de changement de mot de passe envoyé avec succès.",
      };

      return response;
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
