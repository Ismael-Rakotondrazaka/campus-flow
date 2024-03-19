import { prismaCtx } from "#imports";

export const createFullOne = async ({
  data,
}: {
  data: prismaCtx.Prisma.AdminCreateArgs["data"];
}): Promise<AdminFull> => {
  const prismaClient = usePrismaClient();

  const adminFullRaw: AdminFullRaw = await prismaClient.admin.create({
    data,
    include: {
      user: true,
      _count: {
        select: {
          maintenances: true,
          renewals: true,
          reservations: true,
        },
      },
    },
  });

  return adminFullRawToAdminFull(adminFullRaw);
};
