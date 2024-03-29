import { RequestError } from "./requestError";

/**
 * Handle unknown error\
 * If error is not a known error, it will be treated as a server error\
 * Exclude `BadRequestError` from the return type, because it should be returned by the caller
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export const handleUnknownError = <T extends Record<string, string>>(
  error: unknown,
): Exclude<RequestError<T>, BadRequestError<T>> => {
  if (
    isUnauthorizedError(error) ||
    isForbiddenError(error) ||
    isServerError(error) ||
    isNotFoundError(error)
  ) {
    return error;
  } else {
    // TODO handle error
    return createServerError();
  }
};
