import { httpStatusCodes } from "#imports";

export type BadRequestError<T extends Record<string, string | undefined>> = {
  errorMessage: T;
  message: string;
  statusCode: httpStatusCodes.StatusCodes.BAD_REQUEST;
  statusMessage: string;
};

/* eslint-disable @typescript-eslint/indent, indent */
export const isBadRequestError = <
  K extends string,
  T extends Record<K, string | undefined>,
>(
  error: unknown,
  keys: K[],
): error is BadRequestError<T> => {
  return (
    is.object(error) &&
    !is.null(error) &&
    "message" in error &&
    is.string(error.message) &&
    "statusCode" in error &&
    error.statusCode === httpStatusCodes.StatusCodes.BAD_REQUEST &&
    "statusMessage" in error &&
    is.string(error.statusMessage) &&
    "errorMessage" in error &&
    !is.undefined(error.errorMessage) &&
    isRecordOfStringString(error.errorMessage, keys)
  );
};
/* eslint-enable @typescript-eslint/indent, indent */

export const createBadRequestError = <T extends Record<string, string>>(
  args: {
    message?: string;
    isPrivate?: boolean;
    errorMessage: T;
  } = {
    message: errorConfig.DEFAULT_BAD_REQUEST_ERROR_MESSAGE,
    isPrivate: false,
    errorMessage: {} as T,
  },
): BadRequestError<T> => {
  setResponseStatus(useEvent(), httpStatusCodes.StatusCodes.BAD_REQUEST);

  return {
    errorMessage: args.errorMessage,
    message:
      args.isPrivate || !args.message
        ? errorConfig.DEFAULT_BAD_REQUEST_ERROR_MESSAGE
        : args.message,
    statusCode: httpStatusCodes.StatusCodes.BAD_REQUEST,
    statusMessage: httpStatusCodes.getReasonPhrase(
      httpStatusCodes.StatusCodes.BAD_REQUEST,
    ),
  };
};
