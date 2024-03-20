import { prismaCtx } from "#imports";
import { RenewalFullRaw, renewalFullRawToRenewalFull } from "./fullRaw";

export const findFullMany = async (payload: {
  where?: prismaCtx.Prisma.RenewalWhereInput;
  orderBy?: prismaCtx.Prisma.RenewalOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<RenewalFull[]> => {
  const prismaClient = usePrismaClient();

  const renewalFullRaws: RenewalFullRaw[] = await prismaClient.renewal.findMany(
    {
      where: payload.where,
      orderBy: payload.orderBy,
      skip: payload.skip,
      take: payload.take,
      include: {
        academicSession: true,
        faculty: true,
        student: {
          include: {
            user: true,
          },
        },
      },
    },
  );

  const renewalFulls: RenewalFull[] = renewalFullRaws.map(
    (renewalFullRaw: RenewalFullRaw) =>
      renewalFullRawToRenewalFull(renewalFullRaw),
  );

  return renewalFulls;
};
