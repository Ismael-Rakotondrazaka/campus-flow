import { prismaCtx } from "#imports";

export const createOne = async (payload: {
  data: prismaCtx.Prisma.AcademicSessionCreateArgs["data"];
}): Promise<prismaCtx.AcademicSession> => {
  const prismaClient = usePrismaClient();

  const academicSession: prismaCtx.AcademicSession =
    await prismaClient.academicSession.create({
      data: payload.data,
    });

  return academicSession;
};
