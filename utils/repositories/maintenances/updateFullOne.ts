import { prismaCtx } from "#imports";
import {
  MaintenanceFullRaw,
  maintenanceFullRawToMaintenanceFull,
} from "./fullRaw";

export const updateFullOne = async (payload: {
  data: prismaCtx.Prisma.MaintenanceUpdateArgs["data"];
  where: prismaCtx.Prisma.MaintenanceWhereUniqueInput;
}): Promise<MaintenanceFull> => {
  const prismaClient = usePrismaClient();

  const refreshTokenRaw: MaintenanceFullRaw =
    await prismaClient.maintenance.update({
      where: payload.where,
      data: payload.data,
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

  return maintenanceFullRawToMaintenanceFull(refreshTokenRaw);
};
