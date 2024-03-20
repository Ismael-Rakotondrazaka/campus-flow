export default defineEventHandler(async (): Promise<IndexBuildingResponse> => {
  try {
    const adminSession: AdminSession | null = getAdminSession();
    if (is.null(adminSession)) {
      return createUnauthorizedError();
    }

    const indexBuildingQuerySPR = await safeParseRequestQueryAs(
      IndexBuildingQuerySchema,
    );
    if (!indexBuildingQuerySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(indexBuildingQuerySPR.error),
      });
    }

    const totalCounts: number = await buildingRepository.count({
      where: indexBuildingQuerySPR.data.where,
    });

    const pageSize: number = indexBuildingQuerySPR.data.pageSize;

    const totalPages: number = Math.ceil(
      totalCounts / indexBuildingQuerySPR.data.pageSize,
    );

    const currentPage: number = indexBuildingQuerySPR.data.page;

    const links: PaginationLinks = makePaginationLinks(
      currentPage,
      totalPages,
      pageSize,
    );

    const buildings: BuildingFull[] = await buildingRepository.findFullMany({
      where: indexBuildingQuerySPR.data.where,
      orderBy: indexBuildingQuerySPR.data.orderBy,
      take: pageSize,
      skip: computePaginationSkip(currentPage, pageSize),
    });

    const response: IndexBuildingResponse = {
      count: buildings.length,
      totalCounts,
      page: currentPage,
      pageSize,
      totalPages,
      links,
      buildings,
    };

    return IndexBuildingDataSchema.parse(response);
  } catch (error) {
    return handleUnknownError(error);
  }
});
