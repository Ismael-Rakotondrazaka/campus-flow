import { prismaCtx } from "#imports";
import {
  MaintenanceFullRaw,
  maintenanceFullRawToMaintenanceFull,
} from "./fullRaw";

export const findFullMany = async (payload: {
  where?: prismaCtx.Prisma.MaintenanceWhereInput;
  orderBy?: prismaCtx.Prisma.MaintenanceOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<MaintenanceFull[]> => {
  const prismaClient = usePrismaClient();

  const maintenanceFullRaws: MaintenanceFullRaw[] =
    await prismaClient.maintenance.findMany({
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

  const maintenanceFulls: MaintenanceFull[] = maintenanceFullRaws.map(
    (maintenanceFullRaw: MaintenanceFullRaw) =>
      maintenanceFullRawToMaintenanceFull(maintenanceFullRaw),
  );

  return maintenanceFulls;
};
