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

## TODO: Error handling

### Server-side

`Live.ts` exports a special `InputError` class that are handled more conveniently on the client.
If you need to raise an exception, we recommend throwing your own custom error. You can import them and `try/catch`
on the client when firing an action.

```ts
// In a separate file to avoid importing server code
export enum Error {
  UnexpectedError
}

const threadStore = createStore((state: ThreadState, ctx) => ({
  messageCreate: (message: Message) => {
    if (message.content.length === 0) {
      ctx.raiseInputError('message content must not be empty');
      return;
    }

    if (1 + 1 > 2) {
      ctx.raiseException(Error.UnexpectedError, 'optional message');
      return;
    }

    state.messages.push(message);
  }
}));

// createRoom, createServer, etc.
```

### Client-side

```tsx
import { useState } from "react";
import { createReactClient } from "live.ts";
import type { Server } from "~/path/to/server";
import { Error } from "~/path/to/server/errors";

const client = createReactClient<Server>('ws://localhost:3000');

function SomeComponent() {
  const { state, actions } = client.thread.useStore('<thread-id>');

  const { messages } = state;
  const { messageCreate } = actions;

  const [message, setMessage] = useState('');

  return (
    <div>
      <h1>Messages</h1>

      {messages.map(message => (
        <p>{message.content}</p>
      ))}

      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
      />

      {messageCreate.inputErrors && (
        <p>{messageCreate.inputErrors.join('\n')}</p>
      )}

      <button
        onClick={async () => {
          try {
            await messageCreate({ content });
          } catch (err) {
            if (err.code === Error.UnexpectedError) {
              // uh-oh!
            }
          }
        }}
      >
        Send
      </button>
    </div>
  );
}
```

## TODO: Optimistic updates

> Implement error handling before this.

Use the `propose` function found within a store. The first argument is a function containing actions,
the second argument is a function containing state mutations that will be reverted if the actions contain input errors
or otherwise.

```tsx
import { useState } from "react";
import { createReactClient } from "live.ts";
import type { Server } from "~/path/to/server";

const client = createReactClient<Server>('ws://localhost:3000');

function SomeComponent() {
  const { state, actions, propose } = client.thread.useStore('<thread-id>');
  const { messageCreate } = actions;
  const { messages } = state;

  const [message, setMessage] = useState('');

  const handleSendClick = async () => {
    await propose(
      async () => {
        await actions.messageCreate({ content })
      },
      state => {
        state.messages.push({ content });
      }
    )
  }

  return (
    <div>
      <h1>Messages</h1>

      {state.messages.map(message => (
        <p>{message.content}</p>
      ))}

      <textarea value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleSendClick}>Send</button>
    </div>
  );
}
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
8. Optimitistic state updates

# Philosophy

I've really enjoyed working with [tRPC](https://trpc.io/). This library takes a lot of inspiration from it. However,
handling complicated websocket logic for something like a game carried too much friction.

The vision here is to build something that feels like simple state management without the overhead of managing websocket
connections.