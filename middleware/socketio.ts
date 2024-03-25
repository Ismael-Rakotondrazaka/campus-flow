import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { getUserSessionFromSocket } from "~/utils/sessions/getUserSessionFromSocket";

let __io: SocketIOServer;

type ServerToClientEvents = {
  "reservations:store": (payload: { reservation: ReservationFull }) => void;
  "renewals:store": (payload: { renewal: RenewalFull }) => void;
  "maintenances:store": (payload: { maintenance: MaintenanceFull }) => void;
};

declare module "h3" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface H3EventContext {
    socketIOServer: SocketIOServer<ServerToClientEvents>;
  }
}

export default eventHandler((event) => {
  if (!__io) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const http: HttpServer = (event.node.req.socket as any)
      ._server as HttpServer;

    const runtimeConfig = useRuntimeConfig(event);
    const clientUrls: string[] = runtimeConfig.clientUrl.split(",");

    const io = new SocketIOServer<ServerToClientEvents>(http, {
      cors: {
        allowedHeaders: ["*", "Authorization", "authorization"],
        credentials: true,
        origin: clientUrls,
      },
    });

    io.on("connection", (socket) => {
      const userSession: UserSession | null = getUserSessionFromSocket(socket);

      if (is.null(userSession)) {
        socket.disconnect(true);
      } else if (isAdminSession(userSession)) {
        socket.join(["admins", `admins:${userSession.id}`]);
      } else {
        socket.join(["students", `students:${userSession.id}`]);
      }
    });

    __io = io;
  }

  event.context.socketIOServer = __io;
});
