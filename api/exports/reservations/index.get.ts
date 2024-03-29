export default defineEventHandler(async (_event) => {
  try {
    const indexReservationQuerySPR = await safeParseRequestQueryAs(
      IndexReservationQuerySchema,
    );
    if (!indexReservationQuerySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(
          indexReservationQuerySPR.error,
        ),
      });
    }

    const reservations: ReservationFull[] =
      await reservationRepository.findFullMany({
        where: indexReservationQuerySPR.data.where,
        orderBy: indexReservationQuerySPR.data.orderBy,
      });

    const buffer = await reservationsToExportFormat(reservations);

    setResponseHeader(
      _event,
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    );
    setResponseHeader(
      _event,
      "Content-Disposition",
      // eslint-disable-next-line quotes
      'attachment; filename="reservations.xlsx"',
    );

    return buffer;
  } catch (error) {
    return handleUnknownError(error);
  }
});
