import { io, Socket } from 'socket.io-client';
import type { Room } from "./createRoom";
import { v4 } from 'uuid';
import {ActionFailedPayload} from "./Orchestrator";
import {ActionRaisedErrorInit} from "./ActionRaisedError";

export type ClientStore<
  R extends Room<any, any, any, any>,
  State extends Record<string, any> = UnwrapRoomState<R>,
> = {
  disconnect: () => void;
  subscribe: (cb: (state: State) => void) => () => void;
  actions: UnwrapRoomActions<R>;
  getState: () => Promise<State>;
  hasSubscribers: boolean;
}

export type UnwrapRoomState<R extends Room<any, any, any, any>> = R['transformClientState'] extends (...args: any) => infer ClientState
  ? ClientState extends Record<string, unknown>
    ? ClientState
    : never
  : ReturnType<R['store']>['state']

export type ActionResult<State extends Record<string, unknown> = Record<string, unknown>> = {
  state: State;
  error: ActionRaisedErrorInit | null;
}

export type UnwrapRoomActions<
  R extends Room<any, any, any, any>,
  Functions extends Record<string, (...args: unknown[]) => void> = ReturnType<R['store']>['actions'],
  State extends Record<string, unknown> = ReturnType<R['store']>['state']
> = {
  [FunctionName in keyof Functions]: ((...args: Parameters<Functions[FunctionName]>) => Promise<ActionResult<State>>) & {
    propose: (updateState: (state: State) => void, ...args: Parameters<Functions[FunctionName]>) => Promise<ActionResult<State>>
  }
}

export type ActionDonePayload = {
  id: string;
  state: Record<string, unknown>;
}

export type CreateClientOpts<Actor extends Record<string, unknown>> = {
  actor: () => Actor
}

export function createClient<
  Rooms extends Record<string, Room<any, any, any, any>>,
  Actor extends Record<string, unknown>,
  T extends {
    [K in keyof Rooms]: {
      getStore: (id: string) => ClientStore<Rooms[K]>
    }
  } = {
    [K in keyof Rooms]: {
      getStore: (id: string) => ClientStore<Rooms[K]>
    }
  }
>(url: string, opts: CreateClientOpts<Actor>) {
  const socket = io(url, {
    auth: opts.actor()
  });
  
  const stores: Record<string, Record<string, ClientStore<any>>> = {}

  return new Proxy<T>({} as any, {
    set(): boolean {
      throw new Error('[Live.ts Client] You cannot modify actions on a client.');
    },
    get(_target, roomType: string) {
      return {
        getStore: (id: string) => {
          stores[roomType] ||= {};
          return stores[roomType][id] ||= createClientStore({ actor: opts.actor, socket, roomType, id });
        }
      }
    }
  })
}

const stores: Record<string, Record<string, ClientStore<any>>> = {}

export type CreateClientStoreOpts<Actor extends Record<string, unknown>> = {
  socket: Socket;
  roomType: string;
  id: string;
  actor: () => Actor
}

export function createClientStore<Actor extends Record<string, unknown>>(opts: CreateClientStoreOpts<Actor>) {
  const { roomType, id, socket } = opts;

  stores[roomType] ||= {};
  if (stores[roomType][id]) return stores[roomType][id];

  let state: Record<string, unknown> | null = null;

  const subscribers: ((state: object) => void)[] = [];
  const actionResolvers: Record<string, (value: ActionResult) => void> = {};
  const pendingGetStateCallbacks: ((state: object) => void)[] = [];
  const notifySubscribers = () => {
    subscribers.forEach(cb => {
      if (!state) {
        return;
      }

      cb(state)
    });
  }

  socket.emit('joinRoom', { type: roomType, id, actor: opts.actor() });
  socket.on(`${roomType}#${id}/update`, newState => {
    state = newState;
    if (!state) throw new Error('[Live.ts Client] Received null state');

    notifySubscribers();

    const callbacks = pendingGetStateCallbacks.splice(0, pendingGetStateCallbacks.length);
    callbacks.forEach(cb => cb(state!));
  });

  socket.on('actionDone', (result: ActionDonePayload) => {
    state = result.state;

    if (!state) {
      console.error('[Live.ts Client] Received null state', result);
      return;
    }

    notifySubscribers();

    actionResolvers[result.id]?.({ state, error: null });

    delete actionResolvers[result.id];
  });

  socket.on('actionFailed', (result: ActionFailedPayload) => {
    // TODO: seems unnecessary
    if (!state) {
      console.error('[Live.ts Client] Received null state', result);
      return;
    }

    actionResolvers[result.id]?.({ state, error: result.error });

    delete actionResolvers[result.id];
  });

  const store = {
    get hasSubscribers() {
      return subscribers.length === 0;
    },
    disconnect: () => {
      socket.off(`${roomType}#${id}/update`);
      socket.emit('leaveRoom', { type: roomType, id });
    },
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
        throw new Error('[Live.ts Client] You cannot modify actions on a store.');
      },
      get(_target, actionName) {
        const fn = (...args: any[]) => {
          const actionId = v4();

          return new Promise<ActionResult>(resolve => {
            actionResolvers[actionId] = resolve;

            socket.emit('action', {
              id: actionId,
              actor: opts.actor(),
              room: { type: roomType, id },
              name: actionName,
              args
            });
          })
        }

        fn.propose = async (updateState: (state: Record<string, unknown>) => void, ...args: any[]) => {
          if (!state) throw new Error('[Live.ts Client] TODO: Propose called too early');

          // TODO: Snapshot performance
          // This is significantly faster than structuredClone. We should use proxies here to track changes
          // and restore them instead, but I don't care that much right now
          const before = state;
          const copy = JSON.parse(JSON.stringify(state));

          updateState(copy);
          state = copy;
          notifySubscribers();

          const result = await fn(...args);

          // Rollback if the action bailed
          if (result.error) {
            state = before;
            notifySubscribers();
          }

          return result;
        }

        return fn;
      }
    })
  }

  stores[roomType][id] = store;

  return store;
}