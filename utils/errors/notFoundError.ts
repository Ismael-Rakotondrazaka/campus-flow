import { httpStatusCodes } from "#imports";

export type NotFoundError = {
  errorMessage: Record<string, never>;
  message: string;
  statusCode: httpStatusCodes.StatusCodes.NOT_FOUND;
  statusMessage: string;
};

/* eslint-disable @typescript-eslint/indent, indent */
export const isNotFoundError = (error: unknown): error is NotFoundError =>
  is.object(error) &&
  !is.null(error) &&
  "errorMessage" in error &&
  !is.undefined(error.errorMessage) &&
  "message" in error &&
  is.string(error.message) &&
  "statusCode" in error &&
  error.statusCode === httpStatusCodes.StatusCodes.NOT_FOUND &&
  "statusMessage" in error &&
  is.string(error.statusMessage);
/* eslint-enable @typescript-eslint/indent, indent */

export const createNotFoundError = (
  args: {
    message?: string;
    isPrivate?: boolean;
  } = {
    message: errorConfig.DEFAULT_NOT_FOUND_ERROR_MESSAGE,
    isPrivate: false,
  },
): NotFoundError => {
  setResponseStatus(useEvent(), httpStatusCodes.StatusCodes.NOT_FOUND);

  return {
    errorMessage: {},
    message:
      args.isPrivate || !args.message
        ? errorConfig.DEFAULT_NOT_FOUND_ERROR_MESSAGE
        : args.message,
    statusCode: httpStatusCodes.StatusCodes.NOT_FOUND,
    statusMessage: httpStatusCodes.getReasonPhrase(
      httpStatusCodes.StatusCodes.NOT_FOUND,
    ),
  };
};
