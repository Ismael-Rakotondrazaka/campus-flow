export const getStudentSession = (): StudentSession | null => {
  const event = useEvent();

  const header: string | undefined = getRequestHeader(event, "Authorization");

  if (is.undefined(header) || !header.startsWith("Bearer ")) {
    return null;
  }

  const token: string = header.split(" ")[1];

  const payload = verifyAccessToken(token);

  // already know that payload is not a string to be valid
  if (is.null(payload) || is.string(payload)) {
    return null;
  }

  const studentSessionSPR = StudentSessionSchema.safeParse(payload);

  if (!studentSessionSPR.success) {
    return null;
  }

  const studentSession: StudentSession = studentSessionSPR.data;

  return studentSession;
};
