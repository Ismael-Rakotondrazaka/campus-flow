import { prismaCtx } from "#imports";

export const findFullOne = async (payload: {
  where?: prismaCtx.Prisma.AdminWhereInput;
  orderBy?: prismaCtx.Prisma.AdminOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<AdminFull | null> => {
  const prismaClient = usePrismaClient();

  const refreshTokenRaw: AdminFullRaw | null =
    await prismaClient.admin.findFirst({
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

  if (is.null(refreshTokenRaw)) {
    return null;
  }

  return adminFullRawToAdminFull(refreshTokenRaw);
};
