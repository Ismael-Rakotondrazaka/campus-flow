export default defineEventHandler(
  async (): Promise<IndexMaintainerResponse> => {
    try {
      const indexMaintainerQuerySPR = await safeParseRequestQueryAs(
        IndexMaintainerQuerySchema,
      );
      if (!indexMaintainerQuerySPR.success) {
        return createBadRequestError({
          errorMessage: formatValidationErrorMessage(
            indexMaintainerQuerySPR.error,
          ),
        });
      }

      const totalCounts: number = await maintainerRepository.count({
        where: indexMaintainerQuerySPR.data.where,
        orderBy: indexMaintainerQuerySPR.data.orderBy,
      });

      const pageSize: number = indexMaintainerQuerySPR.data.pageSize;

      const totalPages: number = Math.ceil(
        totalCounts / indexMaintainerQuerySPR.data.pageSize,
      );

      const currentPage: number = indexMaintainerQuerySPR.data.page;

      const links: PaginationLinks = makePaginationLinks(
        currentPage,
        totalPages,
        pageSize,
      );

      const maintainers: MaintainerFull[] =
        await maintainerRepository.findFullMany({
          where: indexMaintainerQuerySPR.data.where,
          orderBy: indexMaintainerQuerySPR.data.orderBy,
          take: pageSize,
          skip: computePaginationSkip(currentPage, pageSize),
        });

      const response: IndexMaintainerResponse = {
        count: maintainers.length,
        totalCounts,
        page: currentPage,
        pageSize,
        totalPages,
        links,
        maintainers,
      };

      return IndexMaintainerDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
