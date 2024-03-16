import { UserComputed } from "./userComputed";

/**
 * Omitted keys:
 * - password @type string
 */
export type UserFilteredOmittedKeys = "password";

/**
 * Filter some sensitive property:
 * - password @type string
 */
export type UserFiltered = Omit<UserComputed, UserFilteredOmittedKeys>;

export const toUserFiltered = (user: UserComputed): UserFiltered => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { password, ...userFiltered } = user;

  return userFiltered;
};
