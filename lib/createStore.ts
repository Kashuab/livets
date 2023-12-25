type CreateStoreFns<
  State extends Record<string, unknown>,
  Actions extends {
    [key in string]: (...args: any[]) => void;
  }
> = (state: State) => Actions

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

    const wrappedFunctions: Actions = (Object.keys(createStoreFns(state)) as (keyof Actions)[])
      .reduce((wrapped: Actions, functionName) => {
        wrapped[functionName] = ((...args: any[]) => {
          if (!state) {
            throw new Error('[Lively] Failed to create action because state is null, check your getInitialState');
          }

          const newFunc = createStoreFns(state)[functionName];
          const result = newFunc(...args);

          // @ts-ignore: result is typed to be void, but this is helpful for developers
          if (result) throw new Error("[Lively] Actions shouldn't return data, it will be ignored");

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
