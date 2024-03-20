import { prismaCtx } from "#imports";

export const findFullMany = async (payload: {
  where?: prismaCtx.Prisma.ReservationWhereInput;
  orderBy?: prismaCtx.Prisma.ReservationOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<ReservationFull[]> => {
  const prismaClient = usePrismaClient();

  const reservations: ReservationFull[] =
    await prismaClient.reservation.findMany({
      where: payload.where,
      orderBy: payload.orderBy,
      skip: payload.skip,
      take: payload.take,
      include: {
        academicSession: true,
        faculty: true,
      },
    });

  return reservations;
};
