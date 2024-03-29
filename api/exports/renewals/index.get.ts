export default defineEventHandler(async (_event) => {
  try {
    const indexRenewalQuerySPR = await safeParseRequestQueryAs(
      IndexRenewalQuerySchema,
    );
    if (!indexRenewalQuerySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(indexRenewalQuerySPR.error),
      });
    }

    const renewals: RenewalFull[] = await renewalRepository.findFullMany({
      where: indexRenewalQuerySPR.data.where,
      orderBy: indexRenewalQuerySPR.data.orderBy,
    });

    const buffer = await renewalsToExportFormat(renewals);

    setResponseHeader(
      _event,
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    );
    setResponseHeader(
      _event,
      "Content-Disposition",
      // eslint-disable-next-line quotes
      'attachment; filename="renewals.xlsx"',
    );

    return buffer;
  } catch (error) {
    return handleUnknownError(error);
  }
});
