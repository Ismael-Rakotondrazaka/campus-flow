export default defineEventHandler(async (): Promise<IndexStudentResponse> => {
  try {
    const indexStudentQuerySPR = await safeParseRequestQueryAs(
      IndexStudentQuerySchema,
    );
    if (!indexStudentQuerySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(indexStudentQuerySPR.error),
      });
    }

    const totalCounts: number = await studentRepository.count({
      where: indexStudentQuerySPR.data.where,
    });

    const pageSize: number = indexStudentQuerySPR.data.pageSize;

    const totalPages: number = Math.ceil(
      totalCounts / indexStudentQuerySPR.data.pageSize,
    );

    const currentPage: number = indexStudentQuerySPR.data.page;

    const links: PaginationLinks = makePaginationLinks(
      currentPage,
      totalPages,
      pageSize,
    );

    const students: StudentFull[] = await studentRepository.findFullMany({
      where: indexStudentQuerySPR.data.where,
      orderBy: indexStudentQuerySPR.data.orderBy,
      take: pageSize,
      skip: computePaginationSkip(currentPage, pageSize),
    });

    const response: IndexStudentResponse = {
      count: students.length,
      totalCounts,
      page: currentPage,
      pageSize,
      totalPages,
      links,
      students,
    };

    return IndexStudentDataSchema.parse(response);
  } catch (error) {
    return handleUnknownError(error);
  }
});
