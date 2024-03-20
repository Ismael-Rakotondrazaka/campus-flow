import { prismaCtx } from "#imports";

export const updateFullOne = async (payload: {
  data: prismaCtx.Prisma.MaintainerUpdateArgs["data"];
  where: prismaCtx.Prisma.MaintainerWhereUniqueInput;
}): Promise<MaintainerFull> => {
  const prismaClient = usePrismaClient();

  const maintainer: MaintainerFull = await prismaClient.maintainer.update({
    where: payload.where,
    data: payload.data,
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
