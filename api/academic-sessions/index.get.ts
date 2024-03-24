import { prismaCtx } from "#imports";

export default defineEventHandler(
  async (): Promise<IndexAcademicSessionResponse> => {
    try {
      const indexAcademicSessionQuerySPR = await safeParseRequestQueryAs(
        IndexAcademicSessionQuerySchema,
      );
      if (!indexAcademicSessionQuerySPR.success) {
        return createBadRequestError({
          errorMessage: formatValidationErrorMessage(
            indexAcademicSessionQuerySPR.error,
          ),
        });
      }

      const totalCounts: number = await academicSessionRepository.count({
        where: indexAcademicSessionQuerySPR.data.where,
      });

      const pageSize: number = indexAcademicSessionQuerySPR.data.pageSize;

      const totalPages: number = Math.ceil(
        totalCounts / indexAcademicSessionQuerySPR.data.pageSize,
      );

      const currentPage: number = indexAcademicSessionQuerySPR.data.page;

      const links: PaginationLinks = makePaginationLinks(
        currentPage,
        totalPages,
        pageSize,
      );

      const academicSessions: prismaCtx.AcademicSession[] =
        await academicSessionRepository.findMany({
          where: indexAcademicSessionQuerySPR.data.where,
          orderBy: indexAcademicSessionQuerySPR.data.orderBy,
          take: pageSize,
          skip: computePaginationSkip(currentPage, pageSize),
        });

      const response: IndexAcademicSessionResponse = {
        count: academicSessions.length,
        totalCounts,
        page: currentPage,
        pageSize,
        totalPages,
        links,
        academicSessions,
      };

      return IndexAcademicSessionDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
