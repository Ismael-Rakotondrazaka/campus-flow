import jwt from "jsonwebtoken";

export type AccessToken = {
  token: string;
  expiresAt: Date;
};

export const createAccessToken = (
  data: string | object | Buffer,
): AccessToken => {
  const runtimeConfig = useRuntimeConfig(useEvent());
  const accessTokenSecret: string = runtimeConfig.accessTokenSecret;

  const token: string = jwt.sign(data, accessTokenSecret, {
    expiresIn: tokenConfig.accessTokenLife,
  });

  const expiresAt = new Date(Date.now() + tokenConfig.accessTokenLife);

  return {
    token,
    expiresAt,
  };
};
