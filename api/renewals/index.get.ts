export default defineEventHandler(async (): Promise<IndexRenewalResponse> => {
  try {
    const indexRenewalQuerySPR = await safeParseRequestQueryAs(
      IndexRenewalQuerySchema,
    );
    if (!indexRenewalQuerySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(indexRenewalQuerySPR.error),
      });
    }

    const totalCounts: number = await renewalRepository.count({
      where: indexRenewalQuerySPR.data.where,
    });

    const pageSize: number = indexRenewalQuerySPR.data.pageSize;

    const totalPages: number = Math.ceil(
      totalCounts / indexRenewalQuerySPR.data.pageSize,
    );

    const currentPage: number = indexRenewalQuerySPR.data.page;

    const links: PaginationLinks = makePaginationLinks(
      currentPage,
      totalPages,
      pageSize,
    );

    const renewals: RenewalFull[] = await renewalRepository.findFullMany({
      where: indexRenewalQuerySPR.data.where,
      orderBy: indexRenewalQuerySPR.data.orderBy,
      take: pageSize,
      skip: computePaginationSkip(currentPage, pageSize),
    });

    const response: IndexRenewalResponse = {
      count: renewals.length,
      totalCounts,
      page: currentPage,
      pageSize,
      totalPages,
      links,
      renewals,
    };

    return IndexRenewalDataSchema.parse(response);
  } catch (error) {
    return handleUnknownError(error);
  }
});
