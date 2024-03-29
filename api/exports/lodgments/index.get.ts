export default defineEventHandler(async (_event) => {
  try {
    const indexLodgmentQuerySPR = await safeParseRequestQueryAs(
      IndexLodgmentQuerySchema,
    );
    if (!indexLodgmentQuerySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(indexLodgmentQuerySPR.error),
      });
    }

    const lodgments: LodgmentFull[] = await lodgmentRepository.findFullMany({
      where: indexLodgmentQuerySPR.data.where,
      orderBy: indexLodgmentQuerySPR.data.orderBy,
    });

    const buffer = await lodgmentsToExportFormat(lodgments);

    setResponseHeader(
      _event,
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    );
    setResponseHeader(
      _event,
      "Content-Disposition",
      // eslint-disable-next-line quotes
      'attachment; filename="lodgments.xlsx"',
    );

    return buffer;
  } catch (error) {
    return handleUnknownError(error);
  }
});
