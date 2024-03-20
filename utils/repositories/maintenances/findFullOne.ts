import { prismaCtx } from "#imports";
import {
  MaintenanceFullRaw,
  maintenanceFullRawToMaintenanceFull,
} from "./fullRaw";

export const findFullOne = async (payload: {
  where?: prismaCtx.Prisma.MaintenanceWhereInput;
  orderBy?: prismaCtx.Prisma.MaintenanceOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<MaintenanceFull | null> => {
  const prismaClient = usePrismaClient();

  const refreshTokenRaw: MaintenanceFullRaw | null =
    await prismaClient.maintenance.findFirst({
      where: payload.where,
      orderBy: payload.orderBy,
      skip: payload.skip,
      take: payload.take,
      include: {
        maintainers: true,
        admin: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            maintainers: true,
          },
        },
      },
    });

  if (is.null(refreshTokenRaw)) {
    return null;
  }

  return maintenanceFullRawToMaintenanceFull(refreshTokenRaw);
};
