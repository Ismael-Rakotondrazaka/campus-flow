import { prismaCtx } from "#imports";
import { RenewalFullRaw, renewalFullRawToRenewalFull } from "./fullRaw";

export const updateFullOne = async (payload: {
  data: prismaCtx.Prisma.RenewalUpdateArgs["data"];
  where: prismaCtx.Prisma.RenewalWhereUniqueInput;
}): Promise<RenewalFull> => {
  const prismaClient = usePrismaClient();

  const refreshTokenRaw: RenewalFullRaw = await prismaClient.renewal.update({
    where: payload.where,
    data: payload.data,
    include: {
      academicSession: true,
      faculty: true,
      student: {
        include: {
          user: true,
        },
      },
    },
  });

  return renewalFullRawToRenewalFull(refreshTokenRaw);
};
