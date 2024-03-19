import { prismaCtx } from "#imports";

export const createFullOne = async (payload: {
  data: prismaCtx.Prisma.AnnouncementCreateArgs["data"];
}): Promise<prismaCtx.Announcement> => {
  const prismaClient = usePrismaClient();

  const announcement: prismaCtx.Announcement =
    await prismaClient.announcement.create({
      data: payload.data,
    });

  return announcement;
};
