import './App.css';
import {createReactClient} from "../../../lib/createClient.ts";
import type { Server } from "../../server";
import {memo, useState} from "react";

const client = createReactClient<Server>('ws://localhost:3000');

function App() {
  const { state, actions } = client.lobby.useStore('test-id');
  const [input, setInput] = useState('');

  return (
    <>
      <h1>Username: {state.username}</h1>

      <input value={input} onChange={e => setInput(e.target.value)} />
      <button
        onClick={async () => {
          await actions.setUsername(input);
        }}
      >
        Update username
      </button>

      <button
        onClick={() => actions.setNestedTest(Math.random())}
      >
        Update nested test
      </button>

      <NestedTest />
    </>
  )
}

const NestedTest = memo(() => {
  const { state } = client.lobby.useStore('test-id');

  return (
    <div>
      <h1>Test: {state.nested?.test}</h1>
    </div>
  )
});

export default App
