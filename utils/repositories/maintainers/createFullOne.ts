import { prismaCtx } from "#imports";

export const createFullOne = async (payload: {
  data: prismaCtx.Prisma.MaintainerCreateArgs["data"];
}): Promise<MaintainerFull> => {
  const prismaClient = usePrismaClient();

  const maintainer: MaintainerFull = await prismaClient.maintainer.create({
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
