import {ActionRaisedError} from "./ActionRaisedError";

type CreateStoreFnsContext = {
  raise: (code: string | number, message?: string) => void;
  notifySubscribers: () => void;
}

type CreateStoreFns<
  State extends Record<string, unknown>,
  Actions extends {
    [key in string]: (...args: any[]) => void;
  },
  Actor extends Record<string, unknown>
> = (state: State, ctx: CreateStoreFnsContext, actor: Actor) => Actions

type Subscriber<State extends Record<string, unknown>> = (state: State) => void;

export type Store<
  State extends Record<string, unknown> = Record<string, unknown>,
  Actions extends Record<string, (...args: any[]) => void> = Record<string, (...args: any[]) => void>
> = {
  state: State;
  actions: Actions;
  subscribe: (cb: Subscriber<State>) => void;
}

export type StoreCreator<
  State extends Record<string, unknown>,
  Actions extends {
    [key in string]: (...args: any[]) => void;
  },
  
> = (initialState: State) => Store<State, Actions>

export function createStore<
  State extends Record<string, unknown>,
  Actions extends {
    [key in string]: (...args: any[]) => void;
  },
  Actor extends Record<string, unknown>
>(createStoreFns: CreateStoreFns<State, Actions, Actor>): StoreCreator<State, Actions> {
  return (initialState: State) => {
    const subscribers: Subscriber<State>[] = [];
    let state = initialState;

    const notifySubscribers = () => subscribers.forEach(cb => cb(state));

    // TODO: empty context/actor objects, not required at this point since the functions aren't being called.
    // We just need to know the function names.
    const wrappedFunctions: Actions = (Object.keys(createStoreFns(state, {} as any, {} as any)) as (keyof Actions)[])
      .reduce((wrapped: Actions, functionName) => {
        const context: CreateStoreFnsContext = {
          raise: (code, message) => {
            throw new ActionRaisedError({ code, message });
          },
          notifySubscribers
        }

        const fn = (async (actor: Actor, ...args: any[]) => {
          if (!state) {
            throw new Error('[Live.ts] Failed to create action because state is null, check your getInitialState');
          }

          const newFuncs = createStoreFns(state, context, actor);
          const func = newFuncs[functionName]
          const result = await func.bind(newFuncs)(...args);

          // @ts-ignore: result is typed to be void, but this is helpful for developers
          if (result) throw new Error("[Live.ts] Actions shouldn't return data, it will be ignored");

          notifySubscribers();
        }).bind(wrapped) as any; // TODO: Types

        wrapped[functionName] = fn;

        return wrapped;
      }, {} as Actions);

    return {
      state,
      actions: wrappedFunctions,
      subscribe: cb => subscribers.push(cb),
    }
  }
}
