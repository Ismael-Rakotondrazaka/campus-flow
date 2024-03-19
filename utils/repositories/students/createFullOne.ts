import { prismaCtx } from "#imports";

export const createFullOne = async ({
  data,
}: {
  data: prismaCtx.Prisma.StudentCreateArgs["data"];
}): Promise<StudentFull> => {
  const prismaClient = usePrismaClient();

  const studentFullRaw: StudentFullRaw = await prismaClient.student.create({
    data,
    include: {
      user: true,
      faculty: true,
      lodgment: {
        include: {
          building: true,
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
