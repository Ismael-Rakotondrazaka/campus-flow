import { Socket } from "socket.io";

export const getUserSessionFromSocket = (
  socket: Socket,
): UserSession | null => {
  let authorization: string | undefined;

  if (is.string(socket.client.request.headers.Authorization)) {
    authorization = socket.client.request.headers.Authorization;
  } else if (is.array<string>(socket.client.request.headers.Authorization)) {
    authorization = socket.client.request.headers.Authorization[0];
  } else if (is.string(socket.client.request.headers.authorization)) {
    authorization = socket.client.request.headers.authorization;
  } else if (is.array<string>(socket.client.request.headers.authorization)) {
    authorization = socket.client.request.headers.authorization[0];
  }

  if (is.undefined(authorization) || !authorization.startsWith("Bearer ")) {
    return null;
  }

  const token: string = authorization.split(" ")[1];

  const payload = verifyAccessToken(token);

  // already know that payload is not a string to be valid
  if (is.null(payload) || is.string(payload)) {
    return null;
  }

  const adminSessionSPR = UserSessionSchema.safeParse(payload);

  if (!adminSessionSPR.success) {
    return null;
  }

  const adminSession: UserSession = adminSessionSPR.data;

  return adminSession;
};
