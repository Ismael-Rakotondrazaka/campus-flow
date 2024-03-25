import { prismaCtx } from "#imports";

export const updateOne = async (payload: {
  data: prismaCtx.Prisma.UserUpdateArgs["data"];
  where: prismaCtx.Prisma.UserWhereUniqueInput;
}): Promise<UserComputed> => {
  const prismaClient = usePrismaClient();

  const user: UserComputed = await prismaClient.user.update({
    where: payload.where,
    data: payload.data,
  });

  return user;
};
