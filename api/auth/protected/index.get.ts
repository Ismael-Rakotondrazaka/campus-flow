// TODO remove this api
export default defineEventHandler(() => {
  const userSession: UserSession | null = getUserSession();

  if (is.null(userSession)) {
    return createUnauthorizedError();
  }

  return {
    message: "You are authorized!",
  };
});
