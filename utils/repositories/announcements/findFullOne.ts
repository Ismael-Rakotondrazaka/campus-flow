import { prismaCtx } from "#imports";

export const findFullOne = async (payload: {
  where?: prismaCtx.Prisma.AnnouncementWhereInput;
  orderBy?: prismaCtx.Prisma.AnnouncementOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<prismaCtx.Announcement | null> => {
  const prismaClient = usePrismaClient();

  const announcement: prismaCtx.Announcement | null =
    await prismaClient.announcement.findFirst({
      where: payload.where,
      orderBy: payload.orderBy,
      skip: payload.skip,
      take: payload.take,
    });

  return announcement;
};
