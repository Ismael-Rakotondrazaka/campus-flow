import { prismaCtx } from "#imports";

export default defineEventHandler(async (): Promise<LoginResponse> => {
  try {
    const loginSPR = await safeParseRequestBodyAs(LoginBodySchema);
    if (!loginSPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(loginSPR.error),
      });
    }

    const user: UserComputed | null = await userRepository.findOne({
      where: {
        email: loginSPR.data.email,
      },
    });
    if (user === null) {
      return createBadRequestError({
        message: "Erreur de connexion : Identifiants invalides. Réessayez.",
        errorMessage: {},
      });
    }

    const isPasswordMatch: boolean = comparePassword(
      loginSPR.data.password,
      user.password,
    );
    if (!isPasswordMatch) {
      return createBadRequestError({
        message: "Erreur de connexion : Identifiants invalides. Réessayez.",
        errorMessage: {},
      });
    }

    let userSession: UserSession | undefined;

    const admin: prismaCtx.Admin | null = await adminRepository.findOne({
      where: {
        userId: user.id,
      },
    });

    const student: prismaCtx.Student | null = await studentRepository.findOne({
      where: {
        userId: user.id,
      },
    });

    if (admin !== null) {
      const adminSession: AdminSession = {
        email: user.email,
        firstName: user.firstName,
        fullName: user.fullName,
        name: user.name,
        id: user.id,
        role: admin.role,
      };

      userSession = adminSession;
    } else if (student !== null) {
      const studentSession: StudentSession = {
        email: user.email,
        firstName: user.firstName,
        fullName: user.fullName,
        name: user.name,
        id: user.id,
        NIC: student.NIC,
      };

      userSession = studentSession;
    } else {
      return createBadRequestError({
        message: "Erreur de connexion : Identifiants invalides. Réessayez.",
        errorMessage: {},
      });
    }

    const accessToken: AccessToken = createAccessToken(userSession);

    const refreshToken: RefreshTokenObject = createRefreshToken({
      id: user.id,
    });
    // we don't need to await this
    refreshTokenRepository.createOne({
      data: {
        token: refreshToken.token,
        userId: user.id,
        expiresAt: refreshToken.expiresAt,
        createdAt: new Date(),
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    return handleUnknownError(error);
  }
});
