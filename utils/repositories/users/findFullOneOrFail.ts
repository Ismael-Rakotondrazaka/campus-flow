import { prismaCtx } from "#imports";
import { findFullOne } from "./findFullOne";

export const findFullOneOrFail = async ({
  where,
  orderBy,
  skip,
  take,
}: {
  where?: prismaCtx.Prisma.UserWhereInput;
  orderBy?: prismaCtx.Prisma.UserOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<UserFull> => {
  const userFull: UserFull | null = await findFullOne({
    where,
    orderBy,
    skip,
    take,
  });

  if (userFull === null) {
    throw createNotFoundError();
  }

  return userFull;
};
