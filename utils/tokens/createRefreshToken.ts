import jwt from "jsonwebtoken";
import { Exact } from "type-fest";

export const createRefreshToken = <T extends Exact<RefreshTokenData, T>>(
  data: T,
): RefreshTokenFiltered => {
  const runtimeConfig = useRuntimeConfig(useEvent());
  const refreshTokenSecret: string = runtimeConfig.refreshTokenSecret;
  const refreshTokenLife: number = runtimeConfig.refreshTokenLife;

  const now: number = Date.now();

  const token: string = jwt.sign(data, refreshTokenSecret, {
    expiresIn: Math.round(refreshTokenLife / 1000), // convert to second
  });

  const expiresAt = new Date(now + refreshTokenLife);

  return {
    token,
    expiresAt,
  };
};
