import { prismaCtx } from "#imports";
import { findFullOne } from "./findFullOne";

export const findFullOneOrFail = async (payload: {
  where?: prismaCtx.Prisma.MaintainerWhereInput;
  orderBy?: prismaCtx.Prisma.MaintainerOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<MaintainerFull> => {
  const maintainer: MaintainerFull | null = await findFullOne({
    where: payload.where,
    orderBy: payload.orderBy,
    skip: payload.skip,
    take: payload.take,
  });

  if (is.null(maintainer)) {
    throw createNotFoundError();
  }

  return maintainer;
};
