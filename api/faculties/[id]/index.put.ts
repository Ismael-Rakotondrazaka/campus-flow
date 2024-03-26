import { prismaCtx } from "#imports";

export default defineEventHandler(async (): Promise<UpdateFacultyResponse> => {
  try {
    const updateFacultyParamSPR = await safeParseRequestParamAs(
      UpdateFacultyParamSchema,
    );
    if (!updateFacultyParamSPR.success) {
      return createNotFoundError();
    }

    const faculty: prismaCtx.Faculty = await facultyRepository.findOneOrFail({
      where: {
        id: updateFacultyParamSPR.data.id,
        deletedAt: null,
      },
    });

    const adminSession: AdminSession | null = getAdminSession();
    if (is.null(adminSession)) {
      return createUnauthorizedError();
    }

    const updateFacultyBodySPR = await safeParseRequestBodyAs(
      UpdateFacultyBodySchema,
    );
    if (!updateFacultyBodySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(updateFacultyBodySPR.error),
      });
    }

    if (
      !(
        !is.undefined(updateFacultyBodySPR.data.name) &&
        updateFacultyBodySPR.data.name !== faculty.name
      )
    ) {
      return createBadRequestError({
        message: "Au moins une modification est requise.",
        errorMessage: {},
      });
    }

    const updatedFaculty: prismaCtx.Faculty = await facultyRepository.updateOne(
      {
        where: {
          id: faculty.id,
        },
        data: {
          name: updateFacultyBodySPR.data.name,
          updatedAt: new Date(),
        },
      },
    );

    const response: UpdateFacultyResponse = {
      faculty: updatedFaculty,
    };

    return UpdateFacultyDataSchema.parse(response);
  } catch (error) {
    return handleUnknownError(error);
  }
});
