import { prismaCtx } from "#imports";
import { findFullOne } from "./findFullOne";

export const findFullOneOrFail = async (payload: {
  where?: prismaCtx.Prisma.AdminWhereInput;
  orderBy?: prismaCtx.Prisma.AdminOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<AdminFull> => {
  const admin: AdminFull | null = await findFullOne({
    where: payload.where,
    orderBy: payload.orderBy,
    skip: payload.skip,
    take: payload.take,
  });

  if (is.null(admin)) {
    throw createNotFoundError();
  }

  return admin;
};
