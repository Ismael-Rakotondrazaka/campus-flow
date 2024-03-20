import jwt from "jsonwebtoken";

export const createAccessToken = (
  data: string | object | Buffer,
): AccessToken => {
  const runtimeConfig = useRuntimeConfig(useEvent());
  const accessTokenSecret: string = runtimeConfig.accessTokenSecret;
  const accessTokenLife: number = runtimeConfig.accessTokenLife;

  const token: string = jwt.sign(data, accessTokenSecret, {
    expiresIn: Math.round(accessTokenLife / 1000), // convert to seconds
  });

  const expiresAt = new Date(Date.now() + accessTokenLife);

  return {
    token,
    expiresAt,
  };
};
