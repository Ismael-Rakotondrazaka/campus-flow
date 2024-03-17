import jwt from "jsonwebtoken";
import { Simplify } from "type-fest";

export type VerifyAccessTokenOptions = Simplify<
  Pick<jwt.VerifyOptions, "ignoreExpiration">
>;

export const verifyAccessToken = (
  token: string,
  options?: VerifyAccessTokenOptions,
): string | jwt.JwtPayload | null => {
  try {
    const runtimeConfig = useRuntimeConfig(useEvent());
    const accessTokenSecret: string = runtimeConfig.accessTokenSecret;

    const decoded = jwt.verify(token, accessTokenSecret, options);

    return decoded;
  } catch (error) {
    return null;
  }
};
