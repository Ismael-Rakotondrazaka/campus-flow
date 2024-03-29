export default defineEventHandler(async (_event) => {
  try {
    const indexBuildingQuerySPR = await safeParseRequestQueryAs(
      IndexBuildingQuerySchema,
    );
    if (!indexBuildingQuerySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(indexBuildingQuerySPR.error),
      });
    }

    const buildings: BuildingFull[] = await buildingRepository.findFullMany({
      where: indexBuildingQuerySPR.data.where,
      orderBy: indexBuildingQuerySPR.data.orderBy,
    });

    const buffer = await buildingsToExportFormat(buildings);

    setResponseHeader(
      _event,
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    );
    setResponseHeader(
      _event,
      "Content-Disposition",
      // eslint-disable-next-line quotes
      'attachment; filename="buildings.xlsx"',
    );

    return buffer;
  } catch (error) {
    return handleUnknownError(error);
  }
});
