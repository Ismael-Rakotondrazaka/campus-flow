import { prismaCtx } from "#imports";

export const findFullMany = async (payload: {
  where?: prismaCtx.Prisma.MaintainerWhereInput;
  orderBy?: prismaCtx.Prisma.MaintainerOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<MaintainerFull[]> => {
  const prismaClient = usePrismaClient();

  const maintainers: MaintainerFull[] = await prismaClient.maintainer.findMany({
    where: payload.where,
    orderBy: payload.orderBy,
    skip: payload.skip,
    take: payload.take,
    include: {
      _count: {
        select: {
          maintenances: true,
        },
      },
    },
  });

  return maintainers;
};
