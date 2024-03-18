import { prismaCtx } from "#imports";
import { LodgmentFullRaw, lodgmentFullRawToLodgmentFull } from "./fullRaw";

export const findFullMany = async (payload: {
  where?: prismaCtx.Prisma.LodgmentWhereInput;
  orderBy?: prismaCtx.Prisma.LodgmentOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<LodgmentFull[]> => {
  const prismaClient = usePrismaClient();

  const lodgmentFullRaws: LodgmentFullRaw[] =
    await prismaClient.lodgment.findMany({
      where: payload.where,
      orderBy: payload.orderBy,
      skip: payload.skip,
      take: payload.take,
      include: {
        _count: {
          select: {
            students: true,
          },
        },
      },
    });

  const lodgmentFulls: LodgmentFull[] = lodgmentFullRaws.map(
    (lodgmentFullRaw: LodgmentFullRaw) =>
      lodgmentFullRawToLodgmentFull(lodgmentFullRaw),
  );

  return lodgmentFulls;
};
