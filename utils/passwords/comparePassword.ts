import { compareSync } from "bcrypt";

export const comparePassword = (
  password: string,
  hashedPassword: string,
): boolean => {
  return compareSync(password, hashedPassword);
};
