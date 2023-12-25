import {createStore} from "../../lib/createStore";
import {createRoom} from "../../lib/createRoom";
import {createServer} from "../../lib/createServer";

type StateTest = {
  username: string;
}

const lobbyStore = createStore((state: StateTest) => ({
  setUsername(username: string) {
    state.username = username;
  },
}));

const lobby = createRoom({
  store: lobbyStore,
  getInitialState: (id: string) => {
    console.log('Find initial state for lobby', id);

    return { username: 'initial' }
  },
  persist: (id, state) => {
    console.log('Stored', id, state);
  }
});

const server = createServer({
  port: 3000,
  wss: false,
  rooms: { lobby }
});

export type Server = typeof server;

console.log('Lively server ready');


