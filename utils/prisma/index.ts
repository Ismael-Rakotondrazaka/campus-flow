import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
  result: {
    user: {
      // add fullName field to user
      fullName: {
        needs: {
          firstName: true,
          name: true,
        },
        compute(user) {
          return `${user.name} ${user.firstName}`;
        },
      },
    },
  },
});

export const usePrismaClient = () => {
  return prisma;
};
