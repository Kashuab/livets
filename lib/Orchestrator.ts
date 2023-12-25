import {Room} from "./createRoom";
import {Server, Socket} from "socket.io";
import {Store} from "./createStore";

export class Orchestrator {
  io: Server;
  roomStore: Record<string, Record<string, Store>> = {}; // { "<room type>": { "<room id>": Room } }
  rooms: Record<string, Room<any, any>>;

  constructor(io: Server, rooms: Record<string, Room<any, any>>) {
    this.io = io;
    this.rooms = rooms;
  }

  handleSocketConnect(socket: Socket) {
    socket.on('joinRoom', async (data: JoinRoomData) => {
      await this.handleJoinRoom(socket, data.type, data.id);
    });

    socket.on('action', async (data: ActionData) => {
      await this.handleRoomAction(socket, data);
    })
  }

  async handleRoomAction(socket: Socket, data: ActionData) {
    const room = await this.fetchRoom(data.room.type, data.room.id);
    const action = room.actions[data.name];
    if (!action) {
      throw new Error(`[Lively] Missing action "${data.name}" in room "${data.room.type}" store`);
    }

    console.log('Executing', this.getRoomId(data.room.type, data.room.id), data);
    await action(...data.args);

    // This could happen before/after state update is emitted
    socket.emit(`actionDone`, { id: data.id, state: room.state });
  }

  async handleJoinRoom(socket: Socket, type: string, id: string) {
    // Ensure room exists
    const store = await this.fetchRoom(type, id);

    console.log('Socket joined', this.getRoomId(type, id))

    socket.join(this.getRoomId(type, id));
    socket.emit(this.getRoomEventName(type, id, 'update'), store.state);
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

    return store;
  }

  getRoomId(type: string, id: string) {
    return `${type}#${id}`;
  }

  getRoomEventName(type: string, id: string, event: string) {
    return `${this.getRoomId(type, id)}/${event}`;
  }
}

type ActionData = {
  id: string;
  room: { type: string; id: string; };
  name: string;
  args: any[];
}

type JoinRoomData = {
  type: string;
  id: string;
}