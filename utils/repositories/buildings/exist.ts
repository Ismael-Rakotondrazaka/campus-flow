import { prismaCtx } from "#imports";
import { count } from "./count";

export const exist = async (payload: {
  where?: prismaCtx.Prisma.BuildingWhereInput;
  orderBy?: prismaCtx.Prisma.BuildingOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<boolean> => {
  const result: boolean = await count({
    where: payload.where,
    orderBy: payload.orderBy,
    skip: payload.skip,
    take: payload.take,
  }).then((count) => count > 0);

  return result;
};
