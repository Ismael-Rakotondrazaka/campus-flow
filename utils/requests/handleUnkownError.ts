// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export const handleUnknownError = (error: unknown): ServerError => {
  // TODO handle error

  const serverError: ServerError = createServerError();

  return serverError;
};
