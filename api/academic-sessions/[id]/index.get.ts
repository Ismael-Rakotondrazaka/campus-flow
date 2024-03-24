import { prismaCtx } from "#imports";

export default defineEventHandler(
  async (): Promise<ShowAcademicSessionResponse> => {
    try {
      const showAcademicSessionParamSPR = await safeParseRequestParamAs(
        ShowAcademicSessionParamSchema,
      );
      if (!showAcademicSessionParamSPR.success) {
        return createNotFoundError();
      }

      const academicSession: prismaCtx.AcademicSession =
        await academicSessionRepository.findOneOrFail({
          where: {
            id: showAcademicSessionParamSPR.data.id,
          },
        });

      const response: ShowAcademicSessionResponse = {
        academicSession,
      };

      return ShowAcademicSessionDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
