export default defineEventHandler(async (): Promise<ShowBuildingResponse> => {
  try {
    const showBuildingParamSPR = await safeParseRequestParamAs(
      ShowBuildingParamSchema,
    );
    if (!showBuildingParamSPR.success) {
      return createNotFoundError();
    }

    const building: BuildingFull = await buildingRepository.findFullOneOrFail({
      where: {
        id: showBuildingParamSPR.data.id,
      },
    });

    const response: ShowBuildingResponse = {
      building,
    };

    return ShowBuildingDataSchema.parse(response);
  } catch (error) {
    return handleUnknownError(error);
  }
});
