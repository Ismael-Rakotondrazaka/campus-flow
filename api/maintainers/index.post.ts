export default defineEventHandler(
  async (): Promise<StoreMaintainerResponse> => {
    try {
      const adminSession: AdminSession | null = getAdminSession();
      if (is.null(adminSession)) {
        return createUnauthorizedError();
      }

      const storeMaintainerBodySPR = await safeParseRequestBodyAs(
        StoreMaintainerBodySchema,
      );
      if (!storeMaintainerBodySPR.success) {
        return createBadRequestError({
          errorMessage: formatValidationErrorMessage(
            storeMaintainerBodySPR.error,
          ),
        });
      }

      const profileUrl: string = uploadUserProfile(
        storeMaintainerBodySPR.data.profile,
      );

      const maintainer: MaintainerFull =
        await maintainerRepository.createFullOne({
          data: {
            name: storeMaintainerBodySPR.data.name,
            firstName: storeMaintainerBodySPR.data.firstName,
            phoneNumber: storeMaintainerBodySPR.data.phoneNumber,
            profileUrl,
          },
        });

      const response: StoreMaintainerResponse = {
        maintainer,
      };

      return StoreMaintainerDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
