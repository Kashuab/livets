# Live.ts

Type-safe real-time state management built on top of Socket.IO

> **Note:**
> This library is experimental and may never be production ready.
> It is currently not available on `npm` either.

---

## Setup

`yarn add live.ts`

### Server-side

```ts
import { createStore, createRoom, createServer } from 'live.ts';

type Message = {
  content: string;
}

type ThreadState = {
  messages: Message[];
}

const threadStore = createStore((state: ThreadState) => ({
  messageCreate: (message: Message) => {
    state.messages.push(message);
  }
}));

const thread = createRoom({
  store: threadStore,
  getInitialState: async (id) => {
    // fetch thread from db/redis/etc.
    // Or return some defaults.
    return { messages: [] }
  },
  persist: async (id, state) => {
    // This is ran after an action is processed.
    // This may not be needed in all cases.
  }
});

const server = createServer({
  port: 3000,
  wss: process.env.NODE_ENV === 'production',
  rooms: { thread }
});

// For the client to consume and provide type-safe access
export type Server = typeof server;

console.log('Thread service ready on port 3000');
```

## Client-side 

`Live.ts` provides first-class support for React.

```tsx
import { useState } from "react";
import { createReactClient } from "live.ts";
import type { Server } from "~/path/to/server";

const client = createReactClient<Server>('ws://localhost:3000');

function SomeComponent() {
  const { state, actions } = client.thread.useStore('<thread-id>');

  const [message, setMessage] = useState('');

  return (
    <div>
      <h1>Messages</h1>

      {state.messages.map(message => (
        <p>{message.content}</p>
      ))}

      <textarea value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={() => actions.messageCreate({content})}>Send</button>
    </div>
  );
}
```

> **Note:** Live.ts uses recursive proxies to track the data you access from a store's `state`. 
> This is done to ensure your component only re-renders if the data it needs changes.

### Standalone client

There is also a standalone client:

```tsx
import { createClient } from "live.ts";
import type { Server } from "~/path/to/server";

const client = createClient<Server>('ws://localhost:3000');

const state = await client.getState();

// Actions always return the latest state
const newState = await state.actions.messageCreate({ content: 'Test message' });

console.log(newState) // -> { messages: [{ content: 'Test message' }] }
```

# TODO:

1. Re-sync state upon window focus
2. More robust config for `createServer`
3. Reconcile names (`createStore`, `createRoom`, etc. are kind of confusing)
4. Implement error handling
   - Exceptions (i.e. `throw new Error("this shouldn't happen")`)
   - User input errors (i.e. `username already taken`)
5. Implement action wrappers (authentication, context, etc.)
6. Better documentation
7. Tests

# Philosophy

I've really enjoyed working with [tRPC](https://trpc.io/). This library takes a lot of inspiration from it. However,
handling complicated websocket logic for something like a game carried too much friction.

The vision here is to build something that feels like simple state management without the overhead of managing websocket
connections.