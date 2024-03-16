import { httpStatusCodes } from "#imports";

export type ServerError = {
  errorMessage: Record<string, never>;
  message: string;
  statusCode: httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR;
  statusMessage: string;
};

/* eslint-disable @typescript-eslint/indent, indent */
export const isServerError = (error: unknown): error is ServerError =>
  is.object(error) &&
  !is.null(error) &&
  "errorMessage" in error &&
  !is.undefined(error.errorMessage) &&
  "message" in error &&
  is.string(error.message) &&
  "statusCode" in error &&
  error.statusCode === httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR &&
  "statusMessage" in error &&
  is.string(error.statusMessage);
/* eslint-enable @typescript-eslint/indent, indent */

export const createServerError = (
  args: {
    message?: string;
    isPrivate?: boolean;
  } = {
    message: errorConfig.DEFAULT_SERVER_ERROR_MESSAGE,
    isPrivate: false,
  },
): ServerError => {
  setResponseStatus(
    useEvent(),
    httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR,
  );

  return {
    errorMessage: {},
    message:
      args.isPrivate || !args.message
        ? errorConfig.DEFAULT_SERVER_ERROR_MESSAGE
        : args.message,
    statusCode: httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR,
    statusMessage: httpStatusCodes.getReasonPhrase(
      httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR,
    ),
  };
};
