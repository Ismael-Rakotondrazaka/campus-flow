export const toRequestError = <K extends string, T extends Record<K, string>>(
  error: unknown,
  badRequestErrorKeys: K[],
): RequestError<T> => {
  if (
    isBadRequestError<K, T>(error, badRequestErrorKeys) ||
    isUnauthorizedError(error) ||
    isForbiddenError(error) ||
    isServerError(error) ||
    isNotFoundError(error)
  ) {
    return error;
  } else {
    return createServerError();
  }
};
