export default defineEventHandler(async (): Promise<IndexLodgmentResponse> => {
  try {
    const adminSession: AdminSession | null = getAdminSession();
    if (is.null(adminSession)) {
      return createUnauthorizedError();
    }

    const indexLodgmentQuerySPR = await safeParseRequestQueryAs(
      IndexLodgmentQuerySchema,
    );
    if (!indexLodgmentQuerySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(indexLodgmentQuerySPR.error),
      });
    }

    const totalCounts: number = await lodgmentRepository.count({
      where: indexLodgmentQuerySPR.data.where,
    });

    const pageSize: number = indexLodgmentQuerySPR.data.pageSize;

    const totalPages: number = Math.ceil(
      totalCounts / indexLodgmentQuerySPR.data.pageSize,
    );

    const currentPage: number = indexLodgmentQuerySPR.data.page;

    const links: PaginationLinks = makePaginationLinks(
      currentPage,
      totalPages,
      pageSize,
    );

    const lodgments: LodgmentFull[] = await lodgmentRepository.findFullMany({
      where: indexLodgmentQuerySPR.data.where,
      orderBy: indexLodgmentQuerySPR.data.orderBy,
      take: pageSize,
      skip: computePaginationSkip(currentPage, pageSize),
    });

    const response: IndexLodgmentResponse = {
      count: lodgments.length,
      totalCounts,
      page: currentPage,
      pageSize,
      totalPages,
      links,
      lodgments,
    };

    return IndexLodgmentDataSchema.parse(response);
  } catch (error) {
    return handleUnknownError(error);
  }
});
