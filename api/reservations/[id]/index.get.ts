export default defineEventHandler(
  async (): Promise<ShowReservationResponse> => {
    try {
      const showReservationParamSPR = await safeParseRequestParamAs(
        ShowReservationParamSchema,
      );
      if (!showReservationParamSPR.success) {
        return createNotFoundError();
      }

      const reservation: ReservationFull =
        await reservationRepository.findFullOneOrFail({
          where: {
            id: showReservationParamSPR.data.id,
          },
        });

      const response: ShowReservationResponse = {
        reservation,
      };

      return ShowReservationDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
