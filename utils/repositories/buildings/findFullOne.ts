import { prismaCtx } from "#imports";
import { BuildingFullRaw, buildingFullRawToBuildingFull } from "./fullRaw";

export const findFullOne = async ({
  where,
  orderBy,
  skip,
  take,
}: {
  where?: prismaCtx.Prisma.BuildingWhereInput;
  orderBy?: prismaCtx.Prisma.BuildingOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<BuildingFull | null> => {
  const prismaClient = usePrismaClient();

  const refreshTokenRaw: BuildingFullRaw | null =
    await prismaClient.building.findFirst({
      where,
      orderBy,
      skip,
      take,
      include: {
        lodgments: {
          // we can either use `include` or `select`, but not both at the same time
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

  if (is.null(refreshTokenRaw)) {
    return null;
  }

  return buildingFullRawToBuildingFull(refreshTokenRaw);
};
