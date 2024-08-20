import {Room} from "./createRoom";
import {RemoteSocket, Server, Socket} from "socket.io";
import {Store} from "./createStore";
import {createServer as createHTTPServer} from "http";
import {ActionRaisedError, ActionRaisedErrorInit} from "./ActionRaisedError";
import { CreateServerOpts } from "./createServer";
import { createClient } from "redis";
import { responsePathAsArray } from "graphql";

type RedisClient = ReturnType<typeof createClient>;

export type Middleware<Rooms extends Record<string, Room<any, any, any, any>>, Actor extends Record<string, unknown>> = {
  beforeAction?: (data: { action: ActionData<Actor>; state: object; }) => void;
  afterAction?: (data: { action: ActionData<Actor>; state: object; }) => void;
  roomCreated?: (data: { name: string; id: string; actions: Record<string, (...args: any[]) => void>; state: object; }) => void;
  roomJoined?: (data: { type: string; id: string }) => void;
  serverCreated?: (
    data: {
      http: ReturnType<typeof createHTTPServer>;
      io: Server;
      rooms: Record<string, Room<any, any, any, any>>;
      orchestrator: Orchestrator<Rooms, Actor>;
    }
  ) => void;
  afterActionFailed?: (data: { action: ActionData<Actor>; state: object; error: ActionRaisedErrorInit }) => void;
}

type EventName = keyof Middleware<any, any>;
type EventPayload<E extends EventName> = Parameters<Required<Middleware<any, Record<string, unknown>>>[E]>[0]

export type ActionFailedPayload = {
  id: string;
  error: ActionRaisedErrorInit;
}

export class Orchestrator<Rooms extends Record<string, Room<any, any, any, any>>, Actor extends Record<string, unknown>> {
  io: Server;
  roomStore: Record<string, Record<string, Store>> = {}; // { "<room type>": { "<room id>": Room } }
  rooms: Record<string, Room<any, any, any, any>>;
  middleware: Middleware<Rooms, Actor>[];
  serverOptions: CreateServerOpts<Rooms, Actor>;
  redis: RedisClient;

  constructor(io: Server, redis: RedisClient, opts: CreateServerOpts<Rooms, Actor>) {
    this.io = io;
    this.redis = redis;

    const { rooms, middleware } = opts;

    this.rooms = rooms;
    this.middleware = middleware || [];
    this.serverOptions = opts;
  }

  handleSocketConnect(socket: Socket) {
    socket.on('joinRoom', async (data: JoinRoomData<Actor>) => {
      await this.handleJoinRoom(data, socket);
    });

    socket.on('action', async (data: ActionData<Actor>) => {
      await this.handleRoomAction(data, socket);
    })
  }

  async handleRoomAction(data: ActionData<Actor>, socket?: Socket) {
    if (!data.actor) throw new Error('Socket does not have actor');
    if (!socket) throw new Error('Why no socket bro');

    const roomStuff = await this.fetchRoom(data.room.type, data.room.id, data.actor, socket);
    if (!roomStuff) return;

    await this.setActorBySocket(socket, data.actor);

    const [room, store] = roomStuff;
    const action = store.actions[data.name];

    if (!action) {
      throw new Error(`[Lively] Missing action "${data.name}" in room "${data.room.type}" store`);
    }

    // Ignore beforeAction async, don't want things like analytics to hold up action evaluation
    // ... TODO: is this actually desirable? :thinking_face:
    this.execMiddleware('beforeAction', { action: data, state: store.state });

    console.log('Executing', this.getRoomId(data.room.type, data.room.id), data);

    try {
      // Wrapped actions always expect an actor as the first argument.
      // This is a bit weird, but meh.
      await action(data.actor, ...data.args);
    } catch (err) {
      if (err instanceof ActionRaisedError) {
        console.log('Action failed', err);

        const payload: ActionFailedPayload = { id: data.id, error: { code: err.code, message: err.message } }
        socket?.emit('actionFailed', payload);

        await this.execMiddleware('afterActionFailed', {
          action: data,
          state: store.state,
          error: {
            code: err.code,
            message: err.message
          }
        });

        return;
      }
    }

    // This could happen before/after state update is emitted
    socket?.emit(`actionDone`, { id: data.id, state: room.transformClientState(store.state, data.actor) });

    await this.broadcastRoomUpdate(data.room.type, data.room.id, room, store.state);
    room.persist(data.room.id, store.state);

    await this.execMiddleware('afterAction', { action: data, state: store.state });
  }

