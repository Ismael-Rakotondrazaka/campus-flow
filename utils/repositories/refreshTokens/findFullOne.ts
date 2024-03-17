import { prismaCtx } from "#imports";

export const findFullOne = async ({
  where,
  orderBy,
  skip,
  take,
}: {
  where?: prismaCtx.Prisma.RefreshTokenWhereInput;
  orderBy?: prismaCtx.Prisma.RefreshTokenOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<RefreshTokenFull | null> => {
  const prismaClient = usePrismaClient();

  const refreshToken: RefreshTokenFull | null =
    await prismaClient.refreshToken.findFirst({
      where,
      orderBy,
      skip,
      take,
      include: {
        user: true,
      },
    });

  return refreshToken;
};
