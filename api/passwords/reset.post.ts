export default defineEventHandler(async (): Promise<ResetPasswordResponse> => {
  try {
    const resetPasswordBodySPR = await safeParseRequestBodyAs(
      ResetPasswordBodySchema,
    );
    if (!resetPasswordBodySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(resetPasswordBodySPR.error),
      });
    }

    const resetRequestPasswordTokenData: ResetPasswordTokenData | null =
      verifyResetPasswordToken(resetPasswordBodySPR.data.token);
    if (is.null(resetRequestPasswordTokenData)) {
      return createBadRequestError({
        message: "Le lien que vous avez utilisé n'est plus valide.",
        errorMessage: {},
      });
    }

    const user: UserComputed | null = await userRepository.findOne({
      where: {
        id: resetRequestPasswordTokenData.id,
        deletedAt: null,
      },
    });
    if (is.null(user)) {
      return createBadRequestError({
        message: "Le lien que vous avez utilisé n'est plus valide.",
        errorMessage: {},
      });
    }

    const hashedPassword: string = hashPassword(
      resetPasswordBodySPR.data.password,
    );

    await userRepository.updateOne({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        updatedAt: new Date(),
      },
    });

    const response: ResetPasswordResponse = {
      message: "Mot de passe réinitialisé avec succès.",
    };

    sendResetPasswordEmail({
      email: user.email,
      fullName: user.fullName,
    });

    return response;
  } catch (error) {
    return handleUnknownError(error);
  }
});
