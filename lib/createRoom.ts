import type {StoreCreator} from "./createStore";

export type Room<
  State extends Record<string, unknown>,
  Actions extends {
    [key in string]: (...args: any[]) => void;
  }
> = {
  store: StoreCreator<State, Actions>;
  getInitialState: (roomId: string) => State | Promise<State>;
  persist: (roomId: string, state: State) => void | Promise<void>;
}

export function createRoom<
  State extends Record<string, unknown>,
  Actions extends {
    [key in string]: (...args: any[]) => void;
  }
>(opts: Room<State, Actions>) {
  return opts;
}