import { createServer as createHTTPServer } from "http";
import { Server } from "socket.io";
import {Room} from "./createRoom";
import {Orchestrator} from "./Orchestrator";

type CreateServerOpts<Rooms extends Record<string, Room<any, any>>> = {
  port: number;
  wss: boolean;
  rooms: Rooms;
}

export function createServer<Rooms extends Record<string, Room<any, any>>>(opts: CreateServerOpts<Rooms>) {
  // TODO: Handle opts.wss
  const httpServer = createHTTPServer();

  const io = new Server(httpServer, {
    // options,
    cors: {
      origin: true
    }
  });

  const orchestrator = new Orchestrator(io, opts.rooms);

  io.on("connection", (socket) => {
    orchestrator.handleSocketConnect(socket);
  });

  httpServer.listen(opts.port);

  return opts.rooms;
}
