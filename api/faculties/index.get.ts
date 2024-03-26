import { prismaCtx } from "#imports";

export default defineEventHandler(async (): Promise<IndexFacultyResponse> => {
  try {
    const indexFacultyQuerySPR = await safeParseRequestQueryAs(
      IndexFacultyQuerySchema,
    );
    if (!indexFacultyQuerySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(indexFacultyQuerySPR.error),
      });
    }

    const totalCounts: number = await facultyRepository.count({
      where: indexFacultyQuerySPR.data.where,
      orderBy: indexFacultyQuerySPR.data.orderBy,
    });

    const pageSize: number = indexFacultyQuerySPR.data.pageSize;

    const totalPages: number = Math.ceil(
      totalCounts / indexFacultyQuerySPR.data.pageSize,
    );

    const currentPage: number = indexFacultyQuerySPR.data.page;

    const links: PaginationLinks = makePaginationLinks(
      currentPage,
      totalPages,
      pageSize,
    );

    const faculties: prismaCtx.Faculty[] = await facultyRepository.findMany({
      where: indexFacultyQuerySPR.data.where,
      orderBy: indexFacultyQuerySPR.data.orderBy,
      take: pageSize,
      skip: computePaginationSkip(currentPage, pageSize),
    });

    const response: IndexFacultyResponse = {
      count: faculties.length,
      totalCounts,
      page: currentPage,
      pageSize,
      totalPages,
      links,
      faculties,
    };

    return IndexFacultyDataSchema.parse(response);
  } catch (error) {
    return handleUnknownError(error);
  }
});
