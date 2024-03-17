import { prismaCtx } from "#imports";

export const findOne = async ({
  where,
  orderBy,
  skip,
  take,
}: {
  where?: prismaCtx.Prisma.RefreshTokenWhereInput;
  orderBy?: prismaCtx.Prisma.RefreshTokenOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<prismaCtx.RefreshToken | null> => {
  const prismaClient = usePrismaClient();

  const refreshToken: prismaCtx.RefreshToken | null =
    await prismaClient.refreshToken.findFirst({
      where,
      orderBy,
      skip,
      take,
    });

  return refreshToken;
};
