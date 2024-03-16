import { httpStatusCodes } from "#imports";

export type ForbiddenError<T extends Record<string, string>> = {
  errorMessage: T;
  message: string;
  statusCode: httpStatusCodes.StatusCodes.FORBIDDEN;
  statusMessage: string;
};

/* eslint-disable @typescript-eslint/indent, indent */
export const isForbiddenError = <T extends Record<string, string>>(
  error: unknown,
): error is ForbiddenError<T> => {
  return (
    is.object(error) &&
    !is.null(error) &&
    "message" in error &&
    is.string(error.message) &&
    "statusCode" in error &&
    error.statusCode === httpStatusCodes.StatusCodes.FORBIDDEN &&
    "statusMessage" in error &&
    is.string(error.statusMessage) &&
    "errorMessage" in error &&
    !is.undefined(error.errorMessage) &&
    isRecordOfStringString(error.errorMessage)
  );
};
/* eslint-enable @typescript-eslint/indent, indent */

export const createForbiddenError = <T extends Record<string, string>>(
  args: {
    message?: string;
    isPrivate?: boolean;
    errorMessage: T;
  } = {
    message: errorConfig.DEFAULT_FORBIDDEN_ERROR_MESSAGE,
    isPrivate: false,
    errorMessage: {} as T,
  },
): ForbiddenError<T> => {
  setResponseStatus(useEvent(), httpStatusCodes.StatusCodes.FORBIDDEN);

  return {
    errorMessage: args.errorMessage,
    message:
      args.isPrivate || !args.message
        ? errorConfig.DEFAULT_FORBIDDEN_ERROR_MESSAGE
        : args.message,
    statusCode: httpStatusCodes.StatusCodes.FORBIDDEN,
    statusMessage: httpStatusCodes.getReasonPhrase(
      httpStatusCodes.StatusCodes.FORBIDDEN,
    ),
  };
};
