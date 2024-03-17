export const isAdminSession = (
  userSession: UserSession,
): userSession is AdminSession => {
  return "role" in userSession;
};
