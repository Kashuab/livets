import type {StoreCreator} from "./createStore";

export type Room<
  State extends Record<string, unknown>,
  Actions extends {
    [key in string]: (...args: any[]) => void;
  },
  Actor extends Record<string, unknown>,
  TransformClientState extends (state: State, actor: Actor) => Record<string, unknown>
> = {
  store: StoreCreator<State, Actions>;
  onJoin: (state: State, actor: Actor) => void;
  getInitialState: (roomId: string) => State | Promise<State>;
  persist: (roomId: string, state: State) => void | Promise<void>;
  transformClientState: TransformClientState;
  allowActor: (state: State, actor: Actor) => boolean | Promise<boolean>;
}

export function createRoom<
  State extends Record<string, unknown>,
  Actions extends {
    [key in string]: (...args: any[]) => void;
  },
  Actor extends Record<string, unknown>,
  TransformClientState extends (state: State, actor: Actor) => Record<string, unknown>
>(opts: Room<State, Actions, Actor, TransformClientState>) {
  return opts;
}