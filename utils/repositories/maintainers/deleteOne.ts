import { prismaCtx } from "#imports";

export const deleteOne = async (payload: {
  where: prismaCtx.Prisma.MaintainerWhereUniqueInput;
}): Promise<MaintainerFull> => {
  const prisma = usePrismaClient();

  const maintainer: MaintainerFull = await prisma.maintainer.delete({
    where: payload.where,
    include: {
      _count: {
        select: {
          maintenances: true,
        },
      },
    },
  });

  return maintainer;
};
