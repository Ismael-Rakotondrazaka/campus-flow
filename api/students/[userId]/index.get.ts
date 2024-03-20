export default defineEventHandler(async (): Promise<ShowStudentResponse> => {
  try {
    const showStudentParamSPR = await safeParseRequestParamAs(
      ShowStudentParamSchema,
    );
    if (!showStudentParamSPR.success) {
      return createNotFoundError();
    }

    const student: StudentFull = await studentRepository.findFullOneOrFail({
      where: {
        userId: showStudentParamSPR.data.userId,
      },
    });

    const response: ShowStudentResponse = {
      student,
    };

    return ShowStudentDataSchema.parse(response);
  } catch (error) {
    return handleUnknownError(error);
  }
});
