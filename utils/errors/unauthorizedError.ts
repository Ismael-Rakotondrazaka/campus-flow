import { httpStatusCodes } from "#imports";

export type UnauthorizedError<T extends Record<string, string>> = {
  errorMessage: T;
  message: string;
  statusCode: httpStatusCodes.StatusCodes.UNAUTHORIZED;
  statusMessage: string;
};

/* eslint-disable @typescript-eslint/indent, indent */
export const isUnauthorizedError = <T extends Record<string, string>>(
  error: unknown,
): error is UnauthorizedError<T> =>
  is.object(error) &&
  !is.null(error) &&
  "errorMessage" in error &&
  !is.undefined(error.errorMessage) &&
  "message" in error &&
  is.string(error.message) &&
  "statusCode" in error &&
  error.statusCode === httpStatusCodes.StatusCodes.UNAUTHORIZED &&
  "statusMessage" in error &&
  is.string(error.statusMessage);
/* eslint-enable @typescript-eslint/indent, indent */

export const createUnauthorizedError = <T extends Record<string, string>>(
  args: {
    message?: string;
    isPrivate?: boolean;
    errorMessage: T;
  } = {
    message: errorConfig.DEFAULT_UNAUTHORIZED_ERROR_MESSAGE,
    isPrivate: false,
    errorMessage: {} as T,
  },
): UnauthorizedError<T> => {
  setResponseStatus(useEvent(), httpStatusCodes.StatusCodes.UNAUTHORIZED);

  return {
    errorMessage: args.errorMessage,
    message:
      args.isPrivate || !args.message
        ? errorConfig.DEFAULT_UNAUTHORIZED_ERROR_MESSAGE
        : args.message,
    statusCode: httpStatusCodes.StatusCodes.UNAUTHORIZED,
    statusMessage: httpStatusCodes.getReasonPhrase(
      httpStatusCodes.StatusCodes.UNAUTHORIZED,
    ),
  };
};
