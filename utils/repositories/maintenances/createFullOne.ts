import { prismaCtx } from "#imports";
import {
  MaintenanceFullRaw,
  maintenanceFullRawToMaintenanceFull,
} from "./fullRaw";

export const createFullOne = async ({
  data,
}: {
  data: prismaCtx.Prisma.MaintenanceCreateArgs["data"];
}): Promise<MaintenanceFull> => {
  const prismaClient = usePrismaClient();

  const maintenanceFullRaw: MaintenanceFullRaw =
    await prismaClient.maintenance.create({
      data,
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

  return maintenanceFullRawToMaintenanceFull(maintenanceFullRaw);
};
