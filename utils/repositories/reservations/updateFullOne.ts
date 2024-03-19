import { prismaCtx } from "#imports";

export const updateFullOne = async (payload: {
  data: prismaCtx.Prisma.ReservationUpdateArgs["data"];
  where: prismaCtx.Prisma.ReservationWhereUniqueInput;
}): Promise<ReservationFull> => {
  const prismaClient = usePrismaClient();

  const reservation: ReservationFull = await prismaClient.reservation.update({
    where: payload.where,
    data: payload.data,
    include: {
      academicSession: true,
      faculty: true,
    },
  });

  return reservation;
};
