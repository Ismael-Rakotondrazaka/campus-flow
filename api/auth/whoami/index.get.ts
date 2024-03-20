export default defineEventHandler(async (): Promise<WhoAmIResponse> => {
  try {
    const userSession: UserSession | null = getUserSession();

    if (is.null(userSession)) {
      return {
        user: null,
      };
    }

    const authUser: UserFull | null = await userRepository.findFullOne({
      where: {
        id: userSession.id,
        email: userSession.email,
      },
    });

    if (is.null(authUser)) {
      return {
        user: null,
      };
    }

    const WhoAmIData: WhoAmIData = {
      user: authUser,
    };

    return WhoAmIDataSchema.parse(WhoAmIData);
  } catch (error) {
    return handleUnknownError(error);
  }
});
