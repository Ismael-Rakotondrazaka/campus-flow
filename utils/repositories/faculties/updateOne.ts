import { prismaCtx } from "#imports";

export const updateOne = async ({
  data,
  where,
}: {
  data: prismaCtx.Prisma.FacultyUpdateArgs["data"];
  where: prismaCtx.Prisma.FacultyWhereUniqueInput;
}): Promise<prismaCtx.Faculty> => {
  const prismaClient = usePrismaClient();

  const faculty: prismaCtx.Faculty = await prismaClient.faculty.update({
    where,
    data,
    include: {
      _count: {
        select: {
          students: true,
        },
      },
    },
  });

  return faculty;
};
