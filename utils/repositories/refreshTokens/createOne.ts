import { prismaCtx } from "#imports";

export const createOne = async (payload: {
  data: prismaCtx.Prisma.RefreshTokenCreateArgs["data"];
}): Promise<prismaCtx.RefreshToken> => {
  const prisma = usePrismaClient();

  const refreshToken = await prisma.refreshToken.create({
    data: payload.data,
  });

  return refreshToken;
};
