import './App.css';
import {createReactClient} from "../../../lib/createReactClient.ts";
import type { Server } from "../../server";
import {memo, useState} from "react";
import {ThreadError} from "../../server/errors.ts";

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
          const { error, state } = await actions.setUsername.propose(
            state => {
              state.username = input
            },
            input
          );

          console.log('Set username result:', state)

          if (error?.code === ThreadError.BadUsername) {
            alert(error.message);

            return;
          }
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
