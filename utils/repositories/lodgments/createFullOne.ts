import { prismaCtx } from "#imports";
import { LodgmentFullRaw, lodgmentFullRawToLodgmentFull } from "./fullRaw";

export const createFullOne = async ({
  data,
}: {
  data: prismaCtx.Prisma.LodgmentCreateArgs["data"];
}): Promise<LodgmentFull> => {
  const prismaClient = usePrismaClient();

  const lodgmentFullRaw: LodgmentFullRaw = await prismaClient.lodgment.create({
    data,
    include: {
      _count: {
        select: {
          students: true,
        },
      },
    },
  });

  return lodgmentFullRawToLodgmentFull(lodgmentFullRaw);
};
