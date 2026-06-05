export interface UseUserFullnameProps {
  firstName?: null | string;
  lastName?: null | string;
  username?: null | string;
}

export const getUserFullname = <T extends UseUserFullnameProps>(user: T) => {
  if (!user.username && !user.firstName && !user.lastName) {
    return 'User';
  }

  if (!user.firstName && !user.lastName) {
    return user.username || 'User';
  }

  return (
    `${user.firstName || ''} ${user.lastName || ''}`.trim() ||
    user.username ||
    'User'
  );
};

export const useUserFullname = <
  T extends MaybeRefOrGetter<UseUserFullnameProps>,
>(
  user: T
) => {
  return computed<string>(() => {
    const userValue = toValue(user);

    return getUserFullname(userValue);
  });
};
