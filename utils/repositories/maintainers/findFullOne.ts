import { prismaCtx } from "#imports";

export const findFullOne = async (payload: {
  where?: prismaCtx.Prisma.MaintainerWhereInput;
  orderBy?: prismaCtx.Prisma.MaintainerOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<MaintainerFull | null> => {
  const prismaClient = usePrismaClient();

  const maintainer: MaintainerFull | null =
    await prismaClient.maintainer.findFirst({
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

  return maintainer;
};
