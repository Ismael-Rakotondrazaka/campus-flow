import jwt from "jsonwebtoken";

export const verifyRefreshToken = (token: string): RefreshTokenData | null => {
  try {
    const runtimeConfig = useRuntimeConfig(useEvent());
    const refreshTokenSecret: string = runtimeConfig.refreshTokenSecret;

    const decoded = jwt.verify(token, refreshTokenSecret);

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
