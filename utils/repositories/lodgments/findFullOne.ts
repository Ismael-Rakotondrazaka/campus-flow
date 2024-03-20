import { prismaCtx } from "#imports";
import { LodgmentFullRaw, lodgmentFullRawToLodgmentFull } from "./fullRaw";

export const findFullOne = async ({
  where,
  orderBy,
  skip,
  take,
}: {
  where?: prismaCtx.Prisma.LodgmentWhereInput;
  orderBy?: prismaCtx.Prisma.LodgmentOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<LodgmentFull | null> => {
  const prismaClient = usePrismaClient();

  const refreshTokenRaw: LodgmentFullRaw | null =
    await prismaClient.lodgment.findFirst({
      where,
      orderBy,
      skip,
      take,
      include: {
        building: true,
        _count: {
          select: {
            students: {
              where: {
                user: {
                  deletedAt: null,
                },
              },
            },
            maintenances: {
              where: {
                status: "ONGOING",
              },
            },
          },
        },
      },
    });

  if (is.null(refreshTokenRaw)) {
    return null;
  }

  return lodgmentFullRawToLodgmentFull(refreshTokenRaw);
};
