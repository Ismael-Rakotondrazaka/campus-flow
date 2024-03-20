import { prismaCtx } from "#imports";
import { LodgmentFullRaw, lodgmentFullRawToLodgmentFull } from "./fullRaw";

export const deleteFullOne = async (payload: {
  where: prismaCtx.Prisma.LodgmentWhereUniqueInput;
}): Promise<LodgmentFull | null> => {
  const prismaClient = usePrismaClient();

  const refreshTokenRaw: LodgmentFullRaw = await prismaClient.lodgment.delete({
    where: payload.where,
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
