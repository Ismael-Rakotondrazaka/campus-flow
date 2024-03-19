import { prismaCtx } from "#imports";

export const findFullMany = async (payload: {
  where?: prismaCtx.Prisma.AdminWhereInput;
  orderBy?: prismaCtx.Prisma.AdminOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<AdminFull[]> => {
  const prismaClient = usePrismaClient();

  const adminFullRaws: AdminFullRaw[] = await prismaClient.admin.findMany({
    where: payload.where,
    orderBy: payload.orderBy,
    skip: payload.skip,
    take: payload.take,
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

  const adminFulls: AdminFull[] = adminFullRaws.map(
    (adminFullRaw: AdminFullRaw) => adminFullRawToAdminFull(adminFullRaw),
  );

  return adminFulls;
};
