import {Room} from "./createRoom";
import {Server, Socket} from "socket.io";
import {Store} from "./createStore";
import {createServer as createHTTPServer} from "http";
import {ActionRaisedError, ActionRaisedErrorInit} from "./ActionRaisedError";

export type Middleware = {
  beforeAction?: (data: { action: ActionData; state: object; }) => void;
  afterAction?: (data: { action: ActionData; state: object; }) => void;
  roomCreated?: (data: { name: string; id: string; actions: Record<string, (...args: any[]) => void>; state: object; }) => void;
  roomJoined?: (data: { type: string; id: string }) => void;
  serverCreated?: (
    data: {
      http: ReturnType<typeof createHTTPServer>;
      io: Server;
      rooms: Record<string, Room<any, any>>;
      orchestrator: Orchestrator;
    }
  ) => void;
  afterActionFailed?: (data: { action: ActionData; state: object; error: ActionRaisedErrorInit }) => void;
}

type EventName = keyof Middleware;
type EventPayload<E extends EventName> = Parameters<Required<Middleware>[E]>[0]

export type ActionFailedPayload = {
  id: string;
  error: ActionRaisedErrorInit;
}

export class Orchestrator {
  io: Server;
  roomStore: Record<string, Record<string, Store>> = {}; // { "<room type>": { "<room id>": Room } }
  rooms: Record<string, Room<any, any>>;
  middleware: Middleware[];

  constructor(io: Server, rooms: Record<string, Room<any, any>>, middleware: Middleware[] = []) {
    this.io = io;
    this.rooms = rooms;
    this.middleware = middleware;
  }

  handleSocketConnect(socket: Socket) {
    socket.on('joinRoom', async (data: JoinRoomData) => {
      await this.handleJoinRoom(socket, data.type, data.id);
    });

    socket.on('action', async (data: ActionData) => {
      await this.handleRoomAction(data, socket);
    })
  }

  async handleRoomAction(data: ActionData, socket?: Socket) {
    const room = await this.fetchRoom(data.room.type, data.room.id);
    const action = room.actions[data.name];

    if (!action) {
      throw new Error(`[Lively] Missing action "${data.name}" in room "${data.room.type}" store`);
    }

    // Ignore beforeAction async, don't want things like analytics to hold up action evaluation
    // ... TODO: is this actually desirable? :thinking_face:
    this.execMiddleware('beforeAction', { action: data, state: room.state });

    console.log('Executing', this.getRoomId(data.room.type, data.room.id), data);

    try {
      await action(...data.args);
    } catch (err) {
      if (err instanceof ActionRaisedError) {
        console.log('Action failed', err);

        const payload: ActionFailedPayload = { id: data.id, error: { code: err.code, message: err.message } }
        socket?.emit('actionFailed', payload);

        await this.execMiddleware('afterActionFailed', {
          action: data,
          state: room.state,
          error: {
            code: err.code,
            message: err.message
          }
        });

        return;
      }
    }

    // This could happen before/after state update is emitted
    socket?.emit(`actionDone`, { id: data.id, state: room.state });

    await this.execMiddleware('afterAction', { action: data, state: room.state });
  }

  async handleJoinRoom(socket: Socket, type: string, id: string) {
    // Ensure room exists
    const store = await this.fetchRoom(type, id);

    socket.join(this.getRoomId(type, id));
    socket.emit(this.getRoomEventName(type, id, 'update'), store.state);

    this.execMiddleware('roomJoined', { type, id });
  }

  async fetchRoom(type: string, id: string) {
    const room = this.rooms[type];
    if (!room) throw new Error(`No room specified for type "${type}"`);

    const existingRoomState = this.roomStore?.[type]?.[id];
    if (existingRoomState) return existingRoomState;

    const initialState = await room.getInitialState(id);

    this.roomStore[type] ||= {};
    const store = this.roomStore[type][id] = room.store(initialState);

    store.subscribe(state => {
      this.io
        .to(this.getRoomId(type, id))
        .emit(this.getRoomEventName(type, id, 'update'), state);

      room.persist(id, state);
    });

    this.execMiddleware('roomCreated', {
      name: type,
      actions: store.actions,
      state: store.state,
      id,
    })

    return store;
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

export type ActionData = {
  id: string;
  room: { type: string; id: string; };
  name: string;
  args: any[];
}

type JoinRoomData = {
  type: string;
  id: string;
}