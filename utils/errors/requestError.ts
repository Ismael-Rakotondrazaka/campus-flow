import { BadRequestError } from "./badRequestError";
import { ForbiddenError } from "./forbiddenError";
import { NotFoundError } from "./notFoundError";
import { ServerError } from "./serverError";
import { UnauthorizedError } from "./unauthorizedError";

export type RequestError<T extends Record<string, string | undefined>> =
  | BadRequestError<T>
  | UnauthorizedError<Record<string, string>>
  | ForbiddenError<Record<string, string>>
  | NotFoundError
  | ServerError;
