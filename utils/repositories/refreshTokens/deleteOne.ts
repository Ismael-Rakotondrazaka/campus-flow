import { prismaCtx } from "#imports";

export const deleteOne = async ({
  where,
}: {
  where: prismaCtx.Prisma.RefreshTokenWhereUniqueInput;
}): Promise<void> => {
  const prisma = usePrismaClient();

  await prisma.refreshToken.delete({
    where,
  });
};
