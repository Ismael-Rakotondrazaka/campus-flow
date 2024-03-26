export default defineEventHandler(
  async (): Promise<UpdateMaintainerResponse> => {
    try {
      const updateMaintainerParamSPR = await safeParseRequestParamAs(
        UpdateMaintainerParamSchema,
      );
      if (!updateMaintainerParamSPR.success) {
        return createNotFoundError();
      }

      const maintainer: MaintainerFull =
        await maintainerRepository.findFullOneOrFail({
          where: {
            id: updateMaintainerParamSPR.data.id,
          },
        });

      const adminSession: AdminSession | null = getAdminSession();
      if (is.null(adminSession)) {
        return createUnauthorizedError();
      }

      const updateMaintainerBodySPR = await safeParseRequestBodyAs(
        UpdateMaintainerBodySchema,
      );
      if (!updateMaintainerBodySPR.success) {
        return createBadRequestError({
          errorMessage: formatValidationErrorMessage(
            updateMaintainerBodySPR.error,
          ),
        });
      }

      if (
        !(
          (!is.undefined(updateMaintainerBodySPR.data.name) &&
            updateMaintainerBodySPR.data.name !== maintainer.name) ||
          (!is.undefined(updateMaintainerBodySPR.data.firstName) &&
            updateMaintainerBodySPR.data.firstName !== maintainer.firstName) ||
          (!is.undefined(updateMaintainerBodySPR.data.phoneNumber) &&
            updateMaintainerBodySPR.data.phoneNumber !== maintainer.phoneNumber)
        )
      ) {
        return createBadRequestError({
          message: "Au moins une modification est requise.",
          errorMessage: {},
        });
      }

      let profileUrl: string | undefined;
      if (!is.undefined(updateMaintainerBodySPR.data.profile)) {
        profileUrl = uploadUserProfile(updateMaintainerBodySPR.data.profile);
      }

      const updatedMaintainer: MaintainerFull =
        await maintainerRepository.updateFullOne({
          where: {
            id: maintainer.id,
          },
          data: {
            name: updateMaintainerBodySPR.data.name,
            firstName: updateMaintainerBodySPR.data.firstName,
            phoneNumber: updateMaintainerBodySPR.data.phoneNumber,
            profileUrl,
            updatedAt: new Date(),
          },
        });

      const response: UpdateMaintainerResponse = {
        maintainer: updatedMaintainer,
      };

      return UpdateMaintainerDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
