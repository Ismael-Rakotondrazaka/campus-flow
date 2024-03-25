import jwt from "jsonwebtoken";
import { Simplify } from "type-fest";

export type VerifyResetPasswordTokenOptions = Simplify<
  Pick<jwt.VerifyOptions, "ignoreExpiration">
>;

export const verifyResetPasswordToken = (
  token: string,
  options?: VerifyResetPasswordTokenOptions,
): ResetPasswordTokenData | null => {
  try {
    const runtimeConfig = useRuntimeConfig(useEvent());
    const resetPasswordTokenSecret: string =
      runtimeConfig.resetPasswordTokenSecret;

    const decoded = jwt.verify(token, resetPasswordTokenSecret, options);

    if (is.string(decoded)) {
      return null;
    }

    const resetPasswordTokenSPR =
      ResetPasswordTokenDataSchema.safeParse(decoded);

    if (!resetPasswordTokenSPR.success) {
      return null;
    }

    const resetPasswordTokenData: ResetPasswordTokenData =
      resetPasswordTokenSPR.data;

    return resetPasswordTokenData;
  } catch (error) {
    return null;
  }
};
