import { prismaCtx } from "#imports";

export const updateOne = async (payload: {
  data: prismaCtx.Prisma.AcademicSessionUpdateArgs["data"];
  where: prismaCtx.Prisma.AcademicSessionWhereUniqueInput;
}): Promise<prismaCtx.AcademicSession> => {
  const prismaClient = usePrismaClient();

  const academicSession: prismaCtx.AcademicSession =
    await prismaClient.academicSession.update({
      where: payload.where,
      data: payload.data,
    });

  return academicSession;
};
