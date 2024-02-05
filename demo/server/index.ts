import {createStore} from "../../lib/createStore";
import {createRoom} from "../../lib/createRoom";
import {createServer} from "../../lib/createServer";
import {devtools} from "~lively/lib/middleware/devtools";
import {ThreadError} from "~lively/demo/server/errors";

type StateTest = {
  username: string;
  nested: {
    test: number;
  }
}

export const lobbyStore = createStore((state: StateTest, ctx) => ({
  setUsername(username: string) {
    if (username === 'asdf') {
      ctx.raise(ThreadError.BadUsername, 'username cannot be asdf');
    }

    state.username = username;
  },
  setNestedTest(test: number) {
    state.nested.test = test;
  }
}));

const lobby = createRoom({
  store: lobbyStore,
  getInitialState: (id: string) => {
    console.log('Find initial state for lobby', id);

    return { username: 'initial', nested: { test: 0 } }
  },
  persist: (id, state) => {
    console.log('Stored', id, state);
  }
});

const server = createServer({
  port: 3000,
  wss: false,
  rooms: { lobby },
  middleware: [
    devtools,
    {
      afterActionFailed: data => {
        console.error('Action failed', data)
      }
    }
  ]
});

export type Server = typeof server;

console.log('Lively server ready');


