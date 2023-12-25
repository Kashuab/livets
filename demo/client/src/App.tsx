import './App.css';
import {createClient, UnwrapRoomState} from "../../../lib/createClient.ts";
import type { Server } from "../../server";
import {useEffect, useState} from "react";

type LobbyState = UnwrapRoomState<Server['lobby']>;

const client = createClient<Server>('ws://localhost:3000');
const store = client.lobby.getStore('asdf-id');

function App() {
  const [state, setState] = useState<LobbyState>({ username: 'Loading...' });
  const [input, setInput] = useState('');

  useEffect(() => {
    return store.subscribe(state => setState(state));
  }, []);

  return (
    <>
      <h1>Username: {state.username}</h1>

      <input value={input} onChange={e => setInput(e.target.value)} />
      <button
        onClick={async () => {
          const newState = await store.actions.setUsername(input);

          console.log('yuh yeet', newState);
        }}
      >
        Update username
      </button>
    </>
  )
}

export default App
