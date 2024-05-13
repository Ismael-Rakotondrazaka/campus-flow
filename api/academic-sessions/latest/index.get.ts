import { prismaCtx } from "#imports";
import { AcademicSession } from "@prisma/client";

export default defineEventHandler(
  async (): Promise<{ academicSession: AcademicSession | null }> => {
    try {
      const academicSession: prismaCtx.AcademicSession | null =
        await academicSessionRepository.findOne({
          orderBy: {
            startAt: "desc",
          },
          take: 1,
        });

      return {
        academicSession,
      };
    } catch (error) {
      return {
        academicSession: null,
      };
    }
  }
);
