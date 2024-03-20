import { prismaCtx } from "#imports";

export const deleteFullOne = async (payload: {
  where: prismaCtx.Prisma.AdminWhereUniqueInput;
}): Promise<AdminFull | null> => {
  const prismaClient = usePrismaClient();

  const adminFullRaw: AdminFullRaw = await prismaClient.admin.delete({
    where: payload.where,
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

  return adminFullRawToAdminFull(adminFullRaw);
};
