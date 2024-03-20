import { prismaCtx } from "#imports";

export const count = async (payload: {
  where?: prismaCtx.Prisma.LodgmentWhereInput;
  orderBy?: prismaCtx.Prisma.LodgmentOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<number> => {
  const prismaClient = usePrismaClient();

  const count: number = await prismaClient.lodgment.count({
    where: payload.where,
    orderBy: payload.orderBy,
    skip: payload.skip,
    take: payload.take,
  });

  return count;
};
