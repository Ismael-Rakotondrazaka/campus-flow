import { RequestError } from "./requestError";
import { RequestErrorMessage } from "./requestErrorMessage";

export type RequestResponse<TData, TInput = Record<string, never>> =
  | TData
  | RequestError<RequestErrorMessage<TInput>>;
