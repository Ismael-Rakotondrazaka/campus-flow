import { prismaCtx } from "#imports";
import { count } from "./count";

export const exist = async (payload: {
  where?: prismaCtx.Prisma.ReservationWhereInput;
  orderBy?: prismaCtx.Prisma.ReservationOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<boolean> => {
  const result: boolean = await count({
    where: payload.where,
    orderBy: payload.orderBy,
    skip: payload.skip,
    take: payload.take,
  }).then((value) => value > 0);

  return result;
};
