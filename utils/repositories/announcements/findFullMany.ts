import { prismaCtx } from "#imports";

export const findFullMany = async (payload: {
  where?: prismaCtx.Prisma.AnnouncementWhereInput;
  orderBy?: prismaCtx.Prisma.AnnouncementOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<prismaCtx.Announcement[]> => {
  const prismaClient = usePrismaClient();

  const announcements: prismaCtx.Announcement[] =
    await prismaClient.announcement.findMany({
      where: payload.where,
      orderBy: payload.orderBy,
      skip: payload.skip,
      take: payload.take,
    });

  return announcements;
};
