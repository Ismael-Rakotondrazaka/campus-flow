import { prismaCtx } from "#imports";

export const createOne = async ({
  data,
}: {
  data:
    | (prismaCtx.Prisma.Without<
        prismaCtx.Prisma.RefreshTokenCreateInput,
        prismaCtx.Prisma.RefreshTokenUncheckedCreateInput
      > &
        prismaCtx.Prisma.RefreshTokenUncheckedCreateInput)
    | (prismaCtx.Prisma.Without<
        prismaCtx.Prisma.RefreshTokenUncheckedCreateInput,
        prismaCtx.Prisma.RefreshTokenCreateInput
      > &
        prismaCtx.Prisma.RefreshTokenCreateInput);
}): Promise<prismaCtx.RefreshToken> => {
  const prisma = usePrismaClient();

  const rawRefreshToken = await prisma.refreshToken.create({
    data,
  });

  const parsedRefreshToken: prismaCtx.RefreshToken =
    RefreshTokenSchema.parse(rawRefreshToken);

  return parsedRefreshToken;
};
