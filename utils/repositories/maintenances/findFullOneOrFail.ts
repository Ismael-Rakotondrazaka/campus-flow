import { prismaCtx } from "#imports";
import { findFullOne } from "./findFullOne";

export const findFullOneOrFail = async (payload: {
  where?: prismaCtx.Prisma.MaintenanceWhereInput;
  orderBy?: prismaCtx.Prisma.MaintenanceOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<MaintenanceFull> => {
  const maintenance: MaintenanceFull | null = await findFullOne({
    where: payload.where,
    orderBy: payload.orderBy,
    skip: payload.skip,
    take: payload.take,
  });

  if (is.null(maintenance)) {
    throw createNotFoundError();
  }

  return maintenance;
};
