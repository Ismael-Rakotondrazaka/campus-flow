import { prismaCtx } from "#imports";

export const findOne = async (payload: {
  where?: prismaCtx.Prisma.AcademicSessionWhereInput;
  orderBy?: prismaCtx.Prisma.AcademicSessionOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<prismaCtx.AcademicSession | null> => {
  const prismaClient = usePrismaClient();

  const academicSession: prismaCtx.AcademicSession | null =
    await prismaClient.academicSession.findFirst({
      where: payload.where,
      orderBy: payload.orderBy,
      skip: payload.skip,
      take: payload.take,
    });

  return academicSession;
};