  async handleJoinRoom(data: JoinRoomData<Actor>, socket: Socket) {
    const { type, id } = data;

    if (!id || !type) {
      console.error('Action data:', data);
      throw new Error('Missing ID or type');
    }

    const actorVerified = await this.serverOptions.verifyActor(data.actor);
    if (!actorVerified) {
      socket.emit(this.getRoomEventName(type, id, 'actorNotVerified'));
      return;
    }

    await this.setActorBySocket(socket, data.actor);

    // Also ensures room exists aside from getting access to state
    const roomStuff = await this.fetchRoom(type, id, data.actor, socket);
    if (!roomStuff) return;
    
    const [room, store] = roomStuff;

    socket.join(this.getRoomId(type, id));
    room.onJoin(store.state, data.actor);

    await this.broadcastRoomUpdate(type, id, room, store.state);

    this.execMiddleware('roomJoined', { type, id });
  }

  async setActorBySocket(socket: Socket, actor: Actor) {
    await this.redis.set(`actor#${socket.id}`, JSON.stringify(actor));
  }

  async getActorBySocket(socket: Socket | RemoteSocket<any, any>): Promise<Actor> {
    const actorString = await this.redis.get(`actor#${socket.id}`);
    if (!actorString) throw new Error('Actor not present in Redis');

    return JSON.parse(actorString);
  }

  async fetchRoom(type: string, id: string, actor: Actor, socket: Socket) {
    const room = this.rooms[type];
    if (!room) throw new Error(`No room specified for type "${type}"`);

    const existingRoomState = this.roomStore?.[type]?.[id];
    if (existingRoomState) {
      if (!(await room.allowActor(existingRoomState.state, actor))) {
        socket.emit(this.getRoomEventName(type, id, 'actorNotAllowed'));
        return;
      }

      return [room, existingRoomState] as const;
    }

    if (!id || !type) {
      console.error('ID:', id, 'Type:', type);
      throw new Error('Missing ID or type');
    }

    const initialState = await room.getInitialState(id);

    // There are two checks for this in case the initial room creation
    // rejects the actor. We don't want to store the state of that room
    if (!(await room.allowActor(initialState, actor))) {
      socket.emit(this.getRoomEventName(type, id, 'actorNotAllowed'));
      return;
    }

    this.roomStore[type] ||= {};
    const store = this.roomStore[type][id] = room.store(initialState);

    this.execMiddleware('roomCreated', {
      name: type,
      actions: store.actions,
      state: store.state,
      id,
    })

    return [room, store] as const;
  }

  async broadcastRoomUpdate(type: string, id: string, room: Room<any, any, any, any>, state: any) {
    const sockets = await this.io.fetchSockets();

    for (const socket of sockets) {
      const actor = await this.getActorBySocket(socket);

      socket.emit(this.getRoomEventName(type, id, 'update'), room.transformClientState(state, actor))
    }
  }

  getRoomId(type: string, id: string) {
    return `${type}#${id}`;
  }

  getRoomEventName(type: string, id: string, event: string) {
    return `${this.getRoomId(type, id)}/${event}`;
  }

  async execMiddleware<E extends EventName>(name: E, payload: EventPayload<E>) {
    for (const m of this.middleware) {
      const fn = m[name];

      // @ts-ignore: TS doesn't know that the types are safe here. Though I'm probably just being stupid.
      await fn?.(payload);
    }
  }
}

export type ActionData<Actor extends Record<string, unknown>> = {
  id: string;
  actor: Actor;
  room: { type: string; id: string; };
  name: string;
  args: any[];
}

type JoinRoomData<Actor extends Record<string, unknown>> = {
  type: string;
  id: string;
  actor: Actor;
}