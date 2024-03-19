import { prismaCtx } from "#imports";

export const updateFullOne = async (payload: {
  data: prismaCtx.Prisma.AnnouncementUpdateArgs["data"];
  where: prismaCtx.Prisma.AnnouncementWhereUniqueInput;
}): Promise<prismaCtx.Announcement> => {
  const prismaClient = usePrismaClient();

  const announcement: prismaCtx.Announcement =
    await prismaClient.announcement.update({
      where: payload.where,
      data: payload.data,
    });

  return announcement;
};
