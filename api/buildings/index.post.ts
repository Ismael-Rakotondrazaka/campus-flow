export default defineEventHandler(async (): Promise<StoreBuildingResponse> => {
  try {
    const adminSession: AdminSession | null = getAdminSession();
    if (is.null(adminSession)) {
      return createUnauthorizedError();
    }

    const storeBuildingBodySPR = await safeParseRequestBodyAs(
      StoreBuildingBodySchema,
    );
    if (!storeBuildingBodySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(storeBuildingBodySPR.error),
      });
    }

    const illustrationUrl: string = uploadBuildingIllustration(
      storeBuildingBodySPR.data.illustration,
    );

    const building: BuildingFull = await buildingRepository.createFullOne({
      data: {
        floors: storeBuildingBodySPR.data.floors,
        name: storeBuildingBodySPR.data.name,
        illustrationUrl: illustrationUrl,
      },
    });

    return {
      building,
    };
  } catch (error) {
    return handleUnknownError(error);
  }
});
