import { prismaCtx } from "#imports";

export const count = async ({
  where,
  orderBy,
  skip,
  take,
}: {
  where?: prismaCtx.Prisma.UserWhereInput;
  orderBy?: prismaCtx.Prisma.UserOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<number> => {
  const prismaClient = usePrismaClient();

  const count: number = await prismaClient.user.count({
    where,
    orderBy,
    skip,
    take,
  });

  return count;
};
