import { prismaCtx } from "#imports";
import { LodgmentFullRaw, lodgmentFullRawToLodgmentFull } from "./fullRaw";

export const updateFullOne = async ({
  data,
  where,
}: {
  data: prismaCtx.Prisma.LodgmentUpdateArgs["data"];
  where: prismaCtx.Prisma.LodgmentWhereUniqueInput;
}): Promise<LodgmentFull> => {
  const prismaClient = usePrismaClient();

  const refreshTokenRaw: LodgmentFullRaw = await prismaClient.lodgment.update({
    where,
    data,
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

  return lodgmentFullRawToLodgmentFull(refreshTokenRaw);
};
