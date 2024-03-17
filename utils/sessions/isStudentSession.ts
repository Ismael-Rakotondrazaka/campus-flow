export const isStudentSession = (
  userSession: UserSession,
): userSession is StudentSession => {
  return "NIC" in userSession;
};
