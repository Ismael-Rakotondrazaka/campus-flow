import { prismaCtx } from "#imports";

export const count = async (payload: {
  where?: prismaCtx.Prisma.RenewalWhereInput;
  orderBy?: prismaCtx.Prisma.RenewalOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<number> => {
  const prismaClient = usePrismaClient();

  const count: number = await prismaClient.renewal.count({
    where: payload.where,
    orderBy: payload.orderBy,
    skip: payload.skip,
    take: payload.take,
  });

  return count;
};
