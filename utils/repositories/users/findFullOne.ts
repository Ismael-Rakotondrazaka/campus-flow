import { prismaCtx } from "#imports";
import { UserFullRaw, userFullRawToUserFull } from "./fullRaw";

export const findFullOne = async ({
  where,
  orderBy,
  skip,
  take,
}: {
  where?: prismaCtx.Prisma.UserWhereInput;
  orderBy?: prismaCtx.Prisma.UserOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<UserFull | null> => {
  const prismaClient = usePrismaClient();

  const userFullRaw: UserFullRaw | null = await prismaClient.user.findFirst({
    where,
    orderBy,
    skip,
    take,
    include: {
      admin: true,
      student: true,
    },
  });

  if (userFullRaw === null) {
    return null;
  }

  const userFull: UserFull = userFullRawToUserFull(userFullRaw);

  return userFull;
};
