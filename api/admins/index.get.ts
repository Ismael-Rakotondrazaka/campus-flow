export default defineEventHandler(async (): Promise<IndexAdminResponse> => {
  try {
    const indexAdminQuerySPR = await safeParseRequestQueryAs(
      IndexAdminQuerySchema,
    );
    if (!indexAdminQuerySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(indexAdminQuerySPR.error),
      });
    }

    const totalCounts: number = await adminRepository.count({
      where: indexAdminQuerySPR.data.where,
    });

    const pageSize: number = indexAdminQuerySPR.data.pageSize;

    const totalPages: number = Math.ceil(
      totalCounts / indexAdminQuerySPR.data.pageSize,
    );

    const currentPage: number = indexAdminQuerySPR.data.page;

    const links: PaginationLinks = makePaginationLinks(
      currentPage,
      totalPages,
      pageSize,
    );

    const admins: AdminFull[] = await adminRepository.findFullMany({
      where: indexAdminQuerySPR.data.where,
      orderBy: indexAdminQuerySPR.data.orderBy,
      take: pageSize,
      skip: computePaginationSkip(currentPage, pageSize),
    });

    const response: IndexAdminResponse = {
      count: admins.length,
      totalCounts,
      page: currentPage,
      pageSize,
      totalPages,
      links,
      admins,
    };

    return IndexAdminDataSchema.parse(response);
  } catch (error) {
    return handleUnknownError(error);
  }
});
