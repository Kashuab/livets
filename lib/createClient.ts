import { io, Socket } from 'socket.io-client';
import type { Room } from "./createRoom";
import { v4 } from 'uuid';

type ClientStore<
  R extends Room<any, any>,
  State extends Record<string, any> = UnwrapRoomState<R>,
> = {
  subscribe: (cb: (state: State) => void) => () => void;
  actions: UnwrapRoomActions<R>;
  getState: () => Promise<State>;
}

export type UnwrapRoomState<R extends Room<any, any>> = ReturnType<R['store']>['state']

export type UnwrapRoomActions<
  R extends Room<any, any>,
  Functions extends Record<string, (...args: unknown[]) => void> = ReturnType<R['store']>['actions'],
  State extends Record<string, unknown> = ReturnType<R['store']>['state']
> = {
  [FunctionName in keyof Functions]: (...args: Parameters<Functions[FunctionName]>) => Promise<State>
}

type ActionDonePayload = {
  id: string;
  state: object;
}

export function createClient<
  Rooms extends Record<string, Room<any, any>>,
  T extends {
    [K in keyof Rooms]: {
      getStore: (id: string) => ClientStore<Rooms[K]>
    }
  } = {
    [K in keyof Rooms]: {
      getStore: (id: string) => ClientStore<Rooms[K]>
    }
  }
>(url: string) {
  const socket = io(url);
  const stores: Record<string, Record<string, ClientStore<any>>> = {}

  return new Proxy<T>({} as any, {
    set(): boolean {
      throw new Error('[Lively Client] You cannot modify actions on a client.');
    },
    get(_target, roomType: string) {
      return {
        getStore: (id: string) => {
          stores[roomType] ||= {};
          return stores[roomType][id] ||= createClientStore(socket, roomType, id);
        }
      }
    }
  })
}

function createClientStore(socket: Socket, roomType: string, id: string) {
  let state: object | null = null;

  const subscribers: ((state: object) => void)[] = [];
  const actionResolvers: Record<string, (value: unknown) => void> = {};
  const pendingGetStateCallbacks: ((state: object) => void)[] = [];
  const notifySubscribers = () => subscribers.forEach(cb => {
    if (!state) return;

    cb(state)
  });

  socket.emit('joinRoom', { type: roomType, id });
  socket.on(`${roomType}#${id}/update`, newState => {
    state = newState;
    if (!state) throw new Error('[Lively Client] Received null state');

    notifySubscribers();

    const callbacks = pendingGetStateCallbacks.splice(0, pendingGetStateCallbacks.length);
    callbacks.forEach(cb => cb(state!));
  });

  socket.on('actionDone', (result: ActionDonePayload) => {
    state = result.state;
    notifySubscribers();

    actionResolvers[result.id]?.(state);
    delete actionResolvers[result.id];
  });

  return {
    subscribe: (cb: (state: object) => void) => {
      subscribers.push(cb);

      return () => {
        subscribers.splice(subscribers.indexOf(cb), 1);
      }
    },
    getState: () => {
      return new Promise<object>(resolve => {
        if (!state) {
          pendingGetStateCallbacks.push(resolve);
          return;
        }

        resolve(state);
      });
    },
    actions: new Proxy({}, {
      set(): boolean {
        throw new Error('[Lively Client] You cannot modify actions on a store.');
      },
      get(_target, actionName) {
        return (...args: any[]) => {
          const actionId = v4();

          return new Promise(resolve => {
            actionResolvers[actionId] = resolve;

            socket.emit('action', {
              id: actionId,
              room: { type: roomType, id },
              name: actionName,
              args
            });
          })
        }
      }
    })
  }
}