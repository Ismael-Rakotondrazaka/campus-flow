export default defineEventHandler(
  async (): Promise<UpdateReservationResponse> => {
    try {
      const updateReservationParamSPR = await safeParseRequestParamAs(
        UpdateReservationParamSchema,
      );
      if (!updateReservationParamSPR.success) {
        return createNotFoundError();
      }

      const reservation: ReservationFull =
        await reservationRepository.findFullOneOrFail({
          where: {
            id: updateReservationParamSPR.data.id,
          },
        });

      const adminSession: AdminSession | null = getAdminSession();
      if (is.null(adminSession)) {
        return createUnauthorizedError();
      }
      if (
        !(
          adminSession.id === reservation.adminId ||
          adminSession.role === "ROOT"
        )
      ) {
        return createForbiddenError();
      }

      const updateReservationBodySPR = await safeParseRequestBodyAs(
        UpdateReservationBodySchema,
      );
      if (!updateReservationBodySPR.success) {
        return createBadRequestError({
          errorMessage: formatValidationErrorMessage(
            updateReservationBodySPR.error,
          ),
        });
      }

      if (reservation.status !== "PENDING" && adminSession.role !== "ROOT") {
        return createBadRequestError({
          message:
            "La réservation ne peut être modifiée une fois refusée, acceptée, ou validée.",
          errorMessage: {},
        });
      }

      if (updateReservationBodySPR.data.status === reservation.status) {
        return createBadRequestError({
          message: "Au moins une modification est requise.",
          errorMessage: {},
        });
      }

      const updatedReservation: ReservationFull =
        await reservationRepository.updateFullOne({
          where: {
            id: reservation.id,
          },
          data: {
            status: updateReservationBodySPR.data.status,
          },
        });

      const response: UpdateReservationResponse = {
        reservation: updatedReservation,
      };

      return UpdateReservationDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
