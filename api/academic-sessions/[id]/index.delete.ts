import { prismaCtx } from "#imports";

export default defineEventHandler(
  async (): Promise<DestroyAcademicSessionResponse> => {
    try {
      const destroyAcademicSessionParamSPR = await safeParseRequestParamAs(
        DestroyAcademicSessionParamSchema,
      );
      if (!destroyAcademicSessionParamSPR.success) {
        return createNotFoundError();
      }

      const academicSession: prismaCtx.AcademicSession =
        await academicSessionRepository.findOneOrFail({
          where: {
            id: destroyAcademicSessionParamSPR.data.id,
            deletedAt: null,
          },
        });

      const adminSession: AdminSession | null = getAdminSession();
      if (is.null(adminSession)) {
        return createUnauthorizedError();
      }

      const deletedAcademicSession: prismaCtx.AcademicSession =
        await academicSessionRepository.updateOne({
          where: {
            id: academicSession.id,
          },
          data: {
            deletedAt: null,
          },
        });

      return {
        academicSession: deletedAcademicSession,
      };
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
