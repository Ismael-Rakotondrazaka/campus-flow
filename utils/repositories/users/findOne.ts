import { prismaCtx } from "#imports";

export const findOne = async ({
  where,
  orderBy,
  skip,
  take,
}: {
  where?: prismaCtx.Prisma.UserWhereInput;
  orderBy?: prismaCtx.Prisma.UserOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<UserComputed | null> => {
  const prismaClient = usePrismaClient();

  const user: UserComputed | null = await prismaClient.user.findFirst({
    where,
    orderBy,
    skip,
    take,
  });

  return user;
};
