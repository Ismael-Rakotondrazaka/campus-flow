import { prismaCtx } from "#imports";
import { LodgmentFullRaw, lodgmentFullRawToLodgmentFull } from "./fullRaw";

export const deleteFullOne = async (payload: {
  where: prismaCtx.Prisma.LodgmentWhereUniqueInput;
}): Promise<LodgmentFull | null> => {
  const prismaClient = usePrismaClient();

  const refreshTokenRaw: LodgmentFullRaw = await prismaClient.lodgment.delete({
    where: payload.where,
    include: {
      _count: {
        select: {
          students: true,
        },
      },
    },
  });

  return lodgmentFullRawToLodgmentFull(refreshTokenRaw);
};
