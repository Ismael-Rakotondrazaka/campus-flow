import jwt from "jsonwebtoken";

export const verifyAccessToken = (
  token: string,
): string | jwt.JwtPayload | null => {
  try {
    const runtimeConfig = useRuntimeConfig(useEvent());
    const accessTokenSecret: string = runtimeConfig.accessTokenSecret;

    const decoded = jwt.verify(token, accessTokenSecret);

    return decoded;
  } catch (error) {
    return null;
  }
};
