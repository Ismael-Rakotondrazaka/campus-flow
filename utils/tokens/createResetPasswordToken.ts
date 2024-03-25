import jwt from "jsonwebtoken";

export const createResetPasswordToken = (
  data: ResetPasswordTokenData,
): ResetPasswordToken => {
  const runtimeConfig = useRuntimeConfig(useEvent());
  const resetPasswordTokenSecret: string =
    runtimeConfig.resetPasswordTokenSecret;
  const resetPasswordTokenLife: number = runtimeConfig.resetPasswordTokenLife;

  const token: string = jwt.sign(data, resetPasswordTokenSecret, {
    expiresIn: Math.round(resetPasswordTokenLife / 1000), // convert to seconds
  });

  const expiresAt = new Date(Date.now() + resetPasswordTokenLife);

  return {
    token,
    expiresAt,
  };
};
