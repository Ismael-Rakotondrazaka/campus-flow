import { prismaCtx } from "#imports";

export default defineEventHandler(async (): Promise<DestroyFacultyResponse> => {
  try {
    const destroyFacultyParamSPR = await safeParseRequestParamAs(
      DestroyFacultyParamSchema,
    );
    if (!destroyFacultyParamSPR.success) {
      return createNotFoundError();
    }

    const faculty: prismaCtx.Faculty = await facultyRepository.findOneOrFail({
      where: {
        id: destroyFacultyParamSPR.data.id,
        deletedAt: null,
      },
    });

    const adminSession: AdminSession | null = getAdminSession();
    if (is.null(adminSession)) {
      return createUnauthorizedError();
    }

    const now = new Date();

    const deletedFaculty: prismaCtx.Faculty = await facultyRepository.updateOne(
      {
        where: {
          id: faculty.id,
        },
        data: {
          deletedAt: now,
          updatedAt: now,
        },
      },
    );

    const response: DestroyFacultyResponse = {
      faculty: deletedFaculty,
    };

    return DestroyFacultyDataSchema.parse(response);
  } catch (error) {
    return handleUnknownError(error);
  }
});
