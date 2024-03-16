export type RequestResponse<TData, TInput = Record<string, never>> =
  | TData
  | RequestError<RequestErrorMessage<TInput>>;
