import { prismaCtx } from "#imports";
import { findFullOne } from "./findFullOne";

export const findFullOneOrFail = async (payload: {
  where?: prismaCtx.Prisma.AnnouncementWhereInput;
  orderBy?: prismaCtx.Prisma.AnnouncementOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<prismaCtx.Announcement> => {
  const announcement: prismaCtx.Announcement | null = await findFullOne({
    where: payload.where,
    orderBy: payload.orderBy,
    skip: payload.skip,
    take: payload.take,
  });

  if (is.null(announcement)) {
    throw createNotFoundError();
  }

  return announcement;
};
