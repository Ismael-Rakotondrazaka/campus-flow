import { prismaCtx } from "#imports";
import { BuildingFullRaw, buildingFullRawToBuildingFull } from "./fullRaw";

export const findFullMany = async (payload: {
  where?: prismaCtx.Prisma.BuildingWhereInput;
  orderBy?: prismaCtx.Prisma.BuildingOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<BuildingFull[]> => {
  const prismaClient = usePrismaClient();

  const buildingFullRaws: BuildingFullRaw[] =
    await prismaClient.building.findMany({
      where: payload.where,
      orderBy: payload.orderBy,
      skip: payload.skip,
      take: payload.take,
      include: {
        lodgments: {
          include: {
            _count: {
              select: {
                students: {
                  where: {
                    user: {
                      deletedAt: null,
                    },
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            lodgments: true,
          },
        },
      },
    });

  const buildingFulls: BuildingFull[] = buildingFullRaws.map(
    (buildingFullRaw: BuildingFullRaw) =>
      buildingFullRawToBuildingFull(buildingFullRaw),
  );

  return buildingFulls;
};
