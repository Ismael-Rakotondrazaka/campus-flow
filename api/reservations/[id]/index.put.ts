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

      if (
        !(
          reservation.status !== "PENDING" ||
          (reservation.status === "PENDING" && adminSession.role !== "ROOT")
        )
      ) {
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

      let assignedLodgment: LodgmentFull | null = null;

      if (updateReservationBodySPR.data.status === "VALIDATED") {
        if (reservation.status !== "ACCEPTED") {
          return createBadRequestError({
            message: "La réservation doit être acceptée avant d'être validée.",
            errorMessage: {
              status: "La réservation doit être acceptée avant d'être validée.",
            },
          });
        } else {
          assignedLodgment = await lodgmentRepository.findFullOne({
            where: {
              id: updateReservationBodySPR.data.lodgmentId,
            },
          });

          if (is.null(assignedLodgment)) {
            return createBadRequestError({
              errorMessage: {
                lodgmentId: "Le logement n'existe pas.",
              },
            });
          }
        }
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

      if (updateReservationBodySPR.data.status === "ACCEPTED") {
        await handleReservationAccepted(updatedReservation);
      } else if (updateReservationBodySPR.data.status === "REFUSED") {
        await handleReservationRefused(updatedReservation);
      } else if (updateReservationBodySPR.data.status === "VALIDATED") {
        await handleReservationValidated(updatedReservation, assignedLodgment!);
      }

      const response: UpdateReservationResponse = {
        reservation: updatedReservation,
      };

      return UpdateReservationDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
