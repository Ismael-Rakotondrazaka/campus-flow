export default defineEventHandler(
  async (): Promise<IndexReservationResponse> => {
    try {
      const adminSession: AdminSession | null = getAdminSession();
      if (is.null(adminSession)) {
        return createUnauthorizedError();
      }

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

      const totalCounts: number = await reservationRepository.count({
        where: indexReservationQuerySPR.data.where,
      });

      const pageSize: number = indexReservationQuerySPR.data.pageSize;

      const totalPages: number = Math.ceil(
        totalCounts / indexReservationQuerySPR.data.pageSize,
      );

      const currentPage: number = indexReservationQuerySPR.data.page;

      const links: PaginationLinks = makePaginationLinks(
        currentPage,
        totalPages,
        pageSize,
      );

      const reservations: ReservationFull[] =
        await reservationRepository.findFullMany({
          where: indexReservationQuerySPR.data.where,
          orderBy: indexReservationQuerySPR.data.orderBy,
          take: pageSize,
          skip: computePaginationSkip(currentPage, pageSize),
        });

      const response: IndexReservationResponse = {
        count: reservations.length,
        totalCounts,
        page: currentPage,
        pageSize,
        totalPages,
        links,
        reservations,
      };

      return IndexReservationDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
