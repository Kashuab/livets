import {ActionRaisedError} from "./ActionRaisedError";

type CreateStoreFnsContext = {
  raise: (code: string | number, message?: string) => void;
}

type CreateStoreFns<
  State extends Record<string, unknown>,
  Actions extends {
    [key in string]: (...args: any[]) => void;
  }
> = (state: State, ctx: CreateStoreFnsContext) => Actions

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
  }
> = (initialState: State) => Store<State, Actions>

export function createStore<
  State extends Record<string, unknown>,
  Actions extends {
    [key in string]: (...args: any[]) => void;
  }
>(createStoreFns: CreateStoreFns<State, Actions>): StoreCreator<State, Actions> {
  return (initialState: State) => {
    const subscribers: Subscriber<State>[] = [];
    let state = initialState;

    const notifySubscribers = () => subscribers.forEach(cb => cb(state));

    // TODO: empty context object, not required at this point since the functions aren't being called.
    // We just need to know the function names.
    const wrappedFunctions: Actions = (Object.keys(createStoreFns(state, {} as any)) as (keyof Actions)[])
      .reduce((wrapped: Actions, functionName) => {
        const context: CreateStoreFnsContext = {
          raise: (code, message) => {
            throw new ActionRaisedError({ code, message });
          }
        }

        wrapped[functionName] = (async (...args: any[]) => {
          if (!state) {
            throw new Error('[Live.ts] Failed to create action because state is null, check your getInitialState');
          }

          const newFunc = createStoreFns(state, context)[functionName];
          const result = await newFunc(...args);

          // @ts-ignore: result is typed to be void, but this is helpful for developers
          if (result) throw new Error("[Live.ts] Actions shouldn't return data, it will be ignored");

          notifySubscribers();
        }) as any; // TODO: Types

        return wrapped;
      }, {} as Actions);

    return {
      state,
      actions: wrappedFunctions,
      subscribe: cb => subscribers.push(cb),
    }
  }
}
