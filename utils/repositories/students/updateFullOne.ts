import { prismaCtx } from "#imports";

export const updateFullOne = async (payload: {
  data: prismaCtx.Prisma.StudentUpdateArgs["data"];
  where: prismaCtx.Prisma.StudentWhereUniqueInput;
}): Promise<StudentFull> => {
  const prismaClient = usePrismaClient();

  const refreshTokenRaw: StudentFullRaw = await prismaClient.student.update({
    where: payload.where,
    data: payload.data,
    include: {
      user: true,
      faculty: true,
      lodgment: {
        include: {
          building: true,
          _count: {
            select: {
              students: true,
            },
          },
        },
      },
      _count: {
        select: {
          renewals: true,
        },
      },
    },
  });

  return studentFullRawToStudentFull(refreshTokenRaw);
};
