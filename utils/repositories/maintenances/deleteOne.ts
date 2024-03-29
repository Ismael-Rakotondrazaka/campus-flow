import { prismaCtx } from "#imports";

export const deleteOne = async (payload: {
  where: prismaCtx.Prisma.MaintenanceWhereUniqueInput;
}): Promise<void> => {
  const prismaClient = usePrismaClient();

  await prismaClient.maintenance.delete({
    where: payload.where,
  });
};
