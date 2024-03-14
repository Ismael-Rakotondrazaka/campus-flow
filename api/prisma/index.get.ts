// TODO remove this api
export default defineEventHandler(() => {
  const prisma = usePrismaClient();

  return prisma.user.findMany();
});
