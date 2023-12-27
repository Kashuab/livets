import { io, Socket } from 'socket.io-client';
import type { Room } from "./createRoom";
import { v4 } from 'uuid';
import {useEffect, useState, useRef, useMemo} from "react";

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

type UseStoreReturn<CS extends ClientStore<any>> = {
  state: ReturnType<CS['getState']> extends Promise<infer T> ? T : never;
  actions: CS['actions'];
};

export function createReactClient<
  Rooms extends Record<string, Room<any, any>>,
  T extends {
    [K in keyof Rooms]: {
      useStore: (id: string) => UseStoreReturn<ClientStore<Rooms[K]>>
    }
  } = {
    [K in keyof Rooms]: {
      useStore: (id: string) => UseStoreReturn<ClientStore<Rooms[K]>>
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
        useStore: (id: string) => {
          stores[roomType] ||= {};
          const store = stores[roomType][id] ||= createClientStore(socket, roomType, id);

          const trackedProperties = useRef<string[]>([]);
          const state = useRef<Record<string, any>>({});
          const [, setR] = useState(0);

          useEffect(() => {
            return store.subscribe(newState => {
              const tracked = cleanupTrackedProperties(trackedProperties.current);
              const rerender = trackedObjectChanged(state.current, newState, tracked);

              state.current = newState;

              if (rerender) setR(c => c + 1);
            });
          }, []);

          const stateProxy = useMemo(() => createTrackedObjectProxy(state.current, path => {
            if (trackedProperties.current.includes(path)) return;

            trackedProperties.current.push(path);
          }), [state.current]);

          return {
            state: stateProxy,
            actions: store.actions
          }
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

/**
 * Creates a new array of properties with parent objects removed if their child properties are tracked.
 *
 * For example, given an array of `['obj', 'obj.child', 'other', 'obj.child.grandChild']`, it will clean it up to:
 * `['other', 'obj.child.grandChild']`
 */
function cleanupTrackedProperties(props: string[]) {
  const isParentProperty: Record<string, boolean> = {};
  const finalProps: string[] = [];

  // Mark all properties and their parent properties
  props.forEach(prop => {
    isParentProperty[prop] = false;

    let current = '';

    prop.split('.').forEach(part => {
      current = current ? current + '.' + part : part;

      if (current !== prop) {
        isParentProperty[current] = true;
      }
    });
  });

  // Add to final array only if not a parent property
  props.forEach(prop => {
    if (!isParentProperty[prop]) {
      finalProps.push(prop);
    }
  });

  return finalProps;
}

function createTrackedObjectProxy(obj: object, cb: (prop: string) => void, parentKey?: string) {
  return new Proxy(obj, {
    set(_target: object, _p: string | symbol, _newValue: any, _receiver: any): boolean {
      throw new Error('[Lively Client] You cannot mutate the state of a given store.');
    },
    get(target: object, p: string): any {
      const value = target[p as keyof object] as unknown;

      const trackedProperty = parentKey ? `${parentKey}.${p}` : p;
      cb(trackedProperty);

      if (value && typeof value === 'object') {
        return createTrackedObjectProxy(value, cb, p);
      }

      return value;
    }
  });
}

function trackedObjectChanged(original: Record<string, any>, updated: Record<string, any>, tracked: string[]) {
  for (const p of tracked) {
    const paths = p.split('.');

    let oldValue = original;
    let newValue = updated;

    paths.forEach(path => {
      if (oldValue) oldValue = oldValue[path];
      if (newValue) newValue = newValue[path];
    });

    if (oldValue !== newValue) return true;
  }

  return false;
}