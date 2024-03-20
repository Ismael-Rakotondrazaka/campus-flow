import { prismaCtx } from "#imports";
import { RenewalFullRaw, renewalFullRawToRenewalFull } from "./fullRaw";

export const createFullOne = async ({
  data,
}: {
  data: prismaCtx.Prisma.RenewalCreateArgs["data"];
}): Promise<RenewalFull> => {
  const prismaClient = usePrismaClient();

  const renewalFullRaw: RenewalFullRaw = await prismaClient.renewal.create({
    data,
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

  return renewalFullRawToRenewalFull(renewalFullRaw);
};
