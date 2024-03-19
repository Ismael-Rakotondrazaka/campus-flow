import { prismaCtx } from "#imports";

export const deleteFullOne = async (payload: {
  where: prismaCtx.Prisma.StudentWhereUniqueInput;
}): Promise<StudentFull | null> => {
  const prismaClient = usePrismaClient();

  const studentFullRaw: StudentFullRaw = await prismaClient.student.delete({
    where: payload.where,
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

  return studentFullRawToStudentFull(studentFullRaw);
};
