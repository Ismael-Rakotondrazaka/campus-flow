import { prismaCtx } from "#imports";

export const findOne = async ({
  where,
  orderBy,
  skip,
  take,
}: {
  where?: prismaCtx.Prisma.AdminWhereInput;
  orderBy?: prismaCtx.Prisma.AdminOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<prismaCtx.Admin | null> => {
  const prismaClient = usePrismaClient();

  const user: prismaCtx.Admin | null = await prismaClient.admin.findFirst({
    where,
    orderBy,
    skip,
    take,
  });

  return user;
};
