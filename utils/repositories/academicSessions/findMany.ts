import { prismaCtx } from "#imports";

export const findMany = async (payload: {
  where?: prismaCtx.Prisma.AcademicSessionWhereInput;
  orderBy?: prismaCtx.Prisma.AcademicSessionOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<prismaCtx.AcademicSession[]> => {
  const prismaClient = usePrismaClient();

  const faculties: prismaCtx.AcademicSession[] =
    await prismaClient.academicSession.findMany({
      where: payload.where,
      orderBy: payload.orderBy,
      skip: payload.skip,
      take: payload.take,
    });

  return faculties;
};
