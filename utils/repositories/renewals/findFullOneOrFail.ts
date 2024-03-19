import { prismaCtx } from "#imports";
import { findFullOne } from "./findFullOne";

export const findFullOneOrFail = async (payload: {
  where?: prismaCtx.Prisma.RenewalWhereInput;
  orderBy?: prismaCtx.Prisma.RenewalOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<RenewalFull> => {
  const renewal: RenewalFull | null = await findFullOne({
    where: payload.where,
    orderBy: payload.orderBy,
    skip: payload.skip,
    take: payload.take,
  });

  if (is.null(renewal)) {
    throw createNotFoundError();
  }

  return renewal;
};
