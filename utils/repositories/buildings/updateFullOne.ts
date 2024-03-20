import { prismaCtx } from "#imports";
import { BuildingFullRaw, buildingFullRawToBuildingFull } from "./fullRaw";

export const updateFullOne = async ({
  data,
  where,
}: {
  data: prismaCtx.Prisma.BuildingUpdateArgs["data"];
  where: prismaCtx.Prisma.BuildingWhereUniqueInput;
}): Promise<BuildingFull> => {
  const prismaClient = usePrismaClient();

  const refreshTokenRaw: BuildingFullRaw = await prismaClient.building.update({
    where,
    data,
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

  return buildingFullRawToBuildingFull(refreshTokenRaw);
};
