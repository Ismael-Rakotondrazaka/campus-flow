import {
  UserSession,
  UserSessionSchema,
} from "../schemas/sessions/userSession";
import { verifyAccessToken } from "../tokens/verifyAccessToken";

export const getUserSession = (): UserSession | null => {
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

  const userSessionSPR = UserSessionSchema.safeParse(payload);

  if (!userSessionSPR.success) {
    return null;
  }

  const userSession: UserSession = userSessionSPR.data;

  return userSession;
};
