export default defineEventHandler(async (): Promise<UpdateBuildingResponse> => {
  try {
    const updateBuildingParamSPR = await safeParseRequestParamAs(
      UpdateBuildingParamSchema
    );
    if (!updateBuildingParamSPR.success) {
      return createNotFoundError();
    }

    const building: BuildingFull = await buildingRepository.findFullOneOrFail({
      where: {
        id: updateBuildingParamSPR.data.id,
      },
    });

    const adminSession: AdminSession | null = getAdminSession();
    if (is.null(adminSession)) {
      return createUnauthorizedError();
    }

    const updateBuildingBodySPR = await safeParseRequestBodyAs(
      UpdateBuildingBodySchema
    );
    if (!updateBuildingBodySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(updateBuildingBodySPR.error),
      });
    }

    const hasSameFloor =
      !is.undefined(updateBuildingBodySPR.data.floors) &&
      updateBuildingBodySPR.data.floors === building.floors;

    const hasSameName =
      !is.undefined(updateBuildingBodySPR.data.name) &&
      updateBuildingBodySPR.data.name === building.name;

    const newIllustrationNotProvided = is.undefined(
      updateBuildingBodySPR.data.illustration
    );

    if (hasSameFloor && hasSameName && newIllustrationNotProvided) {
      return createBadRequestError({
        message: "Au moins une modification est requise.",
        errorMessage: {},
      });
    }

    let floors: number | undefined;
    if (!is.undefined(updateBuildingBodySPR.data.floors)) {
      floors = updateBuildingBodySPR.data.floors;
    }

    let name: string | undefined;
    if (!is.undefined(updateBuildingBodySPR.data.name)) {
      name = updateBuildingBodySPR.data.name;
    }

    let illustrationUrl: string | undefined;
    if (!is.undefined(updateBuildingBodySPR.data.illustration)) {
      illustrationUrl = uploadBuildingIllustration(
        updateBuildingBodySPR.data.illustration
      );
    }

    const updatedBuilding: BuildingFull =
      await buildingRepository.updateFullOne({
        where: {
          id: building.id,
        },
        data: {
          floors,
          name,
          illustrationUrl,
          updatedAt: new Date(),
        },
      });

    return {
      building: updatedBuilding,
    };
  } catch (error) {
    return handleUnknownError(error);
  }
});
