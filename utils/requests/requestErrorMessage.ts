export type RequestErrorMessage<T> = Partial<
  Record<keyof T, string | undefined>
>;
