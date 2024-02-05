import { io } from 'socket.io-client';
import type { Room } from "./createRoom";
import {useEffect, useState, useRef, useMemo} from "react";
import {createTrackedObjectProxy} from "./util/createTrackedObjectProxy";
import {trackedObjectChanged} from "./util/trackedObjectChanged";
import {ClientStore, createClientStore} from "./createClient";

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

  return new Proxy<T>({} as any, {
    set(): boolean {
      throw new Error('[Lively Client] You cannot modify actions on a client.');
    },
    get(_target, roomType: string) {
      return {
        useStore: (id: string) => {
          const store = createClientStore(socket, roomType, id);

          const trackedProperties = useRef<string[]>([]);
          const state = useRef<Record<string, any>>({});
          const [, setR] = useState(0);
          const forceUpdate = () => setR(c => c + 1);

          useEffect(() => {
            const unsub = store.subscribe(newState => {
              const tracked = cleanupTrackedProperties(trackedProperties.current);
              const rerender = trackedObjectChanged(state.current, newState, tracked);

              state.current = newState;

              if (rerender) forceUpdate();
            });

            return () => {
              unsub();
            }
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