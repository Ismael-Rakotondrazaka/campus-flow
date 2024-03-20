import { prismaCtx } from "#imports";

export default defineEventHandler(async (): Promise<ShowFacultyResponse> => {
  try {
    const showFacultyParamSPR = await safeParseRequestParamAs(
      ShowFacultyParamSchema,
    );
    if (!showFacultyParamSPR.success) {
      return createNotFoundError();
    }

    const faculty: prismaCtx.Faculty = await facultyRepository.findOneOrFail({
      where: {
        id: showFacultyParamSPR.data.id,
      },
    });

    const response: ShowFacultyResponse = {
      faculty,
    };

    return ShowFacultyDataSchema.parse(response);
  } catch (error) {
    return handleUnknownError(error);
  }
});
