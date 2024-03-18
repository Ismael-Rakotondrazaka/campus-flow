import { prismaCtx } from "#imports";
import { BuildingFullRaw, buildingFullRawToBuildingFull } from "./fullRaw";

export const createFullOne = async ({
  data,
}: {
  data: prismaCtx.Prisma.BuildingCreateArgs["data"];
}): Promise<BuildingFull> => {
  const prismaClient = usePrismaClient();

  const refreshTokenRaw: BuildingFullRaw = await prismaClient.building.create({
    data,
    include: {
      lodgments: {
        // we can either use `include` or `select`, but not both at the same time
        include: {
          _count: {
            select: {
              students: true,
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
