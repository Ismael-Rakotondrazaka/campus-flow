export default defineEventHandler(
  async (): Promise<IndexMaintenanceResponse> => {
    try {
      const indexMaintenanceQuerySPR = await safeParseRequestQueryAs(
        IndexMaintenanceQuerySchema,
      );
      if (!indexMaintenanceQuerySPR.success) {
        return createBadRequestError({
          errorMessage: formatValidationErrorMessage(
            indexMaintenanceQuerySPR.error,
          ),
        });
      }

      const totalCounts: number = await maintenanceRepository.count({
        where: indexMaintenanceQuerySPR.data.where,
        orderBy: indexMaintenanceQuerySPR.data.orderBy,
      });

      const pageSize: number = indexMaintenanceQuerySPR.data.pageSize;

      const totalPages: number = Math.ceil(
        totalCounts / indexMaintenanceQuerySPR.data.pageSize,
      );

      const currentPage: number = indexMaintenanceQuerySPR.data.page;

      const links: PaginationLinks = makePaginationLinks(
        currentPage,
        totalPages,
        pageSize,
      );

      const maintenances: MaintenanceFull[] =
        await maintenanceRepository.findFullMany({
          where: indexMaintenanceQuerySPR.data.where,
          orderBy: indexMaintenanceQuerySPR.data.orderBy,
          take: pageSize,
          skip: computePaginationSkip(currentPage, pageSize),
        });

      const response: IndexMaintenanceResponse = {
        count: maintenances.length,
        totalCounts,
        page: currentPage,
        pageSize,
        totalPages,
        links,
        maintenances,
      };

      return IndexMaintenanceDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
