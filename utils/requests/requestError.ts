export type RequestError<T extends Record<string, string | undefined>> =
  | BadRequestError<T>
  | UnauthorizedError<Record<string, string>>
  | ForbiddenError<Record<string, string>>
  | NotFoundError
  | ServerError;
