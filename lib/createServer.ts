import { createServer as createHTTPServer } from "http";
import { Server } from "socket.io";
import {Room} from "./createRoom";
import {Middleware, Orchestrator} from "./Orchestrator";
import { RedisClientOptions } from "redis";
import { createClient } from 'redis';



export type CreateServerOpts<Rooms extends Record<string, Room<any, any, any, any>>, Actor extends Record<string, unknown>> = {
  port: number;
  wss: boolean;
  rooms: Rooms;
  redis: RedisClientOptions;
  middleware?: Middleware<Rooms, Actor>[];
  verifyActor: (actor: Actor) => boolean | Promise<boolean>;
}

export type ServerTypes<
  Rooms extends Record<string, Room<any, any, any, any>>,
  Actor extends Record<string, unknown>
> = {
  rooms: Rooms;
  actor: Actor;
}

export async function createServer<
  Rooms extends Record<string, Room<any, any, any, any>>,
  Actor extends Record<string, unknown>
  >(opts: CreateServerOpts<Rooms, Actor>): Promise<ServerTypes<Rooms, Actor>> {
  // TODO: Handle opts.wss
  const httpServer = createHTTPServer();

  const io = new Server(httpServer, {
    // options,
    cors: {
      origin: true
    }
  });

  const client = await createClient()
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

  client.set('working', 'true');

  if (await client.get('working') !== 'true') {
    throw new Error('Redis not behaving correctly');
  }

  const orchestrator = new Orchestrator(io, client, opts);

  io.use(async (socket, next) => {
    const actor = socket.handshake.auth as Actor;

    const actorVerified = await opts.verifyActor(actor);
    if (!actorVerified) return next(new Error('Actor not verified'));

    orchestrator.setActorBySocket(socket, actor);
    next();
  });

  io.on("connection", (socket) => {
    orchestrator.handleSocketConnect(socket);
  });

  httpServer.listen(opts.port);

  orchestrator.execMiddleware('serverCreated', {
    io,
    http: httpServer,
    rooms: opts.rooms,
    orchestrator
  });

  return {
    rooms: opts.rooms,
    actor: {} as any, // Just for type handling
  }
}
