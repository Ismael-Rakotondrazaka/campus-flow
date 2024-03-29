export default defineEventHandler(async (_event) => {
  try {
    const indexMaintenanceQuerySPR = await safeParseRequestQueryAs(
      IndexMaintenanceQuerySchema,
    );
    if (!indexMaintenanceQuerySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(
          indexMaintenanceQuerySPR.error,
        ),
      });
    }

    const maintenances: MaintenanceFull[] =
      await maintenanceRepository.findFullMany({
        where: indexMaintenanceQuerySPR.data.where,
        orderBy: indexMaintenanceQuerySPR.data.orderBy,
      });

    const buffer = await maintenancesToExportFormat(maintenances);

    setResponseHeader(
      _event,
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    );
    setResponseHeader(
      _event,
      "Content-Disposition",
      // eslint-disable-next-line quotes
      'attachment; filename="maintenances.xlsx"',
    );

    return buffer;
  } catch (error) {
    return handleUnknownError(error);
  }
});
