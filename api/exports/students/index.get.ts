export default defineEventHandler(async (_event) => {
  try {
    const indexStudentQuerySPR = await safeParseRequestQueryAs(
      IndexStudentQuerySchema,
    );
    if (!indexStudentQuerySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(indexStudentQuerySPR.error),
      });
    }

    const students: StudentFull[] = await studentRepository.findFullMany({
      where: indexStudentQuerySPR.data.where,
      orderBy: indexStudentQuerySPR.data.orderBy,
    });

    const buffer = await studentsToExportFormat(students);

    setResponseHeader(
      _event,
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    );
    setResponseHeader(
      _event,
      "Content-Disposition",
      // eslint-disable-next-line quotes
      'attachment; filename="students.xlsx"',
    );

    return buffer;
  } catch (error) {
    return handleUnknownError(error);
  }
});
