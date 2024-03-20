import { prismaCtx } from "#imports";

export const count = async (payload: {
  where?: prismaCtx.Prisma.BuildingWhereInput;
  orderBy?: prismaCtx.Prisma.BuildingOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<number> => {
  const prismaClient = usePrismaClient();

  const count: number = await prismaClient.building.count({
    where: payload.where,
    orderBy: payload.orderBy,
    skip: payload.skip,
    take: payload.take,
  });

  return count;
};
