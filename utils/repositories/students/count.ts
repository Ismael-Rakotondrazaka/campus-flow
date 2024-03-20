import { prismaCtx } from "#imports";

export const count = async (payload: {
  where?: prismaCtx.Prisma.StudentWhereInput;
  orderBy?: prismaCtx.Prisma.StudentOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<number> => {
  const prismaClient = usePrismaClient();

  const count: number = await prismaClient.student.count({
    where: payload.where,
    orderBy: payload.orderBy,
    skip: payload.skip,
    take: payload.take,
  });

  return count;
};
