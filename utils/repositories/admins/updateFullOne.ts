import { prismaCtx } from "#imports";

export const updateFullOne = async (payload: {
  data: prismaCtx.Prisma.AdminUpdateArgs["data"];
  where: prismaCtx.Prisma.AdminWhereUniqueInput;
}): Promise<AdminFull> => {
  const prismaClient = usePrismaClient();

  const refreshTokenRaw: AdminFullRaw = await prismaClient.admin.update({
    where: payload.where,
    data: payload.data,
    include: {
      user: true,
      _count: {
        select: {
          maintenances: true,
          renewals: true,
          reservations: true,
        },
      },
    },
  });

  return adminFullRawToAdminFull(refreshTokenRaw);
};
