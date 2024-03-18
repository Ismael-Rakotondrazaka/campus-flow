export const getAdminSession = (): AdminSession | null => {
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

  const adminSessionSPR = AdminSessionSchema.safeParse(payload);

  if (!adminSessionSPR.success) {
    return null;
  }

  const adminSession: AdminSession = adminSessionSPR.data;

  return adminSession;
};
