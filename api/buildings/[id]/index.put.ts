export default defineEventHandler(async (): Promise<UpdateBuildingResponse> => {
  try {
    const updateBuildingParamSPR = await safeParseRequestParamAs(
      UpdateBuildingParamSchema,
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
      UpdateBuildingBodySchema,
    );
    if (!updateBuildingBodySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(updateBuildingBodySPR.error),
      });
    }

    if (
      (!is.undefined(updateBuildingBodySPR.data.floors) &&
        updateBuildingBodySPR.data.floors === building.floors) ||
      (!is.undefined(updateBuildingBodySPR.data.name) &&
        updateBuildingBodySPR.data.name === building.name) ||
      (is.undefined(updateBuildingBodySPR.data.illustration) &&
        is.undefined(updateBuildingBodySPR.data.floors) &&
        is.undefined(updateBuildingBodySPR.data.name))
    ) {
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
        updateBuildingBodySPR.data.illustration,
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
        },
      });

    return {
      building: updatedBuilding,
    };
  } catch (error) {
    return handleUnknownError(error);
  }
});
