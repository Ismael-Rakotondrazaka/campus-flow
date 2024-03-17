import { prismaCtx } from "#imports";

export const deleteMany = async ({
  where,
}: {
  where: prismaCtx.Prisma.RefreshTokenWhereInput;
}): Promise<void> => {
  const prisma = usePrismaClient();

  await prisma.refreshToken.deleteMany({
    where,
  });
};
