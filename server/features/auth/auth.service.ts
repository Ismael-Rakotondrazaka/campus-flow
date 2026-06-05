import type {
  UserIdentityModel,
  UserModel,
} from '../../../prisma/generated/client/models';

export type AuthUser = { identities: UserIdentityModel[] } & UserModel;

export const getAuthUserByEmail = async (
  email: string
): Promise<AuthUser | null> => {
  return prisma.user.findFirst({
    include: {
      identities: {
        where: { provider: 'email' },
      },
    },
    where: { deletedAt: null, email },
  }) as Promise<AuthUser | null>;
};
