import { prismaCtx } from "#imports";

export const findOne = async (payload: {
  where?: prismaCtx.Prisma.AdminWhereInput;
  orderBy?: prismaCtx.Prisma.AdminOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<prismaCtx.Admin | null> => {
  const prismaClient = usePrismaClient();

  const user: prismaCtx.Admin | null = await prismaClient.admin.findFirst({
    where: payload.where,
    orderBy: payload.orderBy,
    skip: payload.skip,
    take: payload.take,
  });

  return user;
};
