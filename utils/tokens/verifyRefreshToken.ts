import jwt from "jsonwebtoken";
import { Simplify } from "type-fest";

export type VerifyRefreshTokenOptions = Simplify<
  Pick<jwt.VerifyOptions, "ignoreExpiration">
>;

export const verifyRefreshToken = (
  token: string,
  options?: VerifyRefreshTokenOptions,
): RefreshTokenData | null => {
  try {
    const runtimeConfig = useRuntimeConfig(useEvent());
    const refreshTokenSecret: string = runtimeConfig.refreshTokenSecret;

    const decoded = jwt.verify(token, refreshTokenSecret, options);

    if (is.string(decoded)) {
      return null;
    }

    const refreshTokenSPR = RefreshTokenDataSchema.safeParse(decoded);

    if (!refreshTokenSPR.success) {
      return null;
    }

    const refreshTokenData: RefreshTokenData = refreshTokenSPR.data;

    return refreshTokenData;
  } catch (error) {
    return null;
  }
};
